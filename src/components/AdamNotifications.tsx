import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Bell,
  Home,
  Users,
  TrendingUp,
  Star,
  Heart,
  MessageCircle,
  Share2,
  DollarSign,
  MapPin,
  Clock,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Sparkles,
} from "lucide-react";

interface Notification {
  id: string;
  type:
    | "property_match"
    | "price_drop"
    | "new_message"
    | "social_share"
    | "system"
    | "promotion";
  title: {
    ar: string;
    en: string;
    ur: string;
  };
  message: {
    ar: string;
    en: string;
    ur: string;
  };
  timestamp: Date;
  read: boolean;
  priority: "high" | "medium" | "low";
  actionUrl?: string;
  actionLabel?: {
    ar: string;
    en: string;
    ur: string;
  };
  metadata?: any;
}

interface AdamNotificationsProps {
  language: "ar" | "en" | "ur";
  isVisible: boolean;
  onClose: () => void;
}

const AdamNotifications: React.FC<AdamNotificationsProps> = ({
  language,
  isVisible,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const getText = (ar: string, en: string, ur: string) => {
    return language === "ar" ? ar : language === "en" ? en : ur;
  };

  // Simulate real-time notifications
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: "notif_001",
        type: "property_match",
        title: {
          ar: "🏠 عقار جديد يطابق تفضيلاتك!",
          en: "🏠 New Property Matches Your Preferences!",
          ur: "🏠 نئی پراپرٹی آپ کی ترجیحات سے میل کھاتی ہے!",
        },
        message: {
          ar: "شقة في دبي مارينا بـ 1,200 درهم شهرياً - 95% مطابقة!",
          en: "Apartment in Dubai Marina for 1,200 AED monthly - 95% match!",
          ur: "دبئی مرینا میں اپارٹمنٹ 1,200 درہم ماہانہ - 95% میچ!",
        },
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        read: false,
        priority: "high",
        actionUrl: "/properties/dm_001",
        actionLabel: {
          ar: "مشاهدة العقار",
          en: "View Property",
          ur: "پراپرٹی دیکھیں",
        },
        metadata: { price: 1200, match: 95, area: "Dubai Marina" },
      },
      {
        id: "notif_002",
        type: "price_drop",
        title: {
          ar: "💰 انخفاض سعر في منطقتك المفضلة",
          en: "💰 Price Drop in Your Favorite Area",
          ur: "💰 آپ کے پسندیدہ علاقے میں قیمت میں کمی",
        },
        message: {
          ar: "انخفض سعر الشقق في الشارقة بـ 15% هذا الأسبوع!",
          en: "Apartment prices in Sharjah dropped by 15% this week!",
          ur: "اس ہفتے شارجہ میں اپارٹمنٹ کی قیمتوں میں 15% کمی!",
        },
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        read: false,
        priority: "medium",
        actionUrl: "/maps?area=sharjah",
        actionLabel: {
          ar: "استكشف العروض",
          en: "Explore Offers",
          ur: "آفرز دیکھیں",
        },
      },
      {
        id: "notif_003",
        type: "social_share",
        title: {
          ar: "📱 إعلانك حقق 50,000 مشاهدة!",
          en: "📱 Your Ad Reached 50,000 Views!",
          ur: "📱 آپ کے اشتہار کو 50,000 ویوز ملے!",
        },
        message: {
          ar: "إعلانك على انستغرام وتيك توك حقق وصولاً رائعاً - 120 استفسار!",
          en: "Your Instagram and TikTok ad achieved amazing reach - 120 inquiries!",
          ur: "آپ کے انسٹاگرام اور ٹک ٹاک ایڈ نے شاندار رسائی حاصل کی - 120 پوچھ گچھ!",
        },
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: true,
        priority: "medium",
        actionUrl: "/social-analytics",
        actionLabel: {
          ar: "عرض التحليلات",
          en: "View Analytics",
          ur: "تجزیات دیکھیں",
        },
      },
      {
        id: "notif_004",
        type: "new_message",
        title: {
          ar: "💬 رسالة جديدة من مهتم",
          en: "💬 New Message from Interested Person",
          ur: "💬 دلچسپی رکھنے والے کا نیا پیغام",
        },
        message: {
          ar: "أحمد محمد مهتم بغرفتك في دبي - يريد معاينة اليوم!",
          en: "Ahmed Mohammed is interested in your Dubai room - wants to view today!",
          ur: "احمد محمد آپ کے دبئی کمرے میں دلچسپی رکھتے ہیں - آج دیکھنا چاہتے ہیں!",
        },
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        read: false,
        priority: "high",
        actionUrl: "/messages/ahmed_001",
        actionLabel: {
          ar: "رد على الرسالة",
          en: "Reply Message",
          ur: "پیغام کا جواب",
        },
      },
      {
        id: "notif_005",
        type: "promotion",
        title: {
          ar: "🎉 عرض خاص: نشر مجاني لـ 3 أيام!",
          en: "🎉 Special Offer: 3 Days Free Posting!",
          ur: "🎉 خصوصی آفر: 3 دن مفت پوسٹنگ!",
        },
        message: {
          ar: "احتفالاً بوصولنا لـ 50,000 مستخدم، انشر إعلانك مجاناً لـ 3 أيام!",
          en: "Celebrating 50,000 users - post your ad free for 3 days!",
          ur: "50,000 صارفین کی تکمیل پر - 3 دن مفت اپنا اشتہار لگائیں!",
        },
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        read: false,
        priority: "medium",
        actionUrl: "/post-free",
        actionLabel: {
          ar: "انشر الآن",
          en: "Post Now",
          ur: "اب پوسٹ کریں",
        },
      },
    ];

    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.filter((n) => !n.read).length);

    // Simulate new notifications every 30 seconds
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: `notif_${Date.now()}`,
        type: Math.random() > 0.5 ? "property_match" : "new_message",
        title: {
          ar: "🔔 إشعار جديد من آدم",
          en: "🔔 New Notification from Adam",
          ur: "🔔 آدم کی طرف سے نئی اطلاع",
        },
        message: {
          ar: "لديك تحديث جديد يتطلب انتباهك",
          en: "You have a new update that requires your attention",
          ur: "آپ کے پاس ایک نئی اپڈیٹ ہے جس پر توجہ درکار ہے",
        },
        timestamp: new Date(),
        read: false,
        priority: "medium",
      };

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 notifications
      setUnreadCount((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const removeNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "property_match":
        return Home;
      case "price_drop":
        return DollarSign;
      case "new_message":
        return MessageCircle;
      case "social_share":
        return Share2;
      case "system":
        return Info;
      case "promotion":
        return Sparkles;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (
    type: Notification["type"],
    priority: Notification["priority"],
  ) => {
    if (priority === "high")
      return "from-red-500/20 to-pink-500/20 border-red-400/30";
    if (type === "property_match")
      return "from-gold-500/20 to-yellow-500/20 border-gold-400/30";
    if (type === "price_drop")
      return "from-emerald-500/20 to-green-500/20 border-emerald-400/30";
    if (type === "social_share")
      return "from-blue-500/20 to-cyan-500/20 border-blue-400/30";
    return "from-slate-500/20 to-gray-500/20 border-slate-400/30";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 w-96 max-h-[80vh] z-50">
      <Card className="bg-slate-900/95 border-gold-400/30 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Crown className="h-6 w-6 text-gold-400" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white">
                {getText(
                  "إشعارات آدم",
                  "Adam's Notifications",
                  "آدم کی اطلاعات",
                )}
              </h3>
              <p className="text-xs text-slate-400">
                {unreadCount} {getText("غير مقروء", "unread", "غیر پڑھا")}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">
                {getText(
                  "لا توجد إشعارات جديدة",
                  "No new notifications",
                  "کوئی نئی اطلاع نہیں",
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <Card
                    key={notification.id}
                    className={`transition-all cursor-pointer hover:scale-[1.02] ${
                      notification.read
                        ? "bg-slate-800/40 border-slate-700/30"
                        : `bg-gradient-to-r ${getNotificationColor(notification.type, notification.priority)}`
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            notification.priority === "high"
                              ? "bg-red-500/20"
                              : "bg-gold-500/20"
                          }`}
                        >
                          <IconComponent
                            className={`h-5 w-5 ${
                              notification.priority === "high"
                                ? "text-red-400"
                                : "text-gold-400"
                            }`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-white text-sm leading-tight">
                              {notification.title[language]}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>

                          <p className="text-slate-300 text-sm mt-1 leading-tight">
                            {notification.message[language]}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock className="h-3 w-3" />
                              {new Intl.RelativeTimeFormat(
                                language === "ar" ? "ar" : "en",
                                {
                                  numeric: "auto",
                                },
                              ).format(
                                Math.floor(
                                  (notification.timestamp.getTime() -
                                    Date.now()) /
                                    60000,
                                ),
                                "minute",
                              )}
                            </div>

                            {notification.actionLabel && (
                              <Button
                                size="sm"
                                className="h-6 text-xs bg-gold-500/80 hover:bg-gold-600/80"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (notification.actionUrl) {
                                    window.location.href =
                                      notification.actionUrl;
                                  }
                                }}
                              >
                                {notification.actionLabel[language]}
                              </Button>
                            )}
                          </div>

                          {!notification.read && (
                            <div className="absolute top-2 left-2 w-2 h-2 bg-gold-400 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-700/50">
          <Button
            className="w-full bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
            onClick={() => {
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true })),
              );
              setUnreadCount(0);
            }}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {getText("قراءة الكل", "Mark All Read", "سب پڑھا ہوا")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdamNotifications;
