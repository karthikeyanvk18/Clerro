"""
Goal model - represents financial goals in MongoDB
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum

class GoalType(str, Enum):
    """Goal type enum"""
    SAVINGS = "savings"
    INVESTMENT = "investment"
    VACATION = "vacation"
    CAR = "car"
    HOME = "home"
    EDUCATION = "education"
    EMERGENCY_FUND = "emergency_fund"
    RETIREMENT = "retirement"
    OTHER = "other"

class GoalStatus(str, Enum):
    """Goal status enum"""
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ABANDONED = "abandoned"

class Milestone(BaseModel):
    """Goal milestone"""
    percentage: int  # 25, 50, 75, 100
    amount: float
    reached_at: Optional[datetime] = None
    is_reached: bool = False

class GoalModel(BaseModel):
    """Goal database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    user_id: str
    goal_name: str
    goal_type: GoalType
    target_amount: float
    current_amount: float = 0.0
    currency: str = "USD"
    target_date: datetime
    status: GoalStatus = GoalStatus.ACTIVE
    description: Optional[str] = None
    milestones: List[Milestone] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
