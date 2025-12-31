// Cleero Financial Compass - Main App Router
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { PageLoader } from "@/components/PageLoader";
import { JobsProvider } from "@/contexts/JobsContext";

// Lazy load all pages for code splitting
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Coach = lazy(() => import("./pages/Coach"));
const Debts = lazy(() => import("./pages/Debts"));
const Income = lazy(() => import("./pages/Income"));
const Expenses = lazy(() => import("./pages/Expenses"));
const EMIAndLoans = lazy(() => import("./pages/EMIAndLoans"));
const BudgetAndExpenses = lazy(() => import("./pages/BudgetAndExpenses"));
const Goals = lazy(() => import("./pages/Goals"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const Account = lazy(() => import("./pages/Account"));
const Premium = lazy(() => import("./pages/Premium"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Referral = lazy(() => import("./pages/Referral"));
const Reports = lazy(() => import("./pages/Reports"));
const Integrations = lazy(() => import("./pages/Integrations"));
const DebtDetail = lazy(() => import("./pages/DebtDetail"));
const AddDebt = lazy(() => import("./pages/AddDebt"));
const EditDebt = lazy(() => import("./pages/EditDebt"));
const MakePayment = lazy(() => import("./pages/MakePayment"));
const IncomeDetail = lazy(() => import("./pages/IncomeDetail"));
const ExpenseDetail = lazy(() => import("./pages/ExpenseDetail"));
const GoalDetail = lazy(() => import("./pages/GoalDetail"));
const Jobs = lazy(() => import("./pages/Jobs"));
const BankSync = lazy(() => import("./pages/BankSync"));
const AIAdvice = lazy(() => import("./pages/AIAdvice"));
const Investments = lazy(() => import("./pages/Investments"));
const BillReminders = lazy(() => import("./pages/BillReminders"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const SkillLearning = lazy(() => import("./pages/SkillLearning"));
const InterviewTracker = lazy(() => import("./pages/InterviewTracker"));
const Gamification = lazy(() => import("./pages/Gamification"));
const DataVault = lazy(() => import("./pages/DataVault"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <JobsProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/coach" element={<Coach />} />
                <Route path="/debts" element={<Debts />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/emi-loans" element={<EMIAndLoans />} />
                <Route path="/budget-expenses" element={<BudgetAndExpenses />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/bank-sync" element={<BankSync />} />
                <Route path="/ai-advice" element={<AIAdvice />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/bills" element={<BillReminders />} />
                <Route path="/resume" element={<ResumeBuilder />} />
                <Route path="/skills" element={<SkillLearning />} />
                <Route path="/interviews" element={<InterviewTracker />} />
                <Route path="/gamification" element={<Gamification />} />
                <Route path="/vault" element={<DataVault />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/account" element={<Account />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/debt/:id" element={<DebtDetail />} />
                <Route path="/debt/add" element={<AddDebt />} />
                <Route path="/debt/:id/edit" element={<EditDebt />} />
                <Route path="/debt/:id/payment" element={<MakePayment />} />
                <Route path="/income/:id" element={<IncomeDetail />} />
                <Route path="/expense/:id" element={<ExpenseDetail />} />
                <Route path="/goal/:id" element={<GoalDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SidebarProvider>
      </JobsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
