"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ReviewTag {
  label: string;
}

interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  content: string;
  tags: ReviewTag[];
}

interface AllReviewsProps {
  className?: string;
  reviews?: Review[];
  onExportReviews?: () => void;
  onRespondToReviews?: () => void;
}

const defaultReviews: Review[] = [
  {
    id: "1",
    author: "Michael Johnson",
    avatar: "/avatars/avatar-1.jpg",
    date: "June 8, 2023",
    rating: 5.0,
    content:
      '"Absolutely excellent service! My car\'s AC wasn\'t working and AutoPro diagnosed and fixed the issue in record time. The technician was professional, explained everything clearly, and the price was exactly as quoted. Will definitely use again!"',
    tags: [
      { label: "AC Repair" },
      { label: "Professionalism" },
      { label: "Timeliness" },
    ],
  },
  {
    id: "2",
    author: "Sarah Williams",
    avatar: "/avatars/avatar-2.png",
    date: "June 5, 2023",
    rating: 4.0,
    content:
      '"Good brake service. The work was done well and my car stops much better now. The only reason for 4 stars instead of 5 is that they were running about 30 minutes behind schedule, but they communicated this ahead of time which I appreciated."',
    tags: [
      { label: "Brake Service" },
      { label: "Quality Work" },
      { label: "Communication" },
    ],
  },
  {
    id: "3",
    author: "Robert Chen",
    avatar: "/avatars/avatar-3.png",
    date: "June 1, 2023",
    rating: 5.0,
    content:
      '"Perfect wheel alignment! My car was pulling to the right and after AutoPro worked on it, it drives perfectly straight. The technician was knowledgeable and even showed me the before/after measurements. Highly recommended!"',
    tags: [
      { label: "Wheel Alignment" },
      { label: "Expertise" },
      { label: "Quality Work" },
    ],
  },
  {
    id: "4",
    author: "Thomas Parker",
    avatar: "/avatars/avatar-4.png",
    date: "May 28, 2023",
    rating: 3.0,
    content:
      '"The oil change service was fine, but I had to wait longer than expected and the technician seemed rushed. The work was done correctly, but the overall experience could have been better. Fair service for the price."',
    tags: [{ label: "Oil Change" }, { label: "Basic Service" }],
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const getStarClass = (index: number) => {
    if (index < fullStars) return "fill-[#22C55E] text-[#22C55E]";
    if (index === fullStars && hasHalfStar) return "fill-[#22C55E]/50 text-[#22C55E]";
    return "fill-transparent text-gray-500";
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(getStarClass(i))}
        />
      ))}
      <span className="ml-1 text-sm text-white">{rating.toFixed(1)}</span>
    </div>
  );
}

export function AllReviews({
  className,
  reviews = defaultReviews,
  onExportReviews,
  onRespondToReviews,
}: AllReviewsProps) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <h2 className="text-lg font-semibold text-white mb-6">All Reviews</h2>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-[#2a2d4a] pb-6 last:border-b-0 last:pb-0"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#2a2d4a]">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/avatars/default.png";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{review.author}</h3>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            {/* Review Content */}
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              {review.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {review.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded bg-[#3B82F6] px-3 py-1.5 text-xs font-medium text-white"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#2a2d4a]">
        <button
          onClick={onExportReviews}
          className="rounded bg-[#374151] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#4B5563] transition-colors"
        >
          Export Reviews
        </button>
        <button
          onClick={onRespondToReviews}
          className="rounded bg-[#3B82F6] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
        >
          Respond to Reviews
        </button>
      </div>
    </div>
  );
}
