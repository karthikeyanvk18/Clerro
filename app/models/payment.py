"""
Payment model - represents payment records in MongoDB
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum

class PaymentStatus(str, Enum):
    """Payment status enum"""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class PaymentMethod(str, Enum):
    """Payment method enum"""
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    UPI = "upi"
    NETBANKING = "netbanking"
    CASH = "cash"
    CHEQUE = "cheque"
    OTHER = "other"

class PaymentModel(BaseModel):
    """Payment database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    user_id: str
    debt_id: str
    amount: float
    payment_date: datetime
    status: PaymentStatus = PaymentStatus.COMPLETED
    payment_method: PaymentMethod
    description: Optional[str] = None
    reference_number: Optional[str] = None
    receipt_url: Optional[str] = None  # S3 URL for receipt
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
