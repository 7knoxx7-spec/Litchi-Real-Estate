import {
  Building2,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface FooterProps {
  language: "ar" | "en" | "ur";
}

const Footer = ({ language }: FooterProps) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Building2 className="h-8 w-8 text-gold-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-amber-200 bg-clip-text text-transparent">
                Litchi Real Estate
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {language === "ar"
                ? "ليتشي العقارية: منصة متقدمة تجمع بين الذكاء الاصطناعي والخبرة العقارية لتقديم أفضل تجربة سكن."
                : "Litchi Real Estate: A modern platform combining AI and real estate expertise."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/properties"
                  className="text-slate-400 hover:text-gold-400 transition-colors"
                >
                  {language === "ar" ? "العقارات" : "Properties"}
                </a>
              </li>
              <li>
                <a
                  href="/maps"
                  className="text-slate-400 hover:text-gold-400 transition-colors"
                >
                  {language === "ar" ? "الخريطة" : "Map"}
                </a>
              </li>
              <li>
                <a
                  href="/adam"
                  className="text-slate-400 hover:text-gold-400 transition-colors"
                >
                  Adam AI
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-slate-400">
                <Phone className="h-4 w-4 mr-2 text-gold-400" />
                <span>+971 50 000 0000</span>
              </li>
              <li className="flex items-center text-slate-400">
                <Mail className="h-4 w-4 mr-2 text-gold-400" />
                <span>contact@litchi.realestate</span>
              </li>
              <li className="flex items-center text-slate-400">
                <MapPin className="h-4 w-4 mr-2 text-gold-400" />
                <span>Dubai, UAE</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {language === "ar" ? "تابعنا" : "Follow Us"}
            </h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="text-slate-400 hover:text-gold-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-gold-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-gold-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Litchi Real Estate. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
