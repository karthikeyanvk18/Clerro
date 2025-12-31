import { motion } from "framer-motion";
import { LayoutDashboard, Bot, CreditCard, TrendingUp, MoreVertical, Briefcase, Building2, Brain, FileText, Trophy, Shield, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { AllOptionsMenu } from "@/components/AllOptionsMenu";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Bot, label: "Coach", href: "/coach", badge: 3 },
  { icon: TrendingUp, label: "Investments", href: "/investments" },
  { icon: Building2, label: "Bank", href: "/bank-sync" },
  { icon: Trophy, label: "Rewards", href: "/gamification" },
  { icon: FileText, label: "Resume", href: "/resume" },
  { icon: Shield, label: "Vault", href: "/vault" },
  { icon: ShoppingCart, label: "Market", href: "/marketplace" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

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
          const isActive = location.pathname === item.href;
          
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors",
                isActive
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
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1.5 h-0.5 w-6 rounded-full bg-emerald"
                />
              )}
            </button>
          );
        })}
        
        <AllOptionsMenu />
      </div>
    </motion.nav>
  );
}
