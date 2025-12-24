"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# ==================== Authentication Models ====================

class SignupRequest(BaseModel):
    """User signup request"""
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str
    phone: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "SecurePass123!",
                "full_name": "John Doe",
                "phone": "+91 98765 43210"
            }
        }

class LoginRequest(BaseModel):
    """User login request"""
    email: EmailStr
    password: str

class PasswordResetRequest(BaseModel):
    """Password reset request"""
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    """Password reset confirmation with new password"""
    reset_token: str
    new_password: str = Field(..., min_length=8)

class TokenResponse(BaseModel):
    """JWT Token response"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int

# ==================== User Models ====================

class UserProfile(BaseModel):
    """User profile data"""
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pin_code: Optional[str] = None
    profile_image_url: Optional[str] = None
    preferred_currency: str = "INR"

class UserResponse(BaseModel):
    """User response model"""
    id: str = Field(..., alias="_id")
    email: str
    full_name: str
    phone: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    profile: Optional[UserProfile] = None
    is_active: bool = True

    class Config:
        from_attributes = True
        populate_by_name = True

# ==================== Debt Models ====================

class DebtType(str, Enum):
    """Types of debts"""
    HOME_LOAN = "home_loan"
    CAR_LOAN = "car_loan"
    CREDIT_CARD = "credit_card"
    PERSONAL_LOAN = "personal_loan"
    EDUCATION_LOAN = "education_loan"
    OTHER = "other"

class CreateDebtRequest(BaseModel):
    """Create debt request"""
    name: str
    debt_type: DebtType
    principal: float = Field(..., gt=0)
    interest_rate: float = Field(..., ge=0)
    tenure_months: int = Field(..., gt=0)
    monthly_emi: float = Field(..., gt=0)
    bank_name: str
    account_number: Optional[str] = None
    start_date: datetime
    notes: Optional[str] = None

class DebtResponse(BaseModel):
    """Debt response model"""
    id: str = Field(..., alias="_id")
    user_id: str
    name: str
    debt_type: DebtType
    principal: float
    interest_rate: float
    tenure_months: int
    monthly_emi: float
    remaining_amount: float
    total_paid: float
    bank_name: str
    account_number: Optional[str] = None
    start_date: datetime
    next_payment_date: datetime
    status: str = "active"
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# ==================== Income Models ====================

class IncomeType(str, Enum):
    """Types of income"""
    SALARY = "salary"
    FREELANCE = "freelance"
    BUSINESS = "business"
    INVESTMENT = "investment"
    BONUS = "bonus"
    OTHER = "other"

class CreateIncomeRequest(BaseModel):
    """Create income request"""
    title: str
    income_type: IncomeType
    amount: float = Field(..., gt=0)
    source: str
    frequency: str = "monthly"
    date: datetime
    notes: Optional[str] = None

class IncomeResponse(BaseModel):
    """Income response model"""
    id: str = Field(..., alias="_id")
    user_id: str
    title: str
    income_type: IncomeType
    amount: float
    source: str
    frequency: str
    date: datetime
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# ==================== Expense Models ====================

class ExpenseCategory(str, Enum):
    """Expense categories"""
    GROCERIES = "groceries"
    UTILITIES = "utilities"
    ENTERTAINMENT = "entertainment"
    FOOD = "food"
    TRANSPORT = "transport"
    HEALTHCARE = "healthcare"
    SHOPPING = "shopping"
    EDUCATION = "education"
    OTHER = "other"

class CreateExpenseRequest(BaseModel):
    """Create expense request"""
    title: str
    category: ExpenseCategory
    amount: float = Field(..., gt=0)
    date: datetime
    description: Optional[str] = None
    receipt_url: Optional[str] = None
    tags: Optional[List[str]] = None

class ExpenseResponse(BaseModel):
    """Expense response model"""
    id: str = Field(..., alias="_id")
    user_id: str
    title: str
    category: ExpenseCategory
    amount: float
    date: datetime
    description: Optional[str] = None
    receipt_url: Optional[str] = None
    tags: Optional[List[str]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# ==================== Payment Models ====================

class PaymentMethod(str, Enum):
    """Payment methods"""
    DEBIT_CARD = "debit_card"
    CREDIT_CARD = "credit_card"
    NET_BANKING = "net_banking"
    UPI = "upi"
    WALLET = "wallet"

class MakePaymentRequest(BaseModel):
    """Make payment request"""
    debt_id: str
    amount: float = Field(..., gt=0)
    payment_method: PaymentMethod
    payment_date: datetime
    reference_number: Optional[str] = None
    notes: Optional[str] = None

class PaymentResponse(BaseModel):
    """Payment response model"""
    id: str = Field(..., alias="_id")
    user_id: str
    debt_id: str
    amount: float
    payment_method: PaymentMethod
    payment_date: datetime
    status: str = "completed"
    reference_number: Optional[str] = None
    transaction_id: str
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# ==================== Goal Models ====================

class GoalType(str, Enum):
    """Types of financial goals"""
    EMERGENCY_FUND = "emergency_fund"
    VACATION = "vacation"
    HOME_PURCHASE = "home_purchase"
    CAR_PURCHASE = "car_purchase"
    EDUCATION = "education"
    RETIREMENT = "retirement"
    WEDDING = "wedding"
    OTHER = "other"

class CreateGoalRequest(BaseModel):
    """Create goal request"""
    title: str
    goal_type: GoalType
    target_amount: float = Field(..., gt=0)
    current_amount: float = Field(default=0, ge=0)
    target_date: datetime
    priority: str = "medium"
    description: Optional[str] = None

class GoalResponse(BaseModel):
    """Goal response model"""
    id: str = Field(..., alias="_id")
    user_id: str
    title: str
    goal_type: GoalType
    target_amount: float
    current_amount: float
    target_date: datetime
    priority: str
    progress_percentage: float
    description: Optional[str] = None
    status: str = "active"
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# ==================== Notification Models ====================

class NotificationType(str, Enum):
    """Notification types"""
    PAYMENT_DUE = "payment_due"
    PAYMENT_REMINDER = "payment_reminder"
    GOAL_MILESTONE = "goal_milestone"
    EXPENSE_ALERT = "expense_alert"
    INCOME_RECEIVED = "income_received"
    SYSTEM = "system"

class NotificationResponse(BaseModel):
    """Notification response model"""
    id: str = Field(..., alias="_id")
    user_id: str
    title: str
    message: str
    notification_type: NotificationType
    is_read: bool = False
    action_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# ==================== Budget Models ====================

class CreateBudgetRequest(BaseModel):
    """Create budget request"""
    category: ExpenseCategory
    monthly_limit: float = Field(..., gt=0)
    alert_threshold: float = Field(default=80, ge=0, le=100)
    active: bool = True

class BudgetResponse(BaseModel):
    """Budget response model"""
    id: str = Field(..., alias="_id")
    user_id: str
    category: ExpenseCategory
    monthly_limit: float
    spent_this_month: float
    remaining: float
    alert_threshold: float
    active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# ==================== Report Models ====================

class DashboardStatsResponse(BaseModel):
    """Dashboard statistics response"""
    total_debt: float
    monthly_emi: float
    total_income_this_month: float
    total_expenses_this_month: float
    savings_this_month: float
    active_goals: int
    completed_goals: int
    upcoming_payments_count: int

class MonthlyReportResponse(BaseModel):
    """Monthly report response"""
    month: str
    income: float
    expenses: float
    savings: float
    expense_breakdown: dict
    top_expenses: List[dict]

# ==================== Error Models ====================

class ErrorResponse(BaseModel):
    """Error response model"""
    error: str
    message: str
    status_code: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ValidationErrorResponse(BaseModel):
    """Validation error response"""
    errors: List[dict]
    status_code: int = 422

# ==================== User Update Models ====================

class UpdateUserRequest(BaseModel):
    """Update user profile request"""
    full_name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

    class Config:
        from_attributes = True
        populate_by_name = True
