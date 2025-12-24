"""
User management routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from typing import Optional
from bson import ObjectId
from app.schemas import UserResponse, UpdateUserRequest
from app.core.security import get_current_user_id
from app.database import get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/users", tags=["Users"])

# ==================== Get Current User ====================

@router.get("/me", response_model=UserResponse)
async def get_current_user(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get current user profile"""
    try:
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return UserResponse(**{
            "_id": str(user["_id"]),
            **user
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get current user error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user profile"
        )

# ==================== Get User Profile ====================

@router.get("/{user_id}", response_model=UserResponse)
async def get_user_profile(
    user_id: str,
    current_user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get specific user profile (only own profile)"""
    try:
        if user_id != current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot access other user's profile"
            )
        
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return UserResponse(**{
            "_id": str(user["_id"]),
            **user
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get user profile error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user profile"
        )

# ==================== Update User Profile ====================

@router.put("/{user_id}", response_model=UserResponse)
async def update_user_profile(
    user_id: str,
    request: UpdateUserRequest,
    current_user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update user profile"""
    try:
        if user_id != current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot update other user's profile"
            )
        
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        update_data = {}
        if request.full_name:
            update_data["full_name"] = request.full_name
        if request.phone:
            update_data["phone"] = request.phone
        if request.location:
            update_data["location"] = request.location
        if request.bio is not None:
            update_data["bio"] = request.bio
        if request.avatar_url:
            update_data["avatar_url"] = request.avatar_url
        
        update_data["updated_at"] = datetime.utcnow()
        
        await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        
        updated = await db.users.find_one({"_id": ObjectId(user_id)})
        
        logger.info(f"✅ User profile updated: {user_id}")
        
        return UserResponse(**{
            "_id": str(updated["_id"]),
            **updated
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Update user profile error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user profile"
        )

# ==================== Get User Statistics ====================

@router.get("/{user_id}/stats", status_code=status.HTTP_200_OK)
async def get_user_stats(
    user_id: str,
    current_user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get user statistics"""
    try:
        if user_id != current_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot access other user's statistics"
            )
        
        # Get all financial data
        debts = await db.debts.find({"user_id": ObjectId(user_id)}).to_list(None)
        income_records = await db.income.find({"user_id": ObjectId(user_id)}).to_list(None)
        expenses = await db.expenses.find({"user_id": ObjectId(user_id)}).to_list(None)
        goals = await db.goals.find({"user_id": ObjectId(user_id)}).to_list(None)
        payments = await db.payments.find({"user_id": ObjectId(user_id)}).to_list(None)
        
        # Calculate totals
        total_debt = sum(d["remaining_amount"] for d in debts)
        active_debts = len([d for d in debts if d["status"] == "active"])
        completed_debts = len([d for d in debts if d["status"] == "completed"])
        
        total_income = sum(i["amount"] for i in income_records)
        total_expenses = sum(e["amount"] for e in expenses)
        
        active_goals = len([g for g in goals if g["status"] == "active"])
        completed_goals = len([g for g in goals if g["status"] == "completed"])
        
        return {
            "total_debt": total_debt,
            "active_debts": active_debts,
            "completed_debts": completed_debts,
            "total_income": total_income,
            "total_expenses": total_expenses,
            "net_savings": total_income - total_expenses,
            "active_goals": active_goals,
            "completed_goals": completed_goals,
            "total_transactions": len(payments)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get user stats error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user statistics"
        )
