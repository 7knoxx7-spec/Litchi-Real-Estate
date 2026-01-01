import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Shield,
  Eye,
  Ban,
  CheckCircle,
  Search,
  Filter,
  TrendingUp,
  AlertCircle,
  Users,
  FileText,
  Clock,
  Activity,
} from "lucide-react";

interface FraudReport {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  reportType:
    | "fake_listing"
    | "suspicious_agent"
    | "fake_images"
    | "price_manipulation";
  reportCount: number;
  riskScore: number;
  lastReported: string;
  status: "pending" | "investigating" | "resolved" | "dismissed";
  reportDetails: {
    reporterId: string;
    reporterName: string;
    reason: string;
    timestamp: string;
  }[];
  aiAnalysis: {
    confidence: number;
    flags: string[];
    recommendation: "block" | "investigate" | "monitor" | "safe";
  };
}

interface FraudDashboardProps {
  language?: "ar" | "en";
}

const FraudDashboard: React.FC<FraudDashboardProps> = ({ language = "ar" }) => {
  const [reports, setReports] = useState<FraudReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<FraudReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockReports: FraudReport[] = [
      {
        id: "report-001",
        propertyId: "prop-001",
        propertyTitle: "شقة فاخرة في دبي مارينا - سعر مشبوه",
        propertyImage:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
        reportType: "price_manipulation",
        reportCount: 8,
        riskScore: 85,
        lastReported: "2024-01-24T10:30:00Z",
        status: "pending",
        reportDetails: [
          {
            reporterId: "user-001",
            reporterName: "أحمد محمد",
            reason: "السعر أقل من السوق بشكل مشبوه",
            timestamp: "2024-01-24T10:30:00Z",
          },
        ],
        aiAnalysis: {
          confidence: 92,
          flags: ["price_anomaly", "new_agent", "limited_images"],
          recommendation: "investigate",
        },
      },
      {
        id: "report-002",
        propertyId: "prop-002",
        propertyTitle: "استوديو في الشارقة - صور مزيفة",
        propertyImage:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
        reportType: "fake_images",
        reportCount: 12,
        riskScore: 95,
        lastReported: "2024-01-23T15:45:00Z",
        status: "investigating",
        reportDetails: [
          {
            reporterId: "user-002",
            reporterName: "سارة علي",
            reason: "الصور مسروقة من موقع آخر",
            timestamp: "2024-01-23T15:45:00Z",
          },
        ],
        aiAnalysis: {
          confidence: 96,
          flags: ["duplicate_images", "reverse_image_match", "fake_location"],
          recommendation: "block",
        },
      },
      {
        id: "report-003",
        propertyId: "prop-003",
        propertyTitle: "فيلا في الرانشيز - وكيل مشبوه",
        propertyImage:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300&h=200&fit=crop",
        reportType: "suspicious_agent",
        reportCount: 5,
        riskScore: 70,
        lastReported: "2024-01-22T09:15:00Z",
        status: "resolved",
        reportDetails: [
          {
            reporterId: "user-003",
            reporterName: "محمد الزهراني",
            reason: "الوكيل يطلب دفع مقدم قبل المعاينة",
            timestamp: "2024-01-22T09:15:00Z",
          },
        ],
        aiAnalysis: {
          confidence: 78,
          flags: ["new_agent_profile", "high_pressure_tactics"],
          recommendation: "monitor",
        },
      },
    ];

    setTimeout(() => {
      setReports(mockReports);
      setFilteredReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter reports based on search and filters
  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter((report) =>
        report.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    if (riskFilter !== "all") {
      const riskLevel = riskFilter;
      filtered = filtered.filter((report) => {
        if (riskLevel === "high") return report.riskScore >= 80;
        if (riskLevel === "medium")
          return report.riskScore >= 50 && report.riskScore < 80;
        if (riskLevel === "low") return report.riskScore < 50;
        return true;
      });
    }

    setFilteredReports(filtered);
  }, [reports, searchTerm, statusFilter, riskFilter]);

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-400 bg-red-400/20 border-red-400/30";
    if (score >= 50)
      return "text-orange-400 bg-orange-400/20 border-orange-400/30";
    return "text-green-400 bg-green-400/20 border-green-400/30";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "investigating":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
      case "resolved":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "dismissed":
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
      default:
        return "bg-slate-400/20 text-slate-400 border-slate-400/30";
    }
  };

  const getRecommendationAction = (recommendation: string) => {
    const actions = {
      block: {
        color: "bg-red-500 hover:bg-red-600",
        text: language === "ar" ? "حظر فوري" : "Block Now",
      },
      investigate: {
        color: "bg-orange-500 hover:bg-orange-600",
        text: language === "ar" ? "تحقيق" : "Investigate",
      },
      monitor: {
        color: "bg-blue-500 hover:bg-blue-600",
        text: language === "ar" ? "مراقبة" : "Monitor",
      },
      safe: {
        color: "bg-green-500 hover:bg-green-600",
        text: language === "ar" ? "آمن" : "Safe",
      },
    };
    return actions[recommendation as keyof typeof actions] || actions.monitor;
  };

  const stats = [
    {
      title: language === "ar" ? "إجمالي البلاغات" : "Total Reports",
      value: reports.length.toString(),
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-400/20",
    },
    {
      title: language === "ar" ? "عالي الخطورة" : "High Risk",
      value: reports.filter((r) => r.riskScore >= 80).length.toString(),
      icon: AlertCircle,
      color: "text-orange-400",
      bgColor: "bg-orange-400/20",
    },
    {
      title: language === "ar" ? "قيد التحقيق" : "Under Investigation",
      value: reports
        .filter((r) => r.status === "investigating")
        .length.toString(),
      icon: Activity,
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
    },
    {
      title: language === "ar" ? "تم الحل" : "Resolved",
      value: reports.filter((r) => r.status === "resolved").length.toString(),
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/20",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
          <Shield className="h-8 w-8 text-gold-400" />
          {language === "ar"
            ? "لوحة مكافحة النصب والاحتيال"
            : "Fraud Detection Dashboard"}
        </h1>
        <p className="text-slate-300 text-lg">
          {language === "ar"
            ? "نظام ذكي لكشف ومنع الأنشطة المشبوهة والحفاظ على أمان المنصة"
            : "AI-powered system to detect and prevent suspicious activities and maintain platform security"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Filter className="h-5 w-5 text-gold-400" />
            {language === "ar" ? "فلاتر البحث" : "Search Filters"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={
                  language === "ar"
                    ? "ابحث في البلاغات..."
                    : "Search reports..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 focus:border-gold-400"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-gold-400">
                <SelectValue
                  placeholder={language === "ar" ? "الحالة" : "Status"}
                />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">
                  {language === "ar" ? "جميع الحالات" : "All Statuses"}
                </SelectItem>
                <SelectItem value="pending">
                  {language === "ar" ? "معلق" : "Pending"}
                </SelectItem>
                <SelectItem value="investigating">
                  {language === "ar" ? "قيد التحقيق" : "Investigating"}
                </SelectItem>
                <SelectItem value="resolved">
                  {language === "ar" ? "محلول" : "Resolved"}
                </SelectItem>
                <SelectItem value="dismissed">
                  {language === "ar" ? "مرفوض" : "Dismissed"}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-gold-400">
                <SelectValue
                  placeholder={language === "ar" ? "مستوى الخطر" : "Risk Level"}
                />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">
                  {language === "ar" ? "جميع المستويات" : "All Levels"}
                </SelectItem>
                <SelectItem value="high">
                  {language === "ar" ? "عالي الخطورة" : "High Risk"}
                </SelectItem>
                <SelectItem value="medium">
                  {language === "ar" ? "متوسط الخطورة" : "Medium Risk"}
                </SelectItem>
                <SelectItem value="low">
                  {language === "ar" ? "منخفض الخطورة" : "Low Risk"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">
            {language === "ar" ? "تقارير النصب والاحتيال" : "Fraud Reports"}
            <Badge className="ml-3 bg-slate-700 text-slate-300">
              {filteredReports.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => {
              const actionData = getRecommendationAction(
                report.aiAnalysis.recommendation,
              );

              return (
                <div
                  key={report.id}
                  className="border border-slate-700/50 rounded-xl p-6 hover:border-gold-400/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Property Image */}
                    <img
                      src={report.propertyImage}
                      alt={report.propertyTitle}
                      className="w-24 h-16 object-cover rounded-lg border border-slate-600"
                    />

                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-white line-clamp-1">
                            {report.propertyTitle}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {language === "ar"
                              ? "معرف العقار:"
                              : "Property ID:"}{" "}
                            {report.propertyId}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getRiskColor(report.riskScore)}>
                            {report.riskScore}%{" "}
                            {language === "ar" ? "خطر" : "Risk"}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {language === "ar"
                              ? report.status === "pending"
                                ? "معلق"
                                : report.status === "investigating"
                                  ? "قيد التحقيق"
                                  : report.status === "resolved"
                                    ? "محلول"
                                    : "مرفوض"
                              : report.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">
                            {language === "ar" ? "عدد البلاغات:" : "Reports:"}
                          </span>
                          <span className="text-white ml-2">
                            {report.reportCount}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">
                            {language === "ar" ? "آخر بلاغ:" : "Last Report:"}
                          </span>
                          <span className="text-white ml-2">
                            {new Date(report.lastReported).toLocaleDateString(
                              language === "ar" ? "ar-AE" : "en-AE",
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">
                            {language === "ar"
                              ? "ثقة الذكاء الاصطناعي:"
                              : "AI Confidence:"}
                          </span>
                          <span className="text-white ml-2">
                            {report.aiAnalysis.confidence}%
                          </span>
                        </div>
                      </div>

                      {/* AI Flags */}
                      <div className="flex flex-wrap gap-2">
                        {report.aiAnalysis.flags.map((flag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-orange-400/30 text-orange-400"
                          >
                            {flag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            className={`${actionData.color} text-white`}
                          >
                            {actionData.text}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            {language === "ar"
                              ? "عرض التفاصيل"
                              : "View Details"}
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          {language === "ar" ? "حظر العقار" : "Block Property"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDashboard;
