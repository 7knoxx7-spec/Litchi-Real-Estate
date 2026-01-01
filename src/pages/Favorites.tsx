import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

const Favorites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-gold-500/20 to-emerald-500/20 border border-gold-400/30">
              <Heart className="h-12 w-12 text-gold-400" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">المفضلة</h1>
            <p className="text-xl text-slate-400">
              عقاراتك المفضلة في مكان واحد
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
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
        </div>
      </div>
    </div>
  );
};

export default Favorites;
