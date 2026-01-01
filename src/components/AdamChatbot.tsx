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
  attachments?: any[];
  actionButtons?: {
    label: string;
    action: string;
    icon?: string;
  }[];
}

interface AdamChatbotProps {
  language?: "ar" | "en";
  isExpanded?: boolean;
  onExpandToggle?: () => void;
  userContext?: {
    name?: string;
    preferences?: {
      budget?: number;
      location?: string;
      propertyType?: string;
    };
  };
}

// Simplified knowledge base to avoid rendering issues
const getAdamKnowledge = () => ({
  areas: [
    "Dubai Marina",
    "Downtown Dubai",
    "Business Bay",
    "JBR",
    "Sharjah Al Majaz",
  ],
  priceRanges: {
    studio: "25,000 - 85,000 AED",
    "1br": "40,000 - 120,000 AED",
    "2br": "65,000 - 180,000 AED",
  },
  platforms: ["Dubizzle", "OpenSooq", "Bayut", "Instagram", "Facebook"],
  features: [
    "AI Analysis",
    "Fraud Detection",
    "Auto Posting",
    "Price Optimization",
  ],
});

const AdamChatbot: React.FC<AdamChatbotProps> = ({
  language = "ar",
  isExpanded = false,
  onExpandToggle,
  userContext,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [adamMode, setAdamMode] = useState<
    "consultant" | "marketer" | "analyzer"
  >("consultant");
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
  }, [language, userContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Advanced AI Response Generation with Context Awareness
  const generateAdamResponse = async (
    userMessage: string,
  ): Promise<Message> => {
    setIsTyping(true);

    // Simulate advanced processing
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 1000),
    );

    const response = getAdamIntelligentResponse(
      userMessage.toLowerCase(),
      language,
      adamMode,
    );

    setIsTyping(false);

    return {
      id: Date.now().toString(),
      content: response.message,
      sender: "adam",
      timestamp: new Date(),
      suggestions: response.suggestions,
      actionButtons: response.actionButtons,
      attachments: response.attachments,
    };
  };

  const getAdamIntelligentResponse = (
    message: string,
    lang: "ar" | "en",
    mode: string,
  ) => {
    // Property Search & Consultation
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

🔍 **بناءً على تفضيلاتك:**
• الميزانية: حسب اختيارك
• المنطقة المفضلة: جميع الإمارات

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

🔍 **Based on your preferences:**
• Budget: As per your choice
• Preferred area: All Emirates

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
                "فلل فاخرة",
              ]
            : [
                "Dubai Marina details",
                "Sharjah offers",
                "Family apartments",
                "Studios for youth",
                "Luxury villas",
              ],
        actionButtons: [
          {
            label:
              lang === "ar" ? "عرض الخريطة التفاعلية" : "Show Interactive Map",
            action: "map",
            icon: "MapPin",
          },
          {
            label: lang === "ar" ? "حساب القروض" : "Loan Calculator",
            action: "calculator",
            icon: "DollarSign",
          },
          {
            label: lang === "ar" ? "جولة افتراضية" : "Virtual Tour",
            action: "tour",
            icon: "Eye",
          },
        ],
      };
    }

    // Ad Creation & Marketing
    if (
      message.includes("إعلان") ||
      message.includes("نشر") ||
      message.includes("listing") ||
      message.includes("post")
    ) {
      return {
        message:
          lang === "ar"
            ? `رائع! سأساعدك في إنشاء إعلان احترافي ينتشر بقوة في جميع المنصات! 🚀

🎯 **خطة النشر الذكية:**

**1. منصات الإعلان الرئيسية:**
• دوبيزل PRO - تغطية 85% من السوق (رسوم: 2.5% + 100 درهم)
• السوق المفتوح - استهداف ديموغرافي دقيق (رسوم: 1.8% + 75 درهم)
• بيوت - عملاء VIP وبحث متقدم (رسوم: 3% + 150 درهم)

**2. التسويق عبر وسائل التواصل:**
• انستغرام: منشورات + ستوري + ريلز (متابعين محتملين: 25,000+)
• فيسبوك: مجموعات الإسكان + إعلانات مدفوعة
• تيك توك: فيديوهات قصيرة للعقار (وصول: 50,000+ مشاهدة)

**3. التحسينات الذكية:**
✅ تحسين العنوان بالذكاء الاصطناعي (+40% مشاهدات)
✅ تعديل الصور تلقائياً (إضاءة، زوايا، فلاتر)
✅ تحديد السعر الأمثل بناءً على السوق
✅ ترجمة احترافية (عربي/إنجليزي)
✅ جدولة النشر في الأوقات الذهبية

هل تريد البدء بتحليل عقارك وإنشاء الإعلان؟`
            : `Fantastic! I'll help you create a professional listing that spreads powerfully across all platforms! 🚀

🎯 **Smart Publishing Plan:**

**1. Main Listing Platforms:**
• Dubizzle PRO - 85% market coverage (fees: 2.5% + 100 AED)
• Open Market - Precise demographic targeting (fees: 1.8% + 75 AED)
• Bayut - VIP clients and advanced search (fees: 3% + 150 AED)

**2. Social Media Marketing:**
• Instagram: Posts + Stories + Reels (potential followers: 25,000+)
• Facebook: Housing groups + paid advertisements
• TikTok: Short property videos (reach: 50,000+ views)

**3. Smart Optimizations:**
✅ AI-powered title optimization (+40% views)
✅ Automatic image enhancement (lighting, angles, filters)
✅ Optimal pricing based on market analysis
✅ Professional translation (Arabic/English)
✅ Scheduled posting during golden hours

Would you like to start analyzing your property and creating the listing?`,
        suggestions:
          lang === "ar"
            ? [
                "تحليل عقاري",
                "تحسين الصور",
                "كتابة وصف ذكي",
                "جدولة النشر",
                "تقرير الأداء",
              ]
            : [
                "Property analysis",
                "Image enhancement",
                "Smart description",
                "Publishing schedule",
                "Performance report",
              ],
        actionButtons: [
          {
            label: lang === "ar" ? "رفع صور العقار" : "Upload Property Photos",
            action: "upload",
            icon: "Upload",
          },
          {
            label:
              lang === "ar" ? "إنشاء فيديو تسويقي" : "Create Marketing Video",
            action: "video",
            icon: "Video",
          },
          {
            label: lang === "ar" ? "ربط الحسابات" : "Connect Accounts",
            action: "connect",
            icon: "Share2",
          },
        ],
      };
    }

    // Social Media Integration & Marketing
    if (
      message.includes("تواصل") ||
      message.includes("social") ||
      message.includes("انستغرام") ||
      message.includes("فيسبوك")
    ) {
      return {
        message:
          lang === "ar"
            ? `ممتاز! سأقوم بربط عقارك بجميع منصات التواصل الاجتماعي وإنشاء حملة تسويقية شاملة! 📱✨

🔗 **الربط المباشر:**

**انستغرام (1.2M+ متابع محلي):**
• نشر تلقائي للصور مع الهاشتاغات الرائجة
• ستوريز تفاعلية مع استطلاعات وأسئلة
• ريلز احترافية بموسيقى ترندنغ
• البث المباشر للجولات الافتراضية

**فيسبوك (850K+ عضو في مجموعات الإسكان):**
• نشر في 15+ مجموعة متخصصة
• إعلانات مدفوعة مستهدفة للوافدين الجدد
• فعاليات اف��راضية للمعاينة الجماعية
• تسويق بالمحتوى (نصائح السكن، مقارنات المناطق)

**تيك توك (300K+ مشاهدة متوسطة):**
• فيديوهات قصيرة للعقار (15-30 ثانية)
• ترندات العقارات #UAEProperties #DubaiRent
• تعاون مع المؤثرين العقاريين
• تحديات تفاعلية (#FindMyPerfectRoom)

**لينكد إن (استهداف المحترفين):**
• منشورات للشركات والموظفين الجدد
• شراكات مع شركات التوظيف
• محتوى تعليمي عن الاستثمار العقاري

📊 **توقعات الوصول:**
• انستغرام: 25,000-50,000 مشاهدة
• فيسبوك: 15,000-30,000 وصول
• تيك توك: 50,000-100,000 مشاهدة
• احتمالية التحويل: 8-12%

هل تريد البدء بربط حساباتك؟`
            : `Excellent! I'll connect your property to all social media platforms and create a comprehensive marketing campaign! 📱✨

🔗 **Direct Integration:**

**Instagram (1.2M+ local followers):**
• Automatic posting with trending hashtags
• Interactive stories with polls and questions
• Professional Reels with trending music
• Live streaming for virtual tours

**Facebook (850K+ members in housing groups):**
• Posting in 15+ specialized groups
• Targeted paid ads for newcomers
• Virtual group viewing events
• Content marketing (housing tips, area comparisons)

**TikTok (300K+ average views):**
• Short property videos (15-30 seconds)
• Real estate trends #UAEProperties #DubaiRent
• Collaboration with real estate influencers
• Interactive challenges (#FindMyPerfectRoom)

**LinkedIn (targeting professionals):**
• Posts for companies and new employees
• Partnerships with recruitment firms
• Educational content about real estate investment

📊 **Reach Expectations:**
• Instagram: 25,000-50,000 views
• Facebook: 15,000-30,000 reach
• TikTok: 50,000-100,000 views
• Conversion probability: 8-12%

Would you like to start connecting your accounts?`,
        suggestions:
          lang === "ar"
            ? [
                "ربط انستغرام",
                "إعدادات فيسبوك",
                "استراتيجية تيك توك",
                "حملة لينكد إن",
                "تحليل المنافسين",
              ]
            : [
                "Connect Instagram",
                "Facebook setup",
                "TikTok strategy",
                "LinkedIn campaign",
                "Competitor analysis",
              ],
        actionButtons: [
          {
            label: lang === "ar" ? "ربط الحسابات" : "Connect Accounts",
            action: "social_connect",
            icon: "Share2",
          },
          {
            label: lang === "ar" ? "إنشاء المحتوى" : "Create Content",
            action: "content_create",
            icon: "PlusCircle",
          },
          {
            label: lang === "ar" ? "جدولة المنشورات" : "Schedule Posts",
            action: "schedule",
            icon: "Calendar",
          },
        ],
      };
    }

    // Market Analysis & Pricing
    if (
      message.includes("سوق") ||
      message.includes("أسعار") ||
      message.includes("market") ||
      message.includes("price") ||
      message.includes("تحليل")
    ) {
      return {
        message:
          lang === "ar"
            ? `تحليل السوق العقاري الشامل - بيانات حية ومحدثة! 📈💎

📊 **تقرير السوق الإماراتي (${new Date().toLocaleDateString("ar-AE")}):**

**دبي (الأداء الأقوى):**
• متوسط الإيجار: 85,000 درهم (+5% عن العام الماضي)
• معدل الإشغال: 92% (ممتاز)
• الأحياء الأكثر طلباً: مارينا (+12%)، داون تاون (+8%)، JBR (+15%)
• توقعات 2024: نمو 8-12% في الأسعار

**أبوظبي (استقرار وجودة):**
• متوسط الإيجار: 75,000 درهم (ثبات)
• معدل الإشغال: 88%
• نمو في: جزيرة الريم (+6%)، كورنيش (+4%)
• توقعات: استقرار مع نمو طفيف 3-5%

**الشارقة (القيمة الأفضل):**
• متوسط الإيجار: 45,000 درهم (-2% توفير للمستأجرين)
• معدل الإشغال: 95% (الأعلى!)
• المناطق المميزة: المجاز، القصباء، الخان
• توقعات: نمو متدرج 5-7%

**عجمان (الاقتصادي الذكي):**
• متوسط الإيجار: 35,000 درهم (أفضل قيمة!)
• قرب من دبي: 25 دقيقة بالسيارة
• استثمار ممتاز للشباب والعائلات الجديدة

🎯 **توصياتي الاستثمارية:**
1. **للاستثمار قصير المدى:** دبي مارينا، JBR
2. **للاستثمار طويل المدى:** دبي هيلز، تاون سكوير
3. **للعوائد المستقرة:** أبوظبي كورنيش، الريم
4. **للمبتدئين:** الشارقة المجاز، عجمان الراشدية

هل تريد تحليل مفصل لمنطقة معينة؟`
            : `Comprehensive Real Estate Market Analysis - Live Updated Data! 📈💎

📊 **UAE Real Estate Report (${new Date().toLocaleDateString("en-AE")}):**

**Dubai (Strongest Performance):**
• Average rent: 85,000 AED (+5% YoY)
• Occupancy rate: 92% (excellent)
• Most demanded areas: Marina (+12%), Downtown (+8%), JBR (+15%)
• 2024 forecast: 8-12% price growth

**Abu Dhabi (Stability & Quality):**
• Average rent: 75,000 AED (stable)
• Occupancy rate: 88%
• Growth in: Al Reem Island (+6%), Corniche (+4%)
• Forecast: Stability with slight 3-5% growth

**Sharjah (Best Value):**
• Average rent: 45,000 AED (-2% savings for tenants)
• Occupancy rate: 95% (highest!)
• Premium areas: Al Majaz, Al Qasba, Al Khan
• Forecast: Gradual 5-7% growth

**Ajman (Smart Economy):**
• Average rent: 35,000 AED (best value!)
• Dubai proximity: 25 minutes by car
• Excellent investment for youth and new families

🎯 **My Investment Recommendations:**
1. **Short-term investment:** Dubai Marina, JBR
2. **Long-term investment:** Dubai Hills, Town Square
3. **Stable returns:** Abu Dhabi Corniche, Al Reem
4. **For beginners:** Sharjah Al Majaz, Ajman Al Rashidiya

Would you like detailed analysis for a specific area?`,
        suggestions:
          lang === "ar"
            ? [
                "تحليل دبي مارينا",
                "توقعات 2024",
                "مقارنة الإمارات",
                "حاسبة العائد",
                "نصائح الاستثمار",
              ]
            : [
                "Dubai Marina analysis",
                "2024 forecasts",
                "Emirates comparison",
                "ROI calculator",
                "Investment tips",
              ],
        actionButtons: [
          {
            label: lang === "ar" ? "حاسبة العائد" : "ROI Calculator",
            action: "roi_calc",
            icon: "TrendingUp",
          },
          {
            label: lang === "ar" ? "خريطة الأسعار" : "Price Map",
            action: "price_map",
            icon: "MapPin",
          },
          {
            label: lang === "ar" ? "تقرير مخصص" : "Custom Report",
            action: "custom_report",
            icon: "FileText",
          },
        ],
      };
    }

    // Fraud Detection & Security
    if (
      message.includes("احتيال") ||
      message.includes("أمان") ||
      message.includes("fraud") ||
      message.includes("safety") ||
      message.includes("check")
    ) {
      return {
        message:
          lang === "ar"
            ? `🛡️ نظام الحماية المتطور - أمانك أولويتي القصوى!

🔍 **فحص الاحتيال بالذكاء الاصطناعي:**

**العلامات الحمراء (تجنبها فوراً):**
❌ الأسعار أقل من السوق بـ 40%+ (99% احتيال)
❌ طلب الدفع قبل المعاينة (احتيال مؤكد)
❌ صور منخفضة الجودة أو مكررة
❌ رفض المكالمات الفيديو أو اللقاء الشخصي
❌ أرقام هواتف غير إماراتية
❌ عدم وجود رخصة RERA للوكيل

**العلامات الخضراء (موثوق):**
✅ وكيل مرخص من RERA مع تحقق الهوية
✅ تقييمات إيجابية 4+ نجوم (50+ تقييم)
✅ صور عالية الجودة مع زوايا متعددة
✅ يسمح بالمعاينة قبل أي التزام مالي
✅ رقم هاتف إماراتي مع WhatsApp Business
✅ عنوان مكتب فعلي قابل للزيارة

🔒 **خدمات الحماية الإضافية:**
• فحص تلقائي لجميع الإعلانات (AI + بيانات السوق)
• التحقق من هوية المعلن (ربط مع قواعد البيانات الحكومية)
• مقارنة الأسعار مع متوسط السوق
• فحص الصور (تكرار، تعديل، جودة)
• تحليل النصوص (أنماط الاحتيال المعروفة)
• تقييم المخاطر (نسبة مئوية للثقة)

**🚨 أحدث عمليات الاحتيال (كن حذراً):**
1. وهم "العقار الحصري" - نفس العقار منشور بأسماء متعددة
2. احتيال "الانتقال السريع" - ضغط لاتخاذ قرار فوري
3. خدعة "الخصم الكبير" - تخفيضات غير منطقية
4. احتيال "الدفع الآمن" - طلب تحويل لحسابات مشبوهة

هل تريد فحص إعلان معين؟ أرسل لي الرابط!`
            : `🛡️ Advanced Protection System - Your Safety is My Top Priority!

🔍 **AI-Powered Fraud Detection:**

**Red Flags (Avoid Immediately):**
❌ Prices 40%+ below market (99% fraud)
❌ Payment requests before viewing (confirmed fraud)
❌ Low-quality or duplicated images
❌ Refusing video calls or personal meetings
❌ Non-UAE phone numbers
❌ No RERA license for agent

**Green Flags (Trustworthy):**
✅ RERA licensed agent with ID verification
✅ Positive ratings 4+ stars (50+ reviews)
✅ High-quality photos with multiple angles
✅ Allows viewing before any financial commitment
✅ UAE phone number with WhatsApp Business
✅ Real office address visitable

🔒 **Additional Protection Services:**
• Automatic screening of all listings (AI + market data)
• Advertiser identity verification (government database link)
• Price comparison with market average
• Image analysis (duplication, editing, quality)
• Text analysis (known fraud patterns)
• Risk assessment (confidence percentage)

**🚨 Latest Fraud Schemes (Be Careful):**
1. "Exclusive Property" scam - same property posted with multiple names
2. "Quick Move" fraud - pressure for immediate decision
3. "Big Discount" trick - unrealistic price reductions
4. "Secure Payment" scam - requests for suspicious account transfers

Want to check a specific listing? Send me the link!`,
        suggestions:
          lang === "ar"
            ? [
                "فحص إعلان",
                "تحقق من وكيل",
                "نصائح الأمان",
                "الدفع الآمن",
                "تقييم المخاطر",
              ]
            : [
                "Check listing",
                "Verify agent",
                "Safety tips",
                "Secure payment",
                "Risk assessment",
              ],
        actionButtons: [
          {
            label: lang === "ar" ? "فحص رابط" : "Check Link",
            action: "check_link",
            icon: "Shield",
          },
          {
            label: lang === "ar" ? "تحقق من رقم" : "Verify Number",
            action: "verify_number",
            icon: "Phone",
          },
          {
            label: lang === "ar" ? "تقرير احتيال" : "Report Fraud",
            action: "report_fraud",
            icon: "ExternalLink",
          },
        ],
      };
    }

    // Default sophisticated response
    return {
      message:
        lang === "ar"
          ? `شكراً لثقتك بي! 🤖💼 أنا آدم، مستشارك العقاري الذكي المتطور.

🧠 **قدراتي المتقدمة:**
• قاعدة بيانات ضخمة: 50,000+ عقار محدث لحظياً
• تحليل السوق بالذكاء الاصطناعي والبيانات الحية
• ربط مباشر مع دوبيزل، السوق المفتوح، ومنصات التواصل
• فحص الاحتيال المتطور ونظام الحماية الشامل
• إدارة الإعلانات الذكية وتحسين الوصول
• استشارا�� استثمارية مخصصة وتوقعات السوق

💡 **كيف يمكنني مساعدتك اليوم؟**
• البحث عن العقار المثالي بناءً على احتياجاتك
• إنشاء وإدارة إعلانات احترافية
• تحليل السوق والأسعار والاستثمار
• ربط عقارك بجميع منصات التواصل الاجتماعي
• فحص الإعلانات والحماية من الاحتيال
• استشارة شاملة في الاستثمار العقاري

فقط أخبرني بما تريد، وسأقدم لك حلولاً ذكية ومتطورة! 🏆`
          : `Thank you for trusting me! 🤖💼 I'm Adam, your advanced intelligent real estate consultant.

🧠 **My Advanced Capabilities:**
• Massive database: 50,000+ properties updated in real-time
• AI market analysis with live data
• Direct integration with Dubizzle, Open Market, and social platforms
• Advanced fraud detection and comprehensive protection system
• Smart listing management and reach optimization
• Customized investment consulting and market forecasts

💡 **How can I help you today?**
• Find the perfect property based on your needs
• Create and manage professional listings
• Market, pricing and investment analysis
• Connect your property to all social media platforms
• Check listings and protect against fraud
• Comprehensive real estate investment consultation

Just tell me what you want, and I'll provide smart and advanced solutions! 🏆`,
      suggestions:
        lang === "ar"
          ? [
              "بحث عقاري متقدم",
              "إنشاء إعلان ذكي",
              "تحليل السوق",
              "ربط وسائل التواصل",
              "فحص الأمان",
            ]
          : [
              "Advanced property search",
              "Create smart listing",
              "Market analysis",
              "Social media integration",
              "Security check",
            ],
      actionButtons: [
        {
          label: lang === "ar" ? "ابدأ البحث" : "Start Search",
          action: "start_search",
          icon: "Search",
        },
        {
          label: lang === "ar" ? "إنشاء إعلان" : "Create Listing",
          action: "create_listing",
          icon: "PlusCircle",
        },
        {
          label: lang === "ar" ? "تحليل متقدم" : "Advanced Analysis",
          action: "advanced_analysis",
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
      {/* Advanced Header */}
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
            <Button
              variant="ghost"
              size="sm"
              className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10"
              onClick={() =>
                setAdamMode(
                  adamMode === "consultant"
                    ? "marketer"
                    : adamMode === "marketer"
                      ? "analyzer"
                      : "consultant",
                )
              }
            >
              <Brain className="h-4 w-4" />
            </Button>
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

      {/* Advanced Tabs Interface */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-4 mx-4 mt-4 bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              {language === "ar" ? "المحادثة" : "Chat"}
            </TabsTrigger>
            <TabsTrigger
              value="marketplace"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === "ar" ? "المنصات" : "Platforms"}
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              {language === "ar" ? "التواصل" : "Social"}
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
                                {button.icon && (
                                  <Sparkles className="h-3 w-3 mr-1" />
                                )}
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

              {/* Enhanced Input */}
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

          {/* Marketplace Integration Tab */}
          <TabsContent value="marketplace" className="flex-1 p-4">
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
                      <h3 className="font-bold text-white capitalize">
                        {platform}
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>
                        <strong>Status:</strong>{" "}
                        {language === "ar" ? "متاح للربط" : "Available"}
                      </p>
                      <p>
                        <strong>Features:</strong>
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

          {/* Social Media Tab */}
          <TabsContent value="social" className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Instagram", icon: Instagram },
                { name: "Facebook", icon: Facebook },
                { name: "Twitter", icon: Twitter },
              ].map((platform) => (
                <Card
                  key={platform.name}
                  className="bg-slate-800/60 border-slate-700/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-gold-400/20 to-emerald-400/20 rounded-lg flex items-center justify-center">
                        <platform.icon className="h-5 w-5 text-gold-400" />
                      </div>
                      <h3 className="font-bold text-white">{platform.name}</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-slate-300 font-medium">
                          {language === "ar" ? "الحالة:" : "Status:"}
                        </p>
                        <p className="text-slate-400">
                          {language === "ar"
                            ? "جاهز للربط"
                            : "Ready to connect"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">
                          {language === "ar" ? "الميزات:" : "Features:"}
                        </p>
                        <p className="text-slate-400">
                          {language === "ar"
                            ? "نشر تلقائي، تحليلات، استهداف"
                            : "Auto-posting, Analytics, Targeting"}
                        </p>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500/80 to-gold-500/80">
                      <Share2 className="h-4 w-4 mr-2" />
                      {language === "ar" ? "ربط الحساب" : "Connect Account"}
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

export default AdamChatbot;
