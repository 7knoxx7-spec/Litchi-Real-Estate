import { useState } from "react";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";
import { MOCK_PROPERTIES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  Grid3X3,
  List,
  SortDesc,
  MapPin,
  Bookmark,
  Share2,
  Eye,
  TrendingUp,
  Star,
  Calendar,
  DollarSign,
} from "lucide-react";

const Properties = () => {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

  const { data: apiProperties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });

  // Use properties data from API or constants
  const properties = apiProperties || MOCK_PROPERTIES;

  const quickFilters = [
    {
      label: language === "ar" ? "جميع العقارات" : "All Properties",
      value: "all",
      count: properties.length,
    },
    {
      label: language === "ar" ? "المميزة" : "Featured",
      value: "featured",
      count: properties.filter((p) => p.featured).length,
    },
    {
      label: language === "ar" ? "الشقق" : "Apartments",
      value: "apartments",
      count: 4,
    },
    {
      label: language === "ar" ? "الفلل" : "Villas",
      value: "villas",
      count: 2,
    },
    {
      label: language === "ar" ? "دبي" : "Dubai",
      value: "dubai",
      count: properties.length,
    },
  ];

  const sortOptions = [
    {
      value: "featured",
      label: language === "ar" ? "المميزة أولاً" : "Featured First",
    },
    {
      value: "price-low",
      label: language === "ar" ? "السعر: منخفض لمرتفع" : "Price: Low to High",
    },
    {
      value: "price-high",
      label: language === "ar" ? "السعر: مرتفع لمنخفض" : "Price: High to Low",
    },
    { value: "newest", label: language === "ar" ? "الأحدث" : "Newest" },
    { value: "area", label: language === "ar" ? "المساحة" : "Area" },
    {
      value: "rating",
      label: language === "ar" ? "الأعلى تقييماً" : "Highest Rated",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-12 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                  {language === "ar"
                    ? "العقارات المتاحة"
                    : "Available Properties"}
                </h1>
                <p className="text-slate-400">
                  {language === "ar"
                    ? `وجدنا ${properties.length} عقار يطابق بحثك في الإمارات`
                    : `Found ${properties.length} properties matching your search in UAE`}
                </p>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Badge className="bg-gold-400/20 text-gold-400 border-gold-400/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {language === "ar" ? "جديد" : "Updated"}
                </Badge>
                <Badge className="bg-emerald-400/20 text-emerald-400 border-emerald-400/30">
                  <Star className="h-3 w-3 mr-1" />
                  {language === "ar" ? "موثق" : "Verified"}
                </Badge>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar language={language} compact />
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-6 border-b border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={filter.value === "all" ? "default" : "outline"}
                  size="sm"
                  className={
                    filter.value === "all"
                      ? "bg-gold-400 hover:bg-gold-500 text-slate-900"
                      : "border-slate-600 hover:border-gold-400"
                  }
                >
                  {filter.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-slate-600">
                      <SortDesc className="h-4 w-4 mr-2" />
                      {language === "ar" ? "ترتيب" : "Sort"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Advanced Filters */}
                <Button variant="outline" className="border-slate-600">
                  <Filter className="h-4 w-4 mr-2" />
                  {language === "ar" ? "فلاتر" : "Filters"}
                </Button>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Results Info */}
                <span className="text-sm text-slate-400">
                  {language === "ar"
                    ? `عرض 1-${properties.length} من ${properties.length} عقار`
                    : `Showing 1-${properties.length} of ${properties.length} properties`}
                </span>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-slate-600 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-gold-400 hover:bg-gold-500 text-slate-900"
                        : ""
                    }
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-gold-400 hover:bg-gold-500 text-slate-900"
                        : ""
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {properties.map((property) => {
                // Convert property data to PropertyCard format
                const cardProperty = {
                  id: property.id,
                  title: property.titleEn,
                  titleAr: property.title,
                  price: property.price,
                  priceType: property.priceType,
                  location: `${property.location.area}, ${property.location.emirate}`,
                  locationAr: `${property.location.area}, ${property.location.emirate}`,
                  bedrooms: property.bedrooms,
                  bathrooms: property.bathrooms,
                  area: property.area,
                  images: property.images,
                  featured: property.featured,
                  verified: property.verified,
                  rating: property.rating,
                  reviews: property.reviews,
                  amenities: property.amenities,
                  agent: {
                    name: property.agent.name,
                    avatar: property.agent.avatar,
                    verified: property.agent.verified,
                  },
                };

                return (
                  <PropertyCard
                    key={property.id}
                    property={cardProperty}
                    language={language}
                  />
                );
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button className="btn-primary text-lg px-8 py-4">
                {language === "ar" ? "تحميل المزيد" : "Load More Properties"}
              </Button>
              <p className="text-sm text-slate-400 mt-4">
                {language === "ar"
                  ? "عرض 6 من أصل 150+ عقار متاح"
                  : "Showing 6 of 150+ available properties"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold gradient-text">
              {language === "ar"
                ? "لم تجد ما تبحث عنه؟"
                : "Didn't Find What You're Looking For?"}
            </h2>
            <p className="text-xl text-slate-400">
              {language === "ar"
                ? "دعنا نساعدك في العثور على العقار المثالي لك"
                : "Let us help you find your perfect property"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="btn-primary">
                <Bookmark className="h-4 w-4 mr-2" />
                {language === "ar" ? "احفظ بحثك" : "Save Your Search"}
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 hover:border-emerald-400"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {language === "ar" ? "تواصل معنا" : "Contact Agent"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;
