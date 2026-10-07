import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviews?: number;
}

export default function StarRating({
  rating,
  size = 12,
  showValue = true,
  reviews,
}: StarRatingProps) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < full
                ? "fill-brand-600 text-brand-600"
                : "fill-sand/50 text-sand/50"
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-ink">
          {rating.toFixed(1)}
          {reviews !== undefined && (
            <span className="font-normal text-muted"> ({reviews})</span>
          )}
        </span>
      )}
    </div>
  );
}
