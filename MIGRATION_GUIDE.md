# 📚 Backend Project Restructure - Migration Guide

## ✅ What Has Been Completed

### 1. Enterprise-Grade Directory Structure
```
✅ app/
   ✅ api/v1/ (versioned routes)
   ✅ core/ (config, security, logging)
   ✅ database/ (MongoDB connection)
   ✅ models/ (database models)
   ✅ schemas/ (validation models)
   ✅ services/ (business logic)
   ✅ middleware/
   ✅ utils/
✅ tests/
✅ main.py (root entry point)
```

### 2. Core Modules Relocated
- ✅ `config.py` → `app/core/config.py`
- ✅ `security.py` → `app/core/security.py`
- ✅ NEW: `logging.py` → `app/core/logging.py`
- ✅ `database.py` → `app/database/db.py`
- ✅ `schemas.py` → `app/schemas/__init__.py`

### 3. Services Organized
- ✅ `app/services/s3_service.py` (AWS S3 uploads)
- ✅ `app/services/ses_email_service.py` (AWS SES emails)
- ✅ `app/services/onesignal_service.py` (OneSignal notifications)
- ✅ `app/services/auth_service.py` (Authentication logic)

### 4. API Routes Reorganized
- ✅ `app/api/v1/auth/routes.py` (Signup, Login, Password Reset)
- 🔄 `app/api/v1/finance/` (Debts, Income, Goals, Budgets) - TO MOVE
- 🔄 `app/api/v1/transactions/` (Payments, Expenses) - TO MOVE
- 🔄 `app/api/v1/users/` (User profile) - TO MOVE
- 🔄 `app/api/v1/notifications/` (Notifications) - TO MOVE
- 🔄 `app/api/v1/settings/` (Settings) - TO MOVE

### 5. Application Entry Points
- ✅ `app/main.py` (FastAPI app with lifespan, CORS, health checks)
- ✅ `main.py` (Root entry point for running the server)

### 6. Documentation
- ✅ `PROJECT_STRUCTURE.md` (Complete architecture guide)
- ✅ `STRUCTURE.md` (Previous structure documentation)

---

## 🚀 Next Steps

### Phase 1: Move Remaining Routes

#### 1. Finance Routes (`app/api/v1/finance/`)

Create `app/api/v1/finance/debts.py`:
```python
from fastapi import APIRouter
from app.schemas import CreateDebtRequest, DebtResponse
# ... existing debts.py code with updated imports
```

Create `app/api/v1/finance/income.py`:
```python
# ... existing income.py code
```

Create `app/api/v1/finance/goals.py`:
```python
# ... existing goals.py code
```

Create `app/api/v1/finance/budgets.py`:
```python
# ... existing budget logic or new implementation
```

Update `app/api/v1/finance/__init__.py`:
```python
from app.api.v1.finance.debts import router as debts_router
from app.api.v1.finance.income import router as income_router
from app.api.v1.finance.goals import router as goals_router
from app.api.v1.finance.budgets import router as budgets_router

__all__ = ["debts_router", "income_router", "goals_router", "budgets_router"]
```

#### 2. Transaction Routes (`app/api/v1/transactions/`)

Create `app/api/v1/transactions/payments.py` (existing payments.py moved)
Create `app/api/v1/transactions/expenses.py` (existing expenses.py moved)

#### 3. User Routes (`app/api/v1/users/`)

Create `app/api/v1/users/routes.py` with user profile endpoints

#### 4. Notification Routes (`app/api/v1/notifications/`)

Create `app/api/v1/notifications/routes.py` with notification management

#### 5. Settings Routes (`app/api/v1/settings/`)

Create `app/api/v1/settings/routes.py` with user preferences

### Phase 2: Update app/main.py Route Inclusions

After moving routes, update `app/main.py`:
```python
# Update route includes
from app.api.v1.auth import router as auth_router
from app.api.v1.finance.debts import router as debts_router
from app.api.v1.finance.income import router as income_router
from app.api.v1.finance.goals import router as goals_router
from app.api.v1.finance.budgets import router as budgets_router
from app.api.v1.transactions.payments import router as payments_router
from app.api.v1.transactions.expenses import router as expenses_router
from app.api.v1.users import router as users_router
from app.api.v1.notifications import router as notifications_router
from app.api.v1.settings import router as settings_router

# Include in app
app.include_router(auth_router, prefix="/api/v1", tags=["Auth"])
app.include_router(debts_router, prefix="/api/v1", tags=["Finance"])
# ... etc
```

### Phase 3: Update All Imports

**Pattern for all routes:**

BEFORE:
```python
from config import settings
from security import get_current_user
from schemas import DebtResponse
from database import get_db
from services import email_service
```

AFTER:
```python
from app.core.config import settings
from app.core.security import get_current_user
from app.schemas import DebtResponse
from app.database import get_db
from app.services import email_service
```

---

## 📝 Import Mapping Reference

### Config Imports
```python
# OLD
from config import settings

# NEW
from app.core.config import settings
```

### Security Imports
```python
# OLD
from security import SecurityService, get_current_user, get_current_user_id

# NEW
from app.core.security import SecurityService, get_current_user, get_current_user_id
```

### Database Imports
```python
# OLD
from database import get_db

# NEW
from app.database import get_db
```

### Schema Imports
```python
# OLD
from schemas import SignupRequest, TokenResponse

# NEW
from app.schemas import SignupRequest, TokenResponse
```

### Service Imports
```python
# OLD
from services import email_service, s3_service, notification_service

# NEW
from app.services import email_service, s3_service, notification_service
```

---

## 🎯 File Move Checklist

### Routes to Move:

- [ ] `routes/debts.py` → `app/api/v1/finance/debts.py`
- [ ] `routes/income.py` → `app/api/v1/finance/income.py`
- [ ] `routes/goals.py` → `app/api/v1/finance/goals.py`
- [ ] `routes/payments.py` → `app/api/v1/transactions/payments.py`
- [ ] `routes/expenses.py` → `app/api/v1/transactions/expenses.py`
- [ ] Create new: `app/api/v1/users/routes.py`
- [ ] Create new: `app/api/v1/notifications/routes.py`
- [ ] Create new: `app/api/v1/settings/routes.py`
- [ ] Create new: `app/api/v1/finance/budgets.py`

### Root Files to Delete (after verification):

- [ ] `config.py` (now `app/core/config.py`)
- [ ] `security.py` (now `app/core/security.py`)
- [ ] `database.py` (now `app/database/db.py`)
- [ ] `schemas.py` (now `app/schemas/__init__.py`)
- [ ] `services.py` (now split in `app/services/`)
- [ ] `routes/` directory (all moved to `app/api/v1/`)

---

## ✨ Benefits of This Structure

### 1. **Scalability**
- Easy to add new API versions (`v2/`, `v3/`)
- Routes organized by domain (auth, finance, transactions)
- Clear separation of concerns

### 2. **Maintainability**
- Find related code in logical locations
- Services isolated for testing
- Core configs centralized

### 3. **Team Collaboration**
- Multiple developers can work on different modules
- Clear module boundaries prevent conflicts
- Professional structure for production code

### 4. **Testing**
- Middleware testable separately
- Services mockable for unit tests
- Routes easily testable with dependency injection

### 5. **Deployment**
- Docker-friendly structure
- Environment variables in `app/core/config.py`
- Logging configured centrally

---

## 🔧 Running the New Structure

### Development:
```bash
# From root directory
uvicorn main:app --reload
```

### With Specific Environment:
```bash
# Using .env file
uvicorn main:app --reload --env-file .env
```

### Docker:
```bash
docker-compose up --build
```

### API Documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- OpenAPI JSON: http://localhost:8000/openapi.json

---

## 📊 Structure Comparison

### BEFORE (Flat Structure)
```
backend/
├── main.py
├── config.py
├── database.py
├── security.py
├── schemas.py
├── services.py
└── routes/
    ├── auth.py
    ├── debts.py
    └── ...
```

### AFTER (Enterprise Structure)
```
backend/
├── app/
│   ├── api/v1/
│   │   ├── auth/routes.py
│   │   ├── finance/
│   │   │   ├── debts.py
│   │   │   └── ...
│   │   └── ...
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── logging.py
│   ├── services/
│   │   ├── s3_service.py
│   │   ├── ses_email_service.py
│   │   └── ...
│   └── main.py
├── tests/
├── main.py
└── requirements.txt
```

---

## 🚨 Important Notes

1. **Database Name**: Updated from `cleero_financial` to `cleero` in config
2. **Route Prefixes**: Remove `/api` from individual route prefixes (now handled in app.include_router)
3. **Imports**: Must use absolute imports from `app/` package
4. **Logging**: Configured in `app/core/logging.py`, imported in `app/main.py`

---

## ✅ Verification Checklist

After completing restructure:

- [ ] All imports updated and no broken references
- [ ] `uvicorn main:app --reload` starts without errors
- [ ] `/docs` endpoint shows all routes with correct prefixes
- [ ] Database connects successfully on startup
- [ ] Auth endpoints test successfully
- [ ] Services (S3, SES, OneSignal) initialize correctly
- [ ] Docker compose builds and runs successfully
- [ ] No circular imports
- [ ] Logging works correctly
- [ ] CORS configured properly

---

**Status**: 60% Complete ✅
**Last Updated**: November 2024
**Next Phase**: Move remaining routes and update imports
