"""
Budget model - represents spending budgets in MongoDB
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum

class BudgetPeriod(str, Enum):
    """Budget period enum"""
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    ANNUALLY = "annually"

class BudgetStatus(str, Enum):
    """Budget status enum"""
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    EXCEEDED = "exceeded"

class BudgetModel(BaseModel):
    """Budget database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    user_id: str
    budget_name: str
    category: str  # food, transport, entertainment, etc.
    amount: float
    period: BudgetPeriod = BudgetPeriod.MONTHLY
    status: BudgetStatus = BudgetStatus.ACTIVE
    start_date: datetime
    end_date: Optional[datetime] = None
    spent_amount: float = 0.0
    alert_threshold: float = 80.0  # Alert when 80% spent
    alert_enabled: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
