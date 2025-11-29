import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

interface ChartData {
  month: string;
  income: number;
  expense: number;
}

interface IncomeExpenseChartProps {
  data: ChartData[];
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
                entry.dataKey === "income" ? "bg-emerald" : "bg-crimson"
              )}
            />
            <span className="text-muted-foreground capitalize">{entry.dataKey}:</span>
            <span className="font-semibold">₹{entry.value.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function IncomeExpenseChart({ data, className }: IncomeExpenseChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.2 }}
      className={cn("rounded-2xl border bg-card p-6 shadow-card", className)}
    >
      <div className="mb-5">
        <h3 className="text-h3 font-semibold">Income vs Expenses</h3>
        <p className="text-caption text-muted-foreground">Last 6 months overview</p>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald" />
          <span className="text-body-sm text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-crimson" />
          <span className="text-body-sm text-muted-foreground">Expenses</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }} />
            <Bar dataKey="income" radius={[6, 6, 0, 0]} fill="hsl(var(--chart-income))" />
            <Bar dataKey="expense" radius={[6, 6, 0, 0]} fill="hsl(var(--chart-expense))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
