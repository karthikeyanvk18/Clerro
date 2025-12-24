"""
Authentication routes - Signup, Login, Password Reset
"""
from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
from app.schemas import (
    SignupRequest, LoginRequest, TokenResponse, PasswordResetRequest,
    UserResponse, PasswordResetConfirm
)
from app.core.security import SecurityService, get_current_user
from app.services import email_service
from app.database import get_db
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])

# ==================== Signup ====================

@router.post("/signup", response_model=TokenResponse)
async def signup(request: SignupRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """
    User signup endpoint
    
    - **email**: User email (must be unique)
    - **password**: Password (min 8 characters)
    - **full_name**: Full name of the user
    - **phone**: Optional phone number
    """
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": request.email.lower()})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash password
        hashed_password = SecurityService.hash_password(request.password)
        
        # Create user document
        user_data = {
            "email": request.email.lower(),
            "password": hashed_password,
            "full_name": request.full_name,
            "phone": request.phone,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True,
            "profile": {
                "full_name": request.full_name,
                "email": request.email,
                "phone": request.phone,
                "preferred_currency": "INR"
            }
        }
        
        # Insert user
        result = await db.users.insert_one(user_data)
        user_id = str(result.inserted_id)
        
        # Create tokens
        tokens = SecurityService.create_tokens(user_id, request.email)
        
        # Send welcome email
        await email_service.send_signup_welcome_email(request.email, request.full_name)
        
        logger.info(f"✅ New user registered: {request.email}")
        
        return TokenResponse(
            access_token=tokens["access_token"],
            refresh_token=tokens["refresh_token"],
            expires_in=tokens["expires_in"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Signup error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Signup failed"
        )

# ==================== Login ====================

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """
    User login endpoint
    
    - **email**: User email
    - **password**: User password
    """
    try:
        # Find user
        user = await db.users.find_one({"email": request.email.lower()})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Verify password
        if not SecurityService.verify_password(request.password, user["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Create tokens
        user_id = str(user["_id"])
        tokens = SecurityService.create_tokens(user_id, request.email)
        
        logger.info(f"✅ User logged in: {request.email}")
        
        return TokenResponse(
            access_token=tokens["access_token"],
            refresh_token=tokens["refresh_token"],
            expires_in=tokens["expires_in"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )

# ==================== Get Current User ====================

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: dict = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get current authenticated user's profile"""
    try:
        user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return UserResponse(**{
            "_id": str(user["_id"]),
            "email": user["email"],
            "full_name": user["full_name"],
            "phone": user.get("phone"),
            "created_at": user["created_at"],
            "updated_at": user["updated_at"],
            "profile": user.get("profile"),
            "is_active": user.get("is_active", True)
        })
        
    except Exception as e:
        logger.error(f"❌ Get current user error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch user"
        )

# ==================== Password Reset ====================

@router.post("/password-reset-request")
async def request_password_reset(
    request: PasswordResetRequest,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Request password reset - sends reset link to email"""
    try:
        user = await db.users.find_one({"email": request.email.lower()})
        
        if not user:
            # Don't reveal if email exists
            return {"message": "If email exists, reset link has been sent"}
        
        # Create reset token
        user_id = str(user["_id"])
        reset_token = SecurityService.create_token(
            data={"sub": user_id, "type": "password_reset"},
            expires_delta=None  # 15 minutes default
        )
        
        # Save reset token to database
        await db.password_resets.insert_one({
            "user_id": ObjectId(user_id),
            "token": reset_token,
            "created_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + timedelta(hours=1),
            "used": False
        })
        
        # Send email with reset link
        reset_link = f"http://localhost:3000/reset-password?token={reset_token}"
        await email_service.send_password_reset_email(request.email, reset_link)
        
        logger.info(f"✅ Password reset requested for: {request.email}")
        
        return {"message": "If email exists, reset link has been sent"}
        
    except Exception as e:
        logger.error(f"❌ Password reset request error: {str(e)}")
        return {"message": "If email exists, reset link has been sent"}

# ==================== Password Reset Confirm ====================

@router.post("/password-reset-confirm")
async def confirm_password_reset(
    request: PasswordResetConfirm,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Confirm password reset with new password"""
    try:
        # Verify token
        user_data = SecurityService.verify_token(request.reset_token)
        user_id = user_data["user_id"]
        
        # Check if reset token is valid and not used
        reset_record = await db.password_resets.find_one({
            "user_id": ObjectId(user_id),
            "token": request.reset_token,
            "used": False,
            "expires_at": {"$gt": datetime.utcnow()}
        })
        
        if not reset_record:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token"
            )
        
        # Hash new password
        hashed_password = SecurityService.hash_password(request.new_password)
        
        # Update user password
        await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {
                "password": hashed_password,
                "updated_at": datetime.utcnow()
            }}
        )
        
        # Mark reset token as used
        await db.password_resets.update_one(
            {"_id": reset_record["_id"]},
            {"$set": {"used": True}}
        )
        
        logger.info(f"✅ Password reset confirmed for user: {user_id}")
        
        return {"message": "Password reset successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Password reset confirm error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Password reset failed"
        )
