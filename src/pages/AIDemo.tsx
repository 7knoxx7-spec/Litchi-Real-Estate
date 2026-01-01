import { useState } from "react";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import SmartRecommendations from "@/components/SmartRecommendations";
import RatingSystem from "@/components/RatingSystem";
import FraudDashboard from "@/components/FraudDashboard";
import IDVerification from "@/components/IDVerification";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  MessageCircle,
  Star,
  Shield,
  Scan,
  Target,
  Sparkles,
  Zap,
  Eye,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";

const AIDemo = () => {
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  // Mock data for demonstrations
  const mockRatings = [
    {
      id: "1",
      userId: "user1",
      userName: "أحمد محمد",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      score: 5,
      comment:
        "شقة ممتازة تماماً كما في الصور. الوكيل محترم جداً والموقع رائع. أنصح بشدة!",
      timestamp: "2024-01-20T10:30:00Z",
      verified: true,
      helpful: 12,
    },
    {
      id: "2",
      userId: "user2",
      userName: "سارة العلي",
      userAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      score: 4,
      comment:
        "شقة جيدة ونظيفة. الوكيل تعامل معي بصدق ولكن السعر مرتفع قليلاً مقارنة بالسوق.",
      timestamp: "2024-01-18T14:15:00Z",
      verified: true,
      helpful: 8,
    },
    {
      id: "3",
      userId: "user3",
      userName: "محمد الزهراني",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      score: 4,
      comment: "موقع ممتاز وقريب من كل شي. الشقة نظيفة والمرافق جيدة.",
      timestamp: "2024-01-15T09:45:00Z",
      verified: false,
      helpful: 5,
    },
  ];

  const mockUserPreferences = {
    budget: 85000,
    propertyType: ["apartment", "studio"],
    location: ["Dubai", "Sharjah"],
    bedrooms: 1,
    amenities: ["wifi", "gym", "parking"],
    lifestyle: "professional" as const,
  };

  const aiFeatures = [
    {
      id: "chat",
      title: language === "ar" ? "مساعد ذكي متطور" : "Advanced AI Assistant",
      description:
        language === "ar"
          ? "دردشة ذكية مدعومة بنماذج الذكاء الاصطناعي المحلية لمساعدتك في العثور على السكن المثالي"
          : "Smart chat powered by local AI models to help you find the perfect accommodation",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      features: [
        language === "ar" ? "معالجة محلية آمنة" : "Secure local processing",
        language === "ar"
          ? "فهم اللغة العربية"
          : "Arabic language understanding",
        language === "ar" ? "ترشيحات ذكية" : "Smart recommendations",
        language === "ar" ? "متاح 24/7" : "Available 24/7",
      ],
    },
    {
      id: "recommendations",
      title:
        language === "ar"
          ? "نظام الترشيح الذكي"
          : "Smart Recommendation Engine",
      description:
        language === "ar"
          ? "خوارزميات ذكية تحلل تفضيلاتك وتقترح أفضل العقارات المناسبة لك"
          : "Intelligent algorithms that analyze your preferences and suggest the best matching properties",
      icon: Target,
      color: "from-emerald-500 to-green-500",
      features: [
        language === "ar"
          ? "تحليل متقدم للتفضيلات"
          : "Advanced preference analysis",
        language === "ar" ? "نقاط مطابقة دقيقة" : "Precise matching scores",
        language === "ar" ? "تعلم من سلوكك" : "Learns from your behavior",
        language === "ar" ? "تحديث مستمر" : "Continuous updates",
      ],
    },
    {
      id: "ratings",
      title:
        language === "ar" ? "نظام التقييم الذكي" : "Intelligent Rating System",
      description:
        language === "ar"
          ? "نظام تقييم متطور يحلل المراجعات ويكشف التقييمات المزيفة"
          : "Advanced rating system that analyzes reviews and detects fake ratings",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      features: [
        language === "ar" ? "كشف التقييمات المزيفة" : "Fake review detection",
        language === "ar" ? "تحليل المشاعر" : "Sentiment analysis",
        language === "ar" ? "تقييمات موثقة" : "Verified reviews",
        language === "ar" ? "إحصائيات تفصيلية" : "Detailed analytics",
      ],
    },
    {
      id: "fraud",
      title:
        language === "ar" ? "كشف النصب والاحتيال" : "Fraud Detection System",
      description:
        language === "ar"
          ? "نظام ذكي لكشف الأنشطة المشبوهة والإعلانات المزيفة لحماية المستخدمين"
          : "Intelligent system to detect suspicious activities and fake listings to protect users",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      features: [
        language === "ar" ? "كشف الإعلانات المزيفة" : "Fake listing detection",
        language === "ar" ? "تحليل أنماط الاحتيال" : "Fraud pattern analysis",
        language === "ar" ? "تحذيرات فورية" : "Real-time alerts",
        language === "ar" ? "حماية متقدمة" : "Advanced protection",
      ],
    },
    {
      id: "verification",
      title: language === "ar" ? "التحقق من الهوية" : "ID Verification",
      description:
        language === "ar"
          ? "تحقق ذكي من الهوية باستخدام تقنيات الـ OCR والذكاء الاصطناعي المحلي"
          : "Smart identity verification using OCR and local AI technologies",
      icon: Scan,
      color: "from-purple-500 to-indigo-500",
      features: [
        language === "ar" ? "قراءة OCR متقدمة" : "Advanced OCR reading",
        language === "ar" ? "فحص أمني شامل" : "Comprehensive security check",
        language === "ar" ? "معالجة محلية" : "Local processing",
        language === "ar" ? "سرعة ودقة عالية" : "High speed and accuracy",
      ],
    },
  ];

  const stats = [
    {
      icon: Brain,
      value: "5+",
      label: language === "ar" ? "نماذج ذكاء اصطناعي" : "AI Models",
      color: "text-blue-400",
    },
    {
      icon: Users,
      value: "10,000+",
      label: language === "ar" ? "مستخدم محمي" : "Protected Users",
      color: "text-emerald-400",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: language === "ar" ? "دقة الكشف" : "Detection Accuracy",
      color: "text-gold-400",
    },
    {
      icon: Award,
      value: "24/7",
      label: language === "ar" ? "حماية مستمرة" : "Continuous Protection",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen aurora relative overflow-hidden">
      <Navigation />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <Badge className="bg-gradient-to-r from-gold-500/20 to-emerald-500/20 text-gold-400 border-gold-400/30 text-lg px-6 py-2 animate-pulse-glow">
              <Sparkles className="h-4 w-4 mr-2" />
              {language === "ar"
                ? "عرض تقنيات الذكاء الاصطناعي"
                : "AI Technology Showcase"}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black gradient-text leading-tight animate-glow">
              {language === "ar" ? (
                <>
                  الذكاء الاصطناعي
                  <br />
                  <span className="text-emerald-400">المتطور</span>
                </>
              ) : (
                <>
                  Advanced
                  <br />
                  <span className="text-emerald-400">AI Technology</span>
                </>
              )}
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {language === "ar"
                ? "اكتشف قوة الذكاء الاصطناعي في RoomUAE PRO - تقنيات متطورة لحماية وتحسين تجربتك في البحث عن السكن"
                : "Discover the power of AI in RoomUAE PRO - Advanced technologies to protect and enhance your housing search experience"}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center space-y-3 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Features Overview */}
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              <Brain className="h-8 w-8 text-gold-400 mx-auto mb-4" />
              {language === "ar"
                ? "ميزات الذكاء الاصطناعي المتطورة"
                : "Advanced AI Features"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="group relative luxury-hover magnetic"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 rounded-2xl blur-sm group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                    <div className="relative bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm group-hover:border-gold-400/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="space-y-2">
                        {feature.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-slate-400"
                          >
                            <Zap className="h-3 w-3 text-gold-400" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demo Tabs */}
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              <Eye className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              {language === "ar"
                ? "تجربة تفاعلية حية"
                : "Live Interactive Demo"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-700/50">
                <TabsTrigger
                  value="chat"
                  className="data-[state=active]:bg-gold-400/20"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {language === "ar" ? "دردشة" : "Chat"}
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  className="data-[state=active]:bg-emerald-400/20"
                >
                  <Target className="h-4 w-4 mr-2" />
                  {language === "ar" ? "ترشيحات" : "Recommendations"}
                </TabsTrigger>
                <TabsTrigger
                  value="ratings"
                  className="data-[state=active]:bg-yellow-400/20"
                >
                  <Star className="h-4 w-4 mr-2" />
                  {language === "ar" ? "تقييمات" : "Ratings"}
                </TabsTrigger>
                <TabsTrigger
                  value="fraud"
                  className="data-[state=active]:bg-red-400/20"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {language === "ar" ? "حماية" : "Security"}
                </TabsTrigger>
                <TabsTrigger
                  value="verification"
                  className="data-[state=active]:bg-purple-400/20"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  {language === "ar" ? "تحقق" : "Verify"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-8">
                <AIChatAssistant
                  language={language}
                  userContext={{
                    name: language === "ar" ? "أحمد" : "Ahmed",
                    preferences: {
                      budget: 85000,
                      location: "Dubai",
                      propertyType: "apartment",
                    },
                  }}
                />
              </TabsContent>

              <TabsContent value="recommendations" className="mt-8">
                <SmartRecommendations
                  language={language}
                  userPreferences={mockUserPreferences}
                />
              </TabsContent>

              <TabsContent value="ratings" className="mt-8">
                <RatingSystem
                  propertyId="demo-property"
                  ratings={mockRatings}
                  averageRating={4.6}
                  totalRatings={mockRatings.length}
                  language={language}
                />
              </TabsContent>

              <TabsContent value="fraud" className="mt-8">
                <FraudDashboard language={language} />
              </TabsContent>

              <TabsContent value="verification" className="mt-8">
                <IDVerification language={language} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Language Toggle */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="btn-primary"
          >
            {language === "ar" ? "English" : "العربية"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIDemo;
