// Cleero Financial Compass - Main App Router
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Coach from "./pages/Coach";
import Debts from "./pages/Debts";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import EMIAndLoans from "./pages/EMIAndLoans";
import BudgetAndExpenses from "./pages/BudgetAndExpenses";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Premium from "./pages/Premium";
import Notifications from "./pages/Notifications";
import Referral from "./pages/Referral";
import Reports from "./pages/Reports";
import Integrations from "./pages/Integrations";
import DebtDetail from "./pages/DebtDetail";
import AddDebt from "./pages/AddDebt";
import EditDebt from "./pages/EditDebt";
import MakePayment from "./pages/MakePayment";
import IncomeDetail from "./pages/IncomeDetail";
import ExpenseDetail from "./pages/ExpenseDetail";
import GoalDetail from "./pages/GoalDetail";
import Jobs from "./pages/Jobs";
import BankSync from "./pages/BankSync";
import AIAdvice from "./pages/AIAdvice";
import Investments from "./pages/Investments";
import BillReminders from "./pages/BillReminders";
import ResumeBuilder from "./pages/ResumeBuilder";
import SkillLearning from "./pages/SkillLearning";
import InterviewTracker from "./pages/InterviewTracker";
import Gamification from "./pages/Gamification";
import DataVault from "./pages/DataVault";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import { JobsProvider } from "@/contexts/JobsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <JobsProvider>
        <SidebarProvider>
          <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </JobsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
