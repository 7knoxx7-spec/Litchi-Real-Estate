import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  Building2,
  Share2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  Heart,
  DollarSign,
  Calendar,
  BarChart3,
  Target,
  Zap,
  Settings,
  Plus,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Send,
  Clock,
  Star,
} from "lucide-react";

interface MarketplaceIntegrationsProps {
  language?: "ar" | "en";
}

interface Platform {
  id: string;
  name: string;
  nameAr: string;
  icon: any;
  color: string;
  connected: boolean;
  followers?: number;
  engagement?: number;
  posts?: number;
  features: string[];
  featuresAr: string[];
  pricing: {
    free: string[];
    freeAr: string[];
    premium: string[];
    premiumAr: string[];
    cost: string;
  };
}

const PLATFORMS: Platform[] = [
  {
    id: "dubizzle",
    name: "Dubizzle",
    nameAr: "دوبيزل",
    icon: Building2,
    color: "from-red-500 to-orange-500",
    connected: true,
    followers: 2500000,
    engagement: 8.5,
    posts: 45,
    features: [
      "Auto-posting with AI optimization",
      "Price suggestion engine",
      "Featured listing promotion",
      "Lead tracking & analytics",
      "Multi-language support",
    ],
    featuresAr: [
      "نشر تلقائي مع تحسين ذكي",
      "محرك اقتراح الأسعار",
      "ترويج الإعلانات المميزة",
      "تتبع العملاء والتحليلات",
      "دعم متعدد اللغات",
    ],
    pricing: {
      free: ["Basic listing", "3 photos", "Standard visibility"],
      freeAr: ["إعلان أساسي", "3 صور", "ظهور عادي"],
      premium: [
        "Featured listing",
        "Unlimited photos",
        "Top visibility",
        "Analytics",
      ],
      premiumAr: ["إعلان مميز", "صور غير محدودة", "ظهور أولي", "تحليلات"],
      cost: "AED 150/month",
    },
  },
  {
    id: "opensooq",
    name: "OpenSooq",
    nameAr: "السوق المفتوح",
    icon: Globe,
    color: "from-green-500 to-emerald-500",
    connected: true,
    followers: 1800000,
    engagement: 6.2,
    posts: 32,
    features: [
      "Regional targeting",
      "Smart categorization",
      "Bump ad feature",
      "Contact form integration",
      "Mobile app priority",
    ],
    featuresAr: [
      "استهداف إقليمي",
      "تصنيف ذكي",
      "ميزة رفع الإعلان",
      "تكامل نماذج التواصل",
      "أولوية التطبيق المحمول",
    ],
    pricing: {
      free: ["Basic listing", "5 photos", "Regional reach"],
      freeAr: ["إعلان أساسي", "5 صور", "وصول إقليمي"],
      premium: ["Premium placement", "Video support", "Priority support"],
      premiumAr: ["موقع مميز", "دعم الفيديو", "دعم أولي"],
      cost: "AED 100/month",
    },
  },
  {
    id: "bayut",
    name: "Bayut",
    nameAr: "بيوت",
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
    connected: false,
    features: [
      "Professional photography",
      "Virtual tour integration",
      "Lead management system",
      "Market insights",
      "Agent verification",
    ],
    featuresAr: [
      "تصوير احترافي",
      "تكامل الجولات الافتراضية",
      "نظام إدارة العملاء",
      "رؤى السوق",
      "تحقق الوكلاء",
    ],
    pricing: {
      free: ["Limited listings", "Basic photos", "Standard support"],
      freeAr: ["إعلانات محدودة", "صور أساسية", "دعم عادي"],
      premium: [
        "Unlimited listings",
        "Professional photos",
        "Priority placement",
      ],
      premiumAr: ["إعلانات غير محدودة", "صور احترافية", "موقع أولي"],
      cost: "AED 200/month",
    },
  },
  {
    id: "instagram",
    name: "Instagram",
    nameAr: "انستغرام",
    icon: Instagram,
    color: "from-pink-500 to-purple-500",
    connected: true,
    followers: 125000,
    engagement: 12.8,
    posts: 156,
    features: [
      "Stories & Reels automation",
      "Hashtag optimization",
      "Influencer connections",
      "Shopping tags",
      "Analytics dashboard",
    ],
    featuresAr: [
      "أتمتة القصص والريلز",
      "تحسين الهاشتاغات",
      "ربط المؤثرين",
      "علامات التسوق",
      "لوحة التحليلات",
    ],
    pricing: {
      free: ["Manual posting", "Basic hashtags", "Standard reach"],
      freeAr: ["نشر يدوي", "هاشتاغات أساسية", "وصول عادي"],
      premium: ["Auto-posting", "Advanced analytics", "Influencer network"],
      premiumAr: ["نشر تلقائي", "تحليلات متقدمة", "شبكة المؤثرين"],
      cost: "AED 75/month",
    },
  },
  {
    id: "facebook",
    name: "Facebook",
    nameAr: "فيسبوك",
    icon: Facebook,
    color: "from-blue-600 to-blue-700",
    connected: true,
    followers: 85000,
    engagement: 9.4,
    posts: 89,
    features: [
      "Group auto-posting",
      "Marketplace integration",
      "Event creation",
      "Targeted advertising",
      "Community building",
    ],
    featuresAr: [
      "نشر تلقائي في المجموعات",
      "تكامل السوق",
      "إنشاء الفعاليات",
      "إعلانات مستهدفة",
      "بناء المجتمع",
    ],
    pricing: {
      free: ["Basic posting", "Group sharing", "Event creation"],
      freeAr: ["نشر أساسي", "مشاركة المجموعات", "إنشاء فعاليات"],
      premium: ["Targeted ads", "Advanced insights", "Automated responses"],
      premiumAr: ["إعلانات مستهدفة", "رؤى متقدمة", "ردود تلقائية"],
      cost: "AED 120/month",
    },
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    nameAr: "لينكد إن",
    icon: Linkedin,
    color: "from-blue-700 to-blue-800",
    connected: false,
    features: [
      "Professional networking",
      "Corporate housing posts",
      "B2B lead generation",
      "Company page management",
      "Industry insights",
    ],
    featuresAr: [
      "شبكات مهنية",
      "منشورات الإسكان المؤسسي",
      "توليد عملاء B2B",
      "إدارة صفحة الشركة",
      "رؤى الصناعة",
    ],
    pricing: {
      free: ["Basic posts", "Standard networking", "Company updates"],
      freeAr: ["منشورات أساسية", "تواصل عادي", "تحديثات الشركة"],
      premium: ["InMail credits", "Advanced targeting", "Lead generation"],
      premiumAr: ["رسائل InMail", "استهداف متقدم", "توليد العملاء"],
      cost: "AED 180/month",
    },
  },
];

const MarketplaceIntegrations: React.FC<MarketplaceIntegrationsProps> = ({
  language = "ar",
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const connectedPlatforms = PLATFORMS.filter((p) => p.connected);
  const availablePlatforms = PLATFORMS.filter((p) => !p.connected);

  const handleConnect = async (platformId: string) => {
    setIsConnecting(platformId);
    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnecting(null);

    // Update platform status (in real app, this would be handled by state management)
    const platformIndex = PLATFORMS.findIndex((p) => p.id === platformId);
    if (platformIndex !== -1) {
      PLATFORMS[platformIndex].connected = true;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-gold-500/20 to-gold-600/20 border-gold-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gold-300">
                  {language === "ar"
                    ? "المنصات المتصلة"
                    : "Connected Platforms"}
                </p>
                <p className="text-2xl font-bold text-gold-400">
                  {connectedPlatforms.length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-gold-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-300">
                  {language === "ar" ? "إجمالي المتابعين" : "Total Followers"}
                </p>
                <p className="text-2xl font-bold text-emerald-400">
                  {formatNumber(
                    connectedPlatforms.reduce(
                      (sum, p) => sum + (p.followers || 0),
                      0,
                    ),
                  )}
                </p>
              </div>
              <Users className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300">
                  {language === "ar" ? "متوسط التفاعل" : "Avg Engagement"}
                </p>
                <p className="text-2xl font-bold text-blue-400">
                  {(
                    connectedPlatforms.reduce(
                      (sum, p) => sum + (p.engagement || 0),
                      0,
                    ) / connectedPlatforms.length || 0
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">
                  {language === "ar" ? "إجمالي المنشورات" : "Total Posts"}
                </p>
                <p className="text-2xl font-bold text-purple-400">
                  {connectedPlatforms.reduce(
                    (sum, p) => sum + (p.posts || 0),
                    0,
                  )}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {language === "ar" ? "نظرة عامة" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="platforms" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {language === "ar" ? "المنصات" : "Platforms"}
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            {language === "ar" ? "وسائل التواصل" : "Social Media"}
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            {language === "ar" ? "الأتمتة" : "Automation"}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connected Platforms */}
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  {language === "ar"
                    ? "المنصات المتصلة"
                    : "Connected Platforms"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {connectedPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}
                      >
                        <platform.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {language === "ar" ? platform.nameAr : platform.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {platform.followers &&
                            formatNumber(platform.followers)}{" "}
                          {language === "ar" ? "متابع" : "followers"}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                      {language === "ar" ? "متصل" : "Connected"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Available Platforms */}
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="h-5 w-5 text-gold-400" />
                  {language === "ar" ? "منصات متاحة" : "Available Platforms"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availablePlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center opacity-60`}
                      >
                        <platform.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {language === "ar" ? platform.nameAr : platform.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {platform.pricing.cost}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting === platform.id}
                      className="bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
                    >
                      {isConnecting === platform.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : language === "ar" ? (
                        "ربط"
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card className="bg-slate-800/60 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gold-400" />
                {language === "ar" ? "أداء المنصات" : "Platform Performance"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-700/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400">
                    {language === "ar"
                      ? "مخطط الأداء سيظهر هنا"
                      : "Performance chart will appear here"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLATFORMS.filter((p) =>
              ["dubizzle", "opensooq", "bayut"].includes(p.id),
            ).map((platform) => (
              <Card
                key={platform.id}
                className={`bg-slate-800/60 border-slate-700/50 hover:border-gold-400/50 transition-all ${!platform.connected ? "opacity-75" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}
                    >
                      <platform.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white">
                        {language === "ar" ? platform.nameAr : platform.name}
                      </h3>
                      <Badge
                        className={
                          platform.connected
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-slate-500/20 text-slate-400"
                        }
                      >
                        {platform.connected
                          ? language === "ar"
                            ? "متصل"
                            : "Connected"
                          : language === "ar"
                            ? "غير متصل"
                            : "Not Connected"}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      {language === "ar" ? "الميزات:" : "Features:"}
                    </h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      {(language === "ar"
                        ? platform.featuresAr
                        : platform.features
                      )
                        .slice(0, 3)
                        .map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-emerald-400" />
                            {feature}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">
                      {language === "ar" ? "التسعير:" : "Pricing:"}
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-emerald-400 font-medium">
                          {language === "ar" ? "مجاني:" : "Free:"}
                        </span>
                        <p className="text-slate-400">
                          {(language === "ar"
                            ? platform.pricing.freeAr
                            : platform.pricing.free
                          ).join(", ")}
                        </p>
                      </div>
                      <div className="text-sm">
                        <span className="text-gold-400 font-medium">
                          {language === "ar" ? "مميز:" : "Premium:"}{" "}
                          {platform.pricing.cost}
                        </span>
                        <p className="text-slate-400">
                          {(language === "ar"
                            ? platform.pricing.premiumAr
                            : platform.pricing.premium
                          )
                            .slice(0, 2)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {platform.connected ? (
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-white">
                          {platform.posts}
                        </p>
                        <p className="text-xs text-slate-400">
                          {language === "ar" ? "منشورات" : "Posts"}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">
                          {platform.engagement}%
                        </p>
                        <p className="text-xs text-slate-400">
                          {language === "ar" ? "تفاعل" : "Engagement"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting === platform.id}
                    >
                      {isConnecting === platform.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Plus className="h-4 w-4 mr-2" />
                      )}
                      {language === "ar" ? "ربط الآن" : "Connect Now"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLATFORMS.filter((p) =>
              ["instagram", "facebook", "linkedin"].includes(p.id),
            ).map((platform) => (
              <Card
                key={platform.id}
                className="bg-slate-800/60 border-slate-700/50"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}
                    >
                      <platform.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white">
                        {language === "ar" ? platform.nameAr : platform.name}
                      </h3>
                      {platform.connected && (
                        <p className="text-sm text-slate-400">
                          {formatNumber(platform.followers!)}{" "}
                          {language === "ar" ? "متابع" : "followers"}
                        </p>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platform.connected ? (
                    <>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-white">
                            {formatNumber(platform.followers!)}
                          </p>
                          <p className="text-xs text-slate-400">
                            {language === "ar" ? "متابعين" : "Followers"}
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">
                            {platform.engagement}%
                          </p>
                          <p className="text-xs text-slate-400">
                            {language === "ar" ? "تفاعل" : "Engagement"}
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">
                            {platform.posts}
                          </p>
                          <p className="text-xs text-slate-400">
                            {language === "ar" ? "منشورات" : "Posts"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full bg-gradient-to-r from-emerald-500/80 to-gold-500/80">
                          <Send className="h-4 w-4 mr-2" />
                          {language === "ar" ? "نشر الآن" : "Post Now"}
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            {language === "ar" ? "جدولة" : "Schedule"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300"
                          >
                            <BarChart3 className="h-4 w-4 mr-1" />
                            {language === "ar" ? "تحليلات" : "Analytics"}
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">
                          {language === "ar"
                            ? "الميزات المتاحة:"
                            : "Available Features:"}
                        </h4>
                        <ul className="space-y-1 text-sm text-slate-300">
                          {(language === "ar"
                            ? platform.featuresAr
                            : platform.features
                          )
                            .slice(0, 3)
                            .map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-emerald-400" />
                                {feature}
                              </li>
                            ))}
                        </ul>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
                        onClick={() => handleConnect(platform.id)}
                        disabled={isConnecting === platform.id}
                      >
                        {isConnecting === platform.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Plus className="h-4 w-4 mr-2" />
                        )}
                        {language === "ar" ? "ربط الحساب" : "Connect Account"}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Auto-Posting Settings */}
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gold-400" />
                  {language === "ar" ? "النشر التلقائي" : "Auto-Posting"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {connectedPlatforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}
                        >
                          <platform.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white">
                          {language === "ar" ? platform.nameAr : platform.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-500/20 text-emerald-400">
                          {language === "ar" ? "مفعل" : "Active"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <h4 className="font-medium text-white mb-3">
                    {language === "ar" ? "إعدادات عامة:" : "General Settings:"}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">
                        {language === "ar" ? "نشر فوري" : "Instant Posting"}
                      </span>
                      <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">
                        {language === "ar"
                          ? "تحسين تلقائي للصور"
                          : "Auto Image Optimization"}
                      </span>
                      <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">
                        {language === "ar"
                          ? "ترجمة تلقائية"
                          : "Auto Translation"}
                      </span>
                      <div className="w-10 h-5 bg-slate-600 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold-400" />
                  {language === "ar" ? "جدولة المنشورات" : "Post Scheduling"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">
                      {language === "ar"
                        ? "أفضل أوقات النشر:"
                        : "Best Posting Times:"}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-slate-700/40 p-2 rounded text-center">
                        <p className="text-gold-400 font-medium">8-9 AM</p>
                        <p className="text-slate-400">Morning</p>
                      </div>
                      <div className="bg-slate-700/40 p-2 rounded text-center">
                        <p className="text-gold-400 font-medium">1-2 PM</p>
                        <p className="text-slate-400">Lunch</p>
                      </div>
                      <div className="bg-slate-700/40 p-2 rounded text-center">
                        <p className="text-gold-400 font-medium">7-9 PM</p>
                        <p className="text-slate-400">Evening</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">
                      {language === "ar"
                        ? "تكرار النشر:"
                        : "Posting Frequency:"}
                    </label>
                    <select className="w-full bg-slate-700/60 border border-slate-600 rounded-lg p-2 text-white">
                      <option>{language === "ar" ? "يومياً" : "Daily"}</option>
                      <option>
                        {language === "ar" ? "كل يومين" : "Every 2 days"}
                      </option>
                      <option>
                        {language === "ar" ? "أسبوعياً" : "Weekly"}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">
                      {language === "ar" ? "أيام النشر:" : "Posting Days:"}
                    </label>
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                        <button
                          key={idx}
                          className={`p-2 rounded ${idx < 5 ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700/40 text-slate-400"}`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-gold-500 to-emerald-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {language === "ar" ? "حفظ الجدولة" : "Save Schedule"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Automation Analytics */}
          <Card className="bg-slate-800/60 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gold-400" />
                {language === "ar" ? "تحليلات الأتمتة" : "Automation Analytics"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-400">89%</p>
                  <p className="text-sm text-slate-400">
                    {language === "ar" ? "نجاح النشر" : "Post Success"}
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <p className="text-2xl font-bold text-gold-400">156</p>
                  <p className="text-sm text-slate-400">
                    {language === "ar" ? "منشورات تلقائية" : "Auto Posts"}
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">47h</p>
                  <p className="text-sm text-slate-400">
                    {language === "ar" ? "وقت موفر" : "Time Saved"}
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <p className="text-2xl font-bold text-purple-400">+24%</p>
                  <p className="text-sm text-slate-400">
                    {language === "ar" ? "زيادة التفاعل" : "Engagement Boost"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceIntegrations;
