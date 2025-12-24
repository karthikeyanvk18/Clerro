"""
Income and Expenses routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
from typing import List
from bson import ObjectId
from app.schemas import CreateIncomeRequest, IncomeResponse
from app.core.security import get_current_user_id
from app.database import get_db
from app.services import notification_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/income", tags=["Income"])

# ==================== INCOME ROUTES ====================

@router.post("", response_model=IncomeResponse, status_code=status.HTTP_201_CREATED)
async def create_income(
    request: CreateIncomeRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Add income record"""
    try:
        income_data = {
            "user_id": ObjectId(user_id),
            "title": request.title,
            "income_type": request.income_type,
            "amount": request.amount,
            "source": request.source,
            "frequency": request.frequency,
            "date": request.date,
            "notes": request.notes,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await db.income.insert_one(income_data)
        created = await db.income.find_one({"_id": result.inserted_id})
        
        logger.info(f"✅ Income created: {result.inserted_id} for user {user_id}")
        
        return IncomeResponse(**{
            "_id": str(created["_id"]),
            **created
        })
        
    except Exception as e:
        logger.error(f"❌ Create income error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create income record"
        )

@router.get("", response_model=List[IncomeResponse])
async def get_all_income(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all income records"""
    try:
        income = await db.income.find({
            "user_id": ObjectId(user_id)
        }).sort("date", -1).to_list(None)
        
        return [IncomeResponse(**{
            "_id": str(inc["_id"]),
            **inc
        }) for inc in income]
        
    except Exception as e:
        logger.error(f"❌ Get income error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch income records"
        )

@router.get("/{income_id}", response_model=IncomeResponse)
async def get_income(
    income_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get specific income record"""
    try:
        income = await db.income.find_one({
            "_id": ObjectId(income_id),
            "user_id": ObjectId(user_id)
        })
        
        if not income:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Income record not found"
            )
        
        return IncomeResponse(**{
            "_id": str(income["_id"]),
            **income
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get income error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch income record"
        )

@router.put("/{income_id}", response_model=IncomeResponse)
async def update_income(
    income_id: str,
    request: CreateIncomeRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update income record"""
    try:
        income = await db.income.find_one({
            "_id": ObjectId(income_id),
            "user_id": ObjectId(user_id)
        })
        
        if not income:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Income record not found"
            )
        
        update_data = {
            "title": request.title,
            "income_type": request.income_type,
            "amount": request.amount,
            "source": request.source,
            "frequency": request.frequency,
            "date": request.date,
            "notes": request.notes,
            "updated_at": datetime.utcnow()
        }
        
        await db.income.update_one(
            {"_id": ObjectId(income_id)},
            {"$set": update_data}
        )
        
        updated = await db.income.find_one({"_id": ObjectId(income_id)})
        
        logger.info(f"✅ Income updated: {income_id}")
        
        return IncomeResponse(**{
            "_id": str(updated["_id"]),
            **updated
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Update income error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update income record"
        )

@router.delete("/{income_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_income(
    income_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Delete income record"""
    try:
        result = await db.income.delete_one({
            "_id": ObjectId(income_id),
            "user_id": ObjectId(user_id)
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Income record not found"
            )
        
        logger.info(f"✅ Income deleted: {income_id}")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Delete income error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete income record"
        )

# ==================== INCOME STATISTICS ====================

@router.get("/stats/monthly", status_code=status.HTTP_200_OK)
async def get_monthly_income_stats(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get monthly income statistics"""
    try:
        now = datetime.utcnow()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_end = month_start + timedelta(days=32)
        month_end = month_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        income_records = await db.income.find({
            "user_id": ObjectId(user_id),
            "date": {
                "$gte": month_start,
                "$lt": month_end
            }
        }).to_list(None)
        
        total_income = sum(inc["amount"] for inc in income_records)
        by_type = {}
        
        for inc in income_records:
            income_type = inc["income_type"]
            by_type[income_type] = by_type.get(income_type, 0) + inc["amount"]
        
        return {
            "month": now.strftime("%B %Y"),
            "total_income": total_income,
            "by_type": by_type,
            "record_count": len(income_records)
        }
        
    except Exception as e:
        logger.error(f"❌ Get monthly income stats error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch income statistics"
        )
