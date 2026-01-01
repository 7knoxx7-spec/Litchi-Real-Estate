import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Crown,
  Globe,
  Heart,
  Users,
  Share2,
  Sparkles,
  Star,
  ArrowRight,
  Languages,
  Home,
  TrendingUp,
  MessageCircle,
  X,
} from "lucide-react";

interface AdamWelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelect: (language: "ar" | "en") => void;
  onStartDreamDiscovery: () => void;
}

const AdamWelcomePopup: React.FC<AdamWelcomePopupProps> = ({
  isOpen,
  onClose,
  onLanguageSelect,
  onStartDreamDiscovery,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<"ar" | "en">("ar");
  const [step, setStep] = useState<"language" | "welcome" | "features">(
    "language",
  );

  const languages = [
    {
      code: "ar" as const,
      name: "العربية",
      nameEn: "Arabic",
      flag: "🇦🇪",
      greeting: "مرحباً! أنا آدم",
      subtitle: "مستشارك العقاري الذكي",
    },
    {
      code: "en" as const,
      name: "English",
      nameEn: "English",
      flag: "🇺🇸",
      greeting: "Hello! I'm Adam",
      subtitle: "Your AI Real Estate Assistant",
    },
  ];

  const handleLanguageSelect = (lang: "ar" | "en" | "ur") => {
    setSelectedLanguage(lang);
    setStep("welcome");
    onLanguageSelect(lang);
  };

  const handleContinue = () => {
    if (step === "welcome") {
      setStep("features");
    } else {
      onStartDreamDiscovery();
      onClose();
    }
  };

  const getText = (ar: string, en: string) => {
    return selectedLanguage === "ar" ? ar : en;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900/98 border-gold-400/30 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-emerald-400 to-gold-400 rounded-xl blur-lg opacity-60 animate-pulse-glow"></div>
                <div className="relative bg-slate-800 p-3 rounded-xl border border-gold-400/50">
                  <Crown className="h-8 w-8 text-gold-400" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-emerald-400 bg-clip-text text-transparent">
                  آدم AI
                </h2>
                <p className="text-sm text-slate-400 font-normal">
                  Premium Real Estate Assistant
                </p>
              </div>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <CardContent className="p-6 space-y-6">
          {/* Language Selection Step */}
          {step === "language" && (
            <div className="space-y-6">
              <div className="text-center">
                <Languages className="h-16 w-16 text-gold-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  اختر لغتك المفضلة
                </h3>
                <p className="text-slate-400">
                  Choose Your Preferred Language | اپنی پسندیدہ زبان منتخب کریں
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <Card
                    key={lang.code}
                    className={`cursor-pointer transition-all duration-300 hover:border-gold-400/50 ${
                      selectedLanguage === lang.code
                        ? "bg-gradient-to-br from-gold-400/20 to-emerald-400/20 border-gold-400/50"
                        : "bg-slate-800/60 border-slate-700/50"
                    }`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{lang.flag}</div>
                      <h4 className="font-bold text-white text-lg mb-1">
                        {lang.name}
                      </h4>
                      <p className="text-sm text-slate-400">{lang.nameEn}</p>
                      {selectedLanguage === lang.code && (
                        <Badge className="mt-3 bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                          ✓ Selected
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Welcome Step */}
          {step === "welcome" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                  <div className="relative bg-slate-800 p-4 rounded-full border border-gold-400/50">
                    <Crown className="h-16 w-16 text-gold-400" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">
                  {languages.find((l) => l.code === selectedLanguage)?.greeting}
                </h3>
                <p className="text-lg text-slate-300 mb-4">
                  {languages.find((l) => l.code === selectedLanguage)?.subtitle}
                </p>

                <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50">
                  <p className="text-slate-200 leading-relaxed">
                    {getText(
                      "مرحباً بك في منصة العقارات الأكثر تطوراً في الإمارات! أنا آدم، مساعدك الذكي المخصص للشباب والفتيات. سأساعدك في اكتشاف منزل أحلامك مع قاعدة بيانات ضخمة تحتوي على أكثر من 100,000 عقار وربط مباشر مع جميع منصات التواصل الاجتماعي.",
                      "Welcome to the most advanced real estate platform in the UAE! I'm Adam, your smart assistant specialized for young men and women. I'll help you discover your dream home with a massive database containing over 100,000 properties and direct integration with all social media platforms.",
                      "UAE کے سب سے جدید رئیل اسٹیٹ پلیٹ فارم میں خوش آمدید! میں آدم ہوں، آپ کا ذہین معاون جو نوجوان مردوں اور عورتوں کے لیے خصوصی ہے۔ میں آپ کو آپ کے خوابوں کا گھر تلاش کرنے میں مدد کروں گا۔",
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-400/20 to-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Home className="h-6 w-6 text-gold-400" />
                    </div>
                    <p className="text-sm text-slate-300">100K+ Properties</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Users className="h-6 w-6 text-emerald-400" />
                    </div>
                    <p className="text-sm text-slate-300">
                      {getText(
                        "للشباب والفتيات",
                        "For Youth",
                        "نوجوانوں کے لیے",
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Share2 className="h-6 w-6 text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-300">
                      {getText("شيرينج ذكي", "Smart Sharing", "اسمارٹ شیئرنگ")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-300">
                      {getText("إعلانات بـ 20", "Ads from 20", "اشتہار 20 سے")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Step */}
          {step === "features" && (
            <div className="space-y-6">
              <div className="text-center">
                <Sparkles className="h-16 w-16 text-gold-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {getText(
                    "اكتشف منزل أحلامك",
                    "Discover Your Dream Home",
                    "اپنے خوابوں کا گھر دریافت کریں",
                  )}
                </h3>
                <p className="text-slate-400">
                  {getText(
                    "تجربة تفاعلية مخصصة مع قاعدة بيانات ضخمة",
                    "Interactive personalized experience with massive database",
                    "بڑے ڈیٹابیس کے ساتھ انٹرایکٹو ذاتی تجربہ",
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-400/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className="h-6 w-6 text-pink-400" />
                      <h4 className="font-bold text-white">
                        {getText(
                          "للفتيات",
                          "For Young Women",
                          "نوجوان لڑکیوں کے لیے",
                        )}
                      </h4>
                    </div>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>
                        •{" "}
                        {getText(
                          "غرف آمنة ومريحة",
                          "Safe & comfortable rooms",
                          "محفوظ اور آرام دہ کمرے",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "مناطق عائلية",
                          "Family-friendly areas",
                          "خاندانی علاقے",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "مشاركة مع صديقات",
                          "Share with girlfriends",
                          "سہیلیوں کے ساتھ شیئر",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "أسعار طلابية",
                          "Student prices",
                          "طالب علم کی قیمتیں",
                        )}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="h-6 w-6 text-blue-400" />
                      <h4 className="font-bold text-white">
                        {getText(
                          "للشباب",
                          "For Young Men",
                          "نوجوان مردوں کے لیے",
                        )}
                      </h4>
                    </div>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>
                        •{" "}
                        {getText(
                          "غرف مشتركة اقتصادية",
                          "Affordable shared rooms",
                          "سستے مشترکہ کمرے",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "قريب من العمل",
                          "Close to workplace",
                          "کام کی جگہ کے قریب",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "مشاركة مع الأصدقاء",
                          "Share with friends",
                          "دوستوں کے ساتھ شیئر",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "مرافق رياضية",
                          "Sports facilities",
                          "کھیل کی سہولات",
                        )}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-400/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Share2 className="h-6 w-6 text-emerald-400" />
                      <h4 className="font-bold text-white">
                        {getText(
                          "شيرينج ذكي",
                          "Smart Sharing",
                          "اسمارٹ شیئرنگ",
                        )}
                      </h4>
                    </div>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>
                        •{" "}
                        {getText(
                          "فيسبوك + انستغرام",
                          "Facebook + Instagram",
                          "فیس بک + انسٹاگرام",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "تيك توك + سناب شات",
                          "TikTok + Snapchat",
                          "ٹک ٹاک + سنیپ چیٹ",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "واتساب جروبات",
                          "WhatsApp groups",
                          "واٹس ایپ گروپس",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "تيليجرام قنوات",
                          "Telegram channels",
                          "ٹیلیگرام چینلز",
                        )}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gold-500/20 to-yellow-500/20 border-gold-400/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="h-6 w-6 text-gold-400" />
                      <h4 className="font-bold text-white">
                        {getText(
                          "إعلانات بـ 20 درهم",
                          "Ads from 20 AED",
                          "20 درہم سے اشتہار",
                        )}
                      </h4>
                    </div>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>
                        •{" "}
                        {getText("نشر فوري", "Instant posting", "فوری پوسٹنگ")}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "جميع المنصات",
                          "All platforms",
                          "تمام پلیٹ فارم",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "تحسين الصور",
                          "Image optimization",
                          "تصویر کی بہتری",
                        )}
                      </li>
                      <li>
                        •{" "}
                        {getText(
                          "وصول مضمون",
                          "Guaranteed reach",
                          "یقینی رسائی",
                        )}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-gold-400/30">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-6 w-6 text-gold-400" />
                  <h4 className="font-bold text-white">
                    {getText(
                      "قاعدة البيانات الضخمة",
                      "Massive Real Database",
                      "بہت بڑا حقیقی ڈیٹابیس",
                    )}
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-emerald-400">100K+</p>
                    <p className="text-xs text-slate-400">
                      {getText(
                        "عقار فعلي",
                        "Real Properties",
                        "حقیقی پراپرٹیز",
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">15+</p>
                    <p className="text-xs text-slate-400">
                      {getText(
                        "منصة متصلة",
                        "Connected Platforms",
                        "جڑے ہوئے پلیٹ فارم",
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gold-400">50K+</p>
                    <p className="text-xs text-slate-400">
                      {getText("مستخدم نشط", "Active Users", "فعال صارفین")}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-400">24/7</p>
                    <p className="text-xs text-slate-400">
                      {getText("دعم مباشر", "Live Support", "براہ راست مدد")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {step === "language" && (
              <Button
                className="w-full bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
                onClick={() => handleLanguageSelect(selectedLanguage)}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                {getText("متابعة", "Continue", "جاری رکھیں")}
              </Button>
            )}

            {step === "welcome" && (
              <Button
                className="w-full bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
                onClick={handleContinue}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {getText(
                  "اكتشف الميزات",
                  "Discover Features",
                  "خصوصیات دریافت کریں",
                )}
              </Button>
            )}

            {step === "features" && (
              <>
                <Button
                  className="flex-1 bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
                  onClick={handleContinue}
                >
                  <Home className="h-4 w-4 mr-2" />
                  {getText(
                    "ابدأ اكتشاف منزل أحلامك!",
                    "Start Dream Home Discovery!",
                    "خوابوں کا گھر تلاش شروع کریں!",
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => {
                    // Navigate to chat with Adam
                    window.location.href = "/adam";
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {getText("محادثة آدم", "Chat with Adam", "آدم سے بات")}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default AdamWelcomePopup;
