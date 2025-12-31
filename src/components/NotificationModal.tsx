import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Mail,
  MessageSquare,
  Trophy,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Check,
  Eye,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { badgeColors, getBadgeColor } from "@/lib/colors";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "milestone";
  timestamp: Date;
  read: boolean;
  icon: React.ElementType;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "7-Day Tracking Streak! 🔥",
    message: "You've logged expenses for 7 consecutive days. Keep it up!",
    type: "milestone",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    icon: Trophy,
  },
  {
    id: "2",
    title: "EMI Due Soon",
    message: "Your Home Loan EMI of ₹50,000 is due on 30 Nov 2025",
    type: "warning",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: false,
    icon: AlertCircle,
  },
  {
    id: "3",
    title: "Expense Alert",
    message: "You've spent 85% of your Entertainment budget this month",
    type: "warning",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
    icon: TrendingDown,
  },
  {
    id: "4",
    title: "₹50,000 Debt Cleared! 🎉",
    message: "Congratulations! You've cleared your credit card debt.",
    type: "success",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
    icon: CheckCircle,
  },
  {
    id: "5",
    title: "Weekly Summary",
    message: "You saved ₹15,000 this week! Check your detailed report.",
    type: "info",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
    icon: Mail,
  },
];

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === activeTab);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeColor = (type: string) => {
    const typeMap: Record<string, string> = {
      success: badgeColors.success,
      warning: badgeColors.warning,
      milestone: badgeColors.info,
    };
    return typeMap[type] || badgeColors.info;
  };

  const getTypeIcon = (notification: Notification) => {
    const Icon = notification.icon;
    return <Icon className="h-5 w-5" />;
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    if (hours === 0) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 top-20 w-[calc(100%-2rem)] max-w-md bg-background border rounded-2xl shadow-2xl z-50 max-h-[600px] flex flex-col"
          >
            {/* Header */}
            <div className="border-b p-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Notifications</h2>
                {unreadCount > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {unreadCount} new
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full h-full flex flex-col"
              >
                <div className="border-b px-4 pt-3">
                  <TabsList className="grid w-full grid-cols-3 h-9">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs">
                      <span className="flex items-center gap-1">
                        Unread
                        {unreadCount > 0 && (
                          <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-crimson">
                            {unreadCount}
                          </Badge>
                        )}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="warning" className="text-xs">
                      Alerts
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Action Bar */}
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b px-4 py-2"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllAsRead}
                      className="w-full flex items-center justify-center gap-2 h-8 text-xs"
                    >
                      <Check className="h-3 w-3" />
                      Mark all as read
                    </Button>
                  </motion.div>
                )}

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                      >
                        <Card
                          className={`p-3 cursor-pointer transition-all ${
                            !notification.read
                              ? "bg-primary/5 border-primary/20"
                              : "hover:bg-secondary/50"
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            {/* Icon */}
                            <div
                              className={`flex-shrink-0 rounded-lg p-2 ${getTypeColor(
                                notification.type
                              )}`}
                            >
                              {getTypeIcon(notification)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-xs font-semibold line-clamp-1">
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-primary mt-1" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-caption text-muted-foreground mt-1">
                                {formatTime(notification.timestamp)}
                              </p>
                            </div>

                            {/* Delete Button */}
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="h-6 w-6 flex-shrink-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
