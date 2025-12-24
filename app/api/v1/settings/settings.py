"""
Settings and preferences routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from bson import ObjectId
from app.core.security import get_current_user_id
from app.database import get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/settings", tags=["Settings"])

# ==================== Get User Settings ====================

@router.get("", status_code=status.HTTP_200_OK)
async def get_user_settings(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get user preferences and settings"""
    try:
        settings = await db.settings.find_one({"user_id": ObjectId(user_id)})
        
        if not settings:
            # Return default settings
            return {
                "user_id": user_id,
                "theme": "light",
                "currency": "INR",
                "language": "en",
                "notifications_enabled": True,
                "email_notifications": True,
                "push_notifications": True,
                "two_factor_enabled": False,
                "monthly_report_email": True,
                "budget_alerts": True,
                "goal_reminders": True
            }
        
        return {
            "_id": str(settings["_id"]),
            "user_id": str(settings["user_id"]),
            "theme": settings.get("theme", "light"),
            "currency": settings.get("currency", "INR"),
            "language": settings.get("language", "en"),
            "notifications_enabled": settings.get("notifications_enabled", True),
            "email_notifications": settings.get("email_notifications", True),
            "push_notifications": settings.get("push_notifications", True),
            "two_factor_enabled": settings.get("two_factor_enabled", False),
            "monthly_report_email": settings.get("monthly_report_email", True),
            "budget_alerts": settings.get("budget_alerts", True),
            "goal_reminders": settings.get("goal_reminders", True)
        }
        
    except Exception as e:
        logger.error(f"❌ Get settings error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch settings"
        )

# ==================== Update Settings ====================

@router.put("", status_code=status.HTTP_200_OK)
async def update_settings(
    request: dict,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update user preferences and settings"""
    try:
        existing = await db.settings.find_one({"user_id": ObjectId(user_id)})
        
        update_data = {
            "user_id": ObjectId(user_id),
            "theme": request.get("theme", "light"),
            "currency": request.get("currency", "INR"),
            "language": request.get("language", "en"),
            "notifications_enabled": request.get("notifications_enabled", True),
            "email_notifications": request.get("email_notifications", True),
            "push_notifications": request.get("push_notifications", True),
            "two_factor_enabled": request.get("two_factor_enabled", False),
            "monthly_report_email": request.get("monthly_report_email", True),
            "budget_alerts": request.get("budget_alerts", True),
            "goal_reminders": request.get("goal_reminders", True),
            "updated_at": datetime.utcnow()
        }
        
        if existing:
            await db.settings.update_one(
                {"user_id": ObjectId(user_id)},
                {"$set": update_data}
            )
        else:
            update_data["created_at"] = datetime.utcnow()
            await db.settings.insert_one(update_data)
        
        logger.info(f"✅ Settings updated for user {user_id}")
        
        return {
            "status": "success",
            "message": "Settings updated successfully",
            "data": update_data
        }
        
    except Exception as e:
        logger.error(f"❌ Update settings error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update settings"
        )

# ==================== Get Notification Preferences ====================

@router.get("/notifications", status_code=status.HTTP_200_OK)
async def get_notification_preferences(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get notification preferences"""
    try:
        settings = await db.settings.find_one({"user_id": ObjectId(user_id)})
        
        return {
            "notifications_enabled": settings.get("notifications_enabled", True) if settings else True,
            "email_notifications": settings.get("email_notifications", True) if settings else True,
            "push_notifications": settings.get("push_notifications", True) if settings else True,
            "budget_alerts": settings.get("budget_alerts", True) if settings else True,
            "goal_reminders": settings.get("goal_reminders", True) if settings else True,
            "monthly_report_email": settings.get("monthly_report_email", True) if settings else True
        }
        
    except Exception as e:
        logger.error(f"❌ Get notification preferences error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch notification preferences"
        )

# ==================== Update Notification Preferences ====================

@router.put("/notifications", status_code=status.HTTP_200_OK)
async def update_notification_preferences(
    request: dict,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update notification preferences"""
    try:
        existing = await db.settings.find_one({"user_id": ObjectId(user_id)})
        
        update_data = {
            "notifications_enabled": request.get("notifications_enabled", True),
            "email_notifications": request.get("email_notifications", True),
            "push_notifications": request.get("push_notifications", True),
            "budget_alerts": request.get("budget_alerts", True),
            "goal_reminders": request.get("goal_reminders", True),
            "monthly_report_email": request.get("monthly_report_email", True),
            "updated_at": datetime.utcnow()
        }
        
        if existing:
            await db.settings.update_one(
                {"user_id": ObjectId(user_id)},
                {"$set": update_data}
            )
        else:
            update_data["user_id"] = ObjectId(user_id)
            update_data["created_at"] = datetime.utcnow()
            await db.settings.insert_one(update_data)
        
        logger.info(f"✅ Notification preferences updated for user {user_id}")
        
        return {"status": "success", "message": "Notification preferences updated"}
        
    except Exception as e:
        logger.error(f"❌ Update notification preferences error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update notification preferences"
        )

# ==================== Get Display Preferences ====================

@router.get("/display", status_code=status.HTTP_200_OK)
async def get_display_preferences(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get display preferences (theme, language, currency)"""
    try:
        settings = await db.settings.find_one({"user_id": ObjectId(user_id)})
        
        return {
            "theme": settings.get("theme", "light") if settings else "light",
            "currency": settings.get("currency", "INR") if settings else "INR",
            "language": settings.get("language", "en") if settings else "en"
        }
        
    except Exception as e:
        logger.error(f"❌ Get display preferences error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch display preferences"
        )

# ==================== Update Display Preferences ====================

@router.put("/display", status_code=status.HTTP_200_OK)
async def update_display_preferences(
    request: dict,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update display preferences"""
    try:
        existing = await db.settings.find_one({"user_id": ObjectId(user_id)})
        
        update_data = {
            "theme": request.get("theme", "light"),
            "currency": request.get("currency", "INR"),
            "language": request.get("language", "en"),
            "updated_at": datetime.utcnow()
        }
        
        if existing:
            await db.settings.update_one(
                {"user_id": ObjectId(user_id)},
                {"$set": update_data}
            )
        else:
            update_data["user_id"] = ObjectId(user_id)
            update_data["created_at"] = datetime.utcnow()
            await db.settings.insert_one(update_data)
        
        logger.info(f"✅ Display preferences updated for user {user_id}")
        
        return {"status": "success", "message": "Display preferences updated"}
        
    except Exception as e:
        logger.error(f"❌ Update display preferences error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update display preferences"
        )
