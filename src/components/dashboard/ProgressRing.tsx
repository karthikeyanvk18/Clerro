import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  variant?: "default" | "success" | "danger" | "warning";
  showLabel?: boolean;
  label?: string;
}

const variantColors = {
  default: "stroke-slate",
  success: "stroke-emerald",
  danger: "stroke-crimson",
  warning: "stroke-gold",
};

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  variant = "success",
  showLabel = true,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn("progress-ring", variantColors[variant])}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.36, delay: 0.8 }}
            className="text-h2 font-bold"
          >
            {Math.round(progress)}%
          </motion.span>
          {label && (
            <span className="text-caption text-muted-foreground">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}
