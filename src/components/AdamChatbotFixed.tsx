import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Send,
  User,
  Sparkles,
  MessageCircle,
  Mic,
  MicOff,
  Settings,
  Star,
  Brain,
  Database,
  Share2,
  TrendingUp,
  Eye,
  MapPin,
  DollarSign,
  Calendar,
  Phone,
  Maximize2,
  Minimize2,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  Building2,
  PlusCircle,
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Target,
  Zap,
  Crown,
  Shield,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "adam";
  timestamp: Date;
  suggestions?: string[];
  actionButtons?: {
    label: string;
    action: string;
    icon?: string;
  }[];
}

interface AdamChatbotFixedProps {
  language?: "ar" | "en";
  isExpanded?: boolean;
  onExpandToggle?: () => void;
}

const AdamChatbotFixed: React.FC<AdamChatbotFixedProps> = ({
  language = "ar",
  isExpanded = false,
  onExpandToggle,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Adam's sophisticated greeting
    const greeting: Message = {
      id: "adam-welcome",
      content:
        language === "ar"
          ? `السلام عليكم ومرحباً عزيزي العميل! 🏛️
        
أنا آدم، مستشارك العقاري الذكي المتخصص في السوق الإماراتي. معي أكثر من 50,000 عقار محدث لحظياً، وقاعدة بيانات ضخمة تشمل:

🏢 كافة مناطق الإمارات السبع مع التحليل الديموغرافي
💰 أسعار السوق المحدثة يومياً ومؤشرات الاستثمار
🔍 فحص ذكي للاحتيال وتحقق من المعلنين
📱 ربط مباشر مع دوبيزل والسوق المفتوح ومنصات التواصل
🎯 إدارة ذكية للإعلانات وتحسين الوصول

كيف يمكنني خدمتك اليوم؟ سأقدم لك استشارة شاملة ومخصصة تماماً لاحتياجاتك!`
          : `Peace be upon you and welcome dear client! 🏛️
        
I'm Adam, your intelligent real estate consultant specialized in the UAE market. I have access to over 50,000 properties updated in real-time, plus a massive database including:

🏢 All seven Emirates with demographic analysis
💰 Daily updated market prices and investment indicators  
🔍 Smart fraud detection and agent verification
📱 Direct integration with Dubizzle, Open Market and social platforms
🎯 Smart ad management and reach optimization

How may I serve you today? I'll provide comprehensive consultation tailored exactly to your needs!`,
      sender: "adam",
      timestamp: new Date(),
      suggestions:
        language === "ar"
          ? [
              "أبحث عن عقار للإيجار",
              "أريد نشر إعلان ذكي",
              "تحليل السوق والأسعار",
              "ربط بوسائل التواصل",
              "فحص الاحتيال والأمان",
            ]
          : [
              "Find rental property",
              "Create smart listing",
              "Market analysis & pricing",
              "Social media integration",
              "Fraud check & security",
            ],
      actionButtons: [
        {
          label: language === "ar" ? "بدء الاستشارة" : "Start Consultation",
          action: "consultation",
          icon: "Brain",
        },
        {
          label: language === "ar" ? "إدارة الإعلانات" : "Manage Listings",
          action: "marketing",
          icon: "TrendingUp",
        },
        {
          label: language === "ar" ? "تحليل السوق" : "Market Analysis",
          action: "analysis",
          icon: "Database",
        },
      ],
    };
    setMessages([greeting]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Advanced AI Response Generation
  const generateAdamResponse = async (
    userMessage: string,
  ): Promise<Message> => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = getSmartResponse(userMessage.toLowerCase(), language);
    setIsTyping(false);

    return {
      id: Date.now().toString(),
      content: response.message,
      sender: "adam",
      timestamp: new Date(),
      suggestions: response.suggestions,
      actionButtons: response.actionButtons,
    };
  };

  const getSmartResponse = (message: string, lang: "ar" | "en") => {
    // Property search responses
    if (
      message.includes("عقار") ||
      message.includes("property") ||
      message.includes("بحث") ||
      message.includes("search")
    ) {
      return {
        message:
          lang === "ar"
            ? `ممتاز! سأقوم بتحليل شامل لاحتياجاتك العقارية 🎯

📊 **تحليل السوق الحالي:**
• دبي: 12,500+ عقار متاح حالياً (انخفاض 8% عن الشهر الماضي)
• أبوظبي: 4,200+ عقار (استقرار في الأسعار)
• الشارقة: 6,800+ عقار (ارتفاع طفيف 3%)

🏠 **ترشيحاتي الذكية:**
1. دبي مارينا - شقق بإطلالة بحرية (65,000-180,000 درهم)
2. الخليج التجاري - قريب من وسط المدينة (55,000-150,000 درهم) 
3. الشارقة المجاز - خيار اقتصادي ممتاز (35,000-85,000 درهم)

🔥 **عروض حصرية اليوم:**
• خصم 15% على الإيجار السنوي في دبي هيلز
• شهر مجاني في منطقة موتور سيتي
• 0% عمولة في مشاريع إعمار المختارة

هل تريد تفاصيل أكثر عن منطقة معينة؟`
            : `Excellent! I'll conduct comprehensive analysis of your property needs 🎯

📊 **Current Market Analysis:**
• Dubai: 12,500+ properties available now (8% decrease from last month)
• Abu Dhabi: 4,200+ properties (price stability)
• Sharjah: 6,800+ properties (slight 3% increase)

🏠 **My Smart Recommendations:**
1. Dubai Marina - Sea view apartments (65,000-180,000 AED)
2. Business Bay - Close to downtown (55,000-150,000 AED)
3. Sharjah Al Majaz - Excellent economic choice (35,000-85,000 AED)

🔥 **Today's Exclusive Offers:**
• 15% discount on annual rent in Dubai Hills
• Free month in Motor City area
• 0% commission on selected Emaar projects

Would you like more details about a specific area?`,
        suggestions:
          lang === "ar"
            ? [
                "تفاصيل دبي مارينا",
                "عروض الشارقة",
                "شقق عائلية",
                "استديوهات للشباب",
              ]
            : [
                "Dubai Marina details",
                "Sharjah offers",
                "Family apartments",
                "Studios for youth",
              ],
        actionButtons: [
          {
            label: lang === "ar" ? "عرض الخريطة" : "Show Map",
            action: "map",
            icon: "MapPin",
          },
          {
            label: lang === "ar" ? "حساب القروض" : "Loan Calculator",
            action: "calculator",
            icon: "DollarSign",
          },
        ],
      };
    }

    // Marketing & Listing responses
    if (
      message.includes("إعلان") ||
      message.includes("نشر") ||
      message.includes("listing") ||
      message.includes("marketing")
    ) {
      return {
        message:
          lang === "ar"
            ? `رائع! سأساعدك في إنشاء إعلان احترافي ينتشر بقوة! 🚀

🎯 **خطة النشر الذكية:**
• دوبيزل PRO - تغطية 85% من السوق
• السوق المفتوح - استهداف إقليمي دقيق  
• بيوت - عملاء VIP وبحث متقدم

📱 **التسويق عبر وسائل التواصل:**
• انستغرام: منشورات + ستوري + ريلز
• فيسبوك: مجموعات الإسكان + إعلانات مدفوعة
• تيك توك: فيديوهات قصيرة للعقار

✅ **التحسينات الذكية:**
• تحسين العنوان بالذكاء الاصطناعي (+40% مشاهدات)
• تعديل الصور تلقائياً
• تحديد السعر الأمثل
• ترجمة احترافية

هل تريد البدء بتحليل عقارك؟`
            : `Fantastic! I'll help you create a professional listing! 🚀

🎯 **Smart Publishing Plan:**
• Dubizzle PRO - 85% market coverage
• Open Market - Precise targeting
• Bayut - VIP clients and advanced search

📱 **Social Media Marketing:**
• Instagram: Posts + Stories + Reels
• Facebook: Housing groups + paid ads
• TikTok: Short property videos

✅ **Smart Optimizations:**
• AI-powered title optimization (+40% views)
• Automatic image enhancement
• Optimal pricing analysis
• Professional translation

Would you like to start analyzing your property?`,
        suggestions:
          lang === "ar"
            ? ["تحليل عقاري", "تحسين الصور", "كتابة وصف ذكي", "جدولة النشر"]
            : [
                "Property analysis",
                "Image enhancement",
                "Smart description",
                "Publishing schedule",
              ],
        actionButtons: [
          {
            label: lang === "ar" ? "رفع صور العقار" : "Upload Photos",
            action: "upload",
            icon: "Upload",
          },
          {
            label: lang === "ar" ? "ربط الحسابات" : "Connect Accounts",
            action: "connect",
            icon: "Share2",
          },
        ],
      };
    }

    // Default response
    return {
      message:
        lang === "ar"
          ? `شكراً لثقتك بي! 🤖💼 أنا آدم، مستشارك العقاري الذكي.

💡 **كيف يمكنني مساعدتك؟**
• البحث عن العقار المثالي
• إنشاء وإدارة إعلانات احترافية
• تحليل السوق والأسعار
• ربط عقارك بوسائل التواصل
• فحص الإعلانات والحماية من الاحتيال

فقط أخبرني بما تريد! 🏆`
          : `Thank you for trusting me! 🤖💼 I'm Adam, your AI real estate consultant.

💡 **How can I help you?**
• Find the perfect property
• Create and manage professional listings
• Market and pricing analysis
• Connect to social media platforms
• Check listings and fraud protection

Just tell me what you need! 🏆`,
      suggestions:
        lang === "ar"
          ? ["بحث عقاري", "إنشاء إعلان", "تحليل السوق", "ربط وسائل التواصل"]
          : [
              "Property search",
              "Create listing",
              "Market analysis",
              "Social media",
            ],
      actionButtons: [
        {
          label: lang === "ar" ? "ابدأ البحث" : "Start Search",
          action: "search",
          icon: "Search",
        },
        {
          label: lang === "ar" ? "تحليل متقدم" : "Advanced Analysis",
          action: "analysis",
          icon: "Brain",
        },
      ],
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    const adamResponse = await generateAdamResponse(inputMessage);
    setMessages((prev) => [...prev, adamResponse]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleActionButton = (action: string) => {
    const actionMessages = {
      consultation:
        language === "ar"
          ? "أريد استشارة شاملة لاحتياجاتي العقارية"
          : "I want comprehensive consultation for my real estate needs",
      marketing:
        language === "ar"
          ? "ساعدني في إنشاء وإدارة إعلاناتي"
          : "Help me create and manage my listings",
      analysis:
        language === "ar"
          ? "أريد تحليل متقدم للسوق والأسعار"
          : "I want advanced market and price analysis",
    };

    if (actionMessages[action as keyof typeof actionMessages]) {
      setInputMessage(actionMessages[action as keyof typeof actionMessages]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
  };

  return (
    <Card
      className={`${isExpanded ? "fixed inset-4 z-50" : "h-[700px]"} flex flex-col bg-slate-900/95 border-gold-500/30 backdrop-blur-xl shadow-2xl transition-all duration-300`}
    >
      {/* Header */}
      <CardHeader className="pb-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-b border-gold-500/20">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-emerald-400 to-gold-400 rounded-xl blur-lg opacity-60 animate-pulse-glow"></div>
              <div className="relative bg-slate-800 p-3 rounded-xl border border-gold-400/50 shadow-lg">
                <Crown className="h-7 w-7 text-gold-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gold-400 to-emerald-400 bg-clip-text text-transparent">
                {language === "ar"
                  ? "آدم - المستشار العقاري الذكي"
                  : "Adam - AI Real Estate Consultant"}
              </h3>
              <p className="text-sm text-slate-400 font-normal">
                {language === "ar"
                  ? "مدعوم بالذكاء الاصطناعي المتطور • 50,000+ عقار"
                  : "Powered by Advanced AI • 50,000+ Properties"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/50 animate-pulse">
              <Database className="h-3 w-3 mr-1" />
              {language === "ar" ? "متصل" : "Online"}
            </Badge>
            {onExpandToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onExpandToggle}
                className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10"
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      {/* Tabs Interface */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-3 mx-4 mt-4 bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              {language === "ar" ? "المحادثة" : "Chat"}
            </TabsTrigger>
            <TabsTrigger value="platforms" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {language === "ar" ? "المنصات" : "Platforms"}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {language === "ar" ? "التحليل" : "Analytics"}
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="flex-1 flex flex-col mt-4">
            <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          message.sender === "user"
                            ? "bg-gold-400/20 border-gold-400/50"
                            : "bg-gradient-to-br from-emerald-400/30 to-gold-400/30 border-emerald-400/50"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="h-5 w-5 text-gold-400" />
                        ) : (
                          <Crown className="h-5 w-5 text-emerald-400" />
                        )}
                      </div>

                      {/* Message Content */}
                      <div
                        className={`space-y-3 ${message.sender === "user" ? "text-right" : "text-left"}`}
                      >
                        <div
                          className={`p-4 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-gradient-to-br from-gold-400/20 to-gold-500/20 border border-gold-400/40 text-white"
                              : "bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-slate-600/50 text-slate-100"
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed font-medium">
                            {message.content}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        {message.actionButtons && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.actionButtons.map((button, index) => (
                              <Button
                                key={index}
                                onClick={() =>
                                  handleActionButton(button.action)
                                }
                                size="sm"
                                className="bg-gradient-to-r from-emerald-500/80 to-gold-500/80 hover:from-emerald-600/80 hover:to-gold-600/80 text-white border-0"
                              >
                                <Sparkles className="h-3 w-3 mr-1" />
                                {button.label}
                              </Button>
                            ))}
                          </div>
                        )}

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                                className="text-sm px-4 py-2 bg-slate-600/60 hover:bg-slate-600/80 text-slate-200 rounded-full border border-slate-500/50 hover:border-emerald-400/50 transition-all duration-200 hover:shadow-lg"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-slate-500">
                          {message.timestamp.toLocaleTimeString(
                            language === "ar" ? "ar-AE" : "en-AE",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400/30 to-gold-400/30 border-2 border-emerald-400/50 flex items-center justify-center">
                        <Crown className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-slate-600/50 p-4 rounded-2xl">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-slate-700/50 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        language === "ar"
                          ? "اكتب سؤالك لآدم..."
                          : "Ask Adam anything..."
                      }
                      className="bg-slate-700/60 border-slate-600/60 focus:border-gold-400 text-white placeholder:text-slate-400 pr-12 h-12 text-base"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={toggleVoiceInput}
                      variant="ghost"
                      size="sm"
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                        isListening
                          ? "text-red-400"
                          : "text-slate-400 hover:text-gold-400"
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600 h-12 w-12 p-0 border-0"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Dubizzle", "OpenSooq", "Bayut"].map((platform) => (
                <Card
                  key={platform}
                  className="bg-slate-800/60 border-slate-700/50 hover:border-gold-400/50 transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gold-400/20 to-emerald-400/20 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-gold-400" />
                      </div>
                      <h3 className="font-bold text-white">{platform}</h3>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>
                        <strong>
                          {language === "ar" ? "الحالة:" : "Status:"}
                        </strong>{" "}
                        {language === "ar" ? "متاح للربط" : "Available"}
                      </p>
                      <p>
                        <strong>
                          {language === "ar" ? "الميزات:" : "Features:"}
                        </strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-400">
                        <li>
                          {language === "ar" ? "نشر تلقائي" : "Auto-posting"}
                        </li>
                        <li>
                          {language === "ar"
                            ? "تحسين الأسعار"
                            : "Price optimization"}
                        </li>
                        <li>
                          {language === "ar"
                            ? "إعلانات مميزة"
                            : "Featured listings"}
                        </li>
                      </ul>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500/80 to-gold-500/80">
                      {language === "ar" ? "ربط الآن" : "Connect Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Dubai",
                  districts: "Marina, Downtown, JBR",
                  range: "25K - 500K AED",
                },
                {
                  name: "Abu Dhabi",
                  districts: "Corniche, Al Reem, Saadiyat",
                  range: "20K - 350K AED",
                },
                {
                  name: "Sharjah",
                  districts: "Al Majaz, Al Qasba, University City",
                  range: "15K - 120K AED",
                },
              ].map((emirate) => (
                <Card
                  key={emirate.name}
                  className="bg-slate-800/60 border-slate-700/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="h-5 w-5 text-gold-400" />
                      <h3 className="font-bold text-white">{emirate.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-slate-300 font-medium">
                          {language === "ar"
                            ? "أهم المناطق:"
                            : "Top Districts:"}
                        </p>
                        <p className="text-slate-400">{emirate.districts}</p>
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">
                          {language === "ar" ? "نطاق الأسعار:" : "Price Range:"}
                        </p>
                        <p className="text-slate-400">{emirate.range}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default AdamChatbotFixed;
