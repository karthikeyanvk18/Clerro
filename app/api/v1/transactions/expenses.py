"""
Expenses tracking routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
from typing import List
from bson import ObjectId
from app.schemas import CreateExpenseRequest, ExpenseResponse, ExpenseCategory
from app.core.security import get_current_user_id
from app.database import get_db
from app.services import notification_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/expenses", tags=["Expenses"])

# ==================== Create Expense ====================

@router.post("", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
async def create_expense(
    request: CreateExpenseRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Add expense record"""
    try:
        expense_data = {
            "user_id": ObjectId(user_id),
            "title": request.title,
            "category": request.category,
            "amount": request.amount,
            "date": request.date,
            "description": request.description,
            "receipt_url": request.receipt_url,
            "tags": request.tags or [],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await db.expenses.insert_one(expense_data)
        created = await db.expenses.find_one({"_id": result.inserted_id})
        
        # Check budget alerts
        await check_budget_alert(user_id, request.category, request.amount, db)
        
        logger.info(f"✅ Expense created: {result.inserted_id} for user {user_id}")
        
        return ExpenseResponse(**{
            "_id": str(created["_id"]),
            **created
        })
        
    except Exception as e:
        logger.error(f"❌ Create expense error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create expense record"
        )

# ==================== Get All Expenses ====================

@router.get("", response_model=List[ExpenseResponse])
async def get_all_expenses(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all expense records"""
    try:
        expenses = await db.expenses.find({
            "user_id": ObjectId(user_id)
        }).sort("date", -1).to_list(None)
        
        return [ExpenseResponse(**{
            "_id": str(exp["_id"]),
            **exp
        }) for exp in expenses]
        
    except Exception as e:
        logger.error(f"❌ Get expenses error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch expense records"
        )

# ==================== Get Single Expense ====================

@router.get("/{expense_id}", response_model=ExpenseResponse)
async def get_expense(
    expense_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get specific expense record"""
    try:
        expense = await db.expenses.find_one({
            "_id": ObjectId(expense_id),
            "user_id": ObjectId(user_id)
        })
        
        if not expense:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Expense record not found"
            )
        
        return ExpenseResponse(**{
            "_id": str(expense["_id"]),
            **expense
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get expense error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch expense record"
        )

# ==================== Update Expense ====================

@router.put("/{expense_id}", response_model=ExpenseResponse)
async def update_expense(
    expense_id: str,
    request: CreateExpenseRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update expense record"""
    try:
        expense = await db.expenses.find_one({
            "_id": ObjectId(expense_id),
            "user_id": ObjectId(user_id)
        })
        
        if not expense:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Expense record not found"
            )
        
        update_data = {
            "title": request.title,
            "category": request.category,
            "amount": request.amount,
            "date": request.date,
            "description": request.description,
            "receipt_url": request.receipt_url,
            "tags": request.tags or [],
            "updated_at": datetime.utcnow()
        }
        
        await db.expenses.update_one(
            {"_id": ObjectId(expense_id)},
            {"$set": update_data}
        )
        
        updated = await db.expenses.find_one({"_id": ObjectId(expense_id)})
        
        logger.info(f"✅ Expense updated: {expense_id}")
        
        return ExpenseResponse(**{
            "_id": str(updated["_id"]),
            **updated
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Update expense error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update expense record"
        )

# ==================== Delete Expense ====================

@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    expense_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Delete expense record"""
    try:
        result = await db.expenses.delete_one({
            "_id": ObjectId(expense_id),
            "user_id": ObjectId(user_id)
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Expense record not found"
            )
        
        logger.info(f"✅ Expense deleted: {expense_id}")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Delete expense error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete expense record"
        )

# ==================== Monthly Expense Statistics ====================

@router.get("/stats/monthly", status_code=status.HTTP_200_OK)
async def get_monthly_expense_stats(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get monthly expense statistics"""
    try:
        now = datetime.utcnow()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_end = month_start + timedelta(days=32)
        month_end = month_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        expenses = await db.expenses.find({
            "user_id": ObjectId(user_id),
            "date": {
                "$gte": month_start,
                "$lt": month_end
            }
        }).to_list(None)
        
        total_spent = sum(exp["amount"] for exp in expenses)
        by_category = {}
        
        for exp in expenses:
            category = exp["category"]
            by_category[category] = by_category.get(category, 0) + exp["amount"]
        
        # Get top expenses
        top_expenses = sorted(expenses, key=lambda x: x["amount"], reverse=True)[:5]
        
        return {
            "month": now.strftime("%B %Y"),
            "total_spent": total_spent,
            "by_category": by_category,
            "top_expenses": [
                {"title": exp["title"], "amount": exp["amount"], "category": exp["category"]}
                for exp in top_expenses
            ],
            "record_count": len(expenses)
        }
        
    except Exception as e:
        logger.error(f"❌ Get monthly expense stats error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch expense statistics"
        )

# ==================== Helper Functions ====================

async def check_budget_alert(
    user_id: str,
    category: str,
    amount: float,
    db: AsyncIOMotorDatabase
):
    """Check if expense exceeds budget and send notification"""
    try:
        budget = await db.budgets.find_one({
            "user_id": ObjectId(user_id),
            "category": category,
            "active": True
        })
        
        if not budget:
            return
        
        # Calculate spent this month
        now = datetime.utcnow()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_end = month_start + timedelta(days=32)
        month_end = month_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        expenses = await db.expenses.find({
            "user_id": ObjectId(user_id),
            "category": category,
            "date": {
                "$gte": month_start,
                "$lt": month_end
            }
        }).to_list(None)
        
        total_spent = sum(exp["amount"] for exp in expenses)
        percentage = (total_spent / budget["monthly_limit"]) * 100
        
        # Send alert if threshold exceeded
        if percentage >= budget["alert_threshold"]:
            await notification_service.send_expense_alert_notification(
                user_id=user_id,
                category=category,
                spent=total_spent,
                limit=budget["monthly_limit"]
            )
            
    except Exception as e:
        logger.error(f"❌ Budget alert check error: {str(e)}")
