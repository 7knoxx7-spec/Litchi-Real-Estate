import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Bed,
  Home,
  Filter,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

interface LuxurySearchBarProps {
  language?: "ar" | "en";
  onSearch?: (filters: SearchFilters) => void;
  compact?: boolean;
}

interface SearchFilters {
  location: string;
  propertyType: string;
  bedrooms: string;
  priceRange: string;
  keyword: string;
}

const LuxurySearchBar: React.FC<LuxurySearchBarProps> = ({
  language = "ar",
  onSearch,
  compact = false,
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    propertyType: "",
    bedrooms: "",
    priceRange: "",
    keyword: "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const locations = [
    { value: "dubai", label: language === "ar" ? "دبي" : "Dubai" },
    { value: "abu-dhabi", label: language === "ar" ? "أبو ظبي" : "Abu Dhabi" },
    { value: "sharjah", label: language === "ar" ? "الشارقة" : "Sharjah" },
    { value: "ajman", label: language === "ar" ? "عجمان" : "Ajman" },
    {
      value: "ras-al-khaimah",
      label: language === "ar" ? "رأس الخيمة" : "Ras Al Khaimah",
    },
    { value: "fujairah", label: language === "ar" ? "الفجيرة" : "Fujairah" },
  ];

  const propertyTypes = [
    { value: "apartment", label: language === "ar" ? "شقة" : "Apartment" },
    { value: "villa", label: language === "ar" ? "فيلا" : "Villa" },
    {
      value: "townhouse",
      label: language === "ar" ? "تاون هاوس" : "Townhouse",
    },
    { value: "studio", label: language === "ar" ? "استديو" : "Studio" },
    { value: "penthouse", label: language === "ar" ? "بنت هاوس" : "Penthouse" },
  ];

  const bedroomOptions = [
    { value: "studio", label: language === "ar" ? "استديو" : "Studio" },
    { value: "1", label: language === "ar" ? "1 غرفة" : "1 Bedroom" },
    { value: "2", label: language === "ar" ? "2 غرفة" : "2 Bedrooms" },
    { value: "3", label: language === "ar" ? "3 غرف" : "3 Bedrooms" },
    { value: "4", label: language === "ar" ? "4 غرف" : "4 Bedrooms" },
    { value: "5+", label: language === "ar" ? "5+ غرف" : "5+ Bedrooms" },
  ];

  const priceRanges = [
    {
      value: "0-50000",
      label: language === "ar" ? "أقل من 50,000 درهم" : "Under AED 50K",
    },
    {
      value: "50000-100000",
      label: language === "ar" ? "50,000 - 100,000 درهم" : "AED 50K - 100K",
    },
    {
      value: "100000-200000",
      label: language === "ar" ? "100,000 - 200,000 درهم" : "AED 100K - 200K",
    },
    {
      value: "200000-500000",
      label: language === "ar" ? "200,000 - 500,000 درهم" : "AED 200K - 500K",
    },
    {
      value: "500000+",
      label: language === "ar" ? "أكثر من 500,000 درهم" : "Above AED 500K",
    },
  ];

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-emerald-400/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-gold-400 transition-colors duration-300" />
          <Input
            placeholder={
              language === "ar" ? "ابحث عن عقار..." : "Search properties..."
            }
            value={filters.keyword}
            onChange={(e) => updateFilter("keyword", e.target.value)}
            className="pl-12 h-14 bg-slate-800/60 border-slate-600 focus:border-gold-400 text-lg backdrop-blur-sm"
          />
        </div>
        <Button onClick={handleSearch} className="btn-primary h-14 px-8">
          <Sparkles className="h-5 w-5 mr-2" />
          {language === "ar" ? "بحث" : "Search"}
        </Button>
      </div>
    );
  }

  return (
    <Card className="glass p-8 search-glow relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-400/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-full blur-2xl"></div>

      <div className="space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold gradient-text flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-gold-400" />
            {language === "ar"
              ? "البحث المتقدم بالذكاء الاصطناعي"
              : "AI-Powered Advanced Search"}
          </h3>
          <p className="text-slate-300">
            {language === "ar"
              ? "اكتشف العقار المثالي بتقنية الذكاء الاصطناعي المتطورة"
              : "Discover your perfect property with advanced AI technology"}
          </p>
        </div>

        {/* Main Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Location */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gold-400" />
              {language === "ar" ? "الموقع" : "Location"}
            </label>
            <Select
              value={filters.location}
              onValueChange={(value) => updateFilter("location", value)}
            >
              <SelectTrigger className="bg-slate-800/60 border-slate-600 focus:border-gold-400 h-12 backdrop-blur-sm">
                <SelectValue
                  placeholder={
                    language === "ar" ? "اختر الإمارة" : "Select Emirate"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center">
              <Home className="h-4 w-4 mr-2 text-gold-400" />
              {language === "ar" ? "نوع العقار" : "Property Type"}
            </label>
            <Select
              value={filters.propertyType}
              onValueChange={(value) => updateFilter("propertyType", value)}
            >
              <SelectTrigger className="bg-slate-800/60 border-slate-600 focus:border-gold-400 h-12 backdrop-blur-sm">
                <SelectValue
                  placeholder={
                    language === "ar" ? "نوع السكن" : "Property Type"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center">
              <Bed className="h-4 w-4 mr-2 text-gold-400" />
              {language === "ar" ? "غرف النوم" : "Bedrooms"}
            </label>
            <Select
              value={filters.bedrooms}
              onValueChange={(value) => updateFilter("bedrooms", value)}
            >
              <SelectTrigger className="bg-slate-800/60 border-slate-600 focus:border-gold-400 h-12 backdrop-blur-sm">
                <SelectValue
                  placeholder={language === "ar" ? "عدد الغرف" : "Bedrooms"}
                />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {bedroomOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-gold-400" />
              {language === "ar" ? "نطاق السعر" : "Price Range"}
            </label>
            <Select
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
            >
              <SelectTrigger className="bg-slate-800/60 border-slate-600 focus:border-gold-400 h-12 backdrop-blur-sm">
                <SelectValue
                  placeholder={language === "ar" ? "السعر" : "Price"}
                />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-transparent">
              Search
            </label>
            <Button
              onClick={handleSearch}
              className="w-full btn-primary h-12 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Search className="h-5 w-5 mr-2 relative z-10" />
              <span className="relative z-10 font-bold">
                {language === "ar" ? "بحث" : "Search"}
              </span>
            </Button>
          </div>
        </div>

        {/* Keyword Search */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-emerald-400/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-gold-400 transition-colors duration-300" />
          <Input
            placeholder={
              language === "ar"
                ? "ابحث بالكلمات المفتاحية (مثل: برج خليفة، مارينا، وسط البلد...)"
                : "Search by keywords (e.g., Burj Khalifa, Marina, Downtown...)"
            }
            value={filters.keyword}
            onChange={(e) => updateFilter("keyword", e.target.value)}
            className="pl-12 h-14 bg-slate-800/60 border-slate-600 focus:border-gold-400 text-lg backdrop-blur-sm"
          />
        </div>

        {/* Bottom Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-slate-400 hover:text-gold-400"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {language === "ar" ? "فلاتر متقدمة" : "Advanced Filters"}
          </Button>

          <div className="text-sm text-slate-300 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold-400" />
            {language === "ar"
              ? "أكثر من 10,000+ عقار متاح"
              : "10,000+ premium properties"}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LuxurySearchBar;
