import { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Layers,
  Filter,
  Users,
  Home,
  DollarSign,
  Eye,
  Settings,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEM1LjU5NjQ0IDAgMCA1LjU5NjQ0IDAgMTIuNUMwIDE5LjQwMzYgMTIuNSA0MSAxMi41IDQxQzEyLjUgNDEgMjUgMTkuNDAzNiAyNSAxMi41QzI1IDUuNTk2NDQgMTkuNDAzNiAwIDEyLjUgMFpNMTIuNSAxOEMxMC4wMTQ3IDE4IDggMTUuOTg1MyA4IDEzLjVDOCAxMS4wMTQ3IDEwLjAxNDcgOSAxMi41IDlDMTQuOTg1MyA5IDE3IDExLjAxNDcgMTcgMTMuNUMxNyAxNS45ODUzIDE0Ljk4NTMgMTggMTIuNSAxOFoiIGZpbGw9IiNGQkJGMjQiLz4KPHN2Zz4K",
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEM1LjU5NjQ0IDAgMCA1LjU5NjQ0IDAgMTIuNUMwIDE5LjQwMzYgMTIuNSA0MSAxMi41IDQxQzEyLjUgNDEgMjUgMTkuNDAzNiAyNSAxMi41QzI1IDUuNTk2NDQgMTkuNDAzNiAwIDEyLjUgMFpNMTIuNSAxOEMxMC4wMTQ3IDE4IDggMTUuOTg1MyA4IDEzLjVDOCAxMS4wMTQ3IDEwLjAxNDcgOSAxMi41IDlDMTQuOTg1MyA5IDE3IDExLjAxNDcgMTcgMTMuNUMxNyAxNS45ODUzIDE0Ljk4NTMgMTggMTIuNSAxOFoiIGZpbGw9IiNGQkJGMjQiLz4KPHN2Zz4K",
  shadowUrl: "",
});

interface HeatmapZone {
  id: string;
  name: string;
  nameAr: string;
  coordinates: [number, number][];
  density: "low" | "medium" | "high";
  averagePrice: number;
  propertyCount: number;
  demographics: {
    students: number;
    professionals: number;
    families: number;
  };
  amenities: {
    metro: boolean;
    mall: boolean;
    beach: boolean;
    hospital: boolean;
    university: boolean;
  };
}

interface InteractiveMapProps {
  language?: "ar" | "en";
  properties?: any[];
  selectedPropertyId?: string;
  onPropertySelect?: (propertyId: string) => void;
  showHeatmap?: boolean;
  filterByType?: string[];
  filterByPrice?: [number, number];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  language = "ar",
  properties = [],
  selectedPropertyId,
  onPropertySelect,
  showHeatmap = true,
  filterByType = [],
  filterByPrice,
}) => {
  const [mapView, setMapView] = useState<"satellite" | "street" | "dark">(
    "dark",
  );
  const [showDensity, setShowDensity] = useState(true);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  // Dubai center coordinates
  const defaultCenter: [number, number] = [25.2048, 55.2708];

  // Mock heatmap zones data
  const heatmapZones: HeatmapZone[] = [
    {
      id: "dubai-marina",
      name: "Dubai Marina",
      nameAr: "مارينا دبي",
      coordinates: [
        [25.0866, 55.1458],
        [25.0766, 55.1358],
        [25.0966, 55.1558],
        [25.1066, 55.1658],
      ],
      density: "high",
      averagePrice: 120000,
      propertyCount: 245,
      demographics: { students: 15, professionals: 70, families: 15 },
      amenities: {
        metro: true,
        mall: true,
        beach: true,
        hospital: true,
        university: false,
      },
    },
    {
      id: "business-bay",
      name: "Business Bay",
      nameAr: "الخليج التجاري",
      coordinates: [
        [25.1871, 55.2635],
        [25.1771, 55.2535],
        [25.1971, 55.2735],
        [25.2071, 55.2835],
      ],
      density: "high",
      averagePrice: 95000,
      propertyCount: 189,
      demographics: { students: 10, professionals: 80, families: 10 },
      amenities: {
        metro: true,
        mall: true,
        beach: false,
        hospital: true,
        university: false,
      },
    },
    {
      id: "sharjah-majaz",
      name: "Al Majaz, Sharjah",
      nameAr: "المجاز، الشارقة",
      coordinates: [
        [25.333, 55.39],
        [25.323, 55.38],
        [25.343, 55.4],
        [25.353, 55.41],
      ],
      density: "medium",
      averagePrice: 55000,
      propertyCount: 156,
      demographics: { students: 25, professionals: 50, families: 25 },
      amenities: {
        metro: false,
        mall: true,
        beach: true,
        hospital: true,
        university: true,
      },
    },
    {
      id: "ajman-jurf",
      name: "Al Jurf, Ajman",
      nameAr: "الجرف، عجمان",
      coordinates: [
        [25.4, 55.478],
        [25.39, 55.468],
        [25.41, 55.488],
        [25.42, 55.498],
      ],
      density: "low",
      averagePrice: 35000,
      propertyCount: 89,
      demographics: { students: 40, professionals: 35, families: 25 },
      amenities: {
        metro: false,
        mall: true,
        beach: false,
        hospital: true,
        university: true,
      },
    },
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.log("Location access denied:", error);
        },
      );
    }
  }, []);

  // Filter properties based on criteria
  const filteredProperties = useMemo(() => {
    let filtered = properties;

    if (filterByType.length > 0) {
      filtered = filtered.filter((prop) =>
        filterByType.includes(prop.propertyType),
      );
    }

    if (filterByPrice) {
      filtered = filtered.filter(
        (prop) =>
          prop.price >= filterByPrice[0] && prop.price <= filterByPrice[1],
      );
    }

    return filtered;
  }, [properties, filterByType, filterByPrice]);

  // Create custom icons for different property types
  const createPropertyIcon = (property: any) => {
    const colors = {
      apartment: "#10b981", // emerald
      villa: "#f59e0b", // gold
      studio: "#8b5cf6", // purple
      townhouse: "#06b6d4", // cyan
      penthouse: "#ef4444", // red
      partition: "#f97316", // orange
      bedspace: "#84cc16", // lime
    };

    const color =
      colors[property.propertyType as keyof typeof colors] || "#64748b";

    return L.divIcon({
      html: `
        <div style="
          background: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">
          ${property.price > 200000 ? "★" : property.bedrooms || "S"}
        </div>
      `,
      className: "custom-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  // Get zone color based on density
  const getZoneColor = (density: string) => {
    switch (density) {
      case "high":
        return "#ef4444"; // red
      case "medium":
        return "#f59e0b"; // orange
      case "low":
        return "#10b981"; // green
      default:
        return "#64748b"; // gray
    }
  };

  // Handle navigate to property
  const handleNavigate = (lat: number, lng: number) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${lat},${lng}`;
      window.open(url, "_blank");
    } else {
      const url = `https://www.google.com/maps/search/${lat},${lng}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-gold-400" />
              {language === "ar"
                ? "الخريطة التفاعلية الذكية"
                : "Smart Interactive Map"}
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                {filteredProperties.length}{" "}
                {language === "ar" ? "عقار" : "Properties"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDensity(!showDensity)}
                className="border-slate-600"
              >
                <Layers className="h-4 w-4 mr-2" />
                {showDensity
                  ? language === "ar"
                    ? "إخفاء الكثافة"
                    : "Hide Density"
                  : language === "ar"
                    ? "إظهار الكثافة"
                    : "Show Density"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Map Style Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300">
                {language === "ar" ? "نمط الخريطة:" : "Map Style:"}
              </span>
              <div className="flex rounded-lg overflow-hidden border border-slate-600">
                {["street", "satellite", "dark"].map((style) => (
                  <Button
                    key={style}
                    size="sm"
                    variant={mapView === style ? "default" : "ghost"}
                    onClick={() => setMapView(style as any)}
                    className={`rounded-none ${
                      mapView === style
                        ? "bg-gold-400 text-slate-900"
                        : "hover:bg-slate-700"
                    }`}
                  >
                    {style === "street" &&
                      (language === "ar" ? "شارع" : "Street")}
                    {style === "satellite" &&
                      (language === "ar" ? "قمر" : "Satellite")}
                    {style === "dark" && (language === "ar" ? "مظلم" : "Dark")}
                  </Button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-slate-300">
                  {language === "ar" ? "مزدحم" : "Crowded"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-slate-300">
                  {language === "ar" ? "متوسط" : "Medium"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-300">
                  {language === "ar" ? "هادئ" : "Quiet"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-[600px] w-full">
            <MapContainer
              center={defaultCenter}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg"
            >
              {/* Tile Layer based on selected style */}
              {mapView === "street" && (
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
              )}
              {mapView === "satellite" && (
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                />
              )}
              {mapView === "dark" && (
                <TileLayer
                  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                />
              )}

              {/* Heatmap Zones */}
              {showDensity &&
                heatmapZones.map((zone) => (
                  <Polygon
                    key={zone.id}
                    positions={zone.coordinates}
                    fillColor={getZoneColor(zone.density)}
                    fillOpacity={0.3}
                    color={getZoneColor(zone.density)}
                    weight={2}
                    eventHandlers={{
                      click: () => setSelectedZone(zone.id),
                    }}
                  >
                    <Popup>
                      <div className="p-4 min-w-[300px]">
                        <h3 className="font-bold text-lg mb-2">
                          {language === "ar" ? zone.nameAr : zone.name}
                        </h3>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-600">
                                {language === "ar"
                                  ? "متوسط السعر:"
                                  : "Avg Price:"}
                              </span>
                              <p className="font-semibold">
                                {zone.averagePrice.toLocaleString()} AED
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {language === "ar"
                                  ? "العقارات:"
                                  : "Properties:"}
                              </span>
                              <p className="font-semibold">
                                {zone.propertyCount}
                              </p>
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-600 text-sm">
                              {language === "ar"
                                ? "التركيبة السكانية:"
                                : "Demographics:"}
                            </span>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {language === "ar" ? "طلاب" : "Students"}:{" "}
                                {zone.demographics.students}%
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {language === "ar" ? "موظفون" : "Professionals"}
                                : {zone.demographics.professionals}%
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {language === "ar" ? "عائلات" : "Families"}:{" "}
                                {zone.demographics.families}%
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-600 text-sm">
                              {language === "ar" ? "المرافق:" : "Amenities:"}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {zone.amenities.metro && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs">
                                  {language === "ar" ? "مترو" : "Metro"}
                                </Badge>
                              )}
                              {zone.amenities.mall && (
                                <Badge className="bg-purple-100 text-purple-800 text-xs">
                                  {language === "ar" ? "مول" : "Mall"}
                                </Badge>
                              )}
                              {zone.amenities.beach && (
                                <Badge className="bg-cyan-100 text-cyan-800 text-xs">
                                  {language === "ar" ? "شاطئ" : "Beach"}
                                </Badge>
                              )}
                              {zone.amenities.hospital && (
                                <Badge className="bg-red-100 text-red-800 text-xs">
                                  {language === "ar" ? "مستشفى" : "Hospital"}
                                </Badge>
                              )}
                              {zone.amenities.university && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  {language === "ar" ? "جامعة" : "University"}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Polygon>
                ))}

              {/* Property Markers */}
              {filteredProperties.map((property) => (
                <Marker
                  key={property.id}
                  position={[
                    property.location.latitude || 25.2048,
                    property.location.longitude || 55.2708,
                  ]}
                  icon={createPropertyIcon(property)}
                  eventHandlers={{
                    click: () => onPropertySelect?.(property.id),
                  }}
                >
                  <Popup>
                    <div className="p-3 min-w-[280px]">
                      <div className="flex items-start gap-3">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-sm mb-1 line-clamp-2">
                            {language === "ar"
                              ? property.title
                              : property.titleEn}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2">
                            {property.location.area},{" "}
                            {property.location.emirate}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-green-600">
                              {property.price.toLocaleString()} AED
                            </div>
                            <Badge
                              className={`text-xs ${
                                property.featured
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {property.bedrooms}{" "}
                              {language === "ar" ? "غرف" : "BR"}
                            </Badge>
                          </div>

                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              onClick={() => onPropertySelect?.(property.id)}
                              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              {language === "ar" ? "عرض" : "View"}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                handleNavigate(
                                  property.location.latitude || 25.2048,
                                  property.location.longitude || 55.2708,
                                )
                              }
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1"
                            >
                              <Navigation className="h-3 w-3 mr-1" />
                              {language === "ar" ? "اتجاه" : "Navigate"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* User Location */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={L.divIcon({
                    html: `
                      <div style="
                        background: #3b82f6;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        border: 3px solid white;
                        box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
                        animation: pulse 2s infinite;
                      "></div>
                    `,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                  })}
                >
                  <Popup>
                    <div className="text-center p-2">
                      <Target className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <p className="font-semibold">
                        {language === "ar" ? "موقعك الحالي" : "Your Location"}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>

            {/* Map Stats Overlay */}
            <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-400">
                    {filteredProperties.length}
                  </div>
                  <div className="text-slate-300">
                    {language === "ar" ? "عقارات" : "Properties"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {heatmapZones.length}
                  </div>
                  <div className="text-slate-300">
                    {language === "ar" ? "مناطق" : "Areas"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Details (if selected) */}
      {selectedZone && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
                {language === "ar" ? "تفاصيل المنطقة" : "Area Details"}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedZone(null)}
                className="text-slate-400"
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const zone = heatmapZones.find((z) => z.id === selectedZone);
              if (!zone) return null;

              return (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gold-400" />
                        {language === "ar" ? "معلومات السوق" : "Market Info"}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">
                            {language === "ar"
                              ? "متوسط السعر:"
                              : "Average Price:"}
                          </span>
                          <span className="text-white font-semibold">
                            {zone.averagePrice.toLocaleString()} AED
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">
                            {language === "ar"
                              ? "عدد العقارات:"
                              : "Properties:"}
                          </span>
                          <span className="text-white font-semibold">
                            {zone.propertyCount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">
                            {language === "ar" ? "مستوى الكثافة:" : "Density:"}
                          </span>
                          <Badge
                            className={`${
                              zone.density === "high"
                                ? "bg-red-500/20 text-red-400"
                                : zone.density === "medium"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {zone.density === "high" &&
                              (language === "ar" ? "مزدحم" : "High")}
                            {zone.density === "medium" &&
                              (language === "ar" ? "متوسط" : "Medium")}
                            {zone.density === "low" &&
                              (language === "ar" ? "هادئ" : "Low")}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <Users className="h-4 w-4 text-emerald-400" />
                        {language === "ar"
                          ? "التركيبة السكانية"
                          : "Demographics"}
                      </h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">
                              {language === "ar" ? "طلاب" : "Students"}
                            </span>
                            <span className="text-white">
                              {zone.demographics.students}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 transition-all duration-500"
                              style={{
                                width: `${zone.demographics.students}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">
                              {language === "ar" ? "موظفون" : "Professionals"}
                            </span>
                            <span className="text-white">
                              {zone.demographics.professionals}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 transition-all duration-500"
                              style={{
                                width: `${zone.demographics.professionals}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">
                              {language === "ar" ? "عائلات" : "Families"}
                            </span>
                            <span className="text-white">
                              {zone.demographics.families}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 transition-all duration-500"
                              style={{
                                width: `${zone.demographics.families}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <Zap className="h-4 w-4 text-gold-400" />
                        {language === "ar"
                          ? "المرافق القريبة"
                          : "Nearby Amenities"}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(zone.amenities).map(
                          ([amenity, available]) => (
                            <div
                              key={amenity}
                              className={`flex items-center gap-2 p-2 rounded-lg ${
                                available
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  available ? "bg-green-400" : "bg-red-400"
                                }`}
                              />
                              <span className="text-sm capitalize">
                                {language === "ar"
                                  ? {
                                      metro: "مترو",
                                      mall: "مول",
                                      beach: "شاطئ",
                                      hospital: "مستشفى",
                                      university: "جامعة",
                                    }[amenity]
                                  : amenity}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveMap;
