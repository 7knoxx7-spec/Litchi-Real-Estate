import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-gold-500/20 to-emerald-500/20 border border-gold-400/30">
              <MessageCircle className="h-12 w-12 text-gold-400" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">اتصل بنا</h1>
            <p className="text-xl text-slate-400">
              نحن هنا لمساعدتك في العثور على العقار المثالي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: "اتصل بنا",
                subtitle: "+971 4 123 4567",
                description: "متاح 24/7",
              },
              {
                icon: Mail,
                title: "راسلنا",
                subtitle: "info@roomuae.pro",
                description: "رد سريع خلال ساعة",
              },
              {
                icon: MapPin,
                title: "زرنا",
                subtitle: "دبي، الإمارات",
                description: "مركز دبي المالي",
              },
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
                >
                  <Icon className="h-8 w-8 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-gold-400 font-medium">
                    {contact.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {contact.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              قريباً - نموذج التواصل
            </h2>
            <p className="text-slate-400 mb-8">
              نعمل على إعداد نموذج تواصل متقدم لخدمتك بشكل أفضل
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

export default Contact;
