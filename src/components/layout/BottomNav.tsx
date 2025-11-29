import { motion } from "framer-motion";
import { LayoutDashboard, Bot, CreditCard, PieChart, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Home", href: "/", isActive: true },
  { icon: Bot, label: "Coach", href: "/coach", badge: 3 },
  { icon: CreditCard, label: "Accounts", href: "/accounts" },
  { icon: PieChart, label: "Reports", href: "/reports" },
  { icon: User, label: "More", href: "/more" },
];

export function BottomNav() {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-xl lg:hidden"
    >
      <div className="flex items-center justify-around px-2 py-1.5 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors",
                item.isActive
                  ? "text-emerald"
                  : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson px-1 text-[9px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1.5 h-0.5 w-6 rounded-full bg-emerald"
                />
              )}
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
