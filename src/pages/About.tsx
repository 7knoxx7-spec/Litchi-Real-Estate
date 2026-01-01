import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ArrowRight,
  Star,
  Shield,
  Users,
  Award,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-gold-500/20 to-emerald-500/20 border border-gold-400/30">
              <Building2 className="h-12 w-12 text-gold-400" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">من نحن</h1>
            <p className="text-xl text-slate-400">
              المنصة الرائدة للعقارات المتميزة في دولة الإمارات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "10,000+", subtitle: "عقار متاح" },
              { icon: Users, title: "50,000+", subtitle: "عميل راضي" },
              { icon: Award, title: "5+", subtitle: "سنوات خبرة" },
              { icon: Shield, title: "100%", subtitle: "أمان وثقة" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
                >
                  <Icon className="h-8 w-8 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white">
                    {stat.title}
                  </h3>
                  <p className="text-slate-400">{stat.subtitle}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              قريباً - المزيد من التفاصيل
            </h2>
            <p className="text-slate-400 mb-8">
              نعمل على إعداد صفحة شاملة عن شركتنا ورؤيتنا
            </p>
            <Button className="btn-primary">
              <ArrowRight className="h-4 w-4 mr-2" />
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
