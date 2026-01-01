import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReviews, createReview } from "@/lib/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";
import { toast } from "sonner";

interface ReviewsProps {
  propertyId: string;
  language?: "ar" | "en";
}

const Reviews = ({ propertyId, language = "ar" }: ReviewsProps) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", propertyId],
    queryFn: () => getReviews(propertyId),
  });

  const mutation = useMutation({
    mutationFn: (data: { rating: number; comment: string }) =>
      createReview(propertyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", propertyId] });
      setComment("");
      setRating(5);
      toast.success(language === "ar" ? "تم إضافة التقييم بنجاح" : "Review added successfully");
    },
    onError: () => {
      toast.error(language === "ar" ? "حدث خطأ أثناء إضافة التقييم" : "Error adding review");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    mutation.mutate({ rating, comment });
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-2xl font-semibold">
        {language === "ar" ? "التقييمات والمراجعات" : "Ratings & Reviews"}
      </h3>

      {/* Add Review Form */}
      {token ? (
        <form onSubmit={handleSubmit} className="bg-card p-4 rounded-lg shadow-sm border space-y-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`transition-colors ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <Star className="h-6 w-6 fill-current" />
              </button>
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={language === "ar" ? "اكتب تعليقك هنا..." : "Write your review here..."}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending
              ? (language === "ar" ? "جاري النشر..." : "Posting...")
              : (language === "ar" ? "نشر التقييم" : "Post Review")}
          </Button>
        </form>
      ) : (
        <div className="bg-muted p-4 rounded-lg text-center">
          <p className="text-muted-foreground">
            {language === "ar"
              ? "يجب تسجيل الدخول لكتابة مراجعة"
              : "You must be logged in to write a review"}
          </p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : reviews?.length === 0 ? (
          <p className="text-muted-foreground">
            {language === "ar" ? "لا توجد تقييمات بعد" : "No reviews yet"}
          </p>
        ) : (
          reviews?.map((review: any) => (
            <div key={review.id} className="bg-card p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{review.user.name}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-foreground/90">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
