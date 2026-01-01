import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdamChatbotFixed from "@/components/AdamChatbotFixed";
import MarketplaceIntegrations from "@/components/MarketplaceIntegrations";
import {
  Crown,
  Maximize2,
  Minimize2,
  Sparkles,
  Bot,
  Database,
  Globe,
  Share2,
  TrendingUp,
  Shield,
  Zap,
  Brain,
  MessageCircle,
  ChevronRight,
  Star,
  Users,
  Building2,
  Target,
  Eye,
  CheckCircle,
} from "lucide-react";

const AdamChat = () => {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeView, setActiveView] = useState<"chat" | "integrations">("chat");

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const features = [
    {
      icon: Database,
      titleAr: "قاعدة بيانات ضخمة",
      titleEn: "Massive Database",
      descAr: "50,000+ عقار محدث لحظياً مع تحليل ذكي",
      descEn: "50,000+ properties updated in real-time with smart analysis",
      color: "from-gold-400 to-gold-600",
    },
    {
      icon: Brain,
      titleAr: "ذكاء اصطناعي متطور",
      titleEn: "Advanced AI",
      descAr: "خوارزميات التعلم العميق لفهم احتياجاتك",
      descEn: "Deep learning algorithms to understand your needs",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: Share2,
      titleAr: "ربط شامل للمنصات",
      titleEn: "Complete Platform Integration",
      descAr: "ربط مباشر مع دوبيزل وجميع وسائل التواصل",
      descEn: "Direct integration with Dubizzle and all social platforms",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Shield,
      titleAr: "حماية متقدمة",
      titleEn: "Advanced Protection",
      descAr: "فحص الاحتيال بالذكاء الاصطناعي وتحقق الهوية",
      descEn: "AI-powered fraud detection and identity verification",
      color: "from-red-400 to-red-600",
    },
    {
      icon: TrendingUp,
      titleAr: "تحليل السوق",
      titleEn: "Market Analysis",
      descAr: "توقعات الأسعار وتحليل الاستثمار الذكي",
      descEn: "Price forecasts and smart investment analysis",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Zap,
      titleAr: "أتمتة ذكية",
      titleEn: "Smart Automation",
      descAr: "نشر تلقائي وإدارة الإعلانات بذكاء",
      descEn: "Auto-posting and intelligent ad management",
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  const stats = [
    {
      number: "50,000+",
      labelAr: "عقار متاح",
      labelEn: "Properties Available",
      icon: Building2,
    },
    {
      number: "15+",
      labelAr: "منصة متصلة",
      labelEn: "Connected Platforms",
      icon: Globe,
    },
    {
      number: "99.9%",
      labelAr: "دقة التحليل",
      labelEn: "Analysis Accuracy",
      icon: Target,
    },
    {
      number: "24/7",
      labelAr: "دعم متواصل",
      labelEn: "Continuous Support",
      icon: Crown,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center mb-12">
            {/* Adam Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-emerald-400 to-gold-400 rounded-2xl blur-2xl opacity-60 animate-pulse-glow"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gold-400/30 shadow-2xl">
                  <Crown className="h-16 w-16 text-gold-400 mx-auto" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gold-400 via-emerald-400 to-gold-400 bg-clip-text text-transparent">
                {language === "ar" ? "آدم" : "Adam"}
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-300 mb-4">
              {language === "ar"
                ? "المستشار العقاري الذكي المتطور"
                : "Advanced AI Real Estate Consultant"}
            </p>

            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-8">
              {language === "ar"
                ? "مساعدك الشخصي المدعوم بالذكاء الاصطناعي المتطور مع قاعدة بيانات ضخمة وربط شامل لجميع منصات العقارات ووسائل التواصل الاجتماعي في الإمارات"
                : "Your personal AI-powered assistant with massive database and comprehensive integration with all real estate platforms and social media in the UAE"}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/60 border-slate-700/50 hover:border-gold-400/50 transition-all"
                >
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 text-gold-400 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-white">
                      {stat.number}
                    </p>
                    <p className="text-sm text-slate-400">
                      {language === "ar" ? stat.labelAr : stat.labelEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600 text-white border-0 px-8 py-4 text-lg"
                onClick={() => setActiveView("chat")}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {language === "ar"
                  ? "ابدأ المحادثة مع آدم"
                  : "Start Chat with Adam"}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gold-400/50 text-gold-400 hover:bg-gold-400/10 px-8 py-4 text-lg"
                onClick={() => setActiveView("integrations")}
              >
                <Globe className="h-5 w-5 mr-2" />
                {language === "ar" ? "ربط المنصات" : "Connect Platforms"}
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="text-slate-300 hover:text-white px-8 py-4 text-lg"
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              >
                <Globe className="h-5 w-5 mr-2" />
                {language === "ar" ? "English" : "العربية"}
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/60 border-slate-700/50 hover:border-gold-400/50 transition-all group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {language === "ar" ? feature.titleAr : feature.titleEn}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {language === "ar" ? feature.descAr : feature.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Interface */}
          <div className="max-w-6xl mx-auto">
            {activeView === "chat" ? (
              <div className="space-y-6">
                {/* Interface Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-lg blur opacity-60 animate-pulse"></div>
                        <div className="relative bg-slate-800 p-2 rounded-lg border border-gold-400/30">
                          <Crown className="h-6 w-6 text-gold-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {language === "ar"
                            ? "محادثة مع آدم"
                            : "Chat with Adam"}
                        </h2>
                        <p className="text-sm text-slate-400">
                          {language === "ar"
                            ? "مساعدك الذكي جاهز للخدمة"
                            : "Your AI assistant ready to serve"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30 animate-pulse">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                      {language === "ar" ? "متصل الآن" : "Online Now"}
                    </Badge>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleExpanded}
                      className="text-gold-400 hover:text-gold-300"
                    >
                      {isExpanded ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Adam Chatbot */}
                <AdamChatbotFixed
                  language={language}
                  isExpanded={isExpanded}
                  onExpandToggle={toggleExpanded}
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Integrations Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {language === "ar"
                      ? "ربط المنصات والأتمتة الذكية"
                      : "Platform Integration & Smart Automation"}
                  </h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    {language === "ar"
                      ? "اربط عقاراتك بجميع منصات التواصل الاجتماعي ومواقع العقارات مع إدارة ذكية ونشر تلقائي"
                      : "Connect your properties to all social media platforms and real estate websites with smart management and auto-posting"}
                  </p>
                </div>

                {/* Marketplace Integrations */}
                <MarketplaceIntegrations language={language} />
              </div>
            )}
          </div>

          {/* Advanced Features Showcase */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              {language === "ar"
                ? "لماذا آدم هو الأفضل؟"
                : "Why Adam is the Best?"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Eye,
                  titleAr: "رؤية شاملة للسوق",
                  titleEn: "Complete Market Vision",
                  descAr: "تحليل شامل لجميع الإمارات السبع",
                  descEn: "Comprehensive analysis of all seven Emirates",
                },
                {
                  icon: Users,
                  titleAr: "شبكة واسعة",
                  titleEn: "Extensive Network",
                  descAr: "2.5M+ متابع عبر جميع المنصات",
                  descEn: "2.5M+ followers across all platforms",
                },
                {
                  icon: CheckCircle,
                  titleAr: "موثوقية عالية",
                  titleEn: "High Reliability",
                  descAr: "99.9% نجاح في التحقق والحماية",
                  descEn: "99.9% success in verification and protection",
                },
                {
                  icon: Star,
                  titleAr: "تقييم متميز",
                  titleEn: "Excellent Rating",
                  descAr: "4.9/5 من آلاف المستخدمين",
                  descEn: "4.9/5 from thousands of users",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/40 border-slate-700/30 hover:border-gold-400/50 transition-all"
                >
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-2">
                      {language === "ar" ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-slate-400">
                      {language === "ar" ? item.descAr : item.descEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-gold-400/30">
              <CardContent className="p-12">
                <Crown className="h-16 w-16 text-gold-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  {language === "ar"
                    ? "ابدأ رحلتك مع آدم اليوم"
                    : "Start Your Journey with Adam Today"}
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                  {language === "ar"
                    ? "انضم لآلاف المستخدمين الذين يثقون بآدم في رحلتهم العقارية. استشارة مجانية ودعم متواصل 24/7"
                    : "Join thousands of users who trust Adam in their real estate journey. Free consultation and 24/7 continuous support"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600 text-white border-0 px-8 py-4"
                    onClick={() => setActiveView("chat")}
                  >
                    <Crown className="h-5 w-5 mr-2" />
                    {language === "ar"
                      ? "بدء المحادثة المجانية"
                      : "Start Free Consultation"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gold-400/50 text-gold-400 hover:bg-gold-400/10 px-8 py-4"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    {language === "ar" ? "شاهد العرض التوضيحي" : "Watch Demo"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdamChat;
