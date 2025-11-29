import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "danger" | "warning";
  className?: string;
  delay?: number;
}

const variantStyles = {
  default: "bg-card border-border",
  success: "bg-card border-emerald/30",
  danger: "bg-card border-crimson/30",
  warning: "bg-card border-gold/30",
};

const iconVariants = {
  default: "bg-secondary text-foreground",
  success: "bg-emerald/10 text-emerald",
  danger: "bg-crimson/10 text-crimson",
  warning: "bg-gold/10 text-gold",
};

export function KPICard({
  title,
  value,
  prefix = "₹",
  suffix = "",
  icon: Icon,
  trend,
  variant = "default",
  className,
  delay = 0,
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      setDisplayValue(Math.round(current));

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return (num / 100000).toFixed(2) + "L";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString("en-IN");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: delay * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "kpi-card rounded-2xl border p-6 shadow-card",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-body-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-caption text-muted-foreground">{prefix}</span>
            <span className="text-h1 font-bold tabular-nums">
              {formatNumber(displayValue)}
            </span>
            {suffix && (
              <span className="text-caption text-muted-foreground">{suffix}</span>
            )}
          </div>
          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-medium",
                trend.isPositive
                  ? "bg-emerald/10 text-emerald"
                  : "bg-crimson/10 text-crimson"
              )}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            iconVariants[variant]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
