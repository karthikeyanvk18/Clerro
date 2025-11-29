import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  CreditCard,
  PieChart,
  Target,
  Settings,
  HelpCircle,
  ChevronLeft,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
  isActive?: boolean;
}

const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", isActive: true },
  { icon: Bot, label: "AI Coach", href: "/coach", badge: "3" },
  { icon: CreditCard, label: "Debts", href: "/debts" },
  { icon: Wallet, label: "Income", href: "/income" },
  { icon: TrendingUp, label: "Expenses", href: "/expenses" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: PieChart, label: "Reports", href: "/reports" },
];

const bottomNavItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ isOpen = true, onClose, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 72 : 256 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col border-r bg-sidebar pt-16 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:pt-0",
          !isOpen && "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 hidden h-6 w-6 rounded-full border bg-background shadow-sm lg:flex"
        >
          <ChevronLeft
            className={cn(
              "h-3 w-3 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          <div className="mb-2 px-3">
            <span
              className={cn(
                "text-caption font-medium uppercase tracking-wider text-muted-foreground",
                isCollapsed && "sr-only"
              )}
            >
              Menu
            </span>
          </div>
          {mainNavItems.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Bottom Nav */}
        <div className="border-t p-3 space-y-1">
          {bottomNavItems.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        {/* Upgrade Card */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="m-3 rounded-xl bg-gradient-to-br from-navy to-slate p-4"
          >
            <p className="text-body-sm font-semibold text-primary-foreground mb-1">
              Upgrade to Pro
            </p>
            <p className="text-caption text-primary-foreground/80 mb-3">
              Unlock all AI features
            </p>
            <Button variant="gold" size="sm" className="w-full">
              Upgrade Now
            </Button>
          </motion.div>
        )}
      </motion.aside>
    </>
  );
}

function NavButton({
  item,
  isCollapsed,
}: {
  item: NavItem;
  isCollapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-body-sm font-medium transition-colors",
        item.isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 shrink-0",
          item.isActive ? "text-emerald" : "text-sidebar-foreground/60"
        )}
      />
      {!isCollapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-crimson px-1.5 text-[10px] font-bold text-primary-foreground">
              {item.badge}
            </span>
          )}
        </>
      )}
    </a>
  );
}
