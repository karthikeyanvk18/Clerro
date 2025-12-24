"""
Debt management routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from typing import List
from bson import ObjectId
from app.schemas import CreateDebtRequest, DebtResponse
from app.core.security import get_current_user_id
from app.database import get_db
from app.services import notification_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/debts", tags=["Debts"])

# ==================== Create Debt ====================

@router.post("", response_model=DebtResponse, status_code=status.HTTP_201_CREATED)
async def create_debt(
    request: CreateDebtRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Create a new debt record"""
    try:
        # Calculate EMI (Equated Monthly Installment)
        principal = request.principal_amount
        rate = request.interest_rate / 100 / 12  # Monthly rate
        tenure = request.tenure_months
        
        if rate > 0:
            emi = (principal * rate * (1 + rate) ** tenure) / ((1 + rate) ** tenure - 1)
        else:
            emi = principal / tenure
        
        debt_data = {
            "user_id": ObjectId(user_id),
            "name": request.name,
            "creditor": request.creditor,
            "principal_amount": principal,
            "remaining_amount": principal,
            "interest_rate": request.interest_rate,
            "tenure_months": tenure,
            "emi": emi,
            "total_paid": 0,
            "status": "active",
            "start_date": request.start_date,
            "next_payment_date": request.start_date,
            "notes": request.notes,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await db.debts.insert_one(debt_data)
        created = await db.debts.find_one({"_id": result.inserted_id})
        
        logger.info(f"✅ Debt created: {result.inserted_id} for user {user_id}")
        
        return DebtResponse(**{
            "_id": str(created["_id"]),
            **created
        })
        
    except Exception as e:
        logger.error(f"❌ Create debt error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create debt record"
        )

# ==================== Get All Debts ====================

@router.get("", response_model=List[DebtResponse])
async def get_all_debts(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all debts for current user"""
    try:
        debts = await db.debts.find({
            "user_id": ObjectId(user_id)
        }).sort("next_payment_date", 1).to_list(None)
        
        return [DebtResponse(**{
            "_id": str(debt["_id"]),
            **debt
        }) for debt in debts]
        
    except Exception as e:
        logger.error(f"❌ Get debts error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch debts"
        )

# ==================== Get Single Debt ====================

@router.get("/{debt_id}", response_model=DebtResponse)
async def get_debt(
    debt_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get specific debt details"""
    try:
        debt = await db.debts.find_one({
            "_id": ObjectId(debt_id),
            "user_id": ObjectId(user_id)
        })
        
        if not debt:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Debt not found"
            )
        
        return DebtResponse(**{
            "_id": str(debt["_id"]),
            **debt
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get debt error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch debt"
        )

# ==================== Update Debt ====================

@router.put("/{debt_id}", response_model=DebtResponse)
async def update_debt(
    debt_id: str,
    request: CreateDebtRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update debt details"""
    try:
        debt = await db.debts.find_one({
            "_id": ObjectId(debt_id),
            "user_id": ObjectId(user_id)
        })
        
        if not debt:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Debt not found"
            )
        
        # Recalculate EMI
        principal = request.principal_amount
        rate = request.interest_rate / 100 / 12
        tenure = request.tenure_months
        
        if rate > 0:
            emi = (principal * rate * (1 + rate) ** tenure) / ((1 + rate) ** tenure - 1)
        else:
            emi = principal / tenure
        
        update_data = {
            "name": request.name,
            "creditor": request.creditor,
            "principal_amount": principal,
            "interest_rate": request.interest_rate,
            "tenure_months": tenure,
            "emi": emi,
            "start_date": request.start_date,
            "notes": request.notes,
            "updated_at": datetime.utcnow()
        }
        
        await db.debts.update_one(
            {"_id": ObjectId(debt_id)},
            {"$set": update_data}
        )
        
        updated = await db.debts.find_one({"_id": ObjectId(debt_id)})
        
        logger.info(f"✅ Debt updated: {debt_id}")
        
        return DebtResponse(**{
            "_id": str(updated["_id"]),
            **updated
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Update debt error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update debt"
        )

# ==================== Delete Debt ====================

@router.delete("/{debt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_debt(
    debt_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Delete a debt record"""
    try:
        result = await db.debts.delete_one({
            "_id": ObjectId(debt_id),
            "user_id": ObjectId(user_id)
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Debt not found"
            )
        
        logger.info(f"✅ Debt deleted: {debt_id}")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Delete debt error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete debt"
        )

# ==================== Debt Statistics ====================

@router.get("/stats/summary", status_code=status.HTTP_200_OK)
async def get_debt_summary(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get debt summary statistics"""
    try:
        debts = await db.debts.find({
            "user_id": ObjectId(user_id)
        }).to_list(None)
        
        active_debts = [d for d in debts if d["status"] == "active"]
        completed_debts = [d for d in debts if d["status"] == "completed"]
        
        total_debt = sum(d["remaining_amount"] for d in debts)
        monthly_emi = sum(d["emi"] for d in active_debts)
        total_paid = sum(d["total_paid"] for d in debts)
        
        # Get upcoming payments
        from datetime import datetime as dt
        upcoming = []
        for debt in sorted(active_debts, key=lambda x: x["next_payment_date"]):
            upcoming.append({
                "debt_name": debt["name"],
                "emi": debt["emi"],
                "next_payment_date": debt["next_payment_date"]
            })
        
        return {
            "total_debt": total_debt,
            "active_debts_count": len(active_debts),
            "completed_debts_count": len(completed_debts),
            "monthly_emi": monthly_emi,
            "total_paid": total_paid,
            "upcoming_payments": upcoming[:5]
        }
        
    except Exception as e:
        logger.error(f"❌ Get debt summary error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch debt summary"
        )
