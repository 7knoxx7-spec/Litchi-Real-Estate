import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PropertyCard from "@/components/PropertyCard";
import { MOCK_PROPERTIES } from "@/constants";
import {
  Brain,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Settings,
  Star,
  MapPin,
  DollarSign,
  Home,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

interface UserPreferences {
  budget: number;
  propertyType: string[];
  location: string[];
  bedrooms: number;
  amenities: string[];
  lifestyle: "family" | "professional" | "student" | "expat";
}

interface RecommendationScore {
  overall: number;
  budget: number;
  location: number;
  amenities: number;
  lifestyle: number;
}

interface SmartRecommendation {
  property: any;
  score: RecommendationScore;
  reasons: string[];
  matchPercentage: number;
}

interface SmartRecommendationsProps {
  userPreferences?: UserPreferences;
  language?: "ar" | "en";
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  userPreferences,
  language = "ar",
}) => {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>(
    [],
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Mock user preferences if none provided
  const defaultPreferences: UserPreferences = {
    budget: 80000,
    propertyType: ["apartment", "studio"],
    location: ["Dubai", "Sharjah"],
    bedrooms: 1,
    amenities: ["wifi", "gym", "parking"],
    lifestyle: "professional",
  };

  const preferences = userPreferences || defaultPreferences;

  const { data: apiProperties } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });

  const properties = apiProperties || MOCK_PROPERTIES;

  useEffect(() => {
    generateRecommendations();
  }, [preferences, properties]);

  const generateRecommendations = async () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const analyzed = analyzeProperties(properties, preferences);
    setRecommendations(analyzed);
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const analyzeProperties = (
    properties: any[],
    prefs: UserPreferences,
  ): SmartRecommendation[] => {
    return properties
      .map((property) => {
        const score = calculateMatchScore(property, prefs);
        const reasons = generateReasons(property, prefs, score, language);
        const matchPercentage = Math.round(score.overall);

        return {
          property,
          score,
          reasons,
          matchPercentage,
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const calculateMatchScore = (
    property: any,
    prefs: UserPreferences,
  ): RecommendationScore => {
    // Budget score (40% weight)
    const budgetDiff = Math.abs(property.price - prefs.budget);
    const budgetScore = Math.max(0, 100 - (budgetDiff / prefs.budget) * 100);

    // Location score (25% weight)
    const locationMatch = prefs.location.some(
      (loc) =>
        property.location.emirate.toLowerCase().includes(loc.toLowerCase()) ||
        property.location.area.toLowerCase().includes(loc.toLowerCase()),
    );
    const locationScore = locationMatch ? 95 : 40;

    // Amenities score (20% weight)
    const userAmenities = prefs.amenities;
    const propertyAmenities = property.amenities || [];
    const matchingAmenities = userAmenities.filter((amenity) =>
      propertyAmenities.includes(amenity),
    );
    const amenitiesScore =
      userAmenities.length > 0
        ? (matchingAmenities.length / userAmenities.length) * 100
        : 80;

    // Lifestyle score (15% weight)
    let lifestyleScore = 50;
    if (
      prefs.lifestyle === "professional" &&
      property.location.area.includes("Business")
    ) {
      lifestyleScore = 90;
    } else if (
      prefs.lifestyle === "family" &&
      property.location.area.includes("Ranches")
    ) {
      lifestyleScore = 95;
    } else if (prefs.lifestyle === "student" && property.price < 60000) {
      lifestyleScore = 85;
    }

    const overall =
      budgetScore * 0.4 +
      locationScore * 0.25 +
      amenitiesScore * 0.2 +
      lifestyleScore * 0.15;

    return {
      overall,
      budget: budgetScore,
      location: locationScore,
      amenities: amenitiesScore,
      lifestyle: lifestyleScore,
    };
  };

  const generateReasons = (
    property: any,
    prefs: UserPreferences,
    score: RecommendationScore,
    lang: "ar" | "en",
  ): string[] => {
    const reasons: string[] = [];

    if (score.budget > 80) {
      reasons.push(
        lang === "ar"
          ? "📊 السعر مناسب لميزانيتك"
          : "📊 Price fits your budget",
      );
    }

    if (score.location > 80) {
      reasons.push(
        lang === "ar"
          ? "📍 موقع ممتاز في المنطقة المفضلة"
          : "📍 Great location in preferred area",
      );
    }

    if (score.amenities > 70) {
      reasons.push(
        lang === "ar"
          ? "🏋️ يحتوي على المرافق المطلوبة"
          : "🏋️ Has your required amenities",
      );
    }

    if (property.rating > 4.5) {
      reasons.push(
        lang === "ar"
          ? "⭐ تقييم عالي من المستأجرين"
          : "⭐ High rating from tenants",
      );
    }

    if (property.verified) {
      reasons.push(
        lang === "ar"
          ? "✅ م��لن موثق ومتحقق"
          : "✅ Verified and trusted agent",
      );
    }

    if (property.bedrooms === prefs.bedrooms) {
      reasons.push(
        lang === "ar"
          ? "🛏️ عدد الغرف مطابق لاحتياجك"
          : "🛏️ Matches your room requirement",
      );
    }

    return reasons.slice(0, 4); // Limit to top 4 reasons
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-400";
    if (score >= 70) return "text-gold-400";
    if (score >= 50) return "text-orange-400";
    return "text-red-400";
  };

  const getMatchLevel = (percentage: number) => {
    if (percentage >= 85)
      return language === "ar" ? "مطابقة ممتازة" : "Excellent Match";
    if (percentage >= 70)
      return language === "ar" ? "مطابقة جيدة" : "Good Match";
    if (percentage >= 50)
      return language === "ar" ? "مطابقة متوسطة" : "Fair Match";
    return language === "ar" ? "مطابقة ضعيفة" : "Low Match";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-xl blur opacity-60"></div>
                <div className="relative bg-slate-800 p-3 rounded-xl border border-gold-400/30">
                  <Brain className="h-6 w-6 text-gold-400" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold gradient-text">
                  {language === "ar"
                    ? "الترشيحات الذكية"
                    : "Smart Recommendations"}
                </h2>
                <p className="text-slate-400 text-sm font-normal">
                  {language === "ar"
                    ? "مدعوم بالذكاء الاصطناعي لإيجاد السكن المثالي"
                    : "AI-powered to find your perfect accommodation"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {analysisComplete && (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {language === "ar" ? "محدث" : "Updated"}
                </Badge>
              )}
              <Button
                onClick={generateRecommendations}
                variant="outline"
                size="sm"
                className="border-slate-600 hover:border-gold-400"
                disabled={isAnalyzing}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isAnalyzing ? "animate-spin" : ""}`}
                />
                {language === "ar" ? "تحديث" : "Refresh"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* User Preferences Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-gold-400" />
              {language === "ar"
                ? "��فضيلاتك الحالية"
                : "Your Current Preferences"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <DollarSign className="h-4 w-4 text-gold-400" />
                  <span className="text-sm">
                    {language === "ar" ? "الميزانية" : "Budget"}
                  </span>
                </div>
                <p className="text-white font-semibold">
                  {preferences.budget.toLocaleString()}{" "}
                  {language === "ar" ? "درهم/سنة" : "AED/year"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Home className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">
                    {language === "ar" ? "نوع العقار" : "Property Type"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {preferences.propertyType.map((type, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-slate-600 text-slate-300"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">
                    {language === "ar"
                      ? "المواقع المفضلة"
                      : "Preferred Locations"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {preferences.location.map((loc, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-slate-600 text-slate-300"
                    >
                      {loc}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">
                    {language === "ar" ? "نمط الحياة" : "Lifestyle"}
                  </span>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30">
                  {preferences.lifestyle}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Status */}
      {isAnalyzing && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-full blur opacity-60 animate-pulse"></div>
                <div className="relative bg-slate-800 p-4 rounded-full border border-gold-400/30">
                  <Brain className="h-8 w-8 text-gold-400 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">
                {language === "ar"
                  ? "جاري التحليل الذكي..."
                  : "Analyzing with AI..."}
              </h3>
              <p className="text-slate-400">
                {language === "ar"
                  ? "نقوم بتحليل جميع العقارات لإيجاد أفضل المطابقات لك"
                  : "Analyzing all properties to find the best matches for you"}
              </p>
              <Progress value={75} className="w-64 mx-auto" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {!isAnalyzing && recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
              {language === "ar" ? "أفضل المطابقات" : "Top Matches"}
              <Badge className="bg-gold-500/20 text-gold-400 border-gold-400/30">
                {recommendations.length}
              </Badge>
            </h3>
            <Button className="btn-secondary">
              <ArrowRight className="h-4 w-4 mr-2" />
              {language === "ar" ? "عرض الكل" : "View All"}
            </Button>
          </div>

          {/* Top 3 Recommendations */}
          <div className="space-y-6">
            {recommendations.slice(0, 3).map((recommendation, index) => (
              <Card
                key={recommendation.property.id}
                className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    {/* Property Card */}
                    <div className="lg:col-span-2">
                      <PropertyCard
                        property={{
                          id: recommendation.property.id,
                          title: recommendation.property.titleEn,
                          titleAr: recommendation.property.title,
                          price: recommendation.property.price,
                          priceType: recommendation.property.priceType,
                          location: `${recommendation.property.location.area}, ${recommendation.property.location.emirate}`,
                          locationAr: `${recommendation.property.location.area}, ${recommendation.property.location.emirate}`,
                          bedrooms: recommendation.property.bedrooms,
                          bathrooms: recommendation.property.bathrooms,
                          area: recommendation.property.area,
                          images: recommendation.property.images,
                          featured: recommendation.property.featured,
                          verified: recommendation.property.verified,
                          rating: recommendation.property.rating,
                          reviews: recommendation.property.reviews,
                          amenities: recommendation.property.amenities,
                          agent: recommendation.property.agent,
                        }}
                        language={language}
                      />
                    </div>

                    {/* AI Analysis */}
                    <div className="space-y-6">
                      {/* Match Score */}
                      <div className="text-center">
                        <div
                          className={`text-4xl font-black ${getScoreColor(recommendation.matchPercentage)} mb-2`}
                        >
                          {recommendation.matchPercentage}%
                        </div>
                        <Badge
                          className={`${
                            recommendation.matchPercentage >= 85
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-400/30"
                              : recommendation.matchPercentage >= 70
                                ? "bg-gold-500/20 text-gold-400 border-gold-400/30"
                                : "bg-orange-500/20 text-orange-400 border-orange-400/30"
                          }`}
                        >
                          {getMatchLevel(recommendation.matchPercentage)}
                        </Badge>
                      </div>

                      {/* Score Breakdown */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-gold-400" />
                          {language === "ar"
                            ? "تحليل الذكاء الاصطناعي"
                            : "AI Analysis"}
                        </h4>

                        {[
                          {
                            label: language === "ar" ? "الميزانية" : "Budget",
                            score: recommendation.score.budget,
                          },
                          {
                            label: language === "ar" ? "الموقع" : "Location",
                            score: recommendation.score.location,
                          },
                          {
                            label: language === "ar" ? "المرافق" : "Amenities",
                            score: recommendation.score.amenities,
                          },
                          {
                            label:
                              language === "ar" ? "نمط الحياة" : "Lifestyle",
                            score: recommendation.score.lifestyle,
                          },
                        ].map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-300">
                                {item.label}
                              </span>
                              <span className={getScoreColor(item.score)}>
                                {Math.round(item.score)}%
                              </span>
                            </div>
                            <Progress value={item.score} className="h-2" />
                          </div>
                        ))}
                      </div>

                      {/* Reasons */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white">
                          {language === "ar"
                            ? "لماذا ننصح بهذا العقار؟"
                            : "Why we recommend this?"}
                        </h4>
                        <div className="space-y-2">
                          {recommendation.reasons.map((reason, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-slate-300 flex items-start gap-2"
                            >
                              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;
