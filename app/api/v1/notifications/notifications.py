"""
Notifications management routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from typing import List
from bson import ObjectId
from app.core.security import get_current_user_id
from app.database import get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/notifications", tags=["Notifications"])

# ==================== Get Notifications ====================

@router.get("", status_code=status.HTTP_200_OK)
async def get_notifications(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db),
    limit: int = 20,
    skip: int = 0
):
    """Get user notifications"""
    try:
        notifications = await db.notifications.find({
            "user_id": ObjectId(user_id)
        }).sort("created_at", -1).skip(skip).limit(limit).to_list(None)
        
        return [
            {
                "_id": str(n["_id"]),
                "title": n.get("title"),
                "message": n.get("message"),
                "type": n.get("type"),
                "is_read": n.get("is_read", False),
                "created_at": n.get("created_at"),
                "data": n.get("data", {})
            }
            for n in notifications
        ]
        
    except Exception as e:
        logger.error(f"❌ Get notifications error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch notifications"
        )

# ==================== Get Unread Count ====================

@router.get("/unread/count", status_code=status.HTTP_200_OK)
async def get_unread_count(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get count of unread notifications"""
    try:
        count = await db.notifications.count_documents({
            "user_id": ObjectId(user_id),
            "is_read": False
        })
        
        return {"unread_count": count}
        
    except Exception as e:
        logger.error(f"❌ Get unread count error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch unread count"
        )

# ==================== Mark as Read ====================

@router.put("/{notification_id}/read", status_code=status.HTTP_200_OK)
async def mark_notification_read(
    notification_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Mark notification as read"""
    try:
        result = await db.notifications.update_one(
            {"_id": ObjectId(notification_id), "user_id": ObjectId(user_id)},
            {"$set": {"is_read": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found"
            )
        
        logger.info(f"✅ Notification marked as read: {notification_id}")
        
        return {"status": "success", "message": "Notification marked as read"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Mark notification read error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to mark notification as read"
        )

# ==================== Mark All as Read ====================

@router.put("/read/all", status_code=status.HTTP_200_OK)
async def mark_all_notifications_read(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Mark all notifications as read"""
    try:
        result = await db.notifications.update_many(
            {"user_id": ObjectId(user_id), "is_read": False},
            {"$set": {"is_read": True}}
        )
        
        logger.info(f"✅ {result.modified_count} notifications marked as read for user {user_id}")
        
        return {
            "status": "success",
            "message": f"Marked {result.modified_count} notifications as read"
        }
        
    except Exception as e:
        logger.error(f"❌ Mark all notifications read error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to mark all notifications as read"
        )

# ==================== Delete Notification ====================

@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_notification(
    notification_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Delete a notification"""
    try:
        result = await db.notifications.delete_one({
            "_id": ObjectId(notification_id),
            "user_id": ObjectId(user_id)
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found"
            )
        
        logger.info(f"✅ Notification deleted: {notification_id}")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Delete notification error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete notification"
        )

# ==================== Clear All Notifications ====================

@router.delete("", status_code=status.HTTP_200_OK)
async def clear_all_notifications(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Delete all notifications"""
    try:
        result = await db.notifications.delete_many({
            "user_id": ObjectId(user_id)
        })
        
        logger.info(f"✅ {result.deleted_count} notifications cleared for user {user_id}")
        
        return {
            "status": "success",
            "message": f"Cleared {result.deleted_count} notifications"
        }
        
    except Exception as e:
        logger.error(f"❌ Clear notifications error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to clear notifications"
        )
