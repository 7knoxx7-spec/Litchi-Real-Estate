import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Phone,
  MessageCircle,
  Eye,
  Camera,
  Wifi,
  Car,
  Dumbbell,
  Waves,
} from "lucide-react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    titleAr: string;
    price: number;
    priceType: "monthly" | "yearly" | "sale";
    location: string;
    locationAr: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: string[];
    featured: boolean;
    verified: boolean;
    rating: number;
    reviews: number;
    amenities: string[];
    agent: {
      name: string;
      avatar: string;
      verified: boolean;
    };
  };
  language?: "ar" | "en";
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  language = "ar",
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number, type: string) => {
    const formatted = new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
    }).format(price);

    const typeText = {
      monthly: language === "ar" ? "شهرياً" : "/month",
      yearly: language === "ar" ? "سنوياً" : "/year",
      sale: language === "ar" ? "" : "",
    };

    return `${formatted} ${typeText[type as keyof typeof typeText]}`;
  };

  const amenityIcons: { [key: string]: any } = {
    wifi: Wifi,
    parking: Car,
    gym: Dumbbell,
    pool: Waves,
  };

  return (
    <Card className="property-card bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-lg overflow-hidden group shadow-2xl hover:shadow-gold-400/20 transition-all duration-700 transform-gpu">
      <div className="relative overflow-hidden">
        {/* Enhanced Property Images */}
        <div className="relative h-72 overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
          <img
            src={property.images[currentImageIndex]}
            alt={language === "ar" ? property.titleAr : property.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-1 filter group-hover:brightness-110"
          />

          {/* Image Navigation Dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-gold-400 w-6"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Enhanced Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-3 z-20">
            {property.featured && (
              <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-400/30 animate-pulse-glow">
                <Star className="h-3 w-3 mr-1 fill-current" />
                {language === "ar" ? "مميز" : "Featured"}
              </Badge>
            )}
            {property.verified && (
              <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-400/30">
                {language === "ar" ? "موثق" : "Verified"}
              </Badge>
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm flex items-center">
            <Camera className="h-3 w-3 mr-1" />
            {property.images.length}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-3 right-12 p-2 bg-black/60 backdrop-blur-sm rounded-lg hover:bg-black/80 transition-all duration-300"
          >
            <Heart
              className={`h-4 w-4 transition-all duration-300 ${
                isFavorited
                  ? "fill-red-500 text-red-500"
                  : "text-white hover:text-red-400"
              }`}
            />
          </button>
        </div>

        {/* Enhanced Price Tag */}
        <div className="absolute -bottom-8 left-6 bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 text-white px-6 py-3 rounded-xl shadow-2xl shadow-gold-400/40 font-black text-lg z-20 transform group-hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-xl blur-sm opacity-50"></div>
          <span className="relative z-10">
            {formatPrice(property.price, property.priceType)}
          </span>
        </div>
      </div>

      <CardContent className="p-8 pt-12 relative">
        {/* Enhanced Title and Location */}
        <div className="space-y-3 mb-6">
          <h3 className="text-2xl font-bold text-white line-clamp-2 group-hover:text-gold-300 transition-all duration-500 group-hover:transform group-hover:scale-105">
            {language === "ar" ? property.titleAr : property.title}
          </h3>
          <div className="flex items-center text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
            <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-gold-400" />
            <span className="text-base font-medium">
              {language === "ar" ? property.locationAr : property.location}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4 text-slate-300">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {property.area} {language === "ar" ? "قدم²" : "sqft"}
              </span>
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-gold-400 fill-current" />
              <span className="text-sm text-white ml-1">{property.rating}</span>
            </div>
            <span className="text-xs text-slate-400">
              ({property.reviews} {language === "ar" ? "تقييم" : "reviews"})
            </span>
          </div>
          <div className="flex items-center text-slate-400">
            <Eye className="h-4 w-4 mr-1" />
            <span className="text-xs">
              124 {language === "ar" ? "مشاهدة" : "views"}
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          {property.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return Icon ? (
              <div key={amenity} className="p-2 bg-slate-700/50 rounded-lg">
                <Icon className="h-4 w-4 text-slate-300" />
              </div>
            ) : null;
          })}
          {property.amenities.length > 4 && (
            <div className="text-xs text-slate-400">
              +{property.amenities.length - 4}{" "}
              {language === "ar" ? "المزيد" : "more"}
            </div>
          )}
        </div>

        {/* Agent Info */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="w-8 h-8 rounded-full border-2 border-gold-400/30"
            />
            <div>
              <p className="text-sm font-medium text-white">
                {property.agent.name}
              </p>
              {property.agent.verified && (
                <p className="text-xs text-emerald-400">
                  {language === "ar" ? "معلن موثق" : "Verified Agent"}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 hover:border-emerald-400"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 hover:border-gold-400"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
