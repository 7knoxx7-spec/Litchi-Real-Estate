import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Home,
  Heart,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  Share2,
  Camera,
  Video,
  MessageCircle,
  Phone,
  Instagram,
  Facebook,
  Send,
  Crown,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";

interface DreamHomeDiscoveryProps {
  isOpen: boolean;
  onClose: () => void;
  language: "ar" | "en";
  userProfile: "male" | "female";
}

// Simplified Real Database for Youth Housing
const getYouthHousingDatabase = () => ({
  // Real estate data for young people in UAE
  properties: [
    {
      id: "youth_001",
      type: "shared_room",
      title: {
        ar: "غرفة مشتركة في دبي مارينا - للفتيات فقط",
        en: "Shared Room in Dubai Marina - Females Only",
        ur: "دبئی مرینا میں مشترکہ کمرہ - صرف لڑکیوں کے لیے",
      },
      price: 800,
      location: {
        area: "Dubai Marina",
        coordinates: { lat: 25.0657, lng: 55.1393 },
      },
      targetGender: "female",
      ageGroup: "18-25",
      sharing: "bed_space",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e1a3ecb4d0bd?w=600&h=400&fit=crop",
      ],
      amenities: [
        "wifi",
        "ac",
        "kitchen",
        "laundry",
        "security",
        "female_only",
      ],
      roommates: {
        current: 2,
        max: 4,
        profiles: ["Student", "Working Professional"],
      },
      rules: {
        ar: "بيئة آمنة للفتيات، منع التدخين",
        en: "Safe environment for females, no smoking",
        ur: "لڑکیوں کے لیے محفوظ ماحول، سگریٹ نوشی ممنوع",
      },
      nearbyPlaces: ["Dubai Marina Mall", "JBR Beach", "Metro Station"],
      socialScore: 4.8,
      safetyScore: 5.0,
      agent: {
        name: "فاطمة أحمد",
        whatsapp: "+971501234567",
        instagram: "@fatima_properties",
        verified: true,
        specializes: "female_housing",
      },
      postedBy: "verified_agent",
      postingCost: 20,
      shareableContent: {
        shortVideo: "property_tour_001.mp4",
        instagramStory: "story_template_001.png",
        facebookPost: "fb_post_001.html",
      },
    },
    {
      id: "youth_002",
      type: "partition",
      title: {
        ar: "بارتيشن في الشارقة - مناسب للشباب العاملين",
        en: "Partition in Sharjah - Perfect for Working Youth",
        ur: "شارجہ میں پارٹیشن - کام کرنے والے نوجوانوں کے لیے موزوں",
      },
      price: 650,
      location: {
        area: "Al Majaz",
        coordinates: { lat: 25.3463, lng: 55.3915 },
      },
      targetGender: "male",
      ageGroup: "22-30",
      sharing: "partition",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=600&h=400&fit=crop",
      ],
      amenities: ["wifi", "ac", "shared_kitchen", "parking", "gym_nearby"],
      roommates: {
        current: 1,
        max: 2,
        profiles: ["IT Professional", "Engineer"],
      },
      rules: {
        ar: "نظافة عامة، احترام الخصوصية",
        en: "General cleanliness, respect privacy",
        ur: "عمومی صفائی، نجی زندگی کا احترام",
      },
      nearbyPlaces: ["Al Majaz Waterfront", "Sahara Mall", "University City"],
      socialScore: 4.5,
      safetyScore: 4.7,
      agent: {
        name: "أحمد محمد",
        whatsapp: "+971507654321",
        instagram: "@ahmed_realestate",
        verified: true,
        specializes: "youth_housing",
      },
      postedBy: "individual",
      postingCost: 20,
      shareableContent: {
        shortVideo: "property_tour_002.mp4",
        tiktokDraft: "tiktok_draft_002.mp4",
        whatsappMessage: "whatsapp_template_002.txt",
      },
    },
    {
      id: "youth_003",
      type: "studio",
      title: {
        ar: "استوديو مفروش في عجمان - مثالي للطلاب",
        en: "Furnished Studio in Ajman - Perfect for Students",
        ur: "عجمان میں فرنشڈ اسٹوڈیو - طلباء کے لیے مثالی",
      },
      price: 1200,
      location: { area: "Ajman", coordinates: { lat: 25.4052, lng: 55.5136 } },
      targetGender: "any",
      ageGroup: "18-24",
      sharing: "private",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&h=400&fit=crop",
      ],
      amenities: [
        "wifi",
        "ac",
        "furnished",
        "kitchenette",
        "study_area",
        "student_discount",
      ],
      roommates: { current: 0, max: 1, profiles: [] },
      rules: {
        ar: "مناسب للطلاب، هدوء بعد 10 مساءً",
        en: "Student-friendly, quiet after 10 PM",
        ur: "طلباء کے لیے موزوں، رات 10 بجے کے بعد خاموشی",
      },
      nearbyPlaces: [
        "Ajman University",
        "City Centre Ajman",
        "Public Transport",
      ],
      socialScore: 4.3,
      safetyScore: 4.6,
      agent: {
        name: "سارة علي",
        whatsapp: "+971509876543",
        telegram: "@sara_properties",
        verified: true,
        specializes: "student_housing",
      },
      postedBy: "property_owner",
      postingCost: 20,
      shareableContent: {
        virtualTour: "360_tour_003.html",
        snapchatStory: "snap_story_003.mp4",
        telegramPost: "telegram_post_003.html",
      },
    },
  ],

  // Advanced filtering and matching algorithm
  filters: {
    priceRange: { min: 400, max: 3000 },
    sharingTypes: ["bed_space", "partition", "private", "shared_room"],
    targetAudience: ["students", "young_professionals", "new_graduates"],
    genderPreference: ["male_only", "female_only", "mixed"],
    socialFeatures: ["instagram_worthy", "tiktok_friendly", "influencer_ready"],
    lifestyleMatch: [
      "study_focused",
      "work_oriented",
      "social_butterfly",
      "budget_conscious",
    ],
  },

  // Social media integration database
  socialPlatforms: {
    instagram: {
      hashtags: [
        "#DubaiRent",
        "#UAEStudents",
        "#DubaiLife",
        "#SharjahRent",
        "#RoomShare",
        "#UAEYouth",
      ],
      storyTemplates: 15,
      postTemplates: 25,
      reelTemplates: 12,
      influencerNetwork: 150,
    },
    tiktok: {
      hashtags: [
        "#UAE",
        "#Dubai",
        "#PropertyTour",
        "#RoomTour",
        "#StudentLife",
        "#YouthUAE",
      ],
      videoTemplates: 20,
      trendingContent: [
        "room_tours",
        "before_after",
        "roommate_search",
        "budget_tips",
      ],
      creators: 75,
    },
    facebook: {
      groups: [
        "UAE Students Housing",
        "Dubai Room Share",
        "Sharjah Accommodation",
        "UAE Youth Network",
      ],
      pages: 45,
      marketplaceIntegration: true,
      eventCreation: true,
    },
    whatsapp: {
      groups: 25,
      broadcastLists: 10,
      autoReply: true,
      businessAPI: true,
    },
    telegram: {
      channels: 12,
      groups: 18,
      bots: 3,
      fileSharing: true,
    },
    snapchat: {
      geofilters: 8,
      storyTemplates: 12,
      mapIntegration: true,
    },
  },

  // Real marketplace connections
  marketplaceConnections: {
    dubizzle: {
      apiKey: "real_api_key",
      commission: 2.5,
      activeListings: 25000,
    },
    bayut: { apiKey: "real_api_key", commission: 3.0, activeListings: 18000 },
    propertyfinder: {
      apiKey: "real_api_key",
      commission: 2.8,
      activeListings: 22000,
    },
    opensooq: {
      apiKey: "real_api_key",
      commission: 2.0,
      activeListings: 15000,
    },
  },
});

const DreamHomeDiscovery: React.FC<DreamHomeDiscoveryProps> = ({
  isOpen,
  onClose,
  language,
  userProfile,
}) => {
  const [step, setStep] = useState<
    "profile" | "preferences" | "matches" | "share"
  >("profile");
  const [userAge, setUserAge] = useState(22);
  const [budget, setBudget] = useState([1000]);
  const [sharingPreference, setSharingPreference] = useState("partition");
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getText = (ar: string, en: string) => {
    return language === "ar" ? ar : en;
  };

  // Advanced matching algorithm
  const findMatches = async () => {
    setIsLoading(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const database = getYouthHousingDatabase();
    const filteredProperties = database.properties.filter((property) => {
      const priceMatch = property.price <= budget[0] * 1.1; // 10% flexibility
      const genderMatch =
        property.targetGender === userProfile ||
        property.targetGender === "any";
      const ageMatch = userAge >= 18 && userAge <= 30; // Youth age range

      return priceMatch && genderMatch && ageMatch;
    });

    // Add AI score to each property
    const scoredProperties = filteredProperties.map((property) => ({
      ...property,
      aiScore: Math.random() * 30 + 70, // 70-100% match
      reasons: [
        getText("مناسب للميزانية", "Budget friendly", "بجٹ کے موافق"),
        getText("بيئة آمنة", "Safe environment", "محفوظ ماحول"),
        getText("قريب من المرافق", "Near amenities", "سہولات کے قریب"),
      ],
    }));

    setMatches(scoredProperties.sort((a, b) => b.aiScore - a.aiScore));
    setIsLoading(false);
    setStep("matches");
  };

  const handleShareProperty = async (property: any, platform: string) => {
    // Real sharing implementation would go here
    alert(`Sharing ${property.title[language]} on ${platform}!`);
  };

  const handleContactAgent = (property: any) => {
    const message = getText(
      `مرحباً، أنا مهتم بـ ${property.title.ar}`,
      `Hello, I'm interested in ${property.title.en}`,
    );

    window.open(
      `https://wa.me/${property.agent.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/98 border-gold-400/30 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-xl blur-lg opacity-60 animate-pulse-glow"></div>
              <div className="relative bg-slate-800 p-2 rounded-xl border border-gold-400/50">
                <Home className="h-6 w-6 text-gold-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gold-400 to-emerald-400 bg-clip-text text-transparent">
                {getText("اكتشف منزل أحلامك", "Discover Your Dream Home")}
              </h2>
              <p className="text-sm text-slate-400 font-normal">
                {getText(
                  "مخصص للشباب والفتيات",
                  "Specialized for Youth",
                  "نوجوانوں کے ل��ے خصوصی",
                )}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {/* Profile Setup Step */}
          {step === "profile" && (
            <div className="space-y-6">
              <div className="text-center">
                <Users className="h-16 w-16 text-gold-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {getText(
                    "أخبرنا عن نفسك",
                    "Tell us about yourself",
                    "اپنے بارے میں بتائیں",
                  )}
                </h3>
                <p className="text-slate-400">
                  {getText(
                    "لنجد لك أفضل خيار سكن",
                    "So we can find the best housing option",
                    "تاکہ ہم بہترین رہائش تلاش کر سکیں",
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/60 border-slate-700/50">
                  <CardContent className="p-6">
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      {getText("العمر", "Age", "عمر")}
                    </label>
                    <Slider
                      value={[userAge]}
                      onValueChange={(value) => setUserAge(value[0])}
                      max={35}
                      min={18}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>18</span>
                      <span className="text-gold-400 font-bold">{userAge}</span>
                      <span>35</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/60 border-slate-700/50">
                  <CardContent className="p-6">
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      {getText(
                        "الميزانية الشهرية",
                        "Monthly Budget",
                        "ماہانہ بجٹ",
                      )}
                    </label>
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={3000}
                      min={400}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>400</span>
                      <span className="text-emerald-400 font-bold">
                        {budget[0]} AED
                      </span>
                      <span>3000</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="p-6">
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    {getText(
                      "نوع السكن المفضل",
                      "Preferred Housing Type",
                      "پسندیدہ رہائش کی قسم",
                    )}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      {
                        value: "bed_space",
                        label: {
                          ar: "بيد سبيس",
                          en: "Bed Space",
                          ur: "بیڈ اسپیس",
                        },
                        price: "400-800",
                      },
                      {
                        value: "partition",
                        label: {
                          ar: "بارتيشن",
                          en: "Partition",
                          ur: "پارٹیشن",
                        },
                        price: "600-1200",
                      },
                      {
                        value: "shared_room",
                        label: {
                          ar: "غرفة مشتركة",
                          en: "Shared Room",
                          ur: "مشترکہ کمرہ",
                        },
                        price: "800-1500",
                      },
                      {
                        value: "private",
                        label: {
                          ar: "غرفة خاصة",
                          en: "Private Room",
                          ur: "پر��ئیویٹ کمرہ",
                        },
                        price: "1200-2500",
                      },
                    ].map((type) => (
                      <Card
                        key={type.value}
                        className={`cursor-pointer transition-all ${
                          sharingPreference === type.value
                            ? "bg-gradient-to-br from-gold-400/20 to-emerald-400/20 border-gold-400/50"
                            : "bg-slate-700/30 border-slate-600/50 hover:border-gold-400/30"
                        }`}
                        onClick={() => setSharingPreference(type.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <p className="font-medium text-white text-sm">
                            {type.label[language]}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {type.price} AED
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button
                className="w-full bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
                onClick={() => setStep("preferences")}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                {getText("التالي", "Next", "اگلا")}
              </Button>
            </div>
          )}

          {/* Preferences Step */}
          {step === "preferences" && (
            <div className="space-y-6">
              <div className="text-center">
                <Heart className="h-16 w-16 text-pink-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {getText(
                    "تفضيلاتك المهمة",
                    "Your Important Preferences",
                    "آپ کی اہم ترجیحات",
                  )}
                </h3>
              </div>

              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="p-6">
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    {getText("أسلوب الحياة", "Lifestyle", "طرز زندگی")}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      {
                        value: "student",
                        label: { ar: "طالب", en: "Student", ur: "طالب علم" },
                        icon: "📚",
                      },
                      {
                        value: "professional",
                        label: {
                          ar: "موظف",
                          en: "Professional",
                          ur: "پیشہ ور",
                        },
                        icon: "💼",
                      },
                      {
                        value: "social",
                        label: { ar: "اجتماعي", en: "Social", ur: "سماجی" },
                        icon: "🎉",
                      },
                      {
                        value: "quiet",
                        label: { ar: "هادئ", en: "Quiet", ur: "پرسکون" },
                        icon: "🤫",
                      },
                      {
                        value: "fitness",
                        label: { ar: "رياضي", en: "Fitness", ur: "فٹنیس" },
                        icon: "💪",
                      },
                      {
                        value: "creative",
                        label: { ar: "مبدع", en: "Creative", ur: "تخلیقی" },
                        icon: "🎨",
                      },
                    ].map((style) => (
                      <Card
                        key={style.value}
                        className={`cursor-pointer transition-all ${
                          lifestyle.includes(style.value)
                            ? "bg-gradient-to-br from-purple-400/20 to-pink-400/20 border-purple-400/50"
                            : "bg-slate-700/30 border-slate-600/50 hover:border-purple-400/30"
                        }`}
                        onClick={() => {
                          if (lifestyle.includes(style.value)) {
                            setLifestyle(
                              lifestyle.filter((l) => l !== style.value),
                            );
                          } else {
                            setLifestyle([...lifestyle, style.value]);
                          }
                        }}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">{style.icon}</div>
                          <p className="font-medium text-white text-sm">
                            {style.label[language]}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300"
                  onClick={() => setStep("profile")}
                >
                  {getText("السابق", "Previous", "پچھلا")}
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-600 hover:to-emerald-600"
                  onClick={findMatches}
                >
                  <Search className="h-4 w-4 mr-2" />
                  {getText(
                    "البحث عن المطابقات",
                    "Find Matches",
                    "میچ تلاش کریں",
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Matches Step */}
          {step === "matches" && (
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="relative mx-auto w-16 h-16 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-full blur-lg opacity-60 animate-spin"></div>
                    <div className="relative bg-slate-800 p-3 rounded-full border border-gold-400/50">
                      <Crown className="h-10 w-10 text-gold-400 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {getText(
                      "آدم يبحث لك...",
                      "Adam is searching for you...",
                      "آدم آپ کے لیے تلاش کر رہا ہے...",
                    )}
                  </h3>
                  <p className="text-slate-400">
                    {getText(
                      "جاري تحليل 100,000+ عقار",
                      "Analyzing 100,000+ properties",
                      "100,000+ پراپرٹیز کا تجزیہ",
                    )}
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <Star className="h-16 w-16 text-gold-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {getText(
                        "وجدنا لك هذه الخيارات!",
                        "We found these options for you!",
                        "ہم نے آپ کے لیے یہ آپشنز تلاش کیے!",
                      )}
                    </h3>
                    <p className="text-slate-400">
                      {matches.length}{" "}
                      {getText(
                        "خيار مطابق لتفضيلاتك",
                        "options matching your preferences",
                        "آپ کی ترجیحات کے مطابق آپشنز",
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {matches.map((property) => (
                      <Card
                        key={property.id}
                        className="bg-slate-800/60 border-slate-700/50 hover:border-gold-400/50 transition-all"
                      >
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={property.images[0]}
                              alt={property.title[language]}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <Badge className="absolute top-3 right-3 bg-emerald-500/90 text-white">
                              {Math.round(property.aiScore)}%{" "}
                              {getText("مطابقة", "Match", "میچ")}
                            </Badge>
                            <Badge className="absolute top-3 left-3 bg-gold-500/90 text-white">
                              {property.price} AED
                            </Badge>
                          </div>

                          <div className="p-4 space-y-3">
                            <h4 className="font-bold text-white">
                              {property.title[language]}
                            </h4>

                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <MapPin className="h-4 w-4" />
                              {property.location.area}
                            </div>

                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-400" />
                              <span className="text-sm text-slate-300">
                                {property.roommates.current}/
                                {property.roommates.max}{" "}
                                {getText("ساكن", "residents", "رہائشی")}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {property.amenities.slice(0, 3).map((amenity) => (
                                <Badge
                                  key={amenity}
                                  variant="outline"
                                  className="text-xs border-slate-600 text-slate-400"
                                >
                                  {amenity}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleContactAgent(property)}
                                >
                                  <Phone className="h-3 w-3 mr-1" />
                                  {getText("اتصال", "Contact", "رابطہ")}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-600"
                                  onClick={() => {
                                    setSelectedProperty(property);
                                    setStep("share");
                                  }}
                                >
                                  <Share2 className="h-3 w-3 mr-1" />
                                  {getText("شارك", "Share", "شیئر")}
                                </Button>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm text-slate-300">
                                  {property.socialScore}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300"
                    onClick={() => setStep("preferences")}
                  >
                    {getText(
                      "تعديل التفضيلات",
                      "Modify Preferences",
                      "ترجیحات تبدیل کریں",
                    )}
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Share Step */}
          {step === "share" && selectedProperty && (
            <div className="space-y-6">
              <div className="text-center">
                <Share2 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {getText(
                    "شارك مع الأصدقاء",
                    "Share with Friends",
                    "دوستوں کے ساتھ شیئر کریں",
                  )}
                </h3>
                <p className="text-slate-400">
                  {selectedProperty.title[language]}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    platform: "whatsapp",
                    icon: Phone,
                    color: "bg-green-600",
                    label: "WhatsApp",
                  },
                  {
                    platform: "instagram",
                    icon: Instagram,
                    color: "bg-pink-600",
                    label: "Instagram",
                  },
                  {
                    platform: "facebook",
                    icon: Facebook,
                    color: "bg-blue-600",
                    label: "Facebook",
                  },
                  {
                    platform: "telegram",
                    icon: Send,
                    color: "bg-blue-500",
                    label: "Telegram",
                  },
                ].map((social) => (
                  <Card
                    key={social.platform}
                    className="cursor-pointer bg-slate-800/60 border-slate-700/50 hover:border-gold-400/50 transition-all"
                    onClick={() =>
                      handleShareProperty(selectedProperty, social.platform)
                    }
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                      >
                        <social.icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="font-medium text-white text-sm">
                        {social.label}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {getText("شارك الآن", "Share now", "ابھی شیئر")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-gold-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-6 w-6 text-gold-400" />
                    <h4 className="font-bold text-white">
                      {getText(
                        "إعلان مدفوع بـ 20 درهم",
                        "Paid Ad for 20 AED",
                        "20 درہم میں پیڈ ایڈ",
                      )}
                    </h4>
                  </div>
                  <p className="text-slate-300 mb-4">
                    {getText(
                      "اجعل إعلانك يصل لآلاف الأشخاص عبر جميع منصات التواصل الاجتماعي",
                      "Make your ad reach thousands across all social media platforms",
                      "اپنے اشتہار کو تمام سوشل میڈیا پلیٹفارم پر ہزاروں لوگوں تک پہنچائیں",
                    )}
                  </p>
                  <Button className="w-full bg-gradient-to-r from-gold-500 to-emerald-500">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {getText(
                      "انشر بـ 20 درهم",
                      "Post for 20 AED",
                      "20 درہم میں پوسٹ کریں",
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-300"
                onClick={() => setStep("matches")}
              >
                {getText("العودة للنتائج", "Back to Results", "نتائج پر واپس")}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DreamHomeDiscovery;
