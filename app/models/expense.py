"""
Expense model - represents expense entries in MongoDB
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum

class ExpenseCategory(str, Enum):
    """Expense category enum"""
    FOOD = "food"
    TRANSPORT = "transport"
    UTILITIES = "utilities"
    ENTERTAINMENT = "entertainment"
    HEALTHCARE = "healthcare"
    SHOPPING = "shopping"
    EDUCATION = "education"
    INSURANCE = "insurance"
    SAVINGS = "savings"
    INVESTMENT = "investment"
    OTHER = "other"

class ExpenseModel(BaseModel):
    """Expense database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    user_id: str
    category: ExpenseCategory
    amount: float
    description: str
    payment_method: str  # credit_card, cash, upi, etc.
    expense_date: datetime
    receipt_url: Optional[str] = None  # S3 URL for receipt
    tags: list[str] = []
    is_recurring: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
