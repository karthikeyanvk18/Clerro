import { motion } from "framer-motion";
import { CreditCard, Building2, Car, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EMI {
  id: string;
  name: string;
  type: "credit_card" | "home_loan" | "car_loan";
  amount: number;
  daysLeft: number;
}

const emis: EMI[] = [
  { id: "1", name: "HDFC Card", type: "credit_card", amount: 15000, daysLeft: 2 },
  { id: "2", name: "Home Loan", type: "home_loan", amount: 42500, daysLeft: 7 },
  { id: "3", name: "Car Loan", type: "car_loan", amount: 18200, daysLeft: 12 },
];

const typeConfig = {
  credit_card: { icon: CreditCard, color: "text-crimson", bg: "bg-crimson/10" },
  home_loan: { icon: Building2, color: "text-slate", bg: "bg-slate/10" },
  car_loan: { icon: Car, color: "text-navy", bg: "bg-navy/10" },
};

export function MobileEMIList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mx-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold">Upcoming EMIs</span>
        <a href="/debts" className="flex items-center text-[10px] text-primary font-medium">
          See All <ChevronRight className="h-3 w-3" />
        </a>
      </div>

      <div className="space-y-2">
        {emis.map((emi, index) => {
          const config = typeConfig[emi.type];
          const Icon = config.icon;
          const isUrgent = emi.daysLeft <= 3;

          return (
            <motion.div
              key={emi.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              className={cn(
                "flex items-center gap-3 rounded-xl p-2.5",
                isUrgent ? "bg-crimson/5 border border-crimson/20" : "bg-card shadow-card"
              )}
            >
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", config.bg)}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{emi.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {emi.daysLeft} days left
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold">₹{(emi.amount / 1000).toFixed(1)}K</p>
                {isUrgent && (
                  <span className="text-[9px] font-medium text-crimson">Urgent</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
