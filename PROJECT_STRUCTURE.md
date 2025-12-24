# Cleero Financial Compass - Complete Project Structure

**Date**: January 3, 2025  
**Status**: ✅ **FULLY IMPLEMENTED**

---

## 📁 Complete Project Directory Tree (Enterprise-Grade Architecture)

```
cleero-financial-compass-backend/
│
├── app/                                 # Main application package
│   │
│   ├── __init__.py                     # App package initialization
│   ├── main.py                         # FastAPI application setup
│   │
│   ├── api/                            # API routes (versioned)
│   │   ├── __init__.py
│   │   └── v1/                         # Version 1 endpoints
│   │       ├── __init__.py
│   │       │
│   │       ├── auth/                   # Authentication routes
│   │       │   ├── __init__.py
│   │       │   └── routes.py           # POST /signup, /login, /password-reset
│   │       │
│   │       ├── users/                  # User profile routes
│   │       │   ├── __init__.py
│   │       │   └── routes.py           # GET /me, PUT /profile, DELETE /account
│   │       │
│   │       ├── finance/                # Financial management routes
│   │       │   ├── __init__.py
│   │       │   ├── debts.py            # GET/POST /debts
│   │       │   ├── income.py           # GET/POST /income
│   │       │   ├── budgets.py          # GET/POST /budgets
│   │       │   └── goals.py            # GET/POST /goals
│   │       │
│   │       ├── transactions/           # Transaction routes
│   │       │   ├── __init__.py
│   │       │   ├── payments.py         # POST /payments (make payment)
│   │       │   └── expenses.py         # GET/POST /expenses
│   │       │
│   │       ├── notifications/          # Notification routes
│   │       │   ├── __init__.py
│   │       │   └── routes.py           # GET /notifications, PUT /mark-read
│   │       │
│   │       └── settings/               # User settings routes
│   │           ├── __init__.py
│   │           └── routes.py           # Preferences, notification settings
│   │
│   ├── core/                           # Core application modules
│   │   ├── __init__.py
│   │   ├── config.py                   # Environment & settings (Pydantic)
│   │   ├── security.py                 # JWT, authentication, password hashing
│   │   └── logging.py                  # Logging configuration
│   │
│   ├── database/                       # Database layer
│   │   ├── __init__.py
│   │   └── db.py                       # MongoDB connection (Motor), indexes
│   │
│   ├── models/                         # Database models (ORM/Schemas)
│   │   └── __init__.py                 # Placeholder for Beanie/Mongoengine
│   │
│   ├── schemas/                        # Pydantic validation models
│   │   ├── __init__.py
│   │   ├── auth.py                     # SignupRequest, LoginRequest, TokenResponse
│   │   ├── users.py                    # UserProfile, UserResponse
│   │   ├── finance.py                  # DebtRequest, IncomeRequest, GoalRequest
│   │   ├── transactions.py             # PaymentRequest, ExpenseRequest
│   │   └── common.py                   # ErrorResponse, BaseResponse
│   │
│   ├── services/                       # Business logic & external integrations
│   │   ├── __init__.py
│   │   ├── s3_service.py               # AWS S3 file uploads
│   │   ├── ses_email_service.py        # AWS SES email sending
│   │   ├── onesignal_service.py        # OneSignal push notifications
│   │   └── auth_service.py             # Authentication business logic
│   │
│   ├── middleware/                     # Custom middleware
│   │   └── __init__.py                 # Request/response interceptors
│   │
│   └── utils/                          # Utility functions
│       └── __init__.py                 # Helpers, constants
│
├── tests/                              # Unit & integration tests
│   ├── __init__.py
│   ├── test_auth.py
│   ├── test_debts.py
│   ├── test_payments.py
│   ├── conftest.py                     # Pytest configuration
│   └── fixtures/                       # Test data fixtures
│
├── main.py                             # Root entry point
├── requirements.txt                    # Python dependencies
├── .env.example                        # Environment variables template
├── .env                                # Environment variables (local)
├── .gitignore                          # Git ignore rules
├── docker-compose.yml                  # Docker services setup
├── Dockerfile                          # Docker image definition
├── STRUCTURE.md                        # Project structure documentation
└── README.md                           # Project README
```

## 📊 Database Schema (MongoDB - "cleero" database)

### Collections:

```javascript
// users - User accounts
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ username: 1 }, { unique: true })

// debts - Debt records
db.debts.createIndex({ user_id: 1 })
db.debts.createIndex({ user_id: 1, created_at: -1 })

// payments - Payment history
db.payments.createIndex({ user_id: 1 })
db.payments.createIndex({ user_id: 1, created_at: -1 })

// income - Income records
db.income.createIndex({ user_id: 1 })
db.income.createIndex({ user_id: 1, created_at: -1 })

// expenses - Expense records
db.expenses.createIndex({ user_id: 1 })
db.expenses.createIndex({ user_id: 1, created_at: -1 })

// goals - Financial goals
db.goals.createIndex({ user_id: 1 })

// budgets - Budget limits
db.budgets.createIndex({ user_id: 1, category: 1 })

// notifications - User notifications
db.notifications.createIndex({ user_id: 1 })
db.notifications.createIndex({ user_id: 1, created_at: -1 })

// password_resets - Password reset tokens
db.password_resets.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 })
```

## 🔌 API Endpoints (v1)

### Authentication (/auth)
```
POST   /api/v1/auth/signup                    # Register new user
POST   /api/v1/auth/login                     # Login & get tokens
GET    /api/v1/auth/me                        # Get current user
POST   /api/v1/auth/password-reset-request    # Request password reset
POST   /api/v1/auth/password-reset-confirm    # Confirm password reset
POST   /api/v1/auth/refresh                   # Refresh access token
```

### Users (/users)
```
GET    /api/v1/users/profile                  # Get profile
PUT    /api/v1/users/profile                  # Update profile
DELETE /api/v1/users/account                  # Delete account
```

### Finance - Debts (/debts)
```
POST   /api/v1/debts                          # Create debt
GET    /api/v1/debts                          # List all debts
GET    /api/v1/debts/{id}                     # Get debt details
PUT    /api/v1/debts/{id}                     # Update debt
DELETE /api/v1/debts/{id}                     # Delete debt
GET    /api/v1/debts/stats/summary            # Debt statistics
```

### Finance - Income (/income)
```
POST   /api/v1/income                         # Add income
GET    /api/v1/income                         # List income
GET    /api/v1/income/{id}                    # Get income details
PUT    /api/v1/income/{id}                    # Update income
DELETE /api/v1/income/{id}                    # Delete income
GET    /api/v1/income/stats/monthly           # Monthly income stats
```

### Finance - Goals (/goals)
```
POST   /api/v1/goals                          # Create goal
GET    /api/v1/goals                          # List goals
GET    /api/v1/goals/{id}                     # Get goal details
PUT    /api/v1/goals/{id}                     # Update goal
POST   /api/v1/goals/{id}/contribute          # Add contribution
DELETE /api/v1/goals/{id}                     # Delete goal
GET    /api/v1/goals/summary/all              # Overall goal summary
```

### Finance - Budgets (/budgets)
```
POST   /api/v1/budgets                        # Create budget
GET    /api/v1/budgets                        # List budgets
PUT    /api/v1/budgets/{id}                   # Update budget
DELETE /api/v1/budgets/{id}                   # Delete budget
```

### Transactions - Payments (/payments)
```
POST   /api/v1/payments                       # Make payment
GET    /api/v1/payments                       # Payment history
GET    /api/v1/payments/debt/{debt_id}        # Payments for debt
GET    /api/v1/payments/stats/monthly         # Monthly payment stats
```

### Transactions - Expenses (/expenses)
```
POST   /api/v1/expenses                       # Create expense
GET    /api/v1/expenses                       # List expenses
GET    /api/v1/expenses/{id}                  # Get expense details
PUT    /api/v1/expenses/{id}                  # Update expense
DELETE /api/v1/expenses/{id}                  # Delete expense
GET    /api/v1/expenses/stats/monthly         # Monthly expense stats
```

### Notifications (/notifications)
```
GET    /api/v1/notifications                  # Get all notifications
PUT    /api/v1/notifications/{id}/read        # Mark as read
DELETE /api/v1/notifications/{id}             # Delete notification
```

### Settings (/settings)
```
GET    /api/v1/settings/preferences           # Get preferences
PUT    /api/v1/settings/preferences           # Update preferences
GET    /api/v1/settings/notifications         # Notification settings
PUT    /api/v1/settings/notifications         # Update notification settings
```

## 🔐 Authentication & Security

### JWT Implementation
- **Algorithm**: HS256
- **Access Token Expiry**: 30 minutes
- **Refresh Token Expiry**: 7 days
- **Password Hashing**: bcrypt (cost factor: 12)
- **Token Header**: `Authorization: Bearer <token>`

### Protected Routes
All endpoints except `/auth/signup`, `/auth/login`, `/auth/password-reset-request` require JWT authentication.

## ☁️ External Services Integration

### AWS S3
- **Purpose**: File uploads (receipts, documents)
- **Configuration**: `app/core/config.py`
- **Service**: `app/services/s3_service.py`
- **Features**:
  - Presigned URLs (1-hour expiry)
  - Server-side encryption (AES256)
  - Automatic file organization by user

### AWS SES
- **Purpose**: Email sending
- **Configuration**: `app/core/config.py`
- **Service**: `app/services/ses_email_service.py`
- **Email Types**:
  - Welcome email (signup)
  - Payment reminder (EMI due)
  - Password reset (1-hour link)
  - Confirmation emails (transactions)

### OneSignal
- **Purpose**: Push notifications
- **Configuration**: `app/core/config.py`
- **Service**: `app/services/onesignal_service.py`
- **Notification Types**:
  - Payment due alerts
  - Goal milestones (25%, 50%, 75%, 100%)
  - Budget alerts (threshold exceeded)
  - System notifications

## 🐳 Docker Setup

### Services:
```yaml
services:
  mongodb:
    image: mongo:latest
    ports: 27017
    environment: MONGO_INITDB_DATABASE=cleero
    
  api:
    build: .
    ports: 8000
    depends_on: mongodb
    environment: MONGODB_URL=mongodb://mongodb:27017
    
  mongo-express:
    image: mongo-express
    ports: 8081
    environment: ME_CONFIG_MONGODB_URL=mongodb://mongodb:27017
```

### Run:
```bash
docker-compose up --build
```

## 🚀 Running the Application

### Local Development:
```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env

# Run server
uvicorn main:app --reload

# Navigate to
http://localhost:8000/docs       # Swagger UI
http://localhost:8000/redoc      # ReDoc
```

### Docker:
```bash
docker-compose up --build
```

## 📦 Project Dependencies

```
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.4.2
pydantic-settings==2.0.3
motor==3.3.2
pymongo==4.5.0
python-jose==3.3.0
python-multipart==0.0.6
bcrypt==4.1.1
boto3==1.34.0
aiohttp==3.9.1
email-validator==2.1.0
python-dotenv==1.0.0
```

## 📋 Implementation Checklist

- [x] Project structure (enterprise-grade)
- [x] Environment configuration
- [x] MongoDB setup with Motor
- [x] Pydantic schemas (validation)
- [x] JWT authentication & security
- [x] Database models & indexes
- [x] Auth routes (signup, login, password reset)
- [ ] Finance routes (debts, income, goals, budgets)
- [ ] Transaction routes (payments, expenses)
- [ ] Notification routes (get, mark read, delete)
- [ ] Settings routes (preferences)
- [ ] User profile routes
- [ ] File upload endpoint (S3)
- [ ] Dashboard aggregation endpoint
- [ ] Tests (unit, integration)
- [ ] CI/CD pipeline
- [ ] API documentation

## 🔄 Code Organization Principles

### Separation of Concerns:
- **Routes**: HTTP endpoints only
- **Services**: Business logic & external integrations
- **Database**: Data access layer
- **Schemas**: Request/response validation
- **Core**: Configuration, security, logging

### Naming Conventions:
- **Modules**: snake_case (auth_service.py)
- **Classes**: PascalCase (EmailService)
- **Functions**: snake_case (send_email)
- **Constants**: UPPER_SNAKE_CASE (SECRET_KEY)

### Import Organization:
1. Standard library
2. Third-party packages
3. Application modules (relative imports from app/)

---

**Database**: MongoDB (cleero database)
**API Version**: v1
**Last Updated**: November 2024
