"""
Income model - represents income entries in MongoDB
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum

class IncomeType(str, Enum):
    """Income type enum"""
    SALARY = "salary"
    BONUS = "bonus"
    FREELANCE = "freelance"
    INVESTMENT = "investment"
    GIFT = "gift"
    OTHER = "other"

class IncomeFrequency(str, Enum):
    """Income frequency enum"""
    DAILY = "daily"
    WEEKLY = "weekly"
    BIWEEKLY = "biweekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    ANNUALLY = "annually"
    ONE_TIME = "one_time"

class IncomeModel(BaseModel):
    """Income database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    user_id: str
    income_type: IncomeType
    amount: float
    frequency: IncomeFrequency
    source: str  # Company name, platform, etc.
    description: Optional[str] = None
    received_date: datetime
    next_expected_date: Optional[datetime] = None
    is_recurring: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
