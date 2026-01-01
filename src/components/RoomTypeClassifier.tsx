import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bed,
  Users,
  Home,
  Divide,
  Building,
  Crown,
  Heart,
  Filter,
  Search,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  Shield,
  UserCheck,
  Clock,
} from "lucide-react";

interface RoomTypeFilter {
  type: string;
  gender: "any" | "male" | "female" | "family";
  priceRange: [number, number];
  availability: "immediate" | "within_week" | "within_month" | "flexible";
  furnished: "any" | "furnished" | "unfurnished" | "semi_furnished";
  sharing: "any" | "private" | "shared" | "partition";
}

interface RoomListing {
  id: string;
  title: string;
  titleAr: string;
  type:
    | "studio"
    | "partition"
    | "bedspace"
    | "master"
    | "1br"
    | "2br"
    | "villa";
  price: number;
  location: string;
  locationAr: string;
  gender: "male" | "female" | "family" | "any";
  furnished: "furnished" | "unfurnished" | "semi_furnished";
  sharing: "private" | "shared" | "partition";
  availability: string;
  currentOccupants: number;
  maxOccupants: number;
  amenities: string[];
  images: string[];
  verified: boolean;
  rating: number;
  agent: {
    name: string;
    avatar: string;
    verified: boolean;
  };
}

interface RoomTypeClassifierProps {
  language?: "ar" | "en";
  onFilterChange?: (filters: RoomTypeFilter) => void;
}

const RoomTypeClassifier: React.FC<RoomTypeClassifierProps> = ({
  language = "ar",
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<RoomTypeFilter>({
    type: "any",
    gender: "any",
    priceRange: [500, 5000],
    availability: "flexible",
    furnished: "any",
    sharing: "any",
  });

  const [searchResults, setSearchResults] = useState<RoomListing[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Room type definitions with detailed descriptions
  const roomTypes = [
    {
      id: "studio",
      name: language === "ar" ? "استوديو" : "Studio",
      nameAr: "استوديو",
      icon: Home,
      description:
        language === "ar"
          ? "وحدة سكنية مستقلة تحتوي على غرفة واحدة مع مطبخ وحمام منفصل"
          : "Independent unit with one room, kitchen, and separate bathroom",
      priceRange: "1,500 - 4,000",
      features: [
        language === "ar" ? "خصوصية كاملة" : "Complete privacy",
        language === "ar" ? "مطبخ خاص" : "Private kitchen",
        language === "ar" ? "حمام خاص" : "Private bathroom",
      ],
      targetAudience:
        language === "ar"
          ? "العزاب والأزواج الشباب"
          : "Singles & young couples",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "partition",
      name: language === "ar" ? "بارتشن" : "Partition",
      nameAr: "بارتشن",
      icon: Divide,
      description:
        language === "ar"
          ? "غرفة مقسمة داخل شقة مشتركة مع قسم خاص ومرافق مشتركة"
          : "Divided room within shared apartment with private section and shared facilities",
      priceRange: "800 - 2,500",
      features: [
        language === "ar" ? "خصوصية متوسطة" : "Medium privacy",
        language === "ar" ? "مطبخ مشترك" : "Shared kitchen",
        language === "ar" ? "حمام مشترك" : "Shared bathroom",
      ],
      targetAudience:
        language === "ar" ? "الشباب والموظفين" : "Young professionals",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "bedspace",
      name: language === "ar" ? "سرير مشترك" : "Bedspace",
      nameAr: "سرير مشترك",
      icon: Bed,
      description:
        language === "ar"
          ? "سرير ضمن غرفة مشتركة مع أشخاص آخرين في نفس الغرفة"
          : "Bed within shared room with other people in the same room",
      priceRange: "400 - 1,200",
      features: [
        language === "ar" ? "اقتصادي" : "Economical",
        language === "ar" ? "غرفة مشتركة" : "Shared room",
        language === "ar" ? "مرافق مشتركة" : "Shared facilities",
      ],
      targetAudience:
        language === "ar" ? "الطلاب والعمال" : "Students & workers",
      color: "from-green-500 to-green-600",
    },
    {
      id: "master",
      name: language === "ar" ? "ماستر روم" : "Master Room",
      nameAr: "ماستر روم",
      icon: Crown,
      description:
        language === "ar"
          ? "غرفة رئيسية كبيرة مع حمام خاص وأحياناً غرفة ملابس"
          : "Large master bedroom with private bathroom and sometimes walk-in closet",
      priceRange: "1,200 - 3,500",
      features: [
        language === "ar" ? "غرفة كبيرة" : "Large room",
        language === "ar" ? "حمام خاص" : "En-suite bathroom",
        language === "ar" ? "مساحة إضافية" : "Extra space",
      ],
      targetAudience:
        language === "ar"
          ? "المهنيين والتنفيذيين"
          : "Professionals & executives",
      color: "from-gold-500 to-gold-600",
    },
    {
      id: "1br",
      name: language === "ar" ? "شقة غرفة واحدة" : "1 Bedroom Apt",
      nameAr: "شقة غرفة واحدة",
      icon: Building,
      description:
        language === "ar"
          ? "شقة كاملة بغرفة نوم منفصلة وصالة ومطبخ وحمام"
          : "Complete apartment with separate bedroom, living room, kitchen, and bathroom",
      priceRange: "2,000 - 6,000",
      features: [
        language === "ar" ? "شقة كاملة" : "Complete apartment",
        language === "ar" ? "غرفة منفصلة" : "Separate bedroom",
        language === "ar" ? "خصوصية تامة" : "Full privacy",
      ],
      targetAudience:
        language === "ar" ? "الأفراد والأزواج" : "Individuals & couples",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "villa",
      name: language === "ar" ? "فيلا/تاون هاوس" : "Villa/Townhouse",
      nameAr: "فيلا/تاون هاوس",
      icon: Home,
      description:
        language === "ar"
          ? "بيت مستقل أو تاون هاوس مع حديقة ومواقف سيارات"
          : "Independent house or townhouse with garden and parking",
      priceRange: "4,000 - 15,000",
      features: [
        language === "ar" ? "بيت مستقل" : "Independent house",
        language === "ar" ? "حديقة خاصة" : "Private garden",
        language === "ar" ? "مواقف سيارات" : "Parking spaces",
      ],
      targetAudience:
        language === "ar" ? "العائلات والمجموعات" : "Families & groups",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  // Mock search results
  const mockResults: RoomListing[] = [
    {
      id: "partition-marina-01",
      title: "Luxury Partition in Dubai Marina with Marina View",
      titleAr: "بارتشن فاخر في مارينا دبي مع إطلالة على المارينا",
      type: "partition",
      price: 1800,
      location: "Dubai Marina, Dubai",
      locationAr: "مارينا دبي، دبي",
      gender: "male",
      furnished: "furnished",
      sharing: "partition",
      availability: "Available Now",
      currentOccupants: 2,
      maxOccupants: 4,
      amenities: ["wifi", "gym", "pool", "parking"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      ],
      verified: true,
      rating: 4.8,
      agent: {
        name: "أحمد الموسى",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
    },
    {
      id: "bedspace-sharjah-01",
      title: "Affordable Bedspace Near University of Sharjah",
      titleAr: "سرير اقتصادي بالقرب من جامعة الشارقة",
      type: "bedspace",
      price: 650,
      location: "University City, Sharjah",
      locationAr: "المدينة الجامعية، الشارقة",
      gender: "male",
      furnished: "furnished",
      sharing: "shared",
      availability: "Available from Feb 1",
      currentOccupants: 3,
      maxOccupants: 4,
      amenities: ["wifi", "laundry", "kitchen"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e1a3ecb4d0bd?w=400&h=300&fit=crop",
      ],
      verified: true,
      rating: 4.3,
      agent: {
        name: "محمد علي",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
    },
    {
      id: "master-business-bay-01",
      title: "Spacious Master Room in Business Bay",
      titleAr: "ماستر روم واسع في الخليج التجاري",
      type: "master",
      price: 2200,
      location: "Business Bay, Dubai",
      locationAr: "الخليج التجاري، دبي",
      gender: "any",
      furnished: "furnished",
      sharing: "private",
      availability: "Available Now",
      currentOccupants: 1,
      maxOccupants: 1,
      amenities: ["wifi", "gym", "pool", "metro", "parking"],
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      ],
      verified: true,
      rating: 4.9,
      agent: {
        name: "سارة الزهراني",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
    onFilterChange?.(filters);
  };

  const updateFilter = (key: keyof RoomTypeFilter, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getRoomTypeIcon = (type: string) => {
    const roomType = roomTypes.find((rt) => rt.id === type);
    return roomType?.icon || Home;
  };

  const getRoomTypeColor = (type: string) => {
    const roomType = roomTypes.find((rt) => rt.id === type);
    return roomType?.color || "from-gray-500 to-gray-600";
  };

  return (
    <div className="space-y-8">
      {/* Room Types Overview */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">
            <Users className="h-8 w-8 text-gold-400 mx-auto mb-4" />
            {language === "ar"
              ? "دليل أنواع السكن الذكي"
              : "Smart Accommodation Guide"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomTypes.map((roomType, index) => {
              const Icon = roomType.icon;
              return (
                <div
                  key={roomType.id}
                  className="group relative luxury-hover magnetic cursor-pointer"
                  onClick={() => updateFilter("type", roomType.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${roomType.color} opacity-20 rounded-2xl blur-sm group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`relative bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm group-hover:border-gold-400/30 transition-all duration-300 ${
                      filters.type === roomType.id
                        ? "border-gold-400/50 bg-gold-400/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${roomType.color} bg-opacity-20`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {roomType.name}
                        </h3>
                        <p className="text-sm text-gold-400 font-semibold">
                          {roomType.priceRange} AED
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                      {roomType.description}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-slate-400 font-medium">
                          {language === "ar" ? "المميزات:" : "Features:"}
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {roomType.features.map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="border-slate-600 text-slate-300 text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 font-medium">
                          {language === "ar" ? "مناسب لـ:" : "Suitable for:"}
                        </span>
                        <p className="text-sm text-slate-200 mt-1">
                          {roomType.targetAudience}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Filter className="h-6 w-6 text-emerald-400" />
            {language === "ar"
              ? "فلاتر البحث المتقدمة"
              : "Advanced Search Filters"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gender Preference */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Users className="h-4 w-4 text-gold-400" />
                {language === "ar" ? "تفضيل الجنس" : "Gender Preference"}
              </label>
              <Select
                value={filters.gender}
                onValueChange={(value) => updateFilter("gender", value)}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-gold-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="any">
                    {language === "ar" ? "أي جنس" : "Any Gender"}
                  </SelectItem>
                  <SelectItem value="male">
                    {language === "ar" ? "شباب فقط" : "Male Only"}
                  </SelectItem>
                  <SelectItem value="female">
                    {language === "ar" ? "بنات فقط" : "Female Only"}
                  </SelectItem>
                  <SelectItem value="family">
                    {language === "ar" ? "عائلات" : "Families"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sharing Type */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Bed className="h-4 w-4 text-emerald-400" />
                {language === "ar" ? "نوع المشاركة" : "Sharing Type"}
              </label>
              <Select
                value={filters.sharing}
                onValueChange={(value) => updateFilter("sharing", value)}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-gold-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="any">
                    {language === "ar" ? "أي نوع" : "Any Type"}
                  </SelectItem>
                  <SelectItem value="private">
                    {language === "ar" ? "خاص" : "Private"}
                  </SelectItem>
                  <SelectItem value="shared">
                    {language === "ar" ? "مشترك" : "Shared"}
                  </SelectItem>
                  <SelectItem value="partition">
                    {language === "ar" ? "بارتشن" : "Partition"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Furnished Status */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-400" />
                {language === "ar" ? "حالة الأثاث" : "Furnished Status"}
              </label>
              <Select
                value={filters.furnished}
                onValueChange={(value) => updateFilter("furnished", value)}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-gold-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="any">
                    {language === "ar" ? "أي حالة" : "Any Status"}
                  </SelectItem>
                  <SelectItem value="furnished">
                    {language === "ar" ? "مفروش" : "Furnished"}
                  </SelectItem>
                  <SelectItem value="unfurnished">
                    {language === "ar" ? "غير مفروش" : "Unfurnished"}
                  </SelectItem>
                  <SelectItem value="semi_furnished">
                    {language === "ar" ? "نصف مفروش" : "Semi Furnished"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-400" />
                {language === "ar" ? "التوفر" : "Availability"}
              </label>
              <Select
                value={filters.availability}
                onValueChange={(value) => updateFilter("availability", value)}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-gold-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="flexible">
                    {language === "ar" ? "مرن" : "Flexible"}
                  </SelectItem>
                  <SelectItem value="immediate">
                    {language === "ar" ? "فوري" : "Immediate"}
                  </SelectItem>
                  <SelectItem value="within_week">
                    {language === "ar" ? "خلال أسبوع" : "Within Week"}
                  </SelectItem>
                  <SelectItem value="within_month">
                    {language === "ar" ? "خلال شهر" : "Within Month"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-6 space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gold-400" />
              {language === "ar" ? "نطاق السعر الشهري" : "Monthly Price Range"}
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                placeholder="من"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  updateFilter("priceRange", [
                    parseInt(e.target.value) || 0,
                    filters.priceRange[1],
                  ])
                }
                className="bg-slate-700/50 border-slate-600 focus:border-gold-400"
              />
              <span className="text-slate-400">-</span>
              <Input
                type="number"
                placeholder="إلى"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  updateFilter("priceRange", [
                    filters.priceRange[0],
                    parseInt(e.target.value) || 0,
                  ])
                }
                className="bg-slate-700/50 border-slate-600 focus:border-gold-400"
              />
              <span className="text-slate-400 whitespace-nowrap">AED/شهر</span>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-8">
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full btn-primary text-lg py-4"
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {language === "ar" ? "جاري البحث..." : "Searching..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  {language === "ar" ? "بحث ذكي" : "Smart Search"}
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-emerald-400" />
                {language === "ar"
                  ? "نتائج البحث الذكي"
                  : "Smart Search Results"}
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                {searchResults.length} {language === "ar" ? "نتيجة" : "Results"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {searchResults.map((result) => {
                const RoomIcon = getRoomTypeIcon(result.type);
                const roomTypeColorClass = getRoomTypeColor(result.type);

                return (
                  <div
                    key={result.id}
                    className="border border-slate-700/50 rounded-2xl p-6 hover:border-gold-400/30 transition-all duration-300 bg-slate-700/20"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Property Image */}
                      <div className="relative">
                        <img
                          src={result.images[0]}
                          alt={result.title}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge
                            className={`bg-gradient-to-r ${roomTypeColorClass} text-white shadow-lg`}
                          >
                            <RoomIcon className="h-3 w-3 mr-1" />
                            {
                              roomTypes.find((rt) => rt.id === result.type)
                                ?.name
                            }
                          </Badge>
                        </div>
                        {result.verified && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-emerald-500/90 text-white">
                              <Shield className="h-3 w-3 mr-1" />
                              {language === "ar" ? "موثق" : "Verified"}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Property Details */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {language === "ar" ? result.titleAr : result.title}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {language === "ar"
                                ? result.locationAr
                                : result.location}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <DollarSign className="h-5 w-5 text-gold-400 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white">
                              {result.price.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-400">
                              AED/month
                            </div>
                          </div>

                          <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white">
                              {result.currentOccupants}/{result.maxOccupants}
                            </div>
                            <div className="text-xs text-slate-400">
                              {language === "ar" ? "إشغال" : "Occupancy"}
                            </div>
                          </div>

                          <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <UserCheck className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white capitalize">
                              {result.gender === "any"
                                ? language === "ar"
                                  ? "مختلط"
                                  : "Mixed"
                                : result.gender === "male"
                                  ? language === "ar"
                                    ? "شباب"
                                    : "Male"
                                  : result.gender === "female"
                                    ? language === "ar"
                                      ? "بنات"
                                      : "Female"
                                    : language === "ar"
                                      ? "عائلات"
                                      : "Family"}
                            </div>
                            <div className="text-xs text-slate-400">
                              {language === "ar" ? "الجنس" : "Gender"}
                            </div>
                          </div>

                          <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <Star className="h-5 w-5 text-gold-400 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white">
                              {result.rating}
                            </div>
                            <div className="text-xs text-slate-400">
                              {language === "ar" ? "التقييم" : "Rating"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={result.agent.avatar}
                              alt={result.agent.name}
                              className="w-10 h-10 rounded-full border-2 border-gold-400/30"
                            />
                            <div>
                              <p className="font-medium text-white">
                                {result.agent.name}
                              </p>
                              {result.agent.verified && (
                                <p className="text-xs text-emerald-400">
                                  {language === "ar"
                                    ? "وكيل موثق"
                                    : "Verified Agent"}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-400">
                              {result.availability}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {result.amenities.map((amenity, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="border-slate-600 text-slate-300"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button className="flex-1 btn-primary">
                            <Heart className="h-4 w-4 mr-2" />
                            {language === "ar"
                              ? "عرض التفاصيل"
                              : "View Details"}
                          </Button>
                          <Button
                            variant="outline"
                            className="border-slate-600"
                          >
                            <Users className="h-4 w-4 mr-2" />
                            {language === "ar" ? "اتصل" : "Contact"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoomTypeClassifier;
