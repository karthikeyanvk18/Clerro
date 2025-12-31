import { motion } from "framer-motion";
import { Bell, Moon, Sun, User, Search, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface HeaderProps {
  userName?: string;
  className?: string;
  onMenuToggle?: () => void;
}

export function Header({ userName = "Karthi", className, onMenuToggle }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [hasNotifications] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-slate">
              <span className="text-sm font-bold text-primary-foreground">C</span>
            </div>
            <span className="hidden font-bold text-h3 sm:inline-block">Cleero</span>
          </div>
        </div>

        {/* Center: Search (hidden on mobile) */}
        <div className="hidden flex-1 max-w-md lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions, debts..."
              className="h-10 w-full rounded-xl border bg-secondary/50 pl-10 pr-4 text-body-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="ghost" size="icon-sm" onClick={toggleTheme}>
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon-sm" className="relative">
            <Bell className="h-5 w-5" />
            {hasNotifications && (
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-crimson" />
            )}
          </Button>

          <div className="ml-2 flex items-center gap-2 lg:gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-body-sm font-medium">Hi, {userName}</p>
              <p className="text-caption text-muted-foreground">Pro Member</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-9 w-9 p-0 shrink-0"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-emerald/70">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
