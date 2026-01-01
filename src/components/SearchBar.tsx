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
  DollarSign,
  Home,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

interface SearchBarProps {
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

const SearchBar: React.FC<SearchBarProps> = ({
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
    {
      value: "umm-al-quwain",
      label: language === "ar" ? "أم القيوين" : "Umm Al Quwain",
    },
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
    { value: "duplex", label: language === "ar" ? "دوبلكس" : "Duplex" },
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
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder={
              language === "ar" ? "ابحث عن عقار..." : "Search properties..."
            }
            value={filters.keyword}
            onChange={(e) => updateFilter("keyword", e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-600 focus:border-gold-400"
          />
        </div>
        <Button onClick={handleSearch} className="btn-primary">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="glass p-6 search-glow">
      <div className="space-y-4">
        {/* Main Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {language === "ar" ? "الموقع" : "Location"}
            </label>
            <Select
              value={filters.location}
              onValueChange={(value) => updateFilter("location", value)}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <Home className="h-4 w-4 mr-2" />
              {language === "ar" ? "نوع العقار" : "Property Type"}
            </label>
            <Select
              value={filters.propertyType}
              onValueChange={(value) => updateFilter("propertyType", value)}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <Bed className="h-4 w-4 mr-2" />
              {language === "ar" ? "غرف النوم" : "Bedrooms"}
            </label>
            <Select
              value={filters.bedrooms}
              onValueChange={(value) => updateFilter("bedrooms", value)}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              {language === "ar" ? "نطاق السعر" : "Price Range"}
            </label>
            <Select
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-600">
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-transparent">
              Search
            </label>
            <Button onClick={handleSearch} className="w-full btn-primary">
              <Search className="h-4 w-4 mr-2" />
              {language === "ar" ? "بحث" : "Search"}
            </Button>
          </div>
        </div>

        {/* Keyword Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder={
              language === "ar"
                ? "ابحث بالكلمات المفتاحية (مثل: برج خليفة، مارينا، وسط البلد...)"
                : "Search by keywords (e.g., Burj Khalifa, Marina, Downtown...)"
            }
            value={filters.keyword}
            onChange={(e) => updateFilter("keyword", e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-600 focus:border-gold-400"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-slate-400 hover:text-gold-400"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {language === "ar" ? "فلاتر متقدمة" : "Advanced Filters"}
          </Button>

          <div className="text-sm text-slate-400">
            {language === "ar"
              ? "أكثر من 10,000 عقار متاح"
              : "10,000+ properties available"}
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvanced && (
          <div className="pt-4 border-t border-slate-700/50 space-y-4 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">
                  {language === "ar" ? "المساحة (قدم مربع)" : "Area (sq ft)"}
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="من"
                    className="bg-slate-800/50 border-slate-600"
                  />
                  <span className="text-slate-400">-</span>
                  <Input
                    placeholder="إلى"
                    className="bg-slate-800/50 border-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">
                  {language === "ar" ? "دور البناء" : "Floor"}
                </label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600">
                    <SelectValue
                      placeholder={language === "ar" ? "أي دور" : "Any Floor"}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="ground">Ground Floor</SelectItem>
                    <SelectItem value="low">Low Floor (1-5)</SelectItem>
                    <SelectItem value="mid">Mid Floor (6-15)</SelectItem>
                    <SelectItem value="high">High Floor (16+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">
                  {language === "ar" ? "مفروش" : "Furnished"}
                </label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600">
                    <SelectValue
                      placeholder={language === "ar" ? "أي نوع" : "Any Type"}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="furnished">
                      {language === "ar" ? "مفروش" : "Furnished"}
                    </SelectItem>
                    <SelectItem value="unfurnished">
                      {language === "ar" ? "غير مفروش" : "Unfurnished"}
                    </SelectItem>
                    <SelectItem value="semi-furnished">
                      {language === "ar" ? "نصف مفروش" : "Semi Furnished"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SearchBar;
