"""
Budget management routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from typing import List
from bson import ObjectId
from app.schemas import CreateBudgetRequest, BudgetResponse
from app.core.security import get_current_user_id
from app.database import get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/budgets", tags=["Budgets"])

# ==================== Create Budget ====================

@router.post("", response_model=BudgetResponse, status_code=status.HTTP_201_CREATED)
async def create_budget(
    request: CreateBudgetRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Create a budget for a category"""
    try:
        # Check if budget already exists for this category
        existing = await db.budgets.find_one({
            "user_id": ObjectId(user_id),
            "category": request.category,
            "active": True
        })
        
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Active budget already exists for {request.category} category"
            )
        
        budget_data = {
            "user_id": ObjectId(user_id),
            "category": request.category,
            "monthly_limit": request.monthly_limit,
            "alert_threshold": request.alert_threshold or 80,
            "active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await db.budgets.insert_one(budget_data)
        created = await db.budgets.find_one({"_id": result.inserted_id})
        
        logger.info(f"✅ Budget created: {result.inserted_id} for user {user_id}")
        
        return BudgetResponse(**{
            "_id": str(created["_id"]),
            **created
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Create budget error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create budget"
        )

# ==================== Get All Budgets ====================

@router.get("", response_model=List[BudgetResponse])
async def get_all_budgets(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all budgets for user"""
    try:
        budgets = await db.budgets.find({
            "user_id": ObjectId(user_id),
            "active": True
        }).to_list(None)
        
        return [BudgetResponse(**{
            "_id": str(budget["_id"]),
            **budget
        }) for budget in budgets]
        
    except Exception as e:
        logger.error(f"❌ Get budgets error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch budgets"
        )

# ==================== Get Single Budget ====================

@router.get("/{budget_id}", response_model=BudgetResponse)
async def get_budget(
    budget_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get specific budget details"""
    try:
        budget = await db.budgets.find_one({
            "_id": ObjectId(budget_id),
            "user_id": ObjectId(user_id)
        })
        
        if not budget:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Budget not found"
            )
        
        return BudgetResponse(**{
            "_id": str(budget["_id"]),
            **budget
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get budget error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch budget"
        )

# ==================== Update Budget ====================

@router.put("/{budget_id}", response_model=BudgetResponse)
async def update_budget(
    budget_id: str,
    request: CreateBudgetRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update budget details"""
    try:
        budget = await db.budgets.find_one({
            "_id": ObjectId(budget_id),
            "user_id": ObjectId(user_id)
        })
        
        if not budget:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Budget not found"
            )
        
        update_data = {
            "monthly_limit": request.monthly_limit,
            "alert_threshold": request.alert_threshold or 80,
            "updated_at": datetime.utcnow()
        }
        
        await db.budgets.update_one(
            {"_id": ObjectId(budget_id)},
            {"$set": update_data}
        )
        
        updated = await db.budgets.find_one({"_id": ObjectId(budget_id)})
        
        logger.info(f"✅ Budget updated: {budget_id}")
        
        return BudgetResponse(**{
            "_id": str(updated["_id"]),
            **updated
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Update budget error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update budget"
        )

# ==================== Delete Budget ====================

@router.delete("/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_budget(
    budget_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Delete a budget"""
    try:
        result = await db.budgets.delete_one({
            "_id": ObjectId(budget_id),
            "user_id": ObjectId(user_id)
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Budget not found"
            )
        
        logger.info(f"✅ Budget deleted: {budget_id}")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Delete budget error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete budget"
        )

# ==================== Get Budget Status ====================

@router.get("/{budget_id}/status", status_code=status.HTTP_200_OK)
async def get_budget_status(
    budget_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get current budget usage status"""
    try:
        budget = await db.budgets.find_one({
            "_id": ObjectId(budget_id),
            "user_id": ObjectId(user_id)
        })
        
        if not budget:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Budget not found"
            )
        
        # Calculate current spending this month
        from datetime import timedelta
        now = datetime.utcnow()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_end = month_start + timedelta(days=32)
        month_end = month_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        expenses = await db.expenses.find({
            "user_id": ObjectId(user_id),
            "category": budget["category"],
            "date": {
                "$gte": month_start,
                "$lt": month_end
            }
        }).to_list(None)
        
        spent = sum(e["amount"] for e in expenses)
        remaining = budget["monthly_limit"] - spent
        percentage = (spent / budget["monthly_limit"] * 100) if budget["monthly_limit"] > 0 else 0
        
        return {
            "budget_id": budget_id,
            "category": budget["category"],
            "limit": budget["monthly_limit"],
            "spent": spent,
            "remaining": remaining,
            "percentage_used": percentage,
            "alert_threshold": budget["alert_threshold"],
            "is_alert_triggered": percentage >= budget["alert_threshold"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get budget status error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch budget status"
        )
