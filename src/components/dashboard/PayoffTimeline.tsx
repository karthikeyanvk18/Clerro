import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";
import { Target, TrendingDown } from "lucide-react";

interface TimelineData {
  month: string;
  debt: number;
  projected: number;
}

interface PayoffTimelineProps {
  data: TimelineData[];
  targetDate: string;
  totalDebt: number;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-card p-3 shadow-card">
        <p className="text-caption font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-body-sm">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                entry.dataKey === "debt" ? "bg-crimson" : "bg-emerald"
              )}
            />
            <span className="text-muted-foreground">
              {entry.dataKey === "debt" ? "Current" : "Projected"}:
            </span>
            <span className="font-semibold">₹{entry.value.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function PayoffTimeline({ data, targetDate, totalDebt, className }: PayoffTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.5 }}
      className={cn("rounded-2xl border bg-card p-6 shadow-card", className)}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-h3 font-semibold">Debt Payoff Timeline</h3>
          <p className="text-caption text-muted-foreground">
            Projected debt-free by {targetDate}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-emerald/10 px-3 py-1.5">
          <Target className="h-4 w-4 text-emerald" />
          <span className="text-caption font-medium text-emerald">On Track</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-xl bg-secondary/50 p-3">
          <p className="text-caption text-muted-foreground mb-1">Total Debt</p>
          <p className="text-h3 font-bold text-crimson">
            ₹{totalDebt.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-3">
          <p className="text-caption text-muted-foreground mb-1">Monthly Savings</p>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-emerald" />
            <p className="text-h3 font-bold text-emerald">₹12,500</p>
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="debtGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-expense))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-expense))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-income))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-income))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickFormatter={(value) => `₹${value / 100000}L`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="debt"
              stroke="hsl(var(--chart-expense))"
              strokeWidth={2}
              fill="url(#debtGradient)"
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="hsl(var(--chart-income))"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#projectedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
