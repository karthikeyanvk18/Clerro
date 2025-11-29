import { motion } from "framer-motion";
import { CreditCard, Wallet, TrendingDown, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIItem {
  label: string;
  value: string;
  icon: React.ElementType;
  variant: "danger" | "success" | "warning";
}

const kpis: KPIItem[] = [
  { label: "Debt", value: "₹8.47L", icon: CreditCard, variant: "danger" },
  { label: "Income", value: "₹1.02L", icon: Wallet, variant: "success" },
  { label: "Expense", value: "₹68K", icon: TrendingDown, variant: "warning" },
  { label: "Saved", value: "₹34K", icon: PiggyBank, variant: "success" },
];

const variantStyles = {
  danger: "text-crimson bg-crimson/10",
  success: "text-emerald bg-emerald/10",
  warning: "text-gold bg-gold/10",
};

export function MobileKPIStrip() {
  return (
    <div className="grid grid-cols-4 gap-2 px-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center gap-1 rounded-xl bg-card p-2 shadow-card"
          >
            <div className={cn("rounded-lg p-1.5", variantStyles[kpi.variant])}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-bold">{kpi.value}</span>
            <span className="text-[9px] text-muted-foreground">{kpi.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
