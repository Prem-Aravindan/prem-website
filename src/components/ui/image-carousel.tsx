import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  interval?: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

// Lightbox Modal Component
function Lightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  images: string[]; 
  currentIndex: number; 
  onClose: () => void; 
  onPrev: () => void; 
  onNext: () => void;
}) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black hover:bg-black/80 transition-colors"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black hover:bg-black/80 transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black hover:bg-black/80 transition-colors"
          aria-label="Next image"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm z-20">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export function ImageCarousel({ 
  images, 
  alt, 
  className,
  interval = 3000,
  isExpanded = false,
  onToggleExpand
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1 || isPaused || isLightboxOpen || isExpanded) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isPaused, isLightboxOpen, isExpanded, goToNext]);

  if (images.length === 0) return null;

  return (
    <>
      <div 
        className={cn("relative w-full h-full overflow-hidden group bg-black/50", className)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Images container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${alt} - ${index + 1}`}
              className={cn(
                "absolute max-w-full max-h-full object-contain transition-opacity duration-700 cursor-pointer",
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              onClick={() => onToggleExpand ? onToggleExpand() : setIsLightboxOpen(true)}
            />
          ))}
        </div>

        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100",
              isExpanded ? "bg-black hover:bg-black/80" : "bg-black/50 hover:bg-black/70"
            )}
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100",
              isExpanded ? "bg-black hover:bg-black/80" : "bg-black/50 hover:bg-black/70"
            )}
            aria-label="Next image"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Expand/Close button */}
        <button
          onClick={() => onToggleExpand ? onToggleExpand() : setIsLightboxOpen(true)}
          className={cn(
            "absolute top-2 right-2 z-10 p-2 rounded-full transition-all",
            isExpanded 
              ? "bg-black hover:bg-black/80 opacity-100" 
              : "bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100"
          )}
          aria-label={isExpanded ? "Close view" : "Expand image"}
        >
          {isExpanded ? (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>
        
        {/* Carousel indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-white w-4" 
                    : "bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && !isExpanded && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </>
  );
}
