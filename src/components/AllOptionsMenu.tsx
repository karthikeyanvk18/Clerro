import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MoreVertical,
  FileText,
  Share2,
  Zap,
  Link2,
  Settings,
  Heart,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuOption {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
  color?: string;
}

const allOptions: MenuOption[] = [
  { icon: User, label: "Profile", href: "/profile", color: "text-blue-600" },
  { icon: LogOut, label: "Account", href: "/account", color: "text-purple-600" },
  { icon: FileText, label: "Reports", href: "/reports", color: "text-blue-600" },
  { icon: Share2, label: "Referrals", href: "/referral", color: "text-purple-600" },
  { icon: Zap, label: "Integrations", href: "/integrations", color: "text-orange-600" },
  { icon: Zap, label: "Upgrade Pro", href: "/premium", color: "text-emerald", badge: "★" },
  { icon: Settings, label: "Settings", href: "/settings", color: "text-gray-600" },
  { icon: Heart, label: "Support", href: "#", color: "text-crimson" },
  { icon: HelpCircle, label: "Help", href: "#", color: "text-blue-600" },
];

export function AllOptionsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    if (href !== "#") {
      navigate(href);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <MoreVertical className="h-5 w-5" />
      </Button>

      {/* Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-background border-t max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm">
                <h2 className="text-lg font-bold">All Options</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Menu Items */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {allOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigate(option.href)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-secondary/50 transition-colors active:bg-secondary"
                    >
                      <div className={`p-3 rounded-lg bg-secondary/50 ${option.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-medium text-center">{option.label}</span>
                      {option.badge && (
                        <span className="text-xs font-bold text-crimson">
                          {option.badge}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom spacing */}
              <div className="h-6" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
