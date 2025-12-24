"""
Settings model - represents user settings/preferences in MongoDB
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum

class Theme(str, Enum):
    """Theme enum"""
    LIGHT = "light"
    DARK = "dark"
    AUTO = "auto"

class Currency(str, Enum):
    """Currency enum"""
    USD = "USD"
    EUR = "EUR"
    INR = "INR"
    GBP = "GBP"
    JPY = "JPY"
    AUD = "AUD"
    CAD = "CAD"

class Language(str, Enum):
    """Language enum"""
    ENGLISH = "en"
    SPANISH = "es"
    FRENCH = "fr"
    GERMAN = "de"
    HINDI = "hi"
    CHINESE = "zh"

class SettingsModel(BaseModel):
    """Settings database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    user_id: str
    
    # Display Preferences
    theme: Theme = Theme.AUTO
    language: Language = Language.ENGLISH
    currency: Currency = Currency.USD
    date_format: str = "MM/DD/YYYY"
    time_format: str = "12h"  # 12h or 24h
    
    # Notification Preferences
    email_notifications: bool = True
    push_notifications: bool = True
    sms_notifications: bool = False
    payment_reminders: bool = True
    budget_alerts: bool = True
    goal_updates: bool = True
    weekly_summary: bool = True
    daily_summary: bool = False
    
    # Privacy & Security
    two_factor_enabled: bool = False
    login_alerts: bool = True
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
