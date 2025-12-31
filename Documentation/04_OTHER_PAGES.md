# Other Pages Documentation

## 🎯 Goals Page

### Overview
Set and track financial goals with AI-powered suggestions and milestone tracking.

### Layout & Components
```
┌─────────────────────────────────────────────────────────┐
│                     HEADER / TOP NAV                     │
└─────────────────────────────────────────────────────────┘
┌──────────────┬─────────────────────────────────────────┐
│              │                                         │
│   SIDEBAR    │         GOALS CONTENT                  │
│              │                                         │
│              │  ┌─────────────────────────────────┐  │
│              │  │ 📊 GOALS SUMMARY                │  │
│              │  │ • Total Goals: 8                │  │
│              │  │ • Completed: 2 (25%)            │  │
│              │  │ • In Progress: 5 (62.5%)        │  │
│              │  │ • Not Started: 1 (12.5%)        │  │
│              │  │ • Total Target: ₹50,00,000      │  │
│              │  │ • Achieved So Far: ₹12,50,000   │  │
│              │  └─────────────────────────────────┘  │
│              │                                         │
│              │  ┌─────────────────────────────────┐  │
│              │  │ [+ ADD NEW GOAL]                │  │
│              │  │ Filter: ▼ All                   │  │
│              │  │ Sort: ▼ Priority                │  │
│              │  └─────────────────────────────────┘  │
│              │                                         │
│              │  Goal Cards (List):                    │
│              │  1. 🏠 Own a Home                     │
│              │  2. 🚗 Buy a Car                      │
│              │  3. 💍 Emergency Fund                │
│              │  ... (more goals)                     │
│              │                                         │
└──────────────┴─────────────────────────────────────────┘
```

### Goal Card Details
```
┌────────────────────────────────────────────────┐
│ 🏠 Own a Home                    [⋯ Menu]     │
├────────────────────────────────────────────────┤
│ Target: ₹50,00,000  │  Timeline: 5 years     │
│ Saved So Far: ₹12,50,000 (25%)              │
│ Monthly Contribution: ₹8,000                 │
│                                              │
│ Progress: [████████░░░░░░░░░░░░] 25%        │
│                                              │
│ Milestones:                                  │
│ ✓ Save ₹5,00,000 (Completed)                │
│ ✓ Save ₹10,00,000 (Completed)               │
│ ○ Save ₹25,00,000 (In Progress)             │
│ ○ Save ₹40,00,000 (Pending)                 │
│                                              │
│ Priority: 🔴 High  │  Type: Savings Goal    │
│ Status: On Track                            │
│                                              │
├────────────────────────────────────────────────┤
│ [📊 Details] [✏️ Edit] [📈 View Plan] [🗑️ Delete] │
└────────────────────────────────────────────────┘
```

---

## 📱 Income Page

### Overview
Track multiple income sources and project future earnings.

### Components
```
Income Summary:
- Total Monthly Income: ₹102,000
- This Month: ₹102,000 (On Track)
- Projected Annual: ₹12,24,000

Income Sources:
1. 💼 Salary                    ₹85,000  (Primary)
   Status: Received              ✓ Dec 28

2. 🔗 Freelance Work           ₹15,000  (Secondary)
   Status: Pending              ⏳ Due Dec 31

3. 📈 Investments/Dividends    ₹2,000   (Passive)
   Status: Received             ✓ Dec 20

[+ ADD INCOME SOURCE] [📊 Analytics]
```

---

## 💰 Investments Page

### Overview
Manage investment portfolio with performance tracking.

### Components
```
Portfolio Summary:
- Total Invested: ₹15,00,000
- Current Value: ₹16,50,000
- Total Returns: ₹1,50,000 (10%)
- YTD Return: 8.5%

Asset Allocation (Pie Chart):
- Stocks: 40%
- Mutual Funds: 35%
- Bonds: 15%
- Gold: 10%

Holdings List:
1. 📊 Infosys (NSE)        500 shares  ₹3,25,000
   Current: ₹65/share      Return: +8%
   
2. 💹 SBI Mutual Fund      50 units    ₹8,50,000
   Current: ₹170/unit      Return: +12%
   
3. 🪙 HDFC Bank           200 shares  ₹2,50,000
   Current: ₹125/share     Return: +5%
   
4. 💎 Gold ETF            100 units   ₹1,75,000
   Current: ₹1,750/unit    Return: +3%

[+ ADD INVESTMENT] [Rebalance] [📊 Analytics]
```

---

## 📊 Reports Page

### Overview
Comprehensive financial analytics and reporting.

### Components
```
Report Types:
[Monthly Statement] [Annual Summary] [Tax Report] [Trends]

Monthly Statement (Default):
Total Income:       ₹102,000
Total Expenses:     ₹59,000
Total EMI:          ₹96,200
Net (Deficit):      -₹53,200
Savings:            ₹34,000

Charts Available:
- Income vs Expense Trend
- Debt Reduction Progress
- Category-wise Breakdown
- Month-over-Month Comparison

[Export PDF] [Print] [Share]
```

---

## 🤖 AI Advice Page

### Overview
Personalized financial recommendations powered by AI.

### Features
```
AI Insights & Recommendations:

[All] [Tips] [Warnings] [Opportunities]

💡 TIPS - Actionable suggestions
⚠️  WARNINGS - Issues to address
📈 OPPORTUNITIES - Growth possibilities

Chat Interface:
- Chat with AI Coach
- Ask financial questions
- Get personalized advice
- View recommendation history
```

---

## 👨‍💼 Coach Page

### Overview
Interactive financial coaching with structured guidance.

### Features
```
Your Coaching Plan:
1. Debt Management (Week 1-4)
   Progress: 60% Complete

2. Budgeting Basics (Week 5-8)
   Progress: 20% Complete

3. Investment Strategy (Week 9-12)
   Progress: Not Started

Daily Tips:
- Motivational quotes
- Financial education
- Action items
- Progress tracking

[Start Coaching] [Chat with Coach] [View Progress]
```

---

## 🔔 Bill Reminders Page

### Overview
Track and manage upcoming bills with notifications.

### Components
```
Upcoming Bills (Next 30 Days):

January 2025:
├─ Jan 5:  Credit Card Payment    ₹15,000
├─ Jan 8:  Home Loan EMI          ₹42,500
├─ Jan 10: Car Loan EMI           ₹18,200
├─ Jan 12: Internet Bill          ₹999
├─ Jan 15: Electricity Bill       ₹2,500
├─ Jan 20: Insurance Premium      ₹5,000
└─ Jan 25: Education Fees         ₹10,000

Features:
- Calendar view
- Bill notifications
- Mark as paid
- Recurring bills setup
- Payment scheduling

[+ ADD BILL] [Calendar View] [Settings]
```

---

## 🏪 Bank Sync Page

### Overview
Connect and sync bank accounts for automatic transaction import.

### Components
```
Connected Banks:
✓ HDFC Bank (Primary)
   Last Synced: 2 hours ago
   Accounts: 2 (Savings, Current)
   Status: Active

✓ ICICI Bank
   Last Synced: 4 hours ago
   Accounts: 1 (Savings)
   Status: Active

[+ ADD BANK ACCOUNT]

Security:
- Bank-level encryption
- OAuth authentication
- No password storage
- Secure data transmission

[Settings] [Manage Accounts] [Sync Now]
```

---

## 📦 Data Vault Page

### Overview
Secure storage for financial documents.

### Components
```
Document Categories:
├─ Bank Statements (15 files)
├─ Loan Documents (8 files)
├─ Investment Certificates (5 files)
├─ Insurance Policies (3 files)
├─ Tax Documents (10 files)
└─ Other Documents (7 files)

Security Features:
- End-to-end encryption
- Secure backup
- Access logging
- Version history

[+ UPLOAD DOCUMENT] [Search] [Organize]
```

---

## 👤 Account Page

### Overview
User account settings and preferences.

### Features
```
Account Information:
- Email: user@example.com
- Phone: +91 98765 43210
- Name: John Doe
- DOB: Jan 1, 1990
- PAN: XXXXX1234X

Account Status:
- Active since: Jan 2023
- Plan: Premium
- Subscription: Active

[Edit Profile] [Change Password] [Delete Account]
```

---

## ⚙️ Settings Page

### Overview
Application-wide settings and preferences.

### Components
```
General:
- Language: English ▼
- Timezone: IST (UTC+5:30) ▼
- Currency: INR ▼
- Theme: Dark ▼

Notifications:
- Email Notifications: On/Off
- SMS Alerts: On/Off
- Push Notifications: On/Off
- Bill Reminders: On/Off

Privacy & Security:
- Two-Factor Authentication: Enable
- Privacy Level: Private ▼
- Data Sharing: Off
- Biometric Login: Enable

Data:
- Auto-backup: On
- Backup Frequency: Weekly
- Export Data: Download
- Clear Cache: Clean

[Save Changes] [Reset to Default]
```

---

## 💼 Jobs Page

### Overview
Job marketplace for career opportunities.

### Components
```
Job Listings:
- Total Jobs: 1,250+
- New This Week: 145
- Your Matches: 32

Filters:
- Location: [City]
- Job Type: [Full-time, Part-time, Freelance]
- Experience: [Entry-level, Mid-level, Senior]
- Salary Range: [₹Low - ₹High]

Job Card:
- Company & Logo
- Job Title
- Location
- Salary Range
- Job Type
- Posted Date
- Match Score

[Browse] [Search] [Apply] [Save]
```

---

## 📄 Resume Builder Page

### Overview
Create and manage professional resumes.

### Features
```
Resume Templates:
- Modern
- Classic
- Minimal
- Creative

Build Steps:
1. Basic Info
2. Professional Summary
3. Work Experience
4. Education
5. Skills
6. Projects
7. Certifications

Features:
- Live preview
- Multiple templates
- Download as PDF
- Share online
- ATS optimization

[Start Builder] [My Resumes] [Templates]
```

---

## 🎤 Interview Tracker Page

### Overview
Track interview schedules and preparation.

### Components
```
Interview Schedule:
- Upcoming: 3 interviews
- Completed: 12 interviews
- Success Rate: 25%

Interview List:
1. Company: TCS
   Position: Senior Developer
   Date: Jan 15, 2025
   Status: Scheduled
   Rounds: 2

2. Company: Infosys
   Position: Developer
   Date: Jan 20, 2025
   Status: Under Review
   Rounds: 3

Preparation:
- Interview tips
- Common questions
- Company profiles
- Salary negotiation tips

[+ ADD INTERVIEW] [View Tips] [Reschedule]
```

---

## 📚 Skill Learning Page

### Overview
Online courses and skill development resources.

### Components
```
Available Courses:
- Financial Planning Basics
- Advanced Excel
- Python Programming
- Digital Marketing
- Project Management

Enrolled Courses:
- Financial Planning Basics    45% Complete
- Advanced Excel               20% Complete

Learning Features:
- Video lectures
- Quizzes
- Certificates
- Progress tracking
- Community forums

[Browse Courses] [My Learning] [Achievements]
```

---

## 🏆 Gamification Page

### Overview
Earn points and badges through financial habits.

### Components
```
Your Level: 12
XP: 8,450 / 10,000 (84.5%)
Streak: 45 days
Total XP Earned: 125,450

Badges Earned:
- 🏆 Debt Warrior (Pay ₹1,00,000)
- 💰 Saver (Save ₹50,000)
- 📊 Analyst (Create 10 budgets)
- 🎯 Goal Setter (Create 5 goals)

Leaderboard:
1. Raj Kumar - Level 18
2. Priya Singh - Level 17
3. You - Level 12
4. Amit Patel - Level 11

Daily Challenges:
- Log an expense
- Review budget
- Update goals
- Track income

[View Rewards] [Redeem] [Leaderboard]
```

---

## 🎁 Referral Page

### Overview
Earn rewards by referring friends.

### Components
```
Your Referral Stats:
- Referral Link: https://cleero.app/ref/ABC123
- Friends Referred: 8
- Rewards Earned: ₹4,000
- Pending Rewards: ₹2,000

Referral Program:
- Friend joins: ₹500 bonus
- Friend completes onboarding: ₹500 bonus
- Friend activates premium: ₹1,000 bonus

Referred Friends:
1. Rahul (Joined 2 months ago) - Completed
2. Neha (Joined 1 month ago) - In Progress
3. Akshay (Pending) - Waiting to join

[Copy Link] [Share] [View Rewards] [Redeem]
```

---

## 🛒 Marketplace Page

### Overview
Financial products and services marketplace.

### Components
```
Featured Products:
- Insurance Plans
- Investment Products
- Loans & Credit
- Financial Courses

Product Card:
- Product Name
- Provider
- Rating & Reviews
- Price/Pricing
- Description
- "Learn More" / "Purchase" button

Filters:
- Category
- Price Range
- Rating
- Provider

[Browse All] [My Purchases] [Wishlist]
```

---

## ⭐ Premium Page

### Overview
Premium subscription management.

### Components
```
Current Plan: Free
Upgrade Benefits:

Premium Features:
✓ Unlimited bank connections
✓ Advanced analytics
✓ Priority support
✓ No ads
✓ Export reports
✓ Custom budgets

Pricing:
- Monthly: ₹299/month
- Yearly: ₹2,999/year (Save 17%)
- Lifetime: ₹9,999 (One-time)

[Upgrade Now] [View All Features] [Contact Support]
```

---
