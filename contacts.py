from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate, Contact as ContactSchema
from app.auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=ContactSchema)
def create_contact(contact: ContactCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    # Check if contact already exists for this user
    existing_contact = db.query(Contact).filter(
        Contact.email == contact.email,
        Contact.user_id == current_user.id
    ).first()
    
    if existing_contact:
        raise HTTPException(status_code=400, detail="Contact already exists")
    
    db_contact = Contact(**contact.dict(), user_id=current_user.id)
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@router.get("/", response_model=List[ContactSchema])
def get_contacts(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    contacts = db.query(Contact).filter(Contact.user_id == current_user.id).offset(skip).limit(limit).all()
    return contacts

@router.get("/{contact_id}", response_model=ContactSchema)
def get_contact(contact_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    contact = db.query(Contact).filter(Contact.id == contact_id, Contact.user_id == current_user.id).first()
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@router.put("/{contact_id}", response_model=ContactSchema)
def update_contact(contact_id: int, contact: ContactUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    db_contact = db.query(Contact).filter(Contact.id == contact_id, Contact.user_id == current_user.id).first()
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    for field, value in contact.dict(exclude_unset=True).items():
        setattr(db_contact, field, value)
    
    db.commit()
    db.refresh(db_contact)
    return db_contact

@router.delete("/{contact_id}")
def delete_contact(contact_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    contact = db.query(Contact).filter(Contact.id == contact_id, Contact.user_id == current_user.id).first()
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    db.delete(contact)
    db.commit()
    return {"message": "Contact deleted successfully"} 