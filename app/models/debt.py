"""
Debt model - represents debts/loans in MongoDB
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum

class DebtStatus(str, Enum):
    """Debt status enum"""
    ACTIVE = "active"
    PARTIALLY_PAID = "partially_paid"
    COMPLETED = "completed"

class DebtModel(BaseModel):
    """Debt database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    user_id: str
    name: str  # Home Loan, Car Loan, etc.
    creditor: str  # Bank name
    principal_amount: float
    interest_rate: float  # Annual percentage
    tenure_months: int
    start_date: datetime
    status: DebtStatus = DebtStatus.ACTIVE
    amount_paid: float = 0.0
    next_due_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
