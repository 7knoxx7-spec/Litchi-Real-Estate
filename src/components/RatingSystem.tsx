import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Send,
  Shield,
  CheckCircle,
  AlertTriangle,
  ThumbsUp,
  MessageCircle,
  Calendar,
  User,
} from "lucide-react";

interface Rating {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  score: number;
  comment: string;
  timestamp: string;
  verified: boolean;
  helpful: number;
}

interface RatingSystemProps {
  propertyId: string;
  ratings: Rating[];
  averageRating: number;
  totalRatings: number;
  language?: "ar" | "en";
  onSubmitRating?: (rating: { score: number; comment: string }) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({
  propertyId,
  ratings,
  averageRating,
  totalRatings,
  language = "ar",
  onSubmitRating,
}) => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (userRating === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmitRating?.({ score: userRating, comment });
      setUserRating(0);
      setComment("");
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === "ar"
      ? date.toLocaleDateString("ar-AE")
      : date.toLocaleDateString("en-AE");
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-emerald-400";
    if (rating >= 3.5) return "text-gold-400";
    if (rating >= 2.5) return "text-orange-400";
    return "text-red-400";
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = ratings.filter((r) => Math.floor(r.score) === star).length;
    const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Star className="h-6 w-6 text-gold-400 fill-current" />
            {language === "ar" ? "التقييمات والمراجعات" : "Ratings & Reviews"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Rating */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div
                className={`text-5xl font-black ${getRatingColor(averageRating)}`}
              >
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating
                        ? "text-gold-400 fill-current"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-400 mt-1">
                {totalRatings} {language === "ar" ? "تقييم" : "reviews"}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 max-w-md ml-8">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-slate-300 w-8">{star}★</span>
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-gold-400 to-gold-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Rating Form */}
      <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">
            {language === "ar" ? "أضف تقييمك" : "Add Your Rating"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Star Rating Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              {language === "ar" ? "تقييمك" : "Your Rating"}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setUserRating(star)}
                  className="transition-transform duration-200 hover:scale-125"
                >
                  <Star
                    className={`h-8 w-8 transition-colors duration-200 ${
                      star <= (hoveredStar || userRating)
                        ? "text-gold-400 fill-current"
                        : "text-slate-600 hover:text-slate-500"
                    }`}
                  />
                </button>
              ))}
              {userRating > 0 && (
                <span className="ml-3 text-slate-300">
                  {userRating === 5 &&
                    (language === "ar" ? "ممتاز" : "Excellent")}
                  {userRating === 4 &&
                    (language === "ar" ? "جيد جداً" : "Very Good")}
                  {userRating === 3 && (language === "ar" ? "جيد" : "Good")}
                  {userRating === 2 && (language === "ar" ? "مقبول" : "Fair")}
                  {userRating === 1 && (language === "ar" ? "ضعيف" : "Poor")}
                </span>
              )}
            </div>
          </div>

          {/* Comment Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">
              {language === "ar"
                ? "تعليقك (اختياري)"
                : "Your Comment (Optional)"}
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                language === "ar"
                  ? "شاركنا تجربتك مع هذا العقار..."
                  : "Share your experience with this property..."
              }
              className="bg-slate-700/50 border-slate-600 focus:border-gold-400 text-white placeholder:text-slate-500"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmitRating}
            disabled={userRating === 0 || isSubmitting}
            className="w-full btn-primary"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {language === "ar" ? "جاري الإرسال..." : "Submitting..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {language === "ar" ? "إرسال التقييم" : "Submit Rating"}
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-gold-400" />
          {language === "ar" ? "آراء المستأجرين" : "Tenant Reviews"}
        </h3>

        {ratings.length === 0 ? (
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg">
            <CardContent className="py-12 text-center">
              <Star className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">
                {language === "ar"
                  ? "لا توجد تقييمات بعد. كن أول من يقيم هذا العقار!"
                  : "No reviews yet. Be the first to review this property!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <Card
                key={rating.id}
                className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <img
                      src={rating.userAvatar}
                      alt={rating.userName}
                      className="w-12 h-12 rounded-full border-2 border-gold-400/30"
                    />

                    <div className="flex-1 space-y-3">
                      {/* User Info & Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-white">
                            {rating.userName}
                          </h4>
                          {rating.verified && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                              <Shield className="h-3 w-3 mr-1" />
                              {language === "ar" ? "موثق" : "Verified"}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= rating.score
                                    ? "text-gold-400 fill-current"
                                    : "text-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(rating.timestamp)}
                          </span>
                        </div>
                      </div>

                      {/* Comment */}
                      {rating.comment && (
                        <p className="text-slate-300 leading-relaxed">
                          {rating.comment}
                        </p>
                      )}

                      {/* Helpful Actions */}
                      <div className="flex items-center gap-4 pt-2">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">
                            {language === "ar" ? "مفيد" : "Helpful"} (
                            {rating.helpful})
                          </span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-400 hover:text-gold-400 transition-colors duration-200">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">
                            {language === "ar" ? "رد" : "Reply"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingSystem;
