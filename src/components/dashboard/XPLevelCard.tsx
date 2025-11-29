import { motion } from "framer-motion";
import { Flame, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface XPLevelCardProps {
  level: number;
  currentXP: number;
  maxXP: number;
  streak: number;
  achievements: number;
  className?: string;
}

export function XPLevelCard({
  level,
  currentXP,
  maxXP,
  streak,
  achievements,
  className,
}: XPLevelCardProps) {
  const progress = (currentXP / maxXP) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.3 }}
      className={cn(
        "rounded-2xl border border-gold/20 bg-card p-6 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold/70 text-navy font-bold text-h2 shadow-glow-gold">
              {level}
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald text-[10px] text-primary-foreground font-bold"
            >
              ✓
            </motion.div>
          </div>
          <div>
            <h3 className="text-h3 font-semibold">Level {level}</h3>
            <p className="text-caption text-muted-foreground">Debt Crusher</p>
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption text-muted-foreground">Experience</span>
          <span className="text-caption font-medium">
            {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold/80"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-secondary/50 p-3 flex items-center gap-3">
          <div className="streak-badge flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/10">
            <Flame className="h-5 w-5 text-crimson" />
          </div>
          <div>
            <p className="text-h3 font-bold">{streak}</p>
            <p className="text-caption text-muted-foreground">Day Streak</p>
          </div>
        </div>
        <div className="rounded-xl bg-secondary/50 p-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
            <Trophy className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-h3 font-bold">{achievements}</p>
            <p className="text-caption text-muted-foreground">Badges</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
