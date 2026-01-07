"use client";

import Image from "next/image";

interface MediaItem {
  id: number;
  title: string;
  image: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  title?: string;
  onView?: (item: MediaItem) => void;
  onApprove?: (item: MediaItem) => void;
}

export function MediaGallery({ items, title = "Uploaded Media", onView, onApprove }: MediaGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
        <h3 className="mb-6 text-lg font-semibold text-white">{title}</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-[#2a2d4a] bg-[#252850] transition-colors hover:border-cyan-400/50"
            >
              <div className="relative h-40 w-full bg-[#2a2d4a]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="h-40 w-full object-cover"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%232a2d4a'/%3E%3Ctext x='150' y='90' font-family='Arial, sans-serif' font-size='14' fill='%236b7280' text-anchor='middle' dy='0.3em'%3E${encodeURIComponent(item.title)}%3C/text%3E%3Ctext x='150' y='110' font-family='Arial, sans-serif' font-size='12' fill='%234b5563' text-anchor='middle' dy='0.3em'%3EImage Loading...%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => onView?.(item)}
                  className="rounded-lg bg-cyan-500/20 p-3 text-cyan-400 transition-colors hover:bg-cyan-500/40"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => onApprove?.(item)}
                  className="rounded-lg bg-green-500/20 p-3 text-green-400 transition-colors hover:bg-green-500/40"
                >
                  Approve
                </button>
              </div>
              <div className="border-t border-[#2a2d4a] p-4">
                <p className="text-sm font-medium text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  { id: 1, title: "Front View", image: "/provax-images/Markeetplace/card-cars/frontcar.png" },
  { id: 2, title: "Rear View", image: "/provax-images/Markeetplace/card-cars/fullcar.png" },
  { id: 3, title: "Slide View", image: "/provax-images/Markeetplace/card-cars/darkcar.png" },
  { id: 4, title: "Engine Bay", image: "/provax-images/Markeetplace/card-cars/car.png" },
  { id: 5, title: "Interior View", image: "/provax-images/Markeetplace/card-cars/first.png" },
  { id: 6, title: "Test Drive Video", image: "/provax-images/Markeetplace/card-cars/treecar.png" }
];
