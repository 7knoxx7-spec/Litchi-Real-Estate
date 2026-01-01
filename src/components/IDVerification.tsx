import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Camera,
  Shield,
  CheckCircle,
  AlertTriangle,
  Eye,
  Scan,
  FileText,
  User,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  X,
} from "lucide-react";

interface VerificationResult {
  success: boolean;
  confidence: number;
  extractedData: {
    name: string;
    idNumber: string;
    nationality: string;
    dateOfBirth: string;
    expiryDate: string;
    idType: "emirates_id" | "passport" | "visa";
  };
  securityChecks: {
    documentAuthenticity: number;
    faceMatch: number;
    qualityScore: number;
  };
  warnings: string[];
}

interface IDVerificationProps {
  language?: "ar" | "en";
  onVerificationComplete?: (result: VerificationResult) => void;
}

const IDVerification: React.FC<IDVerificationProps> = ({
  language = "ar",
  onVerificationComplete,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processingSteps = [
    {
      nameAr: "قراءة الوثيقة",
      nameEn: "Document Reading",
      icon: Scan,
    },
    {
      nameAr: "استخراج البيانات",
      nameEn: "Data Extraction",
      icon: FileText,
    },
    {
      nameAr: "التحقق الأمني",
      nameEn: "Security Verification",
      icon: Shield,
    },
    {
      nameAr: "تحليل الصورة",
      nameEn: "Image Analysis",
      icon: Eye,
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIOCR = async (): Promise<VerificationResult> => {
    // Simulate AI processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Mock verification result
    return {
      success: true,
      confidence: 94,
      extractedData: {
        name: "أحمد محمد علي الزهراني",
        idNumber: "784-1992-1234567-8",
        nationality: "الإمارات العربية المتحدة",
        dateOfBirth: "15/08/1992",
        expiryDate: "14/08/2027",
        idType: "emirates_id",
      },
      securityChecks: {
        documentAuthenticity: 96,
        faceMatch: 92,
        qualityScore: 89,
      },
      warnings: [],
    };
  };

  const handleVerifyID = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    setVerificationResult(null);
    setProcessingStep(0);

    try {
      const result = await simulateAIOCR();
      setVerificationResult(result);
      onVerificationComplete?.(result);
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-emerald-400";
    if (confidence >= 75) return "text-gold-400";
    if (confidence >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 90) return language === "ar" ? "عالي جداً" : "Very High";
    if (confidence >= 75) return language === "ar" ? "عالي" : "High";
    if (confidence >= 60) return language === "ar" ? "متوسط" : "Medium";
    return language === "ar" ? "منخفض" : "Low";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-xl blur opacity-60"></div>
              <div className="relative bg-slate-800 p-3 rounded-xl border border-gold-400/30">
                <Shield className="h-6 w-6 text-gold-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text">
                {language === "ar"
                  ? "التحقق من الهوية"
                  : "Identity Verification"}
              </h2>
              <p className="text-slate-400 text-sm font-normal">
                {language === "ar"
                  ? "تحقق ذكي باستخدام الذكاء الاصطناعي المحلي"
                  : "Smart verification using local AI technology"}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>
                  {language === "ar"
                    ? "معالجة محلية آمنة"
                    : "Secure local processing"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gold-400" />
                <span>
                  {language === "ar"
                    ? "بدون رفع للإنترنت"
                    : "No internet upload"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span>
                  {language === "ar" ? "ذكاء اصطناعي متقدم" : "Advanced AI"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      {!uploadedImage && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-2xl blur opacity-40"></div>
                <div className="relative bg-slate-700/50 p-6 rounded-2xl border border-slate-600/50">
                  <Upload className="h-12 w-12 text-gold-400 mx-auto" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">
                  {language === "ar"
                    ? "ارفع صورة هويتك الإماراتية"
                    : "Upload your Emirates ID"}
                </h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  {language === "ar"
                    ? "تأكد من وضوح الصورة وظهور جميع البيانات بشكل واضح"
                    : "Ensure the image is clear and all data is visible"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  {language === "ar" ? "اختر من المعرض" : "Choose from Gallery"}
                </Button>
                <Button variant="outline" className="border-slate-600">
                  <Camera className="h-5 w-5 mr-2" />
                  {language === "ar" ? "التقط صورة" : "Take Photo"}
                </Button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              <div className="text-xs text-slate-500 space-y-1">
                <p>
                  {language === "ar"
                    ? "الصيغ المدعومة: JPG, PNG, HEIC"
                    : "Supported formats: JPG, PNG, HEIC"}
                </p>
                <p>
                  {language === "ar"
                    ? "الحد الأقصى للحجم: 10 ميجابايت"
                    : "Maximum size: 10MB"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview and Process */}
      {uploadedImage && !verificationResult && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardContent className="py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {language === "ar" ? "معاينة الصورة" : "Image Preview"}
                </h3>
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="ID Document"
                    className="w-full h-64 object-contain bg-slate-900/50 rounded-xl border border-slate-600"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 bg-red-500/20 hover:bg-red-500/30 text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Processing Options */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">
                  {language === "ar" ? "خيارات التحقق" : "Verification Options"}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center gap-3">
                      <Scan className="h-5 w-5 text-gold-400" />
                      <div>
                        <p className="text-white font-medium">
                          {language === "ar"
                            ? "قراءة OCR ذكية"
                            : "Smart OCR Reading"}
                        </p>
                        <p className="text-sm text-slate-400">
                          {language === "ar"
                            ? "استخراج البيانات من الهوية"
                            : "Extract data from ID"}
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">
                          {language === "ar"
                            ? "فحص الأمان المتقدم"
                            : "Advanced Security Check"}
                        </p>
                        <p className="text-sm text-slate-400">
                          {language === "ar"
                            ? "التحقق من صحة الوثيقة"
                            : "Verify document authenticity"}
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">
                          {language === "ar"
                            ? "تحليل جودة الصورة"
                            : "Image Quality Analysis"}
                        </p>
                        <p className="text-sm text-slate-400">
                          {language === "ar"
                            ? "فحص وضوح ودقة الصورة"
                            : "Check image clarity and accuracy"}
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>

                <Button
                  onClick={handleVerifyID}
                  disabled={isProcessing}
                  className="w-full btn-primary text-lg py-4"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {language === "ar" ? "جاري التحقق..." : "Verifying..."}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      {language === "ar"
                        ? "بدء التحقق الذكي"
                        : "Start Smart Verification"}
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Status */}
      {isProcessing && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardContent className="py-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-emerald-400 rounded-full blur opacity-60 animate-pulse"></div>
                <div className="relative bg-slate-800 p-4 rounded-full border border-gold-400/30">
                  {React.createElement(processingSteps[processingStep].icon, {
                    className: "h-12 w-12 text-gold-400 animate-pulse",
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">
                  {language === "ar"
                    ? processingSteps[processingStep].nameAr
                    : processingSteps[processingStep].nameEn}
                </h3>
                <p className="text-slate-400">
                  {language === "ar"
                    ? "يرجى الانتظار، الذكاء الاصطناعي يعمل..."
                    : "Please wait, AI is processing..."}
                </p>
              </div>

              <div className="space-y-2">
                <Progress
                  value={((processingStep + 1) / processingSteps.length) * 100}
                  className="w-64 mx-auto"
                />
                <p className="text-sm text-slate-500">
                  {processingStep + 1} / {processingSteps.length}{" "}
                  {language === "ar" ? "خطوات مكتملة" : "steps completed"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Results */}
      {verificationResult && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
              {language === "ar" ? "نتائج التحقق" : "Verification Results"}
              <Badge
                className={`${
                  verificationResult.success
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-400/30"
                    : "bg-red-500/20 text-red-400 border-red-400/30"
                }`}
              >
                {verificationResult.success
                  ? language === "ar"
                    ? "موثق"
                    : "Verified"
                  : language === "ar"
                    ? "فشل"
                    : "Failed"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Confidence Score */}
            <div className="text-center p-6 bg-slate-700/30 rounded-xl">
              <div
                className={`text-4xl font-black ${getConfidenceColor(verificationResult.confidence)} mb-2`}
              >
                {verificationResult.confidence}%
              </div>
              <Badge
                className={`${
                  verificationResult.confidence >= 90
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-400/30"
                    : verificationResult.confidence >= 75
                      ? "bg-gold-500/20 text-gold-400 border-gold-400/30"
                      : "bg-orange-500/20 text-orange-400 border-orange-400/30"
                }`}
              >
                {language === "ar" ? "درجة الثقة" : "Confidence Level"}:{" "}
                {getConfidenceLevel(verificationResult.confidence)}
              </Badge>
            </div>

            {/* Extracted Data */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-gold-400" />
                {language === "ar" ? "البيانات المستخرجة" : "Extracted Data"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    label: language === "ar" ? "الاسم" : "Name",
                    value: verificationResult.extractedData.name,
                    icon: User,
                  },
                  {
                    label: language === "ar" ? "رقم الهوية" : "ID Number",
                    value: verificationResult.extractedData.idNumber,
                    icon: FileText,
                  },
                  {
                    label: language === "ar" ? "الجنسية" : "Nationality",
                    value: verificationResult.extractedData.nationality,
                    icon: MapPin,
                  },
                  {
                    label:
                      language === "ar" ? "تاريخ الميلاد" : "Date of Birth",
                    value: verificationResult.extractedData.dateOfBirth,
                    icon: Calendar,
                  },
                  {
                    label: language === "ar" ? "تاريخ الانتهاء" : "Expiry Date",
                    value: verificationResult.extractedData.expiryDate,
                    icon: Clock,
                  },
                  {
                    label: language === "ar" ? "نوع الوثيقة" : "Document Type",
                    value: verificationResult.extractedData.idType,
                    icon: Shield,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="h-4 w-4 text-gold-400" />
                      <span className="text-sm text-slate-400">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Checks */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                {language === "ar" ? "فحوصات الأمان" : "Security Checks"}
              </h4>

              <div className="space-y-3">
                {[
                  {
                    label:
                      language === "ar"
                        ? "صحة الوثيقة"
                        : "Document Authenticity",
                    score:
                      verificationResult.securityChecks.documentAuthenticity,
                  },
                  {
                    label: language === "ar" ? "مطابقة الصورة" : "Face Match",
                    score: verificationResult.securityChecks.faceMatch,
                  },
                  {
                    label: language === "ar" ? "جودة الصورة" : "Image Quality",
                    score: verificationResult.securityChecks.qualityScore,
                  },
                ].map((check, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{check.label}</span>
                      <span className={getConfidenceColor(check.score)}>
                        {Math.round(check.score)}%
                      </span>
                    </div>
                    <Progress value={check.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1 btn-secondary">
                {language === "ar" ? "حفظ النتائج" : "Save Results"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setUploadedImage(null);
                  setVerificationResult(null);
                }}
                className="border-slate-600"
              >
                {language === "ar" ? "تحقق من هوية أخرى" : "Verify Another ID"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IDVerification;
