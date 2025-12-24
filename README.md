# 📖 Cleero Financial Compass - Backend Documentation Index

**Status**: ✅ Complete & Production Ready  
**Endpoints**: 60+  
**Models**: 9  
**Documentation**: 7 Files

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env
# Edit .env with your settings

# 3. Start server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# 4. Access documentation
# Swagger UI: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

---

## 📚 Documentation Files

### Main Documentation
1. **VISUAL_SUMMARY.md** - Visual overview & quick reference (5 min read)
2. **QUICK_START.md** - Detailed setup & integration guide (10 min read)
3. **API_DOCUMENTATION.md** - Complete API reference with examples (30 min read)
4. **IMPLEMENTATION_COMPLETE.md** - Full implementation guide (20 min read)
5. **PROJECT_STRUCTURE.md** - Code organization & conventions (15 min read)
6. **COMPLETION_CHECKLIST.md** - Verification checklist (10 min read)
7. **FINAL_SUMMARY.md** - Session completion summary (10 min read)

### Validation
- **validate_backend.py** - Run before starting server
  ```bash
  python validate_backend.py
  ```

---

## 🎯 What's Implemented

### ✅ API Endpoints (60+)
- Authentication (4): signup, login, refresh, logout
- Finance (26): debts (6), income (6), goals (8), budgets (6)
- Transactions (11): payments (4), expenses (7)
- Users (3): profile, update, stats
- Notifications (6): get, read, delete
- Settings (6): preferences, notifications, display
- Dashboard (2): overview, monthly summary
- Health (2): / and /health

### ✅ Database Models (9)
- UserModel - User accounts
- DebtModel - Loans with EMI
- IncomeModel - Income entries
- ExpenseModel - Spending records
- GoalModel - Savings goals
- BudgetModel - Spending budgets
- PaymentModel - Payment history
- NotificationModel - Alerts
- SettingsModel - User preferences

### ✅ Middleware (3)
- AuthMiddleware - JWT validation
- ErrorHandlerMiddleware - Centralized error handling
- LoggingMiddleware - Request/response logging

### ✅ Utilities (15+)
- Validators: email, password, phone
- Formatters: currency, date, percentage
- Helpers: reference numbers, date ranges, calculations

### ✅ Services (4)
- AuthService - JWT & password utilities
- S3Service - AWS S3 uploads (bucket: "cleero")
- SESService - AWS SES email
- OneSignalService - Push notifications

### ✅ Schemas (45+)
- Request models for all endpoints
- Response models for all endpoints
- Validation with Pydantic

---

## 🏗️ Architecture

```
FastAPI Application
├─ API Routes (app/api/v1/)
│  ├─ auth/, finance/, transactions/
│  ├─ users/, notifications/, settings/
│  └─ dashboard/
│
├─ Models (app/models/)
│  ├─ 9 ORM models for MongoDB
│  └─ Full field definitions
│
├─ Middleware (app/middleware/)
│  ├─ Auth, Error, Logging
│  └─ Custom middleware pipeline
│
├─ Services (app/services/)
│  ├─ AWS S3, SES, OneSignal
│  └─ Auth utilities
│
├─ Utils (app/utils/)
│  ├─ Validators, Formatters
│  └─ Helper functions
│
└─ Core (app/core/)
   ├─ Configuration
   ├─ Security
   └─ Logging
```

---

## 💾 Database

**MongoDB** with **Motor** (async driver)

Collections:
- users
- debts
- income
- expenses
- goals
- budgets
- payments
- notifications
- settings

---

## 🔐 Security

- JWT authentication (HS256)
- 30-minute access tokens
- 7-day refresh tokens
- Bcrypt password hashing
- Input validation (Pydantic)
- Error handling

---

## 🎛️ Configuration
cleero-financial-compass-backend/
├── main.py                 # FastAPI application entry point
├── config.py              # Configuration and environment variables
├── database.py            # MongoDB connection and setup
├── schemas.py             # Pydantic models for request/response
├── security.py            # JWT auth and password hashing
├── services.py            # External services (S3, SES, OneSignal)
├── routes/
│   ├── __init__.py
│   ├── auth.py           # Authentication endpoints
│   ├── debts.py          # Debt management endpoints
│   ├── payments.py       # Payment processing endpoints
│   ├── income.py         # Income management endpoints
│   ├── expenses.py       # Expense tracking endpoints
│   ├── goals.py          # Goal management endpoints
│   ├── budget.py         # Budget endpoints
│   └── notifications.py  # Notification endpoints
├── templates/            # Email templates
├── requirements.txt      # Python dependencies
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
├── README.md            # This file
└── docker-compose.yml   # Docker services (MongoDB, etc)
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- MongoDB 5.0+
- AWS Account (S3, SES)
- OneSignal Account
- Docker & Docker Compose (optional)

### 1. Clone and Setup

```bash
cd cleero-financial-compass-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Start MongoDB

**Option A: Using Docker**
```bash
docker-compose up -d
```

**Option B: Local Installation**
```bash
mongod --dbpath /path/to/data
```

### 4. Run Application

```bash
python main.py
# or
uvicorn main:app --reload
```

API will be available at: http://localhost:8000

**Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔧 Configuration Guide

### AWS S3 Setup

1. Create AWS Account and S3 bucket
2. Generate access keys from IAM
3. Update `.env`:
```
AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
AWS_S3_BUCKET_NAME=cleero-financial
AWS_S3_REGION=us-east-1
```

### AWS SES Setup

1. Verify email address in SES
2. Create access keys
3. Update `.env`:
```
SES_SENDER_EMAIL=noreply@cleero.com
SES_REGION=us-east-1
```

### OneSignal Setup

1. Create OneSignal account
2. Create app and get credentials
3. Update `.env`:
```
ONESIGNAL_APP_ID=xxxx
ONESIGNAL_API_KEY=xxxx
ONESIGNAL_USER_AUTH_KEY=xxxx
```

### MongoDB Atlas (Cloud)

Use MongoDB Atlas for hosted MongoDB:
```
MONGODB_URL=mongodb+srv://user:password@cluster.mongodb.net/cleero_financial
```

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/signup              - User registration
POST   /api/auth/login               - User login
GET    /api/auth/me                  - Get current user
POST   /api/auth/password-reset-request
POST   /api/auth/password-reset-confirm
```

### Debts
```
POST   /api/debts                    - Create debt
GET    /api/debts                    - Get all debts
GET    /api/debts/{id}              - Get debt details
PUT    /api/debts/{id}              - Update debt
DELETE /api/debts/{id}              - Delete debt
GET    /api/debts/stats/summary     - Get debt statistics
```

### Payments
```
POST   /api/payments                 - Make payment
GET    /api/payments                 - Get all payments
GET    /api/payments/debt/{debt_id} - Get payments for debt
GET    /api/payments/stats/monthly  - Monthly payment stats
```

### Income
```
POST   /api/income                   - Add income
GET    /api/income                   - Get all income
GET    /api/income/{id}             - Get income details
PUT    /api/income/{id}             - Update income
DELETE /api/income/{id}             - Delete income
GET    /api/income/stats/monthly    - Monthly income stats
```

### Expenses *(To be created)*
```
POST   /api/expenses                 - Add expense
GET    /api/expenses                 - Get all expenses
GET    /api/expenses/{id}           - Get expense details
PUT    /api/expenses/{id}           - Update expense
DELETE /api/expenses/{id}           - Delete expense
GET    /api/expenses/stats/monthly  - Monthly expense stats
```

### Goals *(To be created)*
```
POST   /api/goals                    - Create goal
GET    /api/goals                    - Get all goals
GET    /api/goals/{id}              - Get goal details
PUT    /api/goals/{id}              - Update goal
DELETE /api/goals/{id}              - Delete goal
POST   /api/goals/{id}/contribute   - Contribute to goal
```

### Budget *(To be created)*
```
POST   /api/budgets                  - Create budget
GET    /api/budgets                  - Get budgets
PUT    /api/budgets/{id}            - Update budget
DELETE /api/budgets/{id}            - Delete budget
```

### Notifications *(To be created)*
```
GET    /api/notifications            - Get notifications
GET    /api/notifications/unread    - Get unread count
PUT    /api/notifications/{id}/read - Mark as read
DELETE /api/notifications/{id}      - Delete notification
```

## 🔐 Authentication

All protected endpoints require Bearer token in Authorization header:

```bash
Authorization: Bearer <your_jwt_token>
```

Token obtained from login/signup endpoints.

## 📊 Database Models

### Users Collection
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "hashed_password",
  "full_name": "John Doe",
  "phone": "+91 98765 43210",
  "profile": {
    "date_of_birth": "1990-05-15",
    "address": "123 Main St",
    "preferred_currency": "INR"
  },
  "is_active": true,
  "created_at": ISODate,
  "updated_at": ISODate
}
```

### Debts Collection
```json
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "name": "HDFC Home Loan",
  "debt_type": "home_loan",
  "principal": 3500000,
  "interest_rate": 6.5,
  "tenure_months": 240,
  "monthly_emi": 42500,
  "remaining_amount": 2650000,
  "total_paid": 850000,
  "bank_name": "HDFC",
  "status": "active",
  "next_payment_date": ISODate,
  "created_at": ISODate,
  "updated_at": ISODate
}
```

### Payments Collection
```json
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "debt_id": ObjectId,
  "amount": 42500,
  "payment_method": "net_banking",
  "payment_date": ISODate,
  "transaction_id": "uuid",
  "status": "completed",
  "reference_number": "REF123",
  "created_at": ISODate
}
```

### Income Collection
```json
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "title": "Salary",
  "income_type": "salary",
  "amount": 150000,
  "source": "Employer",
  "frequency": "monthly",
  "date": ISODate,
  "created_at": ISODate,
  "updated_at": ISODate
}
```

## 🛠️ Development

### Install Development Dependencies
```bash
pip install -r requirements-dev.txt
```

### Run Tests
```bash
pytest tests/ -v
```

### Format Code
```bash
black .
flake8 .
```

### Create New Route

1. Create file in `routes/` directory
2. Define router with endpoints
3. Import and include in `main.py`

Example:
```python
# routes/expenses.py
from fastapi import APIRouter
from security import get_current_user_id

router = APIRouter(prefix="/api/expenses", tags=["Expenses"])

@router.post("")
async def create_expense(request: CreateExpenseRequest, user_id: str = Depends(get_current_user_id)):
    # Implementation
    pass

# main.py
from routes import expenses
app.include_router(expenses.router)
```

## 📧 Email Templates

Email templates are in `templates/emails/`:

- `welcome.html` - Welcome email
- `payment_reminder.html` - Payment due reminder
- `payment_confirmation.html` - Payment confirmation
- `password_reset.html` - Password reset link
- `goal_milestone.html` - Goal achievement
- `expense_alert.html` - Budget alert

## 🚨 Error Handling

Standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `422` - Validation error
- `500` - Server error

Error response format:
```json
{
  "error": "Error Type",
  "message": "Human readable message",
  "status_code": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📈 Performance Optimization

- Database indexes on frequently queried fields
- Async/await for non-blocking operations
- Connection pooling with Motor
- Response caching strategies
- Pagination for large result sets

## 🔒 Security

- JWT token-based authentication
- Password hashing with bcrypt
- CORS middleware configuration
- Environment variable protection
- Input validation with Pydantic
- SQL injection prevention (MongoDB)
- Rate limiting (recommended)

## 🐛 Logging

Logs are configured in `main.py`:
- INFO: General application events
- WARNING: Potential issues
- ERROR: Error events
- DEBUG: Detailed debugging info

Access logs: `app.log`

## 📦 Deployment

### Docker

```bash
docker build -t cleero-financial-api .
docker run -p 8000:8000 --env-file .env cleero-financial-api
```

### Heroku

```bash
heroku login
heroku create cleero-financial-api
heroku config:set SECRET_KEY=xxxxx
git push heroku main
```

### AWS EC2

1. Launch Ubuntu instance
2. Install Python, MongoDB
3. Clone repository
4. Configure environment
5. Run with Gunicorn + Nginx

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 main:app
```

## 📝 TODO - Routes to Implement

- [ ] Expenses CRUD endpoints
- [ ] Goals CRUD endpoints
- [ ] Budget management endpoints
- [ ] Notifications endpoints
- [ ] User profile update endpoint
- [ ] Dashboard summary endpoint
- [ ] Reports/Analytics endpoints
- [ ] File upload endpoint (with S3)
- [ ] Transaction export endpoints

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/name`
4. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
- GitHub Issues: [Create issue]
- Email: support@cleero.com
- Documentation: https://docs.cleero.com

## 🔗 Links

- **Frontend**: https://github.com/karthikeyanvk18/cleero-financial-compass
- **Backend**: https://github.com/karthikeyanvk18/cleero-financial-compass-backend
- **Website**: https://cleero.com

---

**Built with ❤️ by Cleero Team**
