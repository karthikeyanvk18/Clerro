# Cleero Financial Compass - Backend Project Structure & Setup Guide

## 📁 Complete Project Architecture

```
cleero-financial-compass-backend/
│
├── main.py                          # FastAPI app entry point
├── config.py                        # Configuration & environment variables
├── database.py                      # MongoDB connection & initialization
├── schemas.py                       # Pydantic models (request/response)
├── security.py                      # JWT & password utilities
├── services.py                      # External services (S3, SES, OneSignal)
│
├── routes/                          # API route handlers
│   ├── __init__.py
│   ├── auth.py                     # Authentication (signup, login, password reset)
│   ├── debts.py                    # Debt management (CRUD, statistics)
│   ├── payments.py                 # Payment processing & history
│   ├── income.py                   # Income tracking & statistics
│   ├── expenses.py                 # Expense tracking & budget alerts
│   ├── goals.py                    # Financial goals management
│   ├── budget.py                   # Budget management (TODO)
│   └── notifications.py            # Notifications (TODO)
│
├── templates/                       # Email templates
│   ├── emails/
│   │   ├── welcome.html
│   │   ├── payment_reminder.html
│   │   ├── payment_confirmation.html
│   │   └── password_reset.html
│
├── tests/                           # Unit & integration tests (TODO)
├── requirements.txt                 # Python dependencies
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── Dockerfile                       # Docker image definition
├── docker-compose.yml               # Docker services setup
├── README.md                        # Documentation
└── STRUCTURE.md                     # This file
```

## 🏗️ Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────┐
│   FastAPI Routes (REST APIs)    │  ← HTTP Endpoints
├─────────────────────────────────┤
│   Business Logic & Services     │  ← Logic Layer
│   (Debts, Payments, Goals, etc) │
├─────────────────────────────────┤
│   Data Layer (MongoDB)          │  ← Database
│   (Collections & Queries)       │
├─────────────────────────────────┤
│   External Integrations         │  ← Third-party Services
│   (S3, SES, OneSignal)          │
└─────────────────────────────────┘
```

## 📚 Data Flow

### Authentication Flow
```
Client POST /api/auth/signup
    ↓
Validate Input (Pydantic)
    ↓
Check Email Exists
    ↓
Hash Password (bcrypt)
    ↓
Create User in MongoDB
    ↓
Generate JWT Tokens
    ↓
Send Welcome Email (SES)
    ↓
Return Tokens to Client
```

### Payment Processing Flow
```
Client POST /api/payments
    ↓
Get Authenticated User
    ↓
Fetch Debt Details
    ↓
Validate Payment Amount
    ↓
Create Payment Record in MongoDB
    ↓
Update Debt (remaining, total_paid)
    ↓
Check if Debt Completed
    ↓
Send Push Notification (OneSignal)
    ↓
Send Confirmation Email (SES)
    ↓
Return Payment Response
```

### Expense Alert Flow
```
Client POST /api/expenses
    ↓
Create Expense in MongoDB
    ↓
Calculate Category Spent This Month
    ↓
Fetch Budget for Category
    ↓
Check if Spending > Alert Threshold
    ↓
Send Expense Alert (OneSignal)
    ↓
Return Expense Response
```

## 🗄️ Database Schema

### Collections Overview

```
cleero_financial/
├── users                    # User accounts
├── debts                    # Debt records
├── payments                 # Payment history
├── income                   # Income records
├── expenses                 # Expense records
├── goals                    # Financial goals
├── budgets                  # Budget limits
├── notifications            # User notifications
└── password_resets          # Reset tokens
```

### Collection Examples

**users**
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "bcrypt_hash",
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

**debts**
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

**payments**
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
  "created_at": ISODate
}
```

**expenses**
```json
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "title": "Grocery Shopping",
  "category": "groceries",
  "amount": 3500,
  "date": ISODate,
  "description": "Weekly groceries",
  "receipt_url": "s3://url",
  "tags": ["weekly", "essential"],
  "created_at": ISODate,
  "updated_at": ISODate
}
```

**goals**
```json
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "title": "Emergency Fund",
  "goal_type": "emergency_fund",
  "target_amount": 500000,
  "current_amount": 150000,
  "target_date": ISODate,
  "priority": "high",
  "progress_percentage": 30,
  "status": "active",
  "created_at": ISODate,
  "updated_at": ISODate
}
```

**budgets**
```json
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "category": "groceries",
  "monthly_limit": 15000,
  "alert_threshold": 80,
  "active": true,
  "created_at": ISODate,
  "updated_at": ISODate
}
```

**notifications**
```json
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "title": "Payment Due",
  "message": "Home Loan EMI due on Jan 10",
  "notification_type": "payment_due",
  "is_read": false,
  "action_url": "/debts/123",
  "created_at": ISODate
}
```

## 🔌 API Endpoint Map

### Authentication (5 endpoints)
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/password-reset-request
POST   /api/auth/password-reset-confirm
GET    /api/auth/me
```

### Debts (6 endpoints)
```
POST   /api/debts
GET    /api/debts
GET    /api/debts/{id}
PUT    /api/debts/{id}
DELETE /api/debts/{id}
GET    /api/debts/stats/summary
```

### Payments (4 endpoints)
```
POST   /api/payments
GET    /api/payments
GET    /api/payments/debt/{debt_id}
GET    /api/payments/stats/monthly
```

### Income (7 endpoints)
```
POST   /api/income
GET    /api/income
GET    /api/income/{id}
PUT    /api/income/{id}
DELETE /api/income/{id}
GET    /api/income/stats/monthly
```

### Expenses (7 endpoints)
```
POST   /api/expenses
GET    /api/expenses
GET    /api/expenses/{id}
PUT    /api/expenses/{id}
DELETE /api/expenses/{id}
GET    /api/expenses/stats/monthly
```

### Goals (7 endpoints)
```
POST   /api/goals
GET    /api/goals
GET    /api/goals/{id}
PUT    /api/goals/{id}
DELETE /api/goals/{id}
POST   /api/goals/{id}/contribute
GET    /api/goals/summary/all
```

**Total: 36+ endpoints**

## 🔐 Security Implementation

### Password Hashing
- Algorithm: bcrypt (automatically salted)
- Used in: User signup, password update

### JWT Tokens
- Access Token: 30 minutes expiry
- Refresh Token: 7 days expiry
- Algorithm: HS256
- Contains: user_id, email, token_type, exp, iat

### Database Security
- MongoDB connection encryption
- Indexed password resets with expiry
- Input validation with Pydantic

## 📧 Email Service (AWS SES)

### Email Types Sent
1. **Welcome Email** - After signup
2. **Payment Reminder** - Before EMI due
3. **Payment Confirmation** - After successful payment
4. **Password Reset** - Reset link with expiry
5. **Goal Milestone** - When goal reaches 25%, 50%, 75%, 100%
6. **Expense Alert** - When budget threshold exceeded

### Template System
```
templates/emails/
├── welcome.html              # {{full_name}}, {{app_url}}
├── payment_reminder.html     # {{debt_name}}, {{amount}}, {{due_date}}
├── payment_confirmation.html # {{amount}}, {{transaction_id}}
└── password_reset.html       # {{reset_link}}, {{expiry_time}}
```

## 🔔 Notification Service (OneSignal)

### Notification Types
1. **payment_due** - Upcoming EMI payment
2. **payment_reminder** - Payment due soon
3. **goal_milestone** - Goal progress reached
4. **expense_alert** - Budget exceeded
5. **income_received** - Income recorded
6. **system** - System announcements

### Notification Flow
```
Service → OneSignal API
         ↓
    OneSignal Processing
         ↓
    Send to User Device
         ↓
    Push Notification Displayed
```

## ☁️ AWS S3 Integration

### File Storage
- Path: `attachments/{user_id}/{uuid}.{ext}`
- Encryption: AES256
- URL Expiry: 1 hour
- Used for: Receipt images, attachments

### S3 Workflow
```
Client Upload File
    ↓
FastAPI Receive
    ↓
Generate S3 Key
    ↓
Upload to S3
    ↓
Generate Presigned URL
    ↓
Save URL to Database
    ↓
Return URL to Client
```

## 🚀 Deployment Options

### 1. Docker (Recommended)
```bash
docker-compose up --build
# MongoDB + FastAPI running
```

### 2. Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cleero-api
spec:
  replicas: 3
  # ... pod template
```

### 3. AWS EC2 + RDS
```bash
# EC2 Instance
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
gunicorn -w 4 main:app

# RDS MongoDB Atlas
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net
```

### 4. Heroku
```bash
heroku create cleero-financial-api
heroku config:set SECRET_KEY=xxx
git push heroku main
```

## 📊 Monitoring & Logging

### Logging Setup
```python
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
```

### Log Files
- `app.log` - Application logs
- `error.log` - Error logs (if configured)

### Metrics to Monitor
- Response time
- Error rate
- Database queries
- External API calls
- User activity

## 🧪 Testing Strategy

### Unit Tests (TODO)
```python
# tests/test_auth.py
def test_signup_success():
    pass

def test_login_invalid_credentials():
    pass
```

### Integration Tests (TODO)
```python
# tests/test_integration.py
async def test_full_payment_flow():
    pass
```

### Load Testing (TODO)
```bash
# Using Apache JMeter or Locust
locust -f locustfile.py
```

## 📈 Performance Optimization

### Database Indexing
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.debts.createIndex({ user_id: 1, created_at: -1 })
db.payments.createIndex({ user_id: 1, created_at: -1 })
```

### Caching (Recommended)
- Redis for session tokens
- Cache frequently accessed data
- Implement rate limiting

### Query Optimization
- Projection to fetch only needed fields
- Pagination for large result sets
- Aggregation pipeline for statistics

## 🔄 CI/CD Pipeline (TODO)

### GitHub Actions
```yaml
name: Deploy
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: pytest
      - name: Deploy
        run: docker push image
```

## 📋 Development Checklist

- [x] Project structure
- [x] Configuration management
- [x] Database setup
- [x] Authentication
- [x] Debt routes
- [x] Payment routes
- [x] Income routes
- [x] Expense routes
- [x] Goals routes
- [ ] Budget routes
- [ ] Notification routes
- [ ] User profile routes
- [ ] Dashboard routes
- [ ] Reports routes
- [ ] File upload routes
- [ ] Tests
- [ ] CI/CD
- [ ] Documentation

## 🎯 Next Steps

1. **Create remaining routes:**
   - Budget management (`routes/budget.py`)
   - Notifications (`routes/notifications.py`)
   - User profile (`routes/users.py`)
   - Dashboard (`routes/dashboard.py`)
   - Reports (`routes/reports.py`)

2. **Add file upload:**
   - Receipt image upload to S3
   - Document storage
   - File download endpoint

3. **Implement testing:**
   - Unit tests for services
   - Integration tests for endpoints
   - Load testing

4. **Setup CI/CD:**
   - GitHub Actions for tests
   - Automated deployment
   - Monitoring & alerts

5. **Frontend integration:**
   - Connect React app to API
   - Update environment variables
   - Test end-to-end flow

## 📞 API Usage Examples

### Signup
```bash
curl -X POST "http://localhost:8000/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "full_name": "John Doe",
    "phone": "+91 98765 43210"
  }'
```

### Create Debt
```bash
curl -X POST "http://localhost:8000/api/debts" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Home Loan",
    "debt_type": "home_loan",
    "principal": 3500000,
    "interest_rate": 6.5,
    "tenure_months": 240,
    "monthly_emi": 42500,
    "bank_name": "HDFC",
    "start_date": "2024-01-01T00:00:00Z"
  }'
```

### Make Payment
```bash
curl -X POST "http://localhost:8000/api/payments" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "debt_id": "123abc",
    "amount": 42500,
    "payment_method": "net_banking",
    "payment_date": "2024-01-05T00:00:00Z"
  }'
```

---

**Last Updated:** January 2024
**Version:** 1.0.0
**Maintained By:** Cleero Team
