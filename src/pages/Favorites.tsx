import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import { Heart, ArrowRight } from "lucide-react";

const Favorites = () => {
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
  const language: "ar" | "en" = "ar";
  const favorites = me?.favorites || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500/20 to-emerald-500/20 border border-gold-400/30">
              <Heart className="h-8 w-8 text-gold-400" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">المفضلة</h1>
          </div>

          {favorites.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                لا توجد عقارات مفضلة بعد
              </h2>
              <p className="text-slate-400 mb-8">
                ابدأ في إضافة العقارات إلى المفضلة لتجدها هنا بسهولة
              </p>
              <Button className="btn-primary">
                <ArrowRight className="h-4 w-4 mr-2" />
                تصفح العقارات
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((p: any) => {
                const cardProperty = {
                  id: p.id,
                  title: p.titleEn || p.title,
                  titleAr: p.title,
                  price: p.price,
                  priceType: p.priceType,
                  location: `${p.location.area}, ${p.location.emirate}`,
                  locationAr: `${p.location.area}, ${p.location.emirate}`,
                  bedrooms: p.bedrooms,
                  bathrooms: p.bathrooms,
                  area: p.area,
                  images: p.images,
                  featured: p.isFeatured,
                  verified: true,
                  rating: 5,
                  reviews: 1,
                  amenities: p.features || [],
                  agent: {
                    name: p.agent?.name || "Agent",
                    avatar: p.agent?.avatar || "https://github.com/shadcn.png",
                    verified: true,
                  },
                };
                return (
                  <PropertyCard
                    key={p.id}
                    property={cardProperty}
                    language={language}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
