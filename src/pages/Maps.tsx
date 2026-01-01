import { useState } from "react";
import Navigation from "@/components/Navigation";
import InteractiveMap from "@/components/InteractiveMap";
import RoomTypeClassifier from "@/components/RoomTypeClassifier";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_PROPERTIES } from "@/constants";
import {
  Map as MapIcon,
  Filter,
  Users,
  TrendingUp,
  MapPin,
  Navigation as NavigationIcon,
  Layers,
  Search,
  Target,
  Globe,
  Zap,
  Eye,
  Building2,
} from "lucide-react";

const Maps = () => {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );
  const [mapFilters, setMapFilters] = useState({
    propertyTypes: [] as string[],
    priceRange: [0, 500000] as [number, number],
    showHeatmap: true,
  });

  const stats = [
    {
      title: language === "ar" ? "العقارات المعروضة" : "Properties Shown",
      value: MOCK_PROPERTIES.length.toString(),
      icon: Building2,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/20",
    },
    {
      title: language === "ar" ? "المناطق المغطاة" : "Areas Covered",
      value: "7",
      icon: MapPin,
      color: "text-gold-400",
      bgColor: "bg-gold-400/20",
    },
    {
      title: language === "ar" ? "متوسط السعر" : "Average Price",
      value: "125K",
      icon: TrendingUp,
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
    },
    {
      title: language === "ar" ? "خرائط الكثافة" : "Density Maps",
      value: "4",
      icon: Layers,
      color: "text-purple-400",
      bgColor: "bg-purple-400/20",
    },
  ];

  const mapFeatures = [
    {
      id: "interactive",
      title:
        language === "ar"
          ? "خرائط تفاعلية متطورة"
          : "Advanced Interactive Maps",
      description:
        language === "ar"
          ? "استكشف العقارات على خرائط تفاعلية بتقنيات متطورة وواجهة سهلة الاستخدام"
          : "Explore properties on advanced interactive maps with user-friendly interface",
      icon: MapIcon,
      color: "from-blue-500 to-cyan-500",
      features: [
        language === "ar" ? "تكبير وتصغير متقدم" : "Advanced zoom controls",
        language === "ar" ? "أنماط خرائط متعددة" : "Multiple map styles",
        language === "ar" ? "تحديد المواقع بدقة" : "Precise location pinning",
        language === "ar" ? "تنقل سلس" : "Smooth navigation",
      ],
    },
    {
      id: "heatmaps",
      title:
        language === "ar" ? "خرائط الكثافة الذكية" : "Smart Density Heatmaps",
      description:
        language === "ar"
          ? "اكتشف المناطق الأكثر والأقل ازدحاماً لاتخاذ قرارات سكنية مدروسة"
          : "Discover crowded and quiet areas to make informed housing decisions",
      icon: Layers,
      color: "from-red-500 to-orange-500",
      features: [
        language === "ar"
          ? "مناطق ملونة حسب الكثافة"
          : "Color-coded density zones",
        language === "ar" ? "بيانات ديموغرافية" : "Demographic data",
        language === "ar" ? "تحليل المرافق" : "Amenities analysis",
        language === "ar" ? "تقييم الهدوء" : "Noise level assessment",
      ],
    },
    {
      id: "navigation",
      title:
        language === "ar" ? "التنقل والاتجاهات" : "Navigation & Directions",
      description:
        language === "ar"
          ? "احصل على اتجاهات دقيقة وأوقات الوصول المتوقعة لأي عقار"
          : "Get precise directions and estimated arrival times to any property",
      icon: NavigationIcon,
      color: "from-emerald-500 to-green-500",
      features: [
        language === "ar"
          ? "تحديد الموقع الحالي"
          : "Current location detection",
        language === "ar" ? "اتجاهات مفصلة" : "Detailed directions",
        language === "ar" ? "أوقات الوصول" : "Arrival times",
        language === "ar" ? "طرق بديلة" : "Alternative routes",
      ],
    },
    {
      id: "filters",
      title: language === "ar" ? "فلاتر ذكية متقدمة" : "Advanced Smart Filters",
      description:
        language === "ar"
          ? "فلتر العقارات حسب النوع والسعر والمرافق مع تحديث فوري للخريطة"
          : "Filter properties by type, price, and amenities with real-time map updates",
      icon: Filter,
      color: "from-purple-500 to-indigo-500",
      features: [
        language === "ar" ? "فلترة حسب النوع" : "Filter by property type",
        language === "ar" ? "نطاقات سعرية" : "Price ranges",
        language === "ar" ? "تصنيف المرافق" : "Amenities categorization",
        language === "ar" ? "تحديث فوري" : "Real-time updates",
      ],
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
              <Globe className="h-4 w-4 mr-2" />
              {language === "ar"
                ? "خرائط تفاعلية متطورة"
                : "Advanced Interactive Maps"}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black gradient-text leading-tight animate-glow">
              {language === "ar" ? (
                <>
                  اكتشف العقارات
                  <br />
                  <span className="text-emerald-400">على الخريطة</span>
                </>
              ) : (
                <>
                  Discover Properties
                  <br />
                  <span className="text-emerald-400">on the Map</span>
                </>
              )}
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {language === "ar"
                ? "استكشف العقارات المتاحة في الإمارات باستخدام خرائط تفاعلية ذكية مع خرائط الكثافة وأدوات التنقل المتطورة"
                : "Explore available properties in the UAE using smart interactive maps with density heatmaps and advanced navigation tools"}
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
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} border border-slate-700/50`}
                  >
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.title}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Overview */}
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              <Eye className="h-8 w-8 text-gold-400 mx-auto mb-4" />
              {language === "ar"
                ? "ميزات الخرائط المتطورة"
                : "Advanced Map Features"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mapFeatures.map((feature, index) => {
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
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2">
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

        {/* Interactive Map Tabs */}
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              <Target className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              {language === "ar"
                ? "منصة الخرائط التفاعلية"
                : "Interactive Maps Platform"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:bg-gold-400/20"
                >
                  <MapIcon className="h-4 w-4 mr-2" />
                  {language === "ar" ? "الخريطة" : "Map View"}
                </TabsTrigger>
                <TabsTrigger
                  value="search"
                  className="data-[state=active]:bg-emerald-400/20"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {language === "ar" ? "بحث متقدم" : "Advanced Search"}
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-blue-400/20"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {language === "ar" ? "إحصائيات" : "Analytics"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="mt-8">
                <InteractiveMap
                  language={language}
                  properties={MOCK_PROPERTIES}
                  selectedPropertyId={selectedPropertyId}
                  onPropertySelect={setSelectedPropertyId}
                  showHeatmap={mapFilters.showHeatmap}
                  filterByType={mapFilters.propertyTypes}
                  filterByPrice={mapFilters.priceRange}
                />
              </TabsContent>

              <TabsContent value="search" className="mt-8">
                <RoomTypeClassifier
                  language={language}
                  onFilterChange={(filters) => {
                    // Handle filter changes from room type classifier
                    console.log("Room type filters changed:", filters);
                  }}
                />
              </TabsContent>

              <TabsContent value="analytics" className="mt-8">
                <div className="space-y-6">
                  <Card className="bg-slate-700/30 border-slate-600/50">
                    <CardHeader>
                      <CardTitle className="text-white">
                        {language === "ar"
                          ? "إحصائيات السوق العقاري"
                          : "Real Estate Market Analytics"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">
                            {language === "ar"
                              ? "توزيع الأسعار"
                              : "Price Distribution"}
                          </h4>
                          <div className="space-y-3">
                            {[
                              {
                                range: "0-50K",
                                percentage: 25,
                                color: "bg-green-500",
                              },
                              {
                                range: "50-100K",
                                percentage: 35,
                                color: "bg-blue-500",
                              },
                              {
                                range: "100-200K",
                                percentage: 25,
                                color: "bg-orange-500",
                              },
                              {
                                range: "200K+",
                                percentage: 15,
                                color: "bg-red-500",
                              },
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-300">
                                    {item.range} AED
                                  </span>
                                  <span className="text-white">
                                    {item.percentage}%
                                  </span>
                                </div>
                                <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${item.color} transition-all duration-500`}
                                    style={{ width: `${item.percentage}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">
                            {language === "ar"
                              ? "أنواع العقارات"
                              : "Property Types"}
                          </h4>
                          <div className="space-y-3">
                            {[
                              {
                                type: "Apartments",
                                count: 45,
                                color: "bg-emerald-500",
                              },
                              {
                                type: "Studios",
                                count: 28,
                                color: "bg-purple-500",
                              },
                              {
                                type: "Villas",
                                count: 15,
                                color: "bg-gold-500",
                              },
                              {
                                type: "Partitions",
                                count: 12,
                                color: "bg-cyan-500",
                              },
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-3 h-3 rounded-full ${item.color}`}
                                  />
                                  <span className="text-slate-300">
                                    {item.type}
                                  </span>
                                </div>
                                <span className="text-white font-semibold">
                                  {item.count}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">
                            {language === "ar"
                              ? "المناطق الأكثر طلباً"
                              : "Most Demanded Areas"}
                          </h4>
                          <div className="space-y-3">
                            {[
                              { area: "Dubai Marina", demand: 95 },
                              { area: "Business Bay", demand: 85 },
                              { area: "Downtown Dubai", demand: 90 },
                              { area: "JLT", demand: 75 },
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-300">
                                    {item.area}
                                  </span>
                                  <span className="text-white">
                                    {item.demand}%
                                  </span>
                                </div>
                                <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-gold-400 to-emerald-400 transition-all duration-500"
                                    style={{ width: `${item.demand}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <p className="text-slate-400 mb-4">
                      {language === "ar"
                        ? "البيانات محدثة في الوقت الفعلي"
                        : "Data updated in real-time"}
                    </p>
                    <Button className="btn-primary">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {language === "ar"
                        ? "عرض التقرير الكامل"
                        : "View Full Report"}
                    </Button>
                  </div>
                </div>
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

export default Maps;
