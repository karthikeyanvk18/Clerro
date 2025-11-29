import { motion } from "framer-motion";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

const data = [
  { income: 85, expense: 62 },
  { income: 92, expense: 58 },
  { income: 78, expense: 71 },
  { income: 95, expense: 65 },
  { income: 88, expense: 59 },
  { income: 102, expense: 68 },
];

export function MiniChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mx-4 rounded-xl bg-card p-3 shadow-card"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold">Income vs Expense</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald" />
            <span className="text-[9px] text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-crimson" />
            <span className="text-[9px] text-muted-foreground">Expense</span>
          </div>
        </div>
      </div>
      
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2}>
            <Bar dataKey="income" radius={[3, 3, 0, 0]} fill="hsl(var(--chart-income))" />
            <Bar dataKey="expense" radius={[3, 3, 0, 0]} fill="hsl(var(--chart-expense))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
