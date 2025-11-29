import { motion } from "framer-motion";
import { CalendarClock, CreditCard, Building2, Car, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EMI {
  id: string;
  name: string;
  type: "credit_card" | "home_loan" | "car_loan" | "education";
  amount: number;
  dueDate: string;
  daysLeft: number;
  isPaid: boolean;
}

interface EMIListProps {
  emis: EMI[];
  className?: string;
}

const typeConfig = {
  credit_card: { icon: CreditCard, color: "text-crimson", bg: "bg-crimson/10" },
  home_loan: { icon: Building2, color: "text-slate", bg: "bg-slate/10" },
  car_loan: { icon: Car, color: "text-navy", bg: "bg-navy/10" },
  education: { icon: GraduationCap, color: "text-gold", bg: "bg-gold/10" },
};

export function EMIList({ emis, className }: EMIListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.4 }}
      className={cn("rounded-2xl border bg-card p-6 shadow-card", className)}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-h3 font-semibold">Upcoming EMIs</h3>
          <p className="text-caption text-muted-foreground">Next 30 days</p>
        </div>
        <CalendarClock className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {emis.map((emi, index) => {
          const config = typeConfig[emi.type];
          const Icon = config.icon;
          const isUrgent = emi.daysLeft <= 3 && !emi.isPaid;

          return (
            <motion.div
              key={emi.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.36, delay: 0.5 + index * 0.08 }}
              className={cn(
                "flex items-center gap-4 rounded-xl p-4 transition-colors",
                isUrgent ? "bg-crimson/5 border border-crimson/20" : "bg-secondary/50",
                emi.isPaid && "opacity-60"
              )}
            >
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", config.bg)}>
                <Icon className={cn("h-5 w-5", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-body-sm font-medium truncate">{emi.name}</p>
                  {emi.isPaid && (
                    <span className="inline-flex items-center rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-medium text-emerald">
                      Paid
                    </span>
                  )}
                </div>
                <p className="text-caption text-muted-foreground">
                  {emi.dueDate} • {emi.daysLeft} days left
                </p>
              </div>
              <div className="text-right">
                <p className="text-body-sm font-semibold">
                  ₹{emi.amount.toLocaleString("en-IN")}
                </p>
                {isUrgent && (
                  <span className="text-[10px] font-medium text-crimson">Urgent</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button variant="outline" className="mt-5 w-full">
        View All EMIs
      </Button>
    </motion.div>
  );
}
