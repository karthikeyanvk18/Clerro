import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useSidebar } from "@/contexts/SidebarContext";
import { MobileKPIStrip } from "@/components/dashboard/MobileKPIStrip";
import { MobileProgressCard } from "@/components/dashboard/MobileProgressCard";
import { MobileAICoach } from "@/components/dashboard/MobileAICoach";
import { MobileEMIList } from "@/components/dashboard/MobileEMIList";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { KPICard } from "@/components/dashboard/KPICard";
import { AICoachCard } from "@/components/dashboard/AICoachCard";
import { XPLevelCard } from "@/components/dashboard/XPLevelCard";
import { JobsWidget } from "@/components/dashboard/JobsWidget";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { EMIList } from "@/components/dashboard/EMIList";
import { PayoffTimeline } from "@/components/dashboard/PayoffTimeline";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Wallet,
  TrendingDown,
  CreditCard,
  PiggyBank,
} from "lucide-react";

// Sample Data
const chartData = [
  { month: "Aug", income: 85000, expense: 62000 },
  { month: "Sep", income: 92000, expense: 58000 },
  { month: "Oct", income: 78000, expense: 71000 },
  { month: "Nov", income: 95000, expense: 65000 },
  { month: "Dec", income: 88000, expense: 59000 },
  { month: "Jan", income: 102000, expense: 68000 },
];

const emiData = [
  {
    id: "1",
    name: "HDFC Credit Card",
    type: "credit_card" as const,
    amount: 15000,
    dueDate: "Jan 5, 2025",
    daysLeft: 2,
    isPaid: false,
  },
  {
    id: "2",
    name: "Home Loan - SBI",
    type: "home_loan" as const,
    amount: 42500,
    dueDate: "Jan 10, 2025",
    daysLeft: 7,
    isPaid: false,
  },
  {
    id: "3",
    name: "Car Loan - ICICI",
    type: "car_loan" as const,
    amount: 18200,
    dueDate: "Jan 15, 2025",
    daysLeft: 12,
    isPaid: false,
  },
  {
    id: "4",
    name: "Education Loan",
    type: "education" as const,
    amount: 8500,
    dueDate: "Dec 28, 2024",
    daysLeft: 0,
    isPaid: true,
  },
];

const timelineData = [
  { month: "Jan", debt: 850000, projected: 850000 },
  { month: "Mar", debt: 780000, projected: 720000 },
  { month: "May", debt: 710000, projected: 590000 },
  { month: "Jul", debt: 620000, projected: 460000 },
  { month: "Sep", debt: 520000, projected: 330000 },
  { month: "Nov", debt: 410000, projected: 200000 },
  { month: "Jan '26", debt: 300000, projected: 70000 },
];

const recommendations = [
  {
    id: "1",
    type: "warning" as const,
    message: "Your EMI-to-income ratio is 44%. Consider reducing expenses to stay under 40%.",
    action: "View Budget",
  },
  {
    id: "2",
    type: "tip" as const,
    message: "Paying ₹5,000 extra on your credit card can save you ₹12,340 in interest! 💰",
    action: "Apply Now",
  },
  {
    id: "3",
    type: "achievement" as const,
    message: "Congratulations! You've cleared 25% of your total debt. Keep it up! 🎉",
  },
  {
    id: "4",
    type: "insight" as const,
    message: "Your food expenses increased 23% this month. Review your dining habits.",
    action: "See Details",
  },
];

export default function Dashboard() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2">
          <MobileKPIStrip />
          <MobileProgressCard debtProgress={68} streak={23} level={12} />
          <MobileAICoach />
          <MiniChart />
          <MobileEMIList />
        </div>

        <BottomNav />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => toggleSidebar()} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-4 lg:p-6 pt-16">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1 className="text-h1 lg:text-display">
                  Good morning, <span className="gradient-text">Karthi</span>
                </h1>
                <p className="text-body text-muted-foreground mt-1">
                  Let's crush some debt today! You're doing great.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ProgressRing
                  progress={68}
                  size={80}
                  strokeWidth={6}
                  variant="success"
                  label="Debt Free"
                />
              </div>
            </motion.div>

            {/* KPI Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Debt"
                value={847500}
                icon={CreditCard}
                variant="danger"
                trend={{ value: 8.2, isPositive: true }}
                delay={0}
              />
              <KPICard
                title="Monthly Income"
                value={102000}
                icon={Wallet}
                variant="success"
                trend={{ value: 12.5, isPositive: true }}
                delay={1}
              />
              <KPICard
                title="Monthly Expenses"
                value={68000}
                icon={TrendingDown}
                variant="warning"
                trend={{ value: 4.3, isPositive: false }}
                delay={2}
              />
              <KPICard
                title="Savings This Month"
                value={34000}
                icon={PiggyBank}
                variant="success"
                trend={{ value: 22.1, isPositive: true }}
                delay={3}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Charts */}
              <div className="space-y-6 lg:col-span-2">
                <IncomeExpenseChart data={chartData} />
                <PayoffTimeline
                  data={timelineData}
                  targetDate="March 2026"
                  totalDebt={847500}
                />
              </div>

              {/* Right Column - AI Coach & Gamification */}
              <div className="space-y-6">
                <AICoachCard recommendations={recommendations} />
                <XPLevelCard
                  level={12}
                  currentXP={3450}
                  maxXP={5000}
                  streak={23}
                  achievements={8}
                />
              </div>
            </div>

            {/* Jobs Widget */}
            <JobsWidget />

            {/* EMI List */}
            <EMIList emis={emiData} />
          </div>
        </main>
      </div>
    </div>
  );
}
