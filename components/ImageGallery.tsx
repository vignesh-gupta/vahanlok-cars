"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useRef, useState } from "react";

interface ImageGalleryProps {
  images: string[];
  carName: string;
}

export default function ImageGallery({ images, carName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const hasMultiple = images.length > 1;

  function prev() {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  const currentImage = images[activeIndex] ?? "/cars/placeholder.jpg";

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <CldImage
          src={currentImage}
          alt={`${carName} - photo ${activeIndex + 1}`}
          fill
          className="object-cover"
          quality="auto"
          loading="lazy"
        />

        {hasMultiple && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1A1A1A] rounded-full p-2 shadow transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1A1A1A] rounded-full p-2 shadow transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex ? "bg-white w-4" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-[#D72828]"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <CldImage
                src={src}
                alt={`${carName} thumbnail ${i + 1}`}
                fill
                quality="auto"
                loading="lazy"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
