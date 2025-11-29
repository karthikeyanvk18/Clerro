import { motion } from "framer-motion";
import { Bot, Lightbulb, AlertTriangle, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tip {
  id: string;
  type: "tip" | "warning" | "achievement";
  message: string;
}

const tips: Tip[] = [
  {
    id: "1",
    type: "warning",
    message: "EMI ratio 44% - reduce expenses",
  },
  {
    id: "2",
    type: "tip",
    message: "Pay ₹5K extra to save ₹12K interest",
  },
  {
    id: "3",
    type: "achievement",
    message: "25% debt cleared! Keep going 🎉",
  },
];

const typeConfig = {
  tip: { icon: Lightbulb, color: "text-gold", bg: "bg-gold/10" },
  warning: { icon: AlertTriangle, color: "text-crimson", bg: "bg-crimson/10" },
  achievement: { icon: Sparkles, color: "text-emerald", bg: "bg-emerald/10" },
};

export function MobileAICoach() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mx-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald/10">
            <Bot className="h-3.5 w-3.5 text-emerald" />
          </div>
          <span className="text-xs font-semibold">AI Insights</span>
        </div>
        <a href="/coach" className="flex items-center text-[10px] text-emerald font-medium">
          View All <ChevronRight className="h-3 w-3" />
        </a>
      </div>

      {/* Horizontal Scroll Tips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        {tips.map((tip, index) => {
          const config = typeConfig[tip.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={cn(
                "flex-shrink-0 w-52 rounded-xl border p-2.5",
                config.bg,
                "border-transparent"
              )}
            >
              <div className="flex gap-2">
                <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", config.color)} />
                <p className="text-[11px] leading-tight">{tip.message}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
