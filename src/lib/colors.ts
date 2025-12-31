/**
 * Centralized Color System
 * Define all color schemes in one place and use them across the entire app
 * This ensures consistency and makes it easy to update colors globally
 */

// Badge/Tag Colors - for status, category, and priority badges
export const badgeColors = {
  // Priority Levels
  high: "bg-destructive/10 text-destructive dark:text-red-400",
  medium: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  low: "bg-green-600/10 text-green-700 dark:text-green-400",

  // Status Colors
  success: "bg-green-600/10 text-green-700 dark:text-green-400",
  warning: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  error: "bg-destructive/10 text-destructive dark:text-red-400",
  info: "bg-primary/10 text-primary dark:text-primary",

  // Notification Types
  success_notification: "bg-emerald/10 text-emerald",
  warning_notification: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  milestone: "bg-primary/10 text-primary dark:text-primary",
  default: "bg-primary/10 text-primary dark:text-primary",
};

// Expense/Income Category Colors
export const categoryColors = {
  // Expense Categories
  food: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  shopping: "bg-pink-600/10 text-pink-700 dark:text-pink-400",
  utilities: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  transportation: "bg-primary/10 text-primary dark:text-primary",
  health: "bg-destructive/10 text-destructive dark:text-red-400",
  education: "bg-primary/10 text-primary dark:text-primary",

  // Income Categories
  salary: "bg-primary/10 text-primary dark:text-primary",
  freelance: "bg-primary/10 text-primary dark:text-primary",
  rental: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
  investment: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  bonus: "bg-pink-600/10 text-pink-700 dark:text-pink-400",
  other: "bg-muted text-muted-foreground",
};

// Goal Status Colors
export const goalStatusColors = {
  completed: "bg-green-600/10 text-green-700 dark:text-green-400",
  on_track: "bg-primary/10 text-primary dark:text-primary",
  at_risk: "bg-destructive/10 text-destructive dark:text-red-400",
  default: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
};

// Debt Type Colors
export const debtTypeColors = {
  home_loan: "bg-blue-600/10 text-blue-700 dark:text-blue-400",
  car_loan: "bg-primary/10 text-primary dark:text-primary",
  credit_card: "bg-destructive/10 text-destructive dark:text-red-400",
  personal_loan: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  default: "bg-green-600/10 text-green-700 dark:text-green-400",
};

// Icon Colors - for various status icons
export const iconColors = {
  primary: "text-primary dark:text-primary",
  success: "text-green-600 dark:text-green-500",
  error: "text-destructive dark:text-red-400",
  warning: "text-amber-600 dark:text-amber-500",
  info: "text-primary dark:text-primary",
  muted: "text-muted-foreground",
};

// Progress/Amount Colors
export const amountColors = {
  positive: "text-green-600 dark:text-green-500",
  negative: "text-red-600 dark:text-red-500",
  neutral: "text-muted-foreground",
};

// Progress Bar Colors
export const progressColors = {
  over_budget: "bg-red-500 dark:bg-red-600",
  on_track: "bg-green-500 dark:bg-green-600",
  warning: "bg-amber-500 dark:bg-amber-600",
};

// Card Background Colors
export const cardBackgrounds = {
  default: "bg-card/50 border-primary/20",
  success: "bg-green-600/10",
  warning: "bg-amber-600/10",
  error: "bg-destructive/10",
  info: "bg-primary/10",
  muted: "bg-muted",
};

// Dark Mode Accent Colors - used in dark mode backgrounds and accents
export const darkModeAccents = {
  darkBlue1: "dark:bg-[rgb(4,35,51)]", // Primary dark background
  darkBlue2: "dark:bg-[rgb(6,43,63)]", // Secondary dark background
  lightGray: "bg-[rgb(231,234,236)] dark:text-[rgb(231,234,236)]", // Light text/background
};

// Border Colors
export const borderColors = {
  primary: "border-primary/20",
  success: "border-green-600/20",
  warning: "border-amber-600/20",
  error: "border-destructive/20",
  muted: "border-muted",
};

// Helper function to get badge color by type
export const getBadgeColor = (type: string, colorMap: Record<string, string>): string => {
  return colorMap[type] || colorMap.default || colorMap[Object.keys(colorMap)[0]];
};

// Helper function to get icon color by status
export const getIconColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    success: iconColors.success,
    completed: iconColors.success,
    error: iconColors.error,
    warning: iconColors.warning,
    info: iconColors.info,
  };
  return statusMap[status] || iconColors.primary;
};

// Helper function to get amount color based on type
export const getAmountColor = (type: "income" | "expense" | "neutral"): string => {
  if (type === "income") return amountColors.positive;
  if (type === "expense") return amountColors.negative;
  return amountColors.neutral;
};
