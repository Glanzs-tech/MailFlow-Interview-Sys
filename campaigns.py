from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.campaign import Campaign, CampaignStatus
from app.models.contact import Contact
from app.schemas.campaign import CampaignCreate, CampaignUpdate, Campaign as CampaignSchema, CampaignAnalytics
from app.auth import get_current_active_user
from app.services.email_service import send_campaign_email

router = APIRouter()

@router.post("/", response_model=CampaignSchema)
def create_campaign(campaign: CampaignCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    db_campaign = Campaign(**campaign.dict(), user_id=current_user.id)
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@router.get("/", response_model=List[CampaignSchema])
def get_campaigns(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).filter(Campaign.user_id == current_user.id).offset(skip).limit(limit).all()
    return campaigns

@router.get("/{campaign_id}", response_model=CampaignSchema)
def get_campaign(campaign_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id, Campaign.user_id == current_user.id).first()
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.put("/{campaign_id}", response_model=CampaignSchema)
def update_campaign(campaign_id: int, campaign: CampaignUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    db_campaign = db.query(Campaign).filter(Campaign.id == campaign_id, Campaign.user_id == current_user.id).first()
    if db_campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    for field, value in campaign.dict(exclude_unset=True).items():
        setattr(db_campaign, field, value)
    
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id, Campaign.user_id == current_user.id).first()
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    db.delete(campaign)
    db.commit()
    return {"message": "Campaign deleted successfully"}

@router.post("/{campaign_id}/send")
def send_campaign(campaign_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id, Campaign.user_id == current_user.id).first()
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    if campaign.status != CampaignStatus.DRAFT:
        raise HTTPException(status_code=400, detail="Campaign can only be sent from draft status")
    
    # Get all subscribed contacts
    contacts = db.query(Contact).filter(
        Contact.user_id == current_user.id,
        Contact.is_subscribed == True
    ).all()
    
    if not contacts:
        raise HTTPException(status_code=400, detail="No subscribed contacts found")
    
    # Update campaign status
    campaign.status = CampaignStatus.SENDING
    db.commit()
    
    # Send emails (this would typically be done asynchronously with Celery)
    for contact in contacts:
        send_campaign_email(campaign, contact)
    
    campaign.status = CampaignStatus.SENT
    db.commit()
    
    return {"message": f"Campaign sent to {len(contacts)} contacts"}

@router.get("/{campaign_id}/analytics", response_model=CampaignAnalytics)
def get_campaign_analytics(campaign_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id, Campaign.user_id == current_user.id).first()
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # This would typically query the analytics table
    # For now, return mock data
    return CampaignAnalytics(
        campaign_id=campaign_id,
        total_sent=100,
        total_opened=45,
        total_clicked=12,
        total_unsubscribed=2,
        open_rate=0.45,
        click_rate=0.12,
        unsubscribe_rate=0.02
    ) 