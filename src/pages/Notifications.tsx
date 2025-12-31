import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  MessageSquare,
  Trophy,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
  Check,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "milestone";
  timestamp: Date;
  read: boolean;
  icon: React.ElementType;
  actionUrl?: string;
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

export default function Notifications() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  // Notification Preferences State
  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    emailNotifications: true,
    emiReminders: true,
    budgetAlerts: true,
    milestoneCelebrations: true,
    weeklyDigest: true,
    sound: true,
    vibration: true,
  });

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
    switch (type) {
      case "success":
        return "bg-emerald/10 text-emerald";
      case "warning":
        return "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "milestone":
        return "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400";
      default:
        return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
    }
  };

  const getTypeIcon = (notification: Notification) => {
    const Icon = notification.icon;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-navy/5 pb-20 lg:pb-8">
      {/* Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h2 font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground mt-1">
                  {unreadCount} new notification{unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                <span className="flex items-center gap-1">
                  Unread
                  {unreadCount > 0 && (
                    <Badge className="ml-1 bg-crimson">{unreadCount}</Badge>
                  )}
                </span>
              </TabsTrigger>
              <TabsTrigger value="warning">Alerts</TabsTrigger>
              <TabsTrigger value="milestone">Milestones</TabsTrigger>
            </TabsList>

            {/* Action Bar */}
            {unreadCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  Mark all as read
                </Button>
              </motion.div>
            )}

            {/* Notifications List */}
            {["all", "unread", "warning", "milestone"].map((tab) => (
              <TabsContent
                key={tab}
                value={tab}
                className="space-y-4 mt-6"
              >
                {filteredNotifications.length > 0 ? (
                  <motion.div className="space-y-3">
                    {filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          className={cn(
                            "p-4 lg:p-6 transition-all cursor-pointer hover:shadow-md",
                            !notification.read && "border-l-4 border-l-emerald bg-emerald/5"
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div
                              className={cn(
                                "p-3 rounded-lg flex-shrink-0",
                                getTypeColor(notification.type)
                              )}
                            >
                              {getTypeIcon(notification)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3
                                  className={`font-semibold truncate ${
                                    !notification.read
                                      ? "text-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="h-2 w-2 rounded-full bg-emerald flex-shrink-0 mt-2" />
                                )}
                              </div>

                              <p className="text-body-sm text-muted-foreground mb-3">
                                {notification.message}
                              </p>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-caption text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(notification.timestamp)}
                                </span>

                                {notification.actionUrl && (
                                  <Button variant="ghost" size="sm">
                                    View Details
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  title="Mark as read"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-destructive hover:text-destructive"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {tab === "unread"
                        ? "No unread notifications"
                        : "No notifications"}
                    </p>
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Notification Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 mt-12 pt-8 border-t"
        >
          <div>
            <h2 className="text-h2 font-bold mb-2">Notification Preferences</h2>
            <p className="text-muted-foreground">
              Customize how and when you receive notifications
            </p>
          </div>

          {/* Preferences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Push Notifications */}
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Push Notifications</p>
                  <p className="text-caption text-muted-foreground">
                    Real-time alerts on your device
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.pushNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    pushNotifications: checked,
                  })
                }
              />
            </Card>

            {/* Email Notifications */}
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Email Notifications</p>
                  <p className="text-caption text-muted-foreground">
                    Daily/weekly email digest
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: checked,
                  })
                }
              />
            </Card>

            {/* EMI Reminders */}
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">EMI Reminders</p>
                  <p className="text-caption text-muted-foreground">
                    3 days before EMI due date
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.emiReminders}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    emiReminders: checked,
                  })
                }
              />
            </Card>

            {/* Budget Alerts */}
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Budget Alerts</p>
                  <p className="text-caption text-muted-foreground">
                    When approaching budget limits
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.budgetAlerts}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    budgetAlerts: checked,
                  })
                }
              />
            </Card>

            {/* Milestone Celebrations */}
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Trophy className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Milestones</p>
                  <p className="text-caption text-muted-foreground">
                    Celebrate your achievements
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.milestoneCelebrations}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    milestoneCelebrations: checked,
                  })
                }
              />
            </Card>

            {/* Weekly Digest */}
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Weekly Digest</p>
                  <p className="text-caption text-muted-foreground">
                    Sunday email summary
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.weeklyDigest}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    weeklyDigest: checked,
                  })
                }
              />
            </Card>
          </div>

          {/* Advanced Settings */}
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Device Settings</h3>

            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="font-medium text-sm">Sound</p>
                <p className="text-caption text-muted-foreground">
                  Play sound for notifications
                </p>
              </div>
              <Switch
                checked={preferences.sound}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    sound: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Vibration</p>
                <p className="text-caption text-muted-foreground">
                  Vibrate for notifications
                </p>
              </div>
              <Switch
                checked={preferences.vibration}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    vibration: checked,
                  })
                }
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
