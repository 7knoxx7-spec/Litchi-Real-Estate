import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingParticles from "@/components/FloatingParticles";
import PropertyCard from "@/components/PropertyCard";
import LuxurySearchBar from "@/components/LuxurySearchBar";
import Navigation from "@/components/Navigation";
import AdamWelcomePopup from "@/components/AdamWelcomePopup";
import DreamHomeDiscovery from "@/components/DreamHomeDiscovery";
import { MOCK_PROPERTIES, STATS, FEATURES } from "@/constants";
import {
  TrendingUp,
  Users,
  Award,
  Building2,
  Shield,
  Zap,
  Eye,
  Smartphone,
  ArrowRight,
  Star,
  Heart,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Crown,
  Sparkles,
  CheckCircle,
  Clock,
  Search,
  Play,
  User,
} from "lucide-react";

const Index = () => {
  const [language, setLanguage] = useState<"ar" | "en" | "ur">("ar");
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showDreamDiscovery, setShowDreamDiscovery] = useState(false);
  const [userProfile, setUserProfile] = useState<"male" | "female">("male");

  // Auto-show popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (lang: "ar" | "en" | "ur") => {
    setLanguage(lang);
  };

  const handleStartDreamDiscovery = () => {
    setShowWelcomePopup(false);
    setShowDreamDiscovery(true);
  };

  // Get featured properties from constants
  const featuredProperties = MOCK_PROPERTIES.filter(
    (property) => property.featured,
  ).slice(0, 3);

  // Convert constants to component format
  const stats = STATS.map((stat) => ({
    ...stat,
    icon:
      stat.icon === "Building2"
        ? Building2
        : stat.icon === "Users"
          ? Users
          : stat.icon === "Award"
            ? Award
            : stat.icon === "TrendingUp"
              ? TrendingUp
              : Building2,
    label: language === "ar" ? stat.labelAr : stat.labelEn,
  }));

  const features = FEATURES.map((feature) => ({
    ...feature,
    icon:
      feature.icon === "Shield"
        ? Shield
        : feature.icon === "Zap"
          ? Zap
          : feature.icon === "Eye"
            ? Eye
            : feature.icon === "Smartphone"
              ? Smartphone
              : Shield,
    title: language === "ar" ? feature.titleAr : feature.titleEn,
    description:
      language === "ar" ? feature.descriptionAr : feature.descriptionEn,
  }));

  return (
    <div className="min-h-screen aurora relative overflow-hidden">
      <FloatingParticles />
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 bg-dubai-skyline opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-emerald-500/5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="text-center max-w-5xl mx-auto space-y-12">
              {/* Main Heading */}
              <div className="space-y-6 animate-fade-in-up">
                <Badge className="bg-gradient-to-r from-gold-500/30 to-emerald-500/30 text-gold-300 border-gold-400/50 text-lg px-8 py-3 shadow-lg shadow-gold-400/20 animate-bounce-in luxury-hover">
                  {language === "ar"
                    ? "🏆 المنصة الرائدة في الإمارات"
                    : "🏆 #1 Platform in UAE"}
                </Badge>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black gradient-text leading-tight text-glow">
                  {language === "ar" ? (
                    <>
                      اكتشف منزل
                      <br />
                      <span className="animate-glow">أحلامك في الإمارات</span>
                    </>
                  ) : (
                    <>
                      Discover Your
                      <br />
                      <span className="animate-glow">Dream Home in UAE</span>
                    </>
                  )}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 max-w-4xl mx-auto leading-relaxed font-light animate-slide-in-right">
                  {language === "ar"
                    ? "أفضل العقارات المتميزة في دولة الإمارات العربية المتحدة مع تقنيات الذكاء الاصطناعي المتطورة وأعلى معايير الأمان والجودة"
                    : "Premium UAE properties with advanced AI technology, highest security standards, and unmatched quality"}
                </p>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="text-center space-y-4 animate-scale-in luxury-hover magnetic group"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/30 to-emerald-500/30 border border-gold-400/40 shadow-lg group-hover:shadow-2xl group-hover:shadow-gold-400/30 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-emerald-400/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                        <Icon className="h-10 w-10 text-gold-300 relative z-10 group-hover:text-gold-200 transition-colors duration-300" />
                      </div>
                      <div className="text-3xl lg:text-4xl font-black text-white group-hover:text-gold-200 transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-base text-slate-300 font-medium">
                        {language === "ar" ? stat.labelAr : stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-in-left">
                <Button className="btn-primary text-xl px-12 py-6 relative overflow-hidden group shadow-2xl shadow-gold-400/25">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Search className="h-6 w-6 mr-3 relative z-10" />
                  <span className="relative z-10 font-bold">
                    {language === "ar"
                      ? "ابدأ البحث الآن"
                      : "Start Searching Now"}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-slate-500 hover:border-emerald-400 text-xl px-12 py-6 relative overflow-hidden group bg-transparent backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Play className="h-6 w-6 mr-3 relative z-10" />
                  <span className="relative z-10 font-bold">
                    {language === "ar" ? "شاهد الفيديو" : "Watch Video"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="section-title">
                  {language === "ar"
                    ? "ابحث عن عقارك المثالي"
                    : "Find Your Perfect Property"}
                </h2>
                <p className="text-xl text-slate-400 mt-4">
                  {language === "ar"
                    ? "استخدم محرك البحث المتطور للعثور على العقار الذي يناسب احتياجاتك"
                    : "Use our advanced search engine to find properties that match your needs"}
                </p>
              </div>
              <LuxurySearchBar language={language} />
            </div>
          </div>
        </section>

        {/* Enhanced Featured Properties */}
        <section className="py-24 relative overflow-hidden">
          {/* Background with glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-slate-800/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-emerald-500/5"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="section-title animate-scale-in">
                {language === "ar" ? "العقارات المميزة" : "Featured Properties"}
              </h2>
              <p className="text-2xl text-slate-300 mt-6 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
                {language === "ar"
                  ? "مجموعة مختارة من أفضل العقارات المتاحة حالياً بأعلى معايير الجودة والرفاهية"
                  : "Handpicked selection of the finest properties available with highest quality and luxury standards"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {featuredProperties.map((property, index) => {
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
                  <div
                    key={property.id}
                    className="animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <PropertyCard property={cardProperty} language={language} />
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-16">
              <Button className="btn-secondary text-xl px-12 py-6 relative overflow-hidden group shadow-2xl shadow-emerald-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 font-bold">
                  {language === "ar"
                    ? "عرض جميع العقارات"
                    : "View All Properties"}
                </span>
                <ArrowRight className="h-6 w-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <p className="text-slate-400 mt-4 text-lg">
                {language === "ar"
                  ? "أكثر من 10,000 عقار عالي الجودة في انتظارك"
                  : "10,000+ premium properties waiting for you"}
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-24 relative">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/30"></div>
          <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/6 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="section-title animate-bounce-in">
                {language === "ar"
                  ? "لماذا تختار RoomUAE PRO؟"
                  : "Why Choose RoomUAE PRO?"}
              </h2>
              <p className="text-2xl text-slate-300 mt-6 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
                {language === "ar"
                  ? "نقدم لك تجربة فريدة في البحث عن العقارات بأحدث التقنيات وأعلى معايير الجودة"
                  : "We provide a unique property search experience with cutting-edge technology and highest quality standards"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative luxury-hover magnetic"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Card background with gradient border */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 via-transparent to-emerald-400/20 p-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-full h-full bg-slate-900/80 rounded-3xl"></div>
                    </div>

                    <div className="relative bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8 text-center transition-all duration-700 group-hover:bg-slate-800/80 group-hover:border-gold-400/30 group-hover:shadow-2xl group-hover:shadow-gold-400/10 group-hover:transform group-hover:scale-105">
                      {/* Icon container */}
                      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-gold-500/30 to-emerald-500/30 border border-gold-400/40 mb-8 group-hover:shadow-2xl group-hover:shadow-gold-400/20 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/30 to-emerald-400/30 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Icon className="h-10 w-10 text-gold-300 relative z-10 group-hover:text-gold-200 group-hover:scale-110 transition-all duration-500" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-200 transition-colors duration-500">
                        {language === "ar" ? feature.titleAr : feature.title}
                      </h3>
                      <p className="text-slate-400 group-hover:text-slate-300 leading-relaxed text-lg transition-colors duration-500">
                        {language === "ar"
                          ? feature.descriptionAr
                          : feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-28 relative overflow-hidden">
          {/* Spectacular background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 bg-dubai-skyline opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gold-500/10 via-transparent to-emerald-500/10"></div>

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl animate-pulse-glow"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="text-center max-w-6xl mx-auto space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black gradient-text animate-glow leading-tight">
                  {language === "ar"
                    ? "ابدأ رحلتك اليوم"
                    : "Start Your Journey Today"}
                </h2>
                <p className="text-2xl md:text-3xl text-slate-200 max-w-4xl mx-auto leading-relaxed font-light">
                  {language === "ar"
                    ? "انضم إلى آلاف العملاء السعداء واكتشف العقار المثالي في الإمارات"
                    : "Join thousands of happy clients and discover your perfect property in UAE"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Button className="btn-primary text-2xl px-16 py-8 relative overflow-hidden group shadow-2xl shadow-gold-400/30 transform hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-300 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Building2 className="h-8 w-8 mr-4 relative z-10" />
                  <span className="relative z-10 font-black">
                    {language === "ar" ? "ابحث عن عقار" : "Browse Properties"}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="border-3 border-slate-400 hover:border-emerald-400 text-2xl px-16 py-8 relative overflow-hidden group bg-transparent backdrop-blur-lg transform hover:scale-105 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <User className="h-8 w-8 mr-4 relative z-10" />
                  <span className="relative z-10 font-black">
                    {language === "ar" ? "��نشر إعلانك" : "List Your Property"}
                  </span>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12 border-t border-slate-700/50">
                {[
                  {
                    icon: Shield,
                    text:
                      language === "ar" ? "معاملات آمنة 100%" : "100% Secure",
                  },
                  {
                    icon: Star,
                    text: language === "ar" ? "تقييم 5 نجوم" : "5-Star Rated",
                  },
                  {
                    icon: Clock,
                    text: language === "ar" ? "دعم 24/7" : "24/7 Support",
                  },
                  {
                    icon: CheckCircle,
                    text:
                      language === "ar" ? "موثق ومضمون" : "Verified & Trusted",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="text-center space-y-3 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className="h-8 w-8 text-gold-400 mx-auto" />
                      <p className="text-slate-300 font-medium">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-gold-400/20 py-20 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-dubai-skyline opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-400 via-emerald-400 to-gold-400"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              {/* Enhanced Company Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative magnetic">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-2xl blur-md opacity-60"></div>
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-3 rounded-2xl border border-gold-400/40 shadow-lg">
                      <Building2 className="h-8 w-8 text-gold-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black gradient-text">
                    RoomUAE PRO
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {language === "ar"
                    ? "المنصة الرائدة للعقارات المتميزة في دولة الإمارات العربية المتحدة"
                    : "The leading platform for premium properties in the United Arab Emirates"}
                </p>
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-500 hover:border-gold-400 bg-slate-800/50 backdrop-blur-sm magnetic"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-500 hover:border-emerald-400 bg-slate-800/50 backdrop-blur-sm magnetic"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-500 hover:border-gold-400 bg-slate-800/50 backdrop-blur-sm magnetic"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Enhanced Quick Links */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white flex items-center">
                  <Star className="h-5 w-5 mr-2 text-gold-400" />
                  {language === "ar" ? "روابط سريعة" : "Quick Links"}
                </h4>
                <ul className="space-y-4 text-slate-300">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gold-300 transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {language === "ar" ? "عن الشركة" : "About Us"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gold-300 transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {language === "ar" ? "الخدمات" : "Services"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gold-300 transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {language === "ar" ? "اتصل بنا" : "Contact"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gold-300 transition-all duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {language === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Enhanced Locations */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-emerald-400" />
                  {language === "ar" ? "المواقع" : "Locations"}
                </h4>
                <ul className="space-y-4 text-slate-300">
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-300 transition-all duration-300 flex items-center group"
                    >
                      <Building2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      {language === "ar" ? "دبي" : "Dubai"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-300 transition-all duration-300 flex items-center group"
                    >
                      <Building2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      {language === "ar" ? "أبو ظبي" : "Abu Dhabi"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-300 transition-all duration-300 flex items-center group"
                    >
                      <Building2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      {language === "ar" ? "الشارقة" : "Sharjah"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-300 transition-all duration-300 flex items-center group"
                    >
                      <Building2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      {language === "ar" ? "عجمان" : "Ajman"}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Enhanced Support */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-gold-400" />
                  {language === "ar" ? "الدعم" : "Support"}
                </h4>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-center group">
                    <Clock className="h-5 w-5 mr-3 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                    {language === "ar"
                      ? "24/7 دعم العملاء"
                      : "24/7 Customer Support"}
                  </li>
                  <li className="flex items-center group">
                    <CheckCircle className="h-5 w-5 mr-3 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                    {language === "ar" ? "ضمان الجودة" : "Quality Guarantee"}
                  </li>
                  <li className="flex items-center group">
                    <Shield className="h-5 w-5 mr-3 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                    {language === "ar" ? "معاملات آمنة" : "Secure Transactions"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gold-400/20 pt-12 text-center">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <p className="text-slate-300 text-lg">
                  {language === "ar"
                    ? "© 2024 RoomUAE PRO. جميع الحقوق محفوظة."
                    : "© 2024 RoomUAE PRO. All rights reserved."}
                </p>
                <div className="flex items-center space-x-6 text-slate-400">
                  <a
                    href="#"
                    className="hover:text-gold-400 transition-colors duration-300"
                  >
                    {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                  </a>
                  <a
                    href="#"
                    className="hover:text-gold-400 transition-colors duration-300"
                  >
                    {language === "ar" ? "شروط الاستخدام" : "Terms of Service"}
                  </a>
                  <a
                    href="#"
                    className="hover:text-gold-400 transition-colors duration-300"
                  >
                    {language === "ar" ? "ملفات تعريف الارتباط" : "Cookies"}
                  </a>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-8 border-t border-slate-700/30">
                <p className="text-slate-400 mb-4 text-sm">
                  {language === "ar" ? "موثق من قبل" : "Trusted by"}
                </p>
                <div className="flex items-center justify-center space-x-8 opacity-60">
                  <div className="text-gold-400 font-bold">UAE</div>
                  <div className="text-emerald-400 font-bold">VERIFIED</div>
                  <div className="text-gold-400 font-bold">SECURE</div>
                  <div className="text-emerald-400 font-bold">TRUSTED</div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Adam Welcome Popup */}
      <AdamWelcomePopup
        isOpen={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
        onLanguageSelect={handleLanguageSelect}
        onStartDreamDiscovery={handleStartDreamDiscovery}
      />

      {/* Dream Home Discovery */}
      <DreamHomeDiscovery
        isOpen={showDreamDiscovery}
        onClose={() => setShowDreamDiscovery(false)}
        language={language}
        userProfile={userProfile}
      />
    </div>
  );
};

export default Index;
