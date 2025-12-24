"""
Financial goals management routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from typing import List
from bson import ObjectId
from app.schemas import CreateGoalRequest, GoalResponse, GoalType
from app.core.security import get_current_user_id
from app.database import get_db
from app.services import notification_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/goals", tags=["Goals"])

# ==================== Create Goal ====================

@router.post("", response_model=GoalResponse, status_code=status.HTTP_201_CREATED)
async def create_goal(
    request: CreateGoalRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Create a new financial goal"""
    try:
        # Calculate progress percentage
        progress = (request.current_amount / request.target_amount * 100) if request.target_amount > 0 else 0
        
        goal_data = {
            "user_id": ObjectId(user_id),
            "title": request.title,
            "goal_type": request.goal_type,
            "target_amount": request.target_amount,
            "current_amount": request.current_amount,
            "target_date": request.target_date,
            "priority": request.priority,
            "progress_percentage": progress,
            "description": request.description,
            "status": "active",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await db.goals.insert_one(goal_data)
        created = await db.goals.find_one({"_id": result.inserted_id})
        
        logger.info(f"✅ Goal created: {result.inserted_id} for user {user_id}")
        
        return GoalResponse(**{
            "_id": str(created["_id"]),
            **created
        })
        
    except Exception as e:
        logger.error(f"❌ Create goal error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create goal"
        )

# ==================== Get All Goals ====================

@router.get("", response_model=List[GoalResponse])
async def get_all_goals(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all financial goals for user"""
    try:
        goals = await db.goals.find({
            "user_id": ObjectId(user_id)
        }).sort("target_date", 1).to_list(None)
        
        return [GoalResponse(**{
            "_id": str(goal["_id"]),
            **goal
        }) for goal in goals]
        
    except Exception as e:
        logger.error(f"❌ Get goals error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch goals"
        )

# ==================== Get Single Goal ====================

@router.get("/{goal_id}", response_model=GoalResponse)
async def get_goal(
    goal_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get specific goal details"""
    try:
        goal = await db.goals.find_one({
            "_id": ObjectId(goal_id),
            "user_id": ObjectId(user_id)
        })
        
        if not goal:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Goal not found"
            )
        
        return GoalResponse(**{
            "_id": str(goal["_id"]),
            **goal
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Get goal error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch goal"
        )

# ==================== Update Goal ====================

@router.put("/{goal_id}", response_model=GoalResponse)
async def update_goal(
    goal_id: str,
    request: CreateGoalRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update goal details"""
    try:
        goal = await db.goals.find_one({
            "_id": ObjectId(goal_id),
            "user_id": ObjectId(user_id)
        })
        
        if not goal:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Goal not found"
            )
        
        # Calculate progress percentage
        progress = (request.current_amount / request.target_amount * 100) if request.target_amount > 0 else 0
        
        update_data = {
            "title": request.title,
            "goal_type": request.goal_type,
            "target_amount": request.target_amount,
            "current_amount": request.current_amount,
            "target_date": request.target_date,
            "priority": request.priority,
            "progress_percentage": progress,
            "description": request.description,
            "updated_at": datetime.utcnow()
        }
        
        await db.goals.update_one(
            {"_id": ObjectId(goal_id)},
            {"$set": update_data}
        )
        
        updated = await db.goals.find_one({"_id": ObjectId(goal_id)})
        
        logger.info(f"✅ Goal updated: {goal_id}")
        
        return GoalResponse(**{
            "_id": str(updated["_id"]),
            **updated
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Update goal error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update goal"
        )

# ==================== Contribute to Goal ====================

@router.post("/{goal_id}/contribute", response_model=GoalResponse)
async def contribute_to_goal(
    goal_id: str,
    amount: float,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Contribute amount to goal"""
    try:
        goal = await db.goals.find_one({
            "_id": ObjectId(goal_id),
            "user_id": ObjectId(user_id)
        })
        
        if not goal:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Goal not found"
            )
        
        if goal["status"] != "active":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot contribute to inactive goal"
            )
        
        # Update goal amount
        new_amount = goal["current_amount"] + amount
        new_progress = (new_amount / goal["target_amount"] * 100) if goal["target_amount"] > 0 else 0
        
        # Check if goal completed
        new_status = "completed" if new_amount >= goal["target_amount"] else "active"
        
        await db.goals.update_one(
            {"_id": ObjectId(goal_id)},
            {"$set": {
                "current_amount": new_amount,
                "progress_percentage": new_progress,
                "status": new_status,
                "updated_at": datetime.utcnow()
            }}
        )
        
        updated = await db.goals.find_one({"_id": ObjectId(goal_id)})
        
        # Send milestone notifications
        milestones = [25, 50, 75, 100]
        if int(new_progress) in milestones:
            await notification_service.send_goal_milestone_notification(
                user_id=user_id,
                goal_name=goal["title"],
                progress=int(new_progress)
            )
        
        logger.info(f"✅ Contribution added to goal {goal_id}: ₹{amount}")
        
        return GoalResponse(**{
            "_id": str(updated["_id"]),
            **updated
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Contribute to goal error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to contribute to goal"
        )

# ==================== Delete Goal ====================

@router.delete("/{goal_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_goal(
    goal_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Delete a goal"""
    try:
        result = await db.goals.delete_one({
            "_id": ObjectId(goal_id),
            "user_id": ObjectId(user_id)
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Goal not found"
            )
        
        logger.info(f"✅ Goal deleted: {goal_id}")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Delete goal error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete goal"
        )

# ==================== Goal Summary ====================

@router.get("/summary/all", status_code=status.HTTP_200_OK)
async def get_goal_summary(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get summary of all goals"""
    try:
        goals = await db.goals.find({
            "user_id": ObjectId(user_id)
        }).to_list(None)
        
        active_goals = [g for g in goals if g["status"] == "active"]
        completed_goals = [g for g in goals if g["status"] == "completed"]
        
        total_target = sum(g["target_amount"] for g in goals)
        total_current = sum(g["current_amount"] for g in goals)
        
        return {
            "total_goals": len(goals),
            "active_goals": len(active_goals),
            "completed_goals": len(completed_goals),
            "total_target_amount": total_target,
            "total_contributed": total_current,
            "overall_progress": (total_current / total_target * 100) if total_target > 0 else 0
        }
        
    except Exception as e:
        logger.error(f"❌ Get goal summary error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch goal summary"
        )
