import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdamNotifications from "@/components/AdamNotifications";
import {
  Building2,
  Search,
  Heart,
  User,
  Globe,
  Menu,
  X,
  MapPin,
  Phone,
  Star,
  Bot,
  Crown,
  Bell,
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"ar" | "en" | "ur">("ar");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(4);
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Initialize dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const navItems = [
    {
      href: "/",
      label:
        language === "ar" ? "الرئيسية" : language === "en" ? "Home" : "ہوم",
      icon: Building2,
    },
    {
      href: "/properties",
      label:
        language === "ar"
          ? "العقارات"
          : language === "en"
            ? "Properties"
            : "پراپرٹیز",
      icon: Search,
    },
    {
      href: "/adam",
      label:
        language === "ar" ? "آدم AI" : language === "en" ? "Adam AI" : "آدم AI",
      icon: Crown,
      badge: "LIVE",
      special: true,
    },
    {
      href: "/maps",
      label:
        language === "ar" ? "الخرائط" : language === "en" ? "Maps" : "نقشے",
      icon: MapPin,
      badge: "NEW",
    },
    {
      href: "/ai-demo",
      label:
        language === "ar"
          ? "الذكاء الاصطناعي"
          : language === "en"
            ? "AI Demo"
            : "AI ڈیمو",
      icon: Bot,
      badge: "AI",
    },
    {
      href: "/favorites",
      label:
        language === "ar"
          ? "المفضلة"
          : language === "en"
            ? "Favorites"
            : "پسندیدہ",
      icon: Heart,
      badge: "3",
    },
    {
      href: "/about",
      label:
        language === "ar"
          ? "من نحن"
          : language === "en"
            ? "About"
            : "ہمارے بارے میں",
      icon: Star,
    },
    {
      href: "/contact",
      label:
        language === "ar"
          ? "اتصل بنا"
          : language === "en"
            ? "Contact"
            : "رابطہ",
      icon: Phone,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-gold-400/20 shadow-lg shadow-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 lg:h-24">
            {/* Enhanced Logo */}
            <Link
              to="/"
              className="flex items-center space-x-4 rtl:space-x-reverse group"
            >
              <div className="relative magnetic">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-500 to-emerald-400 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse-glow"></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-3 rounded-2xl border border-gold-400/40 shadow-lg group-hover:shadow-xl group-hover:shadow-gold-400/30 transition-all duration-300">
                  <Building2 className="h-10 w-10 text-gold-300 group-hover:text-gold-200 transition-colors duration-300" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl lg:text-3xl font-black gradient-text group-hover:scale-105 transition-transform duration-300">
                  RoomUAE PRO
                </h1>
                <p className="text-sm text-slate-300 -mt-1 group-hover:text-slate-200 transition-colors duration-300">
                  {language === "ar"
                    ? "عقارات الإمارات المتميزة"
                    : language === "en"
                      ? "Premium UAE Properties"
                      : "یواے کی پریمیم پراپرٹیز"}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all duration-500 group relative overflow-hidden ${
                      item.special
                        ? "bg-gradient-to-r from-gold-400/20 to-emerald-400/20 border border-gold-400/30 hover:from-gold-400/30 hover:to-emerald-400/30"
                        : isActive(item.href)
                          ? "bg-gradient-to-r from-gold-400/30 to-emerald-400/20 text-gold-300 shadow-lg shadow-gold-400/20"
                          : "text-slate-300 hover:text-gold-300 hover:bg-gradient-to-r hover:from-slate-700/60 hover:to-slate-600/40"
                    } ${item.special ? "animate-pulse-glow" : ""}`}
                  >
                    {item.special && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-emerald-400/10 blur-sm"></div>
                    )}
                    <Icon
                      className={`h-4 w-4 relative z-10 ${item.special ? "text-gold-400" : ""}`}
                    />
                    <span
                      className={`font-medium relative z-10 ${item.special ? "bg-gradient-to-r from-gold-400 to-emerald-400 bg-clip-text text-transparent" : ""}`}
                    >
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge
                        className={`text-xs relative z-10 ${
                          item.special
                            ? "bg-emerald-400/20 text-emerald-400 border-emerald-400/30 animate-pulse"
                            : "bg-emerald-500 text-white"
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side buttons */}
            <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </Badge>
                )}
              </Button>

              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {language === "ar"
                      ? "العربية"
                      : language === "en"
                        ? "English"
                        : "اردو"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem
                    onClick={() => setLanguage("ar")}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    🇦🇪 العربية
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    🇺🇸 English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("ur")}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    🇵🇰 اردو
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              {token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.name || (language === "ar"
                      ? "حسابي"
                      : language === "en"
                        ? "My Account"
                        : "میرا اکاؤنٹ")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                    {language === "ar"
                      ? "الملف الشخصي"
                      : language === "en"
                        ? "Profile"
                        : "پروفائل"}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                    {language === "ar"
                      ? "إعلاناتي"
                      : language === "en"
                        ? "My Listings"
                        : "میرے اشتہارات"}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                    {language === "ar"
                      ? "الإعدادات"
                      : language === "en"
                        ? "Settings"
                        : "سیٹنگز"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer">
                    {language === "ar"
                      ? "تسجيل الخروج"
                      : language === "en"
                        ? "Logout"
                        : "لاگ آؤٹ"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                   <Link to="/login">
                     <Button variant="ghost" className="text-slate-300 hover:text-white">
                        {language === "ar" ? "دخول" : "Login"}
                     </Button>
                   </Link>
                   <Link to="/register">
                     <Button className="bg-gold-500 text-black hover:bg-gold-400">
                        {language === "ar" ? "تسجيل" : "Register"}
                     </Button>
                   </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-700/50">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-gold-400/30 to-emerald-400/20 text-gold-300"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-emerald-500 text-white text-xs ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Adam Notifications */}
      <AdamNotifications
        language={language}
        isVisible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};

export default Navigation;
