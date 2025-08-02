from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.campaign import CampaignStatus

class CampaignBase(BaseModel):
    name: str
    subject: str
    content: str
    status: CampaignStatus = CampaignStatus.DRAFT

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    subject: Optional[str] = None
    content: Optional[str] = None
    status: Optional[CampaignStatus] = None
    scheduled_at: Optional[datetime] = None

class Campaign(CampaignBase):
    id: int
    user_id: int
    scheduled_at: Optional[datetime] = None
    sent_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class CampaignAnalytics(BaseModel):
    campaign_id: int
    total_sent: int
    total_opened: int
    total_clicked: int
    total_unsubscribed: int
    open_rate: float
    click_rate: float
    unsubscribe_rate: float 