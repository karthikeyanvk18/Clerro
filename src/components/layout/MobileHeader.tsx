import { motion } from "framer-motion";
import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MobileHeaderProps {
  userName?: string;
}

export function MobileHeader({ userName = "Arjun" }: MobileHeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [hasNotifications] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl px-4 py-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-slate">
            <span className="text-xs font-bold text-white">C</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Good morning</p>
            <p className="text-sm font-semibold -mt-0.5">{userName} 👋</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon-sm" className="relative">
            <Bell className="h-4 w-4" />
            {hasNotifications && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-crimson" />
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
