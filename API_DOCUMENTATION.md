# Cleero Financial Compass - Complete API Reference

## Base URL
```
http://localhost:8000
```

## Authentication
All endpoints (except `/login` and `/signup`) require:
```
Authorization: Bearer <access_token>
```

---

## API Endpoints Summary

### Authentication Endpoints
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### User Management
- `GET /api/v1/users/me` - Get current user profile
- `GET /api/v1/users/{user_id}` - Get specific user profile
- `PUT /api/v1/users/{user_id}` - Update user profile
- `GET /api/v1/users/{user_id}/stats` - Get user financial statistics

### Finance - Debts
- `POST /api/v1/finance/debts` - Create debt record
- `GET /api/v1/finance/debts` - Get all debts
- `GET /api/v1/finance/debts/{debt_id}` - Get debt details
- `PUT /api/v1/finance/debts/{debt_id}` - Update debt
- `DELETE /api/v1/finance/debts/{debt_id}` - Delete debt
- `GET /api/v1/finance/debts/stats/summary` - Get debt statistics

### Finance - Income
- `POST /api/v1/finance/income` - Create income record
- `GET /api/v1/finance/income` - Get all income records
- `GET /api/v1/finance/income/{income_id}` - Get income details
- `PUT /api/v1/finance/income/{income_id}` - Update income
- `DELETE /api/v1/finance/income/{income_id}` - Delete income
- `GET /api/v1/finance/income/stats/monthly` - Get monthly income statistics

### Finance - Goals
- `POST /api/v1/finance/goals` - Create financial goal
- `GET /api/v1/finance/goals` - Get all goals
- `GET /api/v1/finance/goals/{goal_id}` - Get goal details
- `PUT /api/v1/finance/goals/{goal_id}` - Update goal
- `POST /api/v1/finance/goals/{goal_id}/contribute` - Add contribution to goal
- `DELETE /api/v1/finance/goals/{goal_id}` - Delete goal
- `GET /api/v1/finance/goals/summary/all` - Get goals summary

### Finance - Budgets
- `POST /api/v1/finance/budgets` - Create budget
- `GET /api/v1/finance/budgets` - Get all budgets
- `GET /api/v1/finance/budgets/{budget_id}` - Get budget details
- `PUT /api/v1/finance/budgets/{budget_id}` - Update budget
- `DELETE /api/v1/finance/budgets/{budget_id}` - Delete budget
- `GET /api/v1/finance/budgets/{budget_id}/status` - Get budget usage status

### Transactions - Payments
- `POST /api/v1/transactions/payments` - Make payment
- `GET /api/v1/transactions/payments` - Get all payments
- `GET /api/v1/transactions/payments/debt/{debt_id}` - Get payments for specific debt
- `GET /api/v1/transactions/payments/stats/monthly` - Get monthly payment statistics

### Transactions - Expenses
- `POST /api/v1/transactions/expenses` - Create expense
- `GET /api/v1/transactions/expenses` - Get all expenses
- `GET /api/v1/transactions/expenses/{expense_id}` - Get expense details
- `PUT /api/v1/transactions/expenses/{expense_id}` - Update expense
- `DELETE /api/v1/transactions/expenses/{expense_id}` - Delete expense
- `GET /api/v1/transactions/expenses/stats/monthly` - Get monthly expense statistics

### Notifications
- `GET /api/v1/notifications` - Get user notifications
- `GET /api/v1/notifications/unread/count` - Get unread count
- `PUT /api/v1/notifications/{notification_id}/read` - Mark as read
- `PUT /api/v1/notifications/read/all` - Mark all as read
- `DELETE /api/v1/notifications/{notification_id}` - Delete notification
- `DELETE /api/v1/notifications` - Clear all notifications

### Settings
- `GET /api/v1/settings` - Get all settings
- `PUT /api/v1/settings` - Update settings
- `GET /api/v1/settings/notifications` - Get notification preferences
- `PUT /api/v1/settings/notifications` - Update notification preferences
- `GET /api/v1/settings/display` - Get display preferences
- `PUT /api/v1/settings/display` - Update display preferences

### Dashboard
- `GET /api/v1/dashboard/overview` - Get complete dashboard overview
- `GET /api/v1/dashboard/monthly-summary` - Get monthly summary

### Health Checks
- `GET /` - API health check
- `GET /health` - Health check endpoint

---

## Detailed Endpoint Documentation

### Authentication

#### Register User
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "full_name": "John Doe"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "full_name": "John Doe",
  "access_token": "eyJhbGci...",
  "refresh_token": "eyJhbGci..."
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "access_token": "eyJhbGci...",
  "refresh_token": "eyJhbGci...",
  "token_type": "bearer"
}
```

### Debts

#### Create Debt
```http
POST /api/v1/finance/debts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Home Loan",
  "creditor": "HDFC Bank",
  "principal_amount": 3500000,
  "interest_rate": 6.5,
  "tenure_months": 240,
  "start_date": "2024-01-01T00:00:00Z",
  "notes": "Home purchase loan"
}

Response:
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Home Loan",
  "creditor": "HDFC Bank",
  "principal_amount": 3500000,
  "remaining_amount": 3500000,
  "interest_rate": 6.5,
  "tenure_months": 240,
  "emi": 42500,
  "total_paid": 0,
  "status": "active",
  "start_date": "2024-01-01T00:00:00Z",
  "next_payment_date": "2024-01-01T00:00:00Z",
  "created_at": "2025-01-03T10:30:00Z"
}
```

#### Get All Debts
```http
GET /api/v1/finance/debts
Authorization: Bearer <token>

Response:
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Home Loan",
    "creditor": "HDFC Bank",
    "principal_amount": 3500000,
    "remaining_amount": 2650000,
    "interest_rate": 6.5,
    "emi": 42500,
    "status": "active",
    ...
  }
]
```

#### Get Debt Statistics
```http
GET /api/v1/finance/debts/stats/summary
Authorization: Bearer <token>

Response:
{
  "total_debt": 4234400,
  "active_debts_count": 4,
  "completed_debts_count": 1,
  "monthly_emi": 88200,
  "total_paid": 1160600,
  "upcoming_payments": [
    {
      "debt_name": "Credit Card",
      "emi": 15000,
      "next_payment_date": "2025-01-05T00:00:00Z"
    }
  ]
}
```

### Income

#### Create Income
```http
POST /api/v1/finance/income
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Salary",
  "income_type": "salary",
  "amount": 132500,
  "source": "Employer XYZ",
  "frequency": "monthly",
  "date": "2025-01-01T00:00:00Z",
  "notes": "Monthly salary"
}

Response:
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Salary",
  "income_type": "salary",
  "amount": 132500,
  "source": "Employer XYZ",
  "frequency": "monthly",
  "date": "2025-01-01T00:00:00Z",
  "created_at": "2025-01-03T10:30:00Z"
}
```

### Expenses

#### Create Expense
```http
POST /api/v1/transactions/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "category": "food",
  "amount": 2500,
  "date": "2025-01-03T10:30:00Z",
  "description": "Weekly groceries",
  "receipt_url": "https://example.com/receipt.pdf",
  "tags": ["groceries", "weekly"]
}

Response:
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "Grocery Shopping",
  "category": "food",
  "amount": 2500,
  "date": "2025-01-03T10:30:00Z",
  "created_at": "2025-01-03T10:30:00Z"
}
```

#### Get Monthly Expense Stats
```http
GET /api/v1/transactions/expenses/stats/monthly
Authorization: Bearer <token>

Response:
{
  "month": "January 2025",
  "total_spent": 68000,
  "by_category": {
    "food": 12000,
    "transportation": 8000,
    "entertainment": 5000,
    "utilities": 15000,
    "healthcare": 3000,
    "shopping": 25000
  },
  "top_expenses": [
    {
      "title": "Rent",
      "amount": 25000,
      "category": "housing"
    }
  ],
  "record_count": 24
}
```

### Payments

#### Make Payment
```http
POST /api/v1/transactions/payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "debt_id": "507f1f77bcf86cd799439012",
  "amount": 42500,
  "payment_method": "bank_transfer",
  "payment_date": "2025-01-05T00:00:00Z",
  "reference_number": "TXN123456",
  "notes": "Monthly EMI payment"
}

Response:
{
  "_id": "507f1f77bcf86cd799439015",
  "debt_id": "507f1f77bcf86cd799439012",
  "amount": 42500,
  "payment_method": "bank_transfer",
  "status": "completed",
  "transaction_id": "uuid-string",
  "created_at": "2025-01-05T10:30:00Z"
}
```

### Goals

#### Create Goal
```http
POST /api/v1/finance/goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Emergency Fund",
  "goal_type": "emergency_fund",
  "target_amount": 500000,
  "current_amount": 100000,
  "target_date": "2025-12-31T00:00:00Z",
  "priority": "high",
  "description": "6 months of expenses"
}

Response:
{
  "_id": "507f1f77bcf86cd799439016",
  "title": "Emergency Fund",
  "goal_type": "emergency_fund",
  "target_amount": 500000,
  "current_amount": 100000,
  "progress_percentage": 20,
  "status": "active",
  "created_at": "2025-01-03T10:30:00Z"
}
```

#### Contribute to Goal
```http
POST /api/v1/finance/goals/{goal_id}/contribute
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50000
}

Response:
{
  "_id": "507f1f77bcf86cd799439016",
  "current_amount": 150000,
  "progress_percentage": 30,
  ...
}
```

### Dashboard

#### Get Dashboard Overview
```http
GET /api/v1/dashboard/overview
Authorization: Bearer <token>

Response:
{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "debt": {
    "total_debt": 4234400,
    "active_debts_count": 4,
    "completed_debts_count": 1,
    "monthly_emi": 88200,
    "upcoming_payments": [...]
  },
  "income": {
    "monthly_income": 132500,
    "total_income_records": 12,
    "by_type": {
      "salary": 132500
    }
  },
  "expenses": {
    "monthly_expenses": 68000,
    "monthly_savings": 64500,
    "savings_rate": 48.7,
    "by_category": {...}
  },
  "goals": {
    "active_goals_count": 3,
    "completed_goals_count": 1,
    "total_goal_target": 1000000,
    "overall_progress": 45
  },
  "financial_health": {
    "emi_to_income_ratio": 66.5,
    "debt_to_income_ratio": 32,
    "savings_rate": 48.7,
    "health_score": 65
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "message": "Invalid request data",
  "details": [...],
  "timestamp": "2025-01-03T10:30:00Z"
}
```

### 401 Unauthorized
```json
{
  "error": "HTTP Error",
  "message": "Unauthorized",
  "status_code": 401,
  "timestamp": "2025-01-03T10:30:00Z"
}
```

### 404 Not Found
```json
{
  "error": "HTTP Error",
  "message": "Debt not found",
  "status_code": 404,
  "timestamp": "2025-01-03T10:30:00Z"
}
```

### 500 Internal Server Error
```json
{
  "error": "HTTP Error",
  "message": "Failed to create debt record",
  "status_code": 500,
  "timestamp": "2025-01-03T10:30:00Z"
}
```

---

## Status Codes

- `200 OK` - Successful GET/PUT request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

---

## Data Types

### DateTime
ISO 8601 format: `2025-01-03T10:30:00Z`

### Money
All amounts in paisa (₹1 = 100 paisa): `3500000`

### Enums

**Debt Types**
- `home_loan`
- `car_loan`
- `personal_loan`
- `education_loan`
- `credit_card`

**Income Types**
- `salary`
- `bonus`
- `freelance`
- `investment`
- `other`

**Expense Categories**
- `food`
- `transportation`
- `utilities`
- `healthcare`
- `entertainment`
- `shopping`
- `education`
- `insurance`
- `other`

**Payment Methods**
- `bank_transfer`
- `upi`
- `credit_card`
- `debit_card`
- `check`
- `cash`

**Goal Types**
- `emergency_fund`
- `savings`
- `investment`
- `vacation`
- `home`
- `education`
- `other`

---

## Rate Limiting
Currently no rate limiting implemented. Consider implementing in future.

---

## Pagination
Supported on GET endpoints with query parameters:
- `skip` - Number of records to skip (default: 0)
- `limit` - Number of records to return (default: 20)

---

## Filtering & Sorting
- Most endpoints support filtering by date ranges
- Results are typically sorted by `created_at` or `date` in descending order
