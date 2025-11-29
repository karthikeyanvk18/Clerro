import { motion } from "framer-motion";
import { Target, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileProgressCardProps {
  debtProgress: number;
  streak: number;
  level: number;
}

export function MobileProgressCard({ debtProgress, streak, level }: MobileProgressCardProps) {
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (debtProgress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mx-4 rounded-2xl bg-card p-3 shadow-card"
    >
      <div className="flex items-center gap-3">
        {/* Progress Ring */}
        <div className="relative">
          <svg width="64" height="64" className="-rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              className="text-secondary"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              className="stroke-emerald"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold">{debtProgress}%</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="h-3.5 w-3.5 text-emerald" />
            <span className="text-xs font-medium">Debt Free Progress</span>
          </div>
          <p className="text-[10px] text-muted-foreground mb-2">
            On track for March 2026
          </p>
          
          {/* Stats Row */}
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <div className="streak-badge flex h-6 w-6 items-center justify-center rounded-lg bg-crimson/10">
                <Flame className="h-3 w-3 text-crimson" />
              </div>
              <div>
                <p className="text-xs font-bold leading-none">{streak}</p>
                <p className="text-[9px] text-muted-foreground">Days</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gold/10">
                <Trophy className="h-3 w-3 text-gold" />
              </div>
              <div>
                <p className="text-xs font-bold leading-none">Lv.{level}</p>
                <p className="text-[9px] text-muted-foreground">Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
