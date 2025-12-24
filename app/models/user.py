"""
User model - represents user accounts in MongoDB
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId

class UserModel(BaseModel):
    """User database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    email: str
    username: str
    password_hash: str
    full_name: str
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    refresh_tokens: List[str] = []
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
