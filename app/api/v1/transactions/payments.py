"""
Payment processing routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
from typing import List
from bson import ObjectId
import uuid
from app.schemas import MakePaymentRequest, PaymentResponse
from app.core.security import get_current_user_id
from app.database import get_db
from app.services import notification_service, email_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/payments", tags=["Payments"])

# ==================== Make Payment ====================

@router.post("", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
async def make_payment(
    request: MakePaymentRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Make payment for a debt"""
    try:
        # Get debt details
        debt = await db.debts.find_one({
            "_id": ObjectId(request.debt_id),
            "user_id": ObjectId(user_id)
        })
        
        if not debt:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Debt not found"
            )
        
        # Validate payment amount
        if request.amount <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment amount must be greater than 0"
            )
        
        if request.amount > debt["remaining_amount"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Payment amount exceeds remaining debt (₹{debt['remaining_amount']})"
            )
        
        # Generate transaction ID
        transaction_id = str(uuid.uuid4())
        
        # Create payment record
        payment_data = {
            "user_id": ObjectId(user_id),
            "debt_id": ObjectId(request.debt_id),
            "amount": request.amount,
            "payment_method": request.payment_method,
            "payment_date": request.payment_date,
            "status": "completed",
            "reference_number": request.reference_number,
            "transaction_id": transaction_id,
            "notes": request.notes,
            "created_at": datetime.utcnow()
        }
        
        result = await db.payments.insert_one(payment_data)
        
        # Update debt
        new_remaining = debt["remaining_amount"] - request.amount
        new_total_paid = debt["total_paid"] + request.amount
        
        # Calculate next payment date (30 days from now)
        next_payment_date = datetime.utcnow() + timedelta(days=30)
        
        # Update debt record
        await db.debts.update_one(
            {"_id": ObjectId(request.debt_id)},
            {"$set": {
                "remaining_amount": new_remaining,
                "total_paid": new_total_paid,
                "next_payment_date": next_payment_date,
                "updated_at": datetime.utcnow()
            }}
        )
        
        # Check if debt is fully paid
        if new_remaining <= 0:
            await db.debts.update_one(
                {"_id": ObjectId(request.debt_id)},
                {"$set": {
                    "status": "completed",
                    "remaining_amount": 0
                }}
            )
        
        # Get user for notifications
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        
        # Send notifications
        await notification_service.send_notification(
            user_id=user_id,
            title="Payment Successful ✅",
            message=f"₹{request.amount:,.0f} payment processed for {debt['name']}",
            notification_type="payment_completed"
        )
        
        # Send email confirmation
        await email_service.send_email(
            to_email=user["email"],
            subject=f"Payment Confirmation - {debt['name']}",
            html_content=f"""
            <html>
            <body>
                <h2>Payment Confirmed ✅</h2>
                <p>Your payment has been processed successfully.</p>
                <p>
                    <strong>Amount:</strong> ₹{request.amount:,.2f}<br/>
                    <strong>Debt:</strong> {debt['name']}<br/>
                    <strong>Transaction ID:</strong> {transaction_id}<br/>
                    <strong>Payment Method:</strong> {request.payment_method.replace('_', ' ').title()}<br/>
                    <strong>Date:</strong> {request.payment_date.strftime('%d-%m-%Y')}
                </p>
                <p>Remaining Amount: ₹{new_remaining:,.2f}</p>
            </body>
            </html>
            """
        )
        
        logger.info(f"✅ Payment processed: {transaction_id} for debt {request.debt_id}")
        
        return PaymentResponse(**{
            "_id": str(result.inserted_id),
            **payment_data
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Payment processing error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Payment processing failed"
        )

# ==================== Get All Payments ====================

@router.get("", response_model=List[PaymentResponse])
async def get_all_payments(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all payments for current user"""
    try:
        payments = await db.payments.find({
            "user_id": ObjectId(user_id)
        }).sort("created_at", -1).to_list(None)
        
        return [PaymentResponse(**{
            "_id": str(payment["_id"]),
            **payment
        }) for payment in payments]
        
    except Exception as e:
        logger.error(f"❌ Get payments error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch payments"
        )

# ==================== Get Payments for Debt ====================

@router.get("/debt/{debt_id}", response_model=List[PaymentResponse])
async def get_debt_payments(
    debt_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all payments for a specific debt"""
    try:
        # Verify debt belongs to user
        debt = await db.debts.find_one({
            "_id": ObjectId(debt_id),
            "user_id": ObjectId(user_id)
        })
        
        if not debt:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Debt not found"
            )
        
        payments = await db.payments.find({
            "debt_id": ObjectId(debt_id)
        }).sort("created_at", -1).to_list(None)
        
        return [PaymentResponse(**{
            "_id": str(payment["_id"]),
            **payment
        }) for payment in payments]
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get debt payments error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch debt payments"
        )

# ==================== Get Payment Statistics ====================

@router.get("/stats/monthly", status_code=status.HTTP_200_OK)
async def get_monthly_payment_stats(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get monthly payment statistics"""
    try:
        now = datetime.utcnow()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_end = month_start + timedelta(days=32)
        month_end = month_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        payments = await db.payments.find({
            "user_id": ObjectId(user_id),
            "payment_date": {
                "$gte": month_start,
                "$lt": month_end
            }
        }).to_list(None)
        
        total_paid = sum(payment["amount"] for payment in payments)
        payment_count = len(payments)
        
        return {
            "month": now.strftime("%B %Y"),
            "total_paid": total_paid,
            "payment_count": payment_count,
            "average_payment": total_paid / payment_count if payment_count > 0 else 0
        }
        
    except Exception as e:
        logger.error(f"❌ Get payment stats error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch payment statistics"
        )
