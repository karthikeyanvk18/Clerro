"""
Dashboard aggregation routes - provides comprehensive financial overview
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
from bson import ObjectId
from app.core.security import get_current_user_id
from app.database import get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

# ==================== Get Dashboard Overview ====================

@router.get("/overview", status_code=status.HTTP_200_OK)
async def get_dashboard_overview(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get complete dashboard overview with all KPIs"""
    try:
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Get all financial data
        debts = await db.debts.find({"user_id": ObjectId(user_id)}).to_list(None)
        income_records = await db.income.find({"user_id": ObjectId(user_id)}).to_list(None)
        expenses = await db.expenses.find({"user_id": ObjectId(user_id)}).to_list(None)
        goals = await db.goals.find({"user_id": ObjectId(user_id)}).to_list(None)
        payments = await db.payments.find({"user_id": ObjectId(user_id)}).to_list(None)
        
        # Get current month data
        now = datetime.utcnow()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_end = month_start + timedelta(days=32)
        month_end = month_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        current_month_income = [i for i in income_records if month_start <= i["date"] < month_end]
        current_month_expenses = [e for e in expenses if month_start <= e["date"] < month_end]
        current_month_payments = [p for p in payments if month_start <= p["payment_date"] < month_end]
        
        # Calculate metrics
        total_debt = sum(d["remaining_amount"] for d in debts)
        active_debts = [d for d in debts if d["status"] == "active"]
        completed_debts = [d for d in debts if d["status"] == "completed"]
        
        monthly_income = sum(i["amount"] for i in current_month_income)
        monthly_expenses = sum(e["amount"] for e in current_month_expenses)
        monthly_payments = sum(p["amount"] for p in current_month_payments)
        monthly_savings = monthly_income - monthly_expenses
        
        # Get upcoming EMIs
        upcoming_emis = sorted(active_debts, key=lambda x: x["next_payment_date"])[:5]
        
        # Goals progress
        active_goals = [g for g in goals if g["status"] == "active"]
        completed_goals = [g for g in goals if g["status"] == "completed"]
        
        total_goal_amount = sum(g["target_amount"] for g in goals)
        total_contributed = sum(g["current_amount"] for g in goals)
        
        # Calculate ratios
        emi_to_income = (sum(d["emi"] for d in active_debts) / monthly_income * 100) if monthly_income > 0 else 0
        debt_to_income = (total_debt / (monthly_income * 12) * 100) if monthly_income > 0 else 0
        
        return {
            "user_name": user.get("full_name", "User"),
            "user_email": user.get("email"),
            
            # Debt Metrics
            "debt": {
                "total_debt": total_debt,
                "active_debts_count": len(active_debts),
                "completed_debts_count": len(completed_debts),
                "monthly_emi": sum(d["emi"] for d in active_debts),
                "upcoming_payments": [
                    {
                        "id": str(d["_id"]),
                        "name": d["name"],
                        "emi": d["emi"],
                        "next_payment_date": d["next_payment_date"],
                        "remaining_amount": d["remaining_amount"]
                    }
                    for d in upcoming_emis
                ]
            },
            
            # Income Metrics
            "income": {
                "monthly_income": monthly_income,
                "total_income_records": len(income_records),
                "by_type": _group_by_type(current_month_income, "income_type")
            },
            
            # Expense Metrics
            "expenses": {
                "monthly_expenses": monthly_expenses,
                "monthly_savings": monthly_savings,
                "savings_rate": (monthly_savings / monthly_income * 100) if monthly_income > 0 else 0,
                "total_expense_records": len(expenses),
                "by_category": _group_by_category(current_month_expenses)
            },
            
            # Payment Metrics
            "payments": {
                "monthly_payments": monthly_payments,
                "total_payments_made": len(payments)
            },
            
            # Goals Metrics
            "goals": {
                "active_goals_count": len(active_goals),
                "completed_goals_count": len(completed_goals),
                "total_goal_target": total_goal_amount,
                "total_contributed": total_contributed,
                "overall_progress": (total_contributed / total_goal_amount * 100) if total_goal_amount > 0 else 0
            },
            
            # Financial Health Ratios
            "financial_health": {
                "emi_to_income_ratio": emi_to_income,
                "debt_to_income_ratio": debt_to_income,
                "savings_rate": (monthly_savings / monthly_income * 100) if monthly_income > 0 else 0,
                "health_score": _calculate_health_score(
                    emi_to_income, 
                    debt_to_income, 
                    (monthly_savings / monthly_income * 100) if monthly_income > 0 else 0
                )
            },
            
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get dashboard overview error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch dashboard overview"
        )

# ==================== Get Monthly Summary ====================

@router.get("/monthly-summary", status_code=status.HTTP_200_OK)
async def get_monthly_summary(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get summary for current month"""
    try:
        now = datetime.utcnow()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_end = month_start + timedelta(days=32)
        month_end = month_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        income_records = await db.income.find({
            "user_id": ObjectId(user_id),
            "date": {"$gte": month_start, "$lt": month_end}
        }).to_list(None)
        
        expenses = await db.expenses.find({
            "user_id": ObjectId(user_id),
            "date": {"$gte": month_start, "$lt": month_end}
        }).to_list(None)
        
        payments = await db.payments.find({
            "user_id": ObjectId(user_id),
            "payment_date": {"$gte": month_start, "$lt": month_end}
        }).to_list(None)
        
        total_income = sum(i["amount"] for i in income_records)
        total_expenses = sum(e["amount"] for e in expenses)
        total_payments = sum(p["amount"] for p in payments)
        
        return {
            "month": now.strftime("%B %Y"),
            "income": total_income,
            "expenses": total_expenses,
            "payments": total_payments,
            "savings": total_income - total_expenses,
            "savings_rate": ((total_income - total_expenses) / total_income * 100) if total_income > 0 else 0
        }
        
    except Exception as e:
        logger.error(f"❌ Get monthly summary error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch monthly summary"
        )

# ==================== Helper Methods ====================

def _group_by_type(records: list, key: str) -> dict:
    """Group records by type"""
    result = {}
    for record in records:
        record_type = record.get(key)
        if record_type:
            result[record_type] = result.get(record_type, 0) + record.get("amount", 0)
    return result

def _group_by_category(records: list) -> dict:
    """Group expenses by category"""
    result = {}
    for record in records:
        category = record.get("category")
        if category:
            result[category] = result.get(category, 0) + record.get("amount", 0)
    return result

def _calculate_health_score(emi_ratio: float, debt_ratio: float, savings_rate: float) -> int:
    """Calculate overall financial health score (0-100)"""
    score = 100
    
    # Deduct for high EMI ratio
    if emi_ratio > 40:
        score -= 30
    elif emi_ratio > 30:
        score -= 15
    
    # Deduct for high debt ratio
    if debt_ratio > 50:
        score -= 25
    elif debt_ratio > 30:
        score -= 12
    
    # Add for good savings rate
    if savings_rate > 20:
        score += 20
    elif savings_rate > 10:
        score += 10
    
    return max(0, min(100, score))
