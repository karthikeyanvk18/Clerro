import { motion } from "framer-motion";
import { Bot, Lightbulb, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Recommendation {
  id: string;
  type: "tip" | "warning" | "achievement" | "insight";
  message: string;
  action?: string;
}

interface AICoachCardProps {
  recommendations: Recommendation[];
  className?: string;
}

const typeConfig = {
  tip: {
    icon: Lightbulb,
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-crimson",
    bg: "bg-crimson/10",
    border: "border-crimson/20",
  },
  achievement: {
    icon: Sparkles,
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/20",
  },
  insight: {
    icon: TrendingUp,
    color: "text-slate",
    bg: "bg-slate/10",
    border: "border-slate/20",
  },
};

export function AICoachCard({ recommendations, className }: AICoachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.36, delay: 0.2 }}
      className={cn(
        "rounded-2xl border border-emerald/20 bg-card p-6 shadow-card",
        className
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10 ai-coach-glow">
          <Bot className="h-5 w-5 text-emerald" />
        </div>
        <div>
          <h3 className="text-h3 font-semibold">AI Financial Coach</h3>
          <p className="text-caption text-muted-foreground">
            Personalized insights for you
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const config = typeConfig[rec.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.36, delay: 0.3 + index * 0.1 }}
              className={cn(
                "rounded-xl border p-4",
                config.bg,
                config.border
              )}
            >
              <div className="flex gap-3">
                <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", config.color)} />
                <div className="flex-1 space-y-2">
                  <p className="text-body-sm leading-relaxed">{rec.message}</p>
                  {rec.action && (
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-caption">
                      {rec.action} →
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button variant="emerald" className="mt-5 w-full" size="lg">
        <Bot className="mr-2 h-4 w-4" />
        Chat with Coach
      </Button>
    </motion.div>
  );
}
