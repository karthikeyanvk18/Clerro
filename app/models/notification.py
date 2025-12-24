"""
Notification model - represents notifications in MongoDB
"""
from datetime import datetime
from typing import Optional, Any, Dict
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum

class NotificationType(str, Enum):
    """Notification type enum"""
    PAYMENT_DUE = "payment_due"
    PAYMENT_RECEIVED = "payment_received"
    BUDGET_ALERT = "budget_alert"
    GOAL_MILESTONE = "goal_milestone"
    GOAL_COMPLETED = "goal_completed"
    DEBT_COMPLETED = "debt_completed"
    SYSTEM = "system"
    ALERT = "alert"
    INFO = "info"

class NotificationStatus(str, Enum):
    """Notification read status"""
    UNREAD = "unread"
    READ = "read"
    ARCHIVED = "archived"

class NotificationModel(BaseModel):
    """Notification database model"""
    id: Optional[ObjectId] = Field(None, alias="_id")
    user_id: str
    notification_type: NotificationType
    title: str
    message: str
    status: NotificationStatus = NotificationStatus.UNREAD
    data: Optional[Dict[str, Any]] = None  # Additional data (debt_id, goal_id, etc.)
    read_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
