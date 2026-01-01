import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Home,
  MapPin,
  DollarSign,
  Calendar,
  Phone,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatAssistantProps {
  language?: "ar" | "en";
  userContext?: {
    name?: string;
    preferences?: {
      budget?: number;
      location?: string;
      propertyType?: string;
    };
  };
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  language = "ar",
  userContext,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiMode, setAiMode] = useState<"assistant" | "search" | "advisor">(
    "assistant",
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting message
    const greeting: Message = {
      id: "welcome",
      content:
        language === "ar"
          ? `مرحباً ${userContext?.name || ""}! أنا مساعدك الذكي في ليتشي العقارية. كيف يمكنني مساعدتك اليوم في العثور على السكن المثالي؟`
          : `Hello ${userContext?.name || ""}! I'm your AI assistant at Litchi Real Estate. How can I help you find the perfect accommodation today?`,
      sender: "ai",
      timestamp: new Date(),
      suggestions:
        language === "ar"
          ? [
              "أبحث عن شقة في دبي",
              "ما هو أفضل سعر للإيجار؟",
              "أريد معلومات عن المنطقة",
              "كيف أتحقق من موثوقية الوكيل؟",
            ]
          : [
              "Looking for an apartment in Dubai",
              "What's the best rental price?",
              "I need area information",
              "How to verify agent credibility?",
            ],
    };
    setMessages([greeting]);
  }, [language, userContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate local AI responses (in real app, this would be GPT4All or similar)
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    setIsTyping(true);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses = getSmartResponse(userMessage.toLowerCase(), language);

    setIsTyping(false);

    return {
      id: Date.now().toString(),
      content: responses.message,
      sender: "ai",
      timestamp: new Date(),
      suggestions: responses.suggestions,
    };
  };

  const getSmartResponse = (message: string, lang: "ar" | "en") => {
    // Property search responses
    if (
      message.includes("شقة") ||
      message.includes("apartment") ||
      message.includes("بحث") ||
      message.includes("search")
    ) {
      return {
        message:
          lang === "ar"
            ? `ممتاز! سأساعدك في العثور على الشقة المناسبة. بناءً على تفضيلاتك${userContext?.preferences?.budget ? ` (ميزانية: ${userContext.preferences.budget} درهم)` : ""}, إليك بعض الخيارات المتاحة:\n\n🏠 شقق في ${userContext?.preferences?.location || "دبي"}\n💰 ضمن الميزانية المحددة\n✅ موثقة ومتحققة\n\nهل تريد فلاتر إضافية مثل عدد الغرف أو المرافق المطلوبة؟`
            : `Excellent! I'll help you find the perfect apartment. Based on your preferences${userContext?.preferences?.budget ? ` (budget: ${userContext.preferences.budget} AED)` : ""}, here are some available options:\n\n🏠 Apartments in ${userContext?.preferences?.location || "Dubai"}\n💰 Within your budget\n✅ Verified and authenticated\n\nWould you like additional filters such as number of rooms or required amenities?`,
        suggestions:
          lang === "ar"
            ? [
                "عرض الشقق ا��متاحة",
                "فلترة حسب السعر",
                "مناطق آمنة للعائلات",
                "شقق قريبة من المترو",
              ]
            : [
                "Show available apartments",
                "Filter by price",
                "Family-safe areas",
                "Metro-adjacent apartments",
              ],
      };
    }

    // Price and budget inquiries
    if (
      message.includes("سعر") ||
      message.includes("price") ||
      message.includes("ميزانية") ||
      message.includes("budget")
    ) {
      return {
        message:
          lang === "ar"
            ? `بخصوص الأسعار، إليك معلومات السوق الحالية:\n\n📊 متوسط الأسعار في الإمارات:\n• استوديو: 25,000 - 45,000 درهم/سنة\n• غرفة واحدة: 35,000 - 65,000 درهم/سنة\n• غرفتان: 50,000 - 120,000 درهم/سنة\n\n💡 نصيحة: أسعار نهاية العام عادة أفضل، والمناطق الجديدة تقدم قيمة ممتازة مقابل المال.\n\nما هي ميزانيتك المفضلة؟`
            : `Regarding prices, here's current market information:\n\n📊 Average prices in UAE:\n• Studio: 25,000 - 45,000 AED/year\n• 1BR: 35,000 - 65,000 AED/year\n• 2BR: 50,000 - 120,000 AED/year\n\n💡 Tip: End-of-year prices are usually better, and new areas offer excellent value for money.\n\nWhat's your preferred budget?`,
        suggestions:
          lang === "ar"
            ? [
                "أقل من 50,000 درهم",
                "بين 50,000 - 100,000",
                "أكثر من 100,000",
                "نصائح توفير في الإيجار",
              ]
            : [
                "Under 50,000 AED",
                "Between 50,000 - 100,000",
                "Above 100,000",
                "Rent saving tips",
              ],
      };
    }

    // Area and location information
    if (
      message.includes("منطقة") ||
      message.includes("area") ||
      message.includes("موقع") ||
      message.includes("location")
    ) {
      return {
        message:
          lang === "ar"
            ? `معلومات المناطق هي تخصصي! 🗺️\n\n🌟 المناطق الأكثر طلباً:\n• دبي مارينا: حيوية + إطلالة بحرية\n• الخليج التجاري: قريب من وسط المدينة\n• الشارقة: أسعار معقولة + هادئة\n• عجمان: الأوفر + قريب من دبي\n\n🚇 المناطق المتصلة بالمترو توفر سهولة التنقل.\n\nأي منطقة تفضل أو تريد معلومات إضافية عنها؟`
            : `Area information is my specialty! 🗺️\n\n🌟 Most popular areas:\n• Dubai Marina: Vibrant + Sea view\n• Business Bay: Close to downtown\n• Sharjah: Affordable + Quiet\n• Ajman: Most economical + Close to Dubai\n\n🚇 Metro-connected areas offer easy transportation.\n\nWhich area do you prefer or want more information about?`,
        suggestions:
          lang === "ar"
            ? [
                "مناطق عائلية آمنة",
                "قريب من العمل",
                "حياة ليلية نشطة",
                "مناطق للطلاب",
              ]
            : [
                "Safe family areas",
                "Close to work",
                "Active nightlife",
                "Student areas",
              ],
      };
    }

    // Safety and verification
    if (
      message.includes("أمان") ||
      message.includes("safety") ||
      message.includes("موثوق") ||
      message.includes("verify")
    ) {
      return {
        message:
          lang === "ar"
            ? `أمانك أولويتنا! 🛡️ إليك دليل التحقق الذكي:\n\n✅ علامات الوكيل الموثوق:\n• هوية متحققة بالذكاء الاصطناعي\n• تقييمات إيجابية (4+ نجوم)\n• صور حقيقية للعقار\n• يسمح بالمعاينة قبل الدفع\n\n��� علامات تحذيرية:\n• طلب دفع قبل المعاينة\n• أسعار أقل من السوق بكثير\n• رفض المكالمات الصوتية\n• صور منخفضة الجودة\n\nهل تريد فحص إعلان معين؟`
            : `Your safety is our priority! 🛡️ Here's the smart verification guide:\n\n✅ Trusted agent signs:\n• AI-verified identity\n• Positive ratings (4+ stars)\n• Real property photos\n• Allows viewing before payment\n\n❌ Warning signs:\n• Demands payment before viewing\n• Prices much below market\n• Refuses voice calls\n• Low-quality photos\n\nWould you like to check a specific listing?`,
        suggestions:
          lang === "ar"
            ? [
                "فحص إعلان",
                "نصائح أمان أكثر",
                "كيفية تجنب النصب",
                "تقييم الوكلاء",
              ]
            : [
                "Check listing",
                "More safety tips",
                "How to avoid scams",
                "Rate agents",
              ],
      };
    }

    // Default helpful response
    return {
      message:
        lang === "ar"
          ? `أفهم استفسارك وأقدر ثقتك بي! 🤖\n\nكمساعد ذكي في RoomUAE PRO، يمكنني مساعدتك في:\n• البحث عن العقارات المناسبة\n• معلومات المناطق والأسعار\n• نصائح الأمان والتحقق\n• التواصل مع الوكلاء الموثقين\n• ترشيحات ذكية بناءً على تفضيلاتك\n\nما هو السؤال المحدد الذي يمكنني مساعدتك فيه؟`
          : `I understand your inquiry and appreciate your trust! 🤖\n\nAs an AI assistant at RoomUAE PRO, I can help you with:\n• Finding suitable properties\n• Area and price information\n• Safety and verification tips\n• Connecting with verified agents\n• Smart recommendations based on your preferences\n\nWhat specific question can I help you with?`,
      suggestions:
        lang === "ar"
          ? ["البحث عن عقار", "معلومات الأسعار", "نصائح الأمان", "ترشيحات ذكية"]
          : [
              "Search properties",
              "Price information",
              "Safety tips",
              "Smart recommendations",
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

    const aiResponse = await generateAIResponse(inputMessage);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In real implementation, integrate with Speech Recognition API
  };

  return (
    <Card className="h-[600px] flex flex-col bg-slate-800/80 border-slate-700/50 backdrop-blur-lg">
      {/* Header */}
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-lg blur opacity-60"></div>
              <div className="relative bg-slate-800 p-2 rounded-lg border border-gold-400/30">
                <Bot className="h-6 w-6 text-gold-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {language === "ar" ? "المساعد الذكي" : "AI Assistant"}
              </h3>
              <p className="text-sm text-slate-400 font-normal">
                {language === "ar"
                  ? "مدعوم بالذكاء الاصطناعي"
                  : "Powered by AI"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
              <Sparkles className="h-3 w-3 mr-1" />
              {language === "ar" ? "متصل" : "Online"}
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-gold-400/20 border border-gold-400/30"
                      : "bg-emerald-400/20 border border-emerald-400/30"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-4 w-4 text-gold-400" />
                  ) : (
                    <Bot className="h-4 w-4 text-emerald-400" />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`space-y-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`p-4 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gold-400/20 border border-gold-400/30 text-white"
                        : "bg-slate-700/50 border border-slate-600/50 text-slate-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-sm px-3 py-1 bg-slate-600/50 hover:bg-slate-600/70 text-slate-200 rounded-full border border-slate-500/50 hover:border-gold-400/50 transition-all duration-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-slate-500">
                    {message.timestamp.toLocaleTimeString(
                      language === "ar" ? "ar-AE" : "en-AE",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
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
                <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="bg-slate-700/50 border border-slate-600/50 p-4 rounded-2xl">
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
                    ? "اكتب رسالتك هنا..."
                    : "Type your message here..."
                }
                className="bg-slate-700/50 border-slate-600 focus:border-gold-400 text-white placeholder:text-slate-500 pr-12"
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
              className="btn-primary h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatAssistant;
