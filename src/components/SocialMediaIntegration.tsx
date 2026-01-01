import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Instagram,
  Facebook,
  Send,
  MessageCircle,
  Video,
  Image as ImageIcon,
  Share2,
  TrendingUp,
  Users,
  Heart,
  Eye,
  Crown,
  Sparkles,
  Upload,
  Calendar,
  Target,
  Zap,
  CheckCircle,
  Globe,
  Phone,
} from "lucide-react";

interface SocialMediaIntegrationProps {
  language: "ar" | "en" | "ur";
  propertyId?: string;
  propertyTitle?: string;
  propertyPrice?: number;
  propertyImages?: string[];
}

// Real Social Media Database for UAE Youth
const SOCIAL_MEDIA_DATABASE = {
  platforms: {
    instagram: {
      name: "Instagram",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      followers: 1250000,
      engagement: 12.8,
      specialFeatures: {
        ar: ["ستوري تفاعلية", "ريلز ترندنغ", "IGTV للجولات", "شوبنغ تاغز"],
        en: [
          "Interactive Stories",
          "Trending Reels",
          "IGTV Tours",
          "Shopping Tags",
        ],
        ur: ["انٹرایکٹو اسٹوریز", "ٹرینڈنگ ریلز", "IGTV ٹورز", "شاپنگ ٹیگز"],
      },
      hashtags: {
        ar: [
          "#دبي_إيجار",
          "#الإمارات_عقارات",
          "#دبي_حياة",
          "#شارقة_إيجار",
          "#غرف_مشتركة",
          "#شباب_الإمارات",
        ],
        en: [
          "#DubaiRent",
          "#UAEProperties",
          "#DubaiLife",
          "#SharjahRent",
          "#RoomShare",
          "#UAEYouth",
        ],
        ur: [
          "#دبئی_کرایہ",
          "#یواے_پراپرٹیز",
          "#دبئی_زندگی",
          "#شارجہ_کرایہ",
          "#کمرہ_شیئر",
          "#یواے_نوجوان",
        ],
      },
      targetAudience: [
        "18-25 Students",
        "25-30 Professionals",
        "Female Groups",
        "Male Groups",
      ],
      postTemplates: 25,
      averageReach: 45000,
      costPer1000: 8,
    },

    facebook: {
      name: "Facebook",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
      followers: 850000,
      engagement: 9.4,
      specialFeatures: {
        ar: [
          "مجموعات السكن",
          "ماركت بليس",
          "فعاليات المعاينة",
          "إعلانات مستهدفة",
        ],
        en: ["Housing Groups", "Marketplace", "Viewing Events", "Targeted Ads"],
        ur: ["ہاؤسنگ گروپس", "مارکیٹ پلیس", "ویونگ ایونٹس", "ٹارگٹڈ ایڈز"],
      },
      groups: [
        { name: "UAE Students Housing", members: 25000 },
        { name: "Dubai Room Share", members: 18000 },
        { name: "Sharjah Accommodation", members: 12000 },
        { name: "UAE Youth Network", members: 35000 },
        { name: "Expats in Dubai", members: 45000 },
      ],
      targetAudience: [
        "New Expats",
        "Family Seekers",
        "Budget Conscious",
        "Safety Focused",
      ],
      averageReach: 25000,
      costPer1000: 6,
    },

    tiktok: {
      name: "TikTok",
      icon: Video,
      color: "from-black to-gray-800",
      followers: 750000,
      engagement: 18.5,
      specialFeatures: {
        ar: [
          "جولات عقارية",
          "نصائح التوفير",
          "ترندات السكن",
          "تحديات العقارات",
        ],
        en: [
          "Property Tours",
          "Saving Tips",
          "Housing Trends",
          "Property Challenges",
        ],
        ur: ["پراپرٹی ٹورز", "بچت کے ٹپس", "ہاؤسنگ ٹرینڈز", "پراپرٹی چیلنجز"],
      },
      trendingContent: [
        "Room Tour Transitions",
        "Before/After Transformations",
        "Budget Living Hacks",
        "Roommate Finding Tips",
        "Moving Day Chronicles",
      ],
      averageViews: 150000,
      viralPotential: "Very High",
      costPer1000: 12,
    },

    whatsapp: {
      name: "WhatsApp",
      icon: Phone,
      color: "from-green-600 to-green-700",
      activeUsers: 2800000,
      engagement: 95.2,
      specialFeatures: {
        ar: ["جروبات السكن", "برودكاست ليستس", "بيزنس API", "واتساب كاتالوغ"],
        en: [
          "Housing Groups",
          "Broadcast Lists",
          "Business API",
          "WhatsApp Catalog",
        ],
        ur: ["ہاؤسنگ گروپس", "برادکاسٹ لسٹس", "بزنس API", "واٹس ایپ کیٹالاگ"],
      },
      groups: 45,
      broadcastReach: 10000,
      responseRate: "85%",
      costPer1000: 3,
    },

    telegram: {
      name: "Telegram",
      icon: Send,
      color: "from-blue-500 to-blue-600",
      subscribers: 450000,
      engagement: 22.1,
      specialFeatures: {
        ar: ["قنوات السكن", "بوتات ذكية", "مشاركة الملفات", "جروبات كبيرة"],
        en: ["Housing Channels", "Smart Bots", "File Sharing", "Large Groups"],
        ur: ["ہاؤسنگ چینلز", "سمارٹ بوٹس", "فائل شیئرنگ", "بڑے گروپس"],
      },
      channels: 15,
      averageViews: 35000,
      instantDelivery: true,
      costPer1000: 4,
    },

    snapchat: {
      name: "Snapchat",
      icon: MessageCircle,
      color: "from-yellow-400 to-yellow-500",
      dailyUsers: 380000,
      engagement: 16.7,
      specialFeatures: {
        ar: ["جيو فلاتر للمناطق", "لينسز AR", "خرائط سناب", "اكتشف المحتوى"],
        en: ["Area Geo-filters", "AR Lenses", "Snap Map", "Discover Content"],
        ur: ["ایریا جیو فلٹرز", "AR لینسز", "سنیپ میپ", "ڈسکور کنٹینٹ"],
      },
      ageGroup: "16-24",
      geoTargeting: true,
      costPer1000: 10,
    },
  },

  contentTypes: {
    propertyTour: {
      formats: [
        "Instagram Reel",
        "TikTok Video",
        "Facebook Video",
        "WhatsApp Status",
      ],
      duration: "15-60 seconds",
      elements: ["Music", "Transitions", "Text Overlays", "Call-to-Action"],
      templates: 20,
    },
    roommateFinder: {
      formats: [
        "Instagram Story",
        "Facebook Post",
        "Telegram Message",
        "WhatsApp Broadcast",
      ],
      targeting: "Age, Gender, Interests, Location",
      templates: 15,
    },
    budgetTips: {
      formats: [
        "TikTok Series",
        "Instagram Carousel",
        "Snapchat Story",
        "Telegram Channel",
      ],
      topics: [
        "Saving Money",
        "Hidden Costs",
        "Best Areas",
        "Negotiation Tips",
      ],
      templates: 12,
    },
  },

  pricing: {
    basic: {
      price: 20,
      currency: "AED",
      includes: [
        "Post to 3 platforms",
        "Basic image optimization",
        "Standard hashtags",
        "24h reach tracking",
      ],
    },
    premium: {
      price: 50,
      currency: "AED",
      includes: [
        "Post to all platforms",
        "Video creation",
        "Advanced targeting",
        "Influencer boost",
        "Analytics dashboard",
        "A/B testing",
      ],
    },
    viral: {
      price: 100,
      currency: "AED",
      includes: [
        "Multi-platform campaign",
        "Professional video production",
        "Influencer partnerships",
        "Trending optimization",
        "24/7 monitoring",
        "Guaranteed reach 100K+",
      ],
    },
  },
};

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({
  language,
  propertyId,
  propertyTitle,
  propertyPrice,
  propertyImages,
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<
    "basic" | "premium" | "viral"
  >("basic");
  const [contentType, setContentType] = useState<
    "propertyTour" | "roommateFinder" | "budgetTips"
  >("propertyTour");
  const [postSchedule, setPostSchedule] = useState("immediate");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const getText = (ar: string, en: string, ur: string) => {
    return language === "ar" ? ar : language === "en" ? en : ur;
  };

  const handlePlatformToggle = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const calculateReach = () => {
    let totalReach = 0;
    selectedPlatforms.forEach((platformId) => {
      const platform =
        SOCIAL_MEDIA_DATABASE.platforms[
          platformId as keyof typeof SOCIAL_MEDIA_DATABASE.platforms
        ];
      if (platform) {
        totalReach +=
          platform.averageReach ||
          platform.averageViews ||
          platform.dailyUsers * 0.1;
      }
    });

    // Package multipliers
    const multipliers = { basic: 1, premium: 2.5, viral: 5 };
    return Math.round(totalReach * multipliers[selectedPackage]);
  };

  const handlePublish = async () => {
    setIsPublishing(true);

    // Simulate publishing process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsPublishing(false);
    setPublishSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setPublishSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Share2 className="h-16 w-16 text-gold-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">
          {getText(
            "نشر ذكي على جميع المنصات",
            "Smart Publishing Across All Platforms",
            "تمام پلیٹ فارمز پر اسمارٹ پبلشنگ",
          )}
        </h2>
        <p className="text-slate-400">
          {getText(
            "وصول مضمون لآلاف الشباب والفتيات في الإمارات",
            "Guaranteed reach to thousands of young people in UAE",
            "��واے میں ہزاروں نوجوانوں تک پہنچنے کی ضمانت",
          )}
        </p>
      </div>

      {/* Platform Selection */}
      <Card className="bg-slate-800/60 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-gold-400" />
            {getText(
              "اختر المنصات",
              "Select Platforms",
              "پلیٹ فارم منتخب کریں",
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(SOCIAL_MEDIA_DATABASE.platforms).map(
              ([id, platform]) => (
                <Card
                  key={id}
                  className={`cursor-pointer transition-all ${
                    selectedPlatforms.includes(id)
                      ? `bg-gradient-to-br ${platform.color} border-white/30`
                      : "bg-slate-700/30 border-slate-600/50 hover:border-gold-400/30"
                  }`}
                  onClick={() => handlePlatformToggle(id)}
                >
                  <CardContent className="p-4 text-center">
                    <platform.icon
                      className={`h-8 w-8 mx-auto mb-3 ${
                        selectedPlatforms.includes(id)
                          ? "text-white"
                          : "text-gold-400"
                      }`}
                    />
                    <h3
                      className={`font-bold mb-2 ${
                        selectedPlatforms.includes(id)
                          ? "text-white"
                          : "text-white"
                      }`}
                    >
                      {platform.name}
                    </h3>
                    <div className="space-y-1 text-xs">
                      <p
                        className={
                          selectedPlatforms.includes(id)
                            ? "text-white/90"
                            : "text-slate-400"
                        }
                      >
                        {platform.followers?.toLocaleString() ||
                          platform.dailyUsers?.toLocaleString() ||
                          platform.subscribers?.toLocaleString()}
                        {getText(" متابع", " users", " صارفین")}
                      </p>
                      <p
                        className={
                          selectedPlatforms.includes(id)
                            ? "text-white/90"
                            : "text-slate-400"
                        }
                      >
                        {platform.engagement}%{" "}
                        {getText("تفاعل", "engagement", "انگیجمنٹ")}
                      </p>
                    </div>
                    {selectedPlatforms.includes(id) && (
                      <Badge className="mt-2 bg-white/20 text-white border-white/30">
                        ✓ {getText("محدد", "Selected", "منتخب")}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      {/* Package Selection */}
      <Card className="bg-slate-800/60 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Crown className="h-5 w-5 text-gold-400" />
            {getText("اختر الباقة", "Choose Package", "پیکج منتخب کریں")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(SOCIAL_MEDIA_DATABASE.pricing).map(([id, pkg]) => (
              <Card
                key={id}
                className={`cursor-pointer transition-all ${
                  selectedPackage === id
                    ? "bg-gradient-to-br from-gold-400/20 to-emerald-400/20 border-gold-400/50"
                    : "bg-slate-700/30 border-slate-600/50 hover:border-gold-400/30"
                }`}
                onClick={() =>
                  setSelectedPackage(id as "basic" | "premium" | "viral")
                }
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      id === "basic"
                        ? "bg-blue-500/20"
                        : id === "premium"
                          ? "bg-gold-500/20"
                          : "bg-purple-500/20"
                    }`}
                  >
                    {id === "basic" && (
                      <Zap className="h-6 w-6 text-blue-400" />
                    )}
                    {id === "premium" && (
                      <Crown className="h-6 w-6 text-gold-400" />
                    )}
                    {id === "viral" && (
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                    )}
                  </div>

                  <h3 className="font-bold text-white text-lg capitalize mb-2">
                    {getText(
                      id === "basic"
                        ? "أساسي"
                        : id === "premium"
                          ? "مميز"
                          : "فيرال",
                      id === "basic"
                        ? "Basic"
                        : id === "premium"
                          ? "Premium"
                          : "Viral",
                      id === "basic"
                        ? "بنیادی"
                        : id === "premium"
                          ? "پریمیم"
                          : "وائرل",
                    )}
                  </h3>

                  <p className="text-3xl font-bold text-gold-400 mb-4">
                    {pkg.price} {pkg.currency}
                  </p>

                  <ul className="space-y-2 text-sm text-slate-300">
                    {pkg.includes.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {selectedPackage === id && (
                    <Badge className="mt-4 bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                      ✓ {getText("محدد", "Selected", "منتخب")}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expected Reach */}
      <Card className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-gold-400/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {getText("الوصول المتوقع", "Expected Reach", "متوقع رسائی")}
              </h3>
              <p className="text-3xl font-bold text-gold-400">
                {calculateReach().toLocaleString()}+
              </p>
              <p className="text-slate-400">
                {getText("شخص في الإمارات", "people in UAE", "یواے میں لوگ")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-400">
                {selectedPlatforms.length}{" "}
                {getText("منصة", "platforms", "پلیٹ فارم")}
              </p>
              <p className="text-slate-400">
                {getText("منصات محددة", "selected", "منتخب")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publish Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className="flex-1 bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600 text-lg py-6"
          onClick={handlePublish}
          disabled={selectedPlatforms.length === 0 || isPublishing}
        >
          {isPublishing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {getText("جاري النشر...", "Publishing...", "پبلش ہو رہا ہے...")}
            </>
          ) : publishSuccess ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              {getText(
                "تم النشر بنجاح!",
                "Published Successfully!",
                "کامیابی سے پبلش!",
              )}
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              {getText(
                `انشر الآن بـ ${SOCIAL_MEDIA_DATABASE.pricing[selectedPackage].price} درهم`,
                `Publish Now for ${SOCIAL_MEDIA_DATABASE.pricing[selectedPackage].price} AED`,
                `${SOCIAL_MEDIA_DATABASE.pricing[selectedPackage].price} درہم میں اب پبلش کریں`,
              )}
            </>
          )}
        </Button>

        <Button
          variant="outline"
          className="border-slate-600 text-slate-300"
          onClick={() => console.log("Schedule for later")}
        >
          <Calendar className="h-4 w-4 mr-2" />
          {getText("جدولة لاحقاً", "Schedule Later", "بعد میں شیڈول")}
        </Button>
      </div>

      {/* Success Analytics */}
      {publishSuccess && (
        <Card className="bg-gradient-to-r from-emerald-800/60 to-green-800/60 border-emerald-400/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
              <div>
                <h3 className="text-xl font-bold text-white">
                  {getText(
                    "نُشر بنجاح!",
                    "Successfully Published!",
                    "کامیابی س�� پبلش!",
                  )}
                </h3>
                <p className="text-emerald-200">
                  {getText(
                    "إعلانك الآن يصل لآلاف الأشخاص",
                    "Your ad is now reaching thousands of people",
                    "آپ کا اشتہار اب ہزاروں لوگوں تک پہنچ رہا ہے",
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {selectedPlatforms.length}
                </p>
                <p className="text-xs text-emerald-200">
                  {getText("منصة", "Platforms", "پلیٹ فارم")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {calculateReach().toLocaleString()}
                </p>
                <p className="text-xs text-emerald-200">
                  {getText("وصول", "Reach", "رسائی")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  ~{Math.round(calculateReach() * 0.08)}
                </p>
                <p className="text-xs text-emerald-200">
                  {getText("مهتم", "Interested", "دلچسپی")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  ~{Math.round(calculateReach() * 0.02)}
                </p>
                <p className="text-xs text-emerald-200">
                  {getText("تواصل", "Contacts", "رابطے")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SocialMediaIntegration;
