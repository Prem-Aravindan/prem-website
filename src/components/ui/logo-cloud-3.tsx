import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  title?: string;
  speed?: number;
  reverse?: boolean;
  showTooltip?: boolean;
  onInteraction?: () => void;
};

export function LogoCloud({ className, logos, title, speed = 30, reverse = false, showTooltip = false, onInteraction, ...props }: LogoCloudProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect scroll and collapse
  useEffect(() => {
    if (!isExpanded) return;

    const handleWheel = () => {
      setIsExpanded(false);
    };

    const handleTouch = () => {
      setIsExpanded(false);
    };

    window.addEventListener("wheel", handleWheel, true);
    window.addEventListener("touchmove", handleTouch, true);

    return () => {
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchmove", handleTouch, true);
    };
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
    onInteraction?.();
  };

  if (isExpanded) {
    return (
      <div
        {...props}
        className={cn(
          "w-full p-4 lg:p-6 flex flex-col gap-4 rounded-lg bg-white/5 border border-white/10",
          className
        )}
        ref={containerRef}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xs lg:text-sm font-semibold text-white/90">{title}</h3>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            aria-label="Collapse skills list"
          >
            <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {logos.map((logo) => (
            <div
              key={`logo-${logo.alt}`}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <img
                alt={logo.alt}
                className="pointer-events-none h-6 w-6 lg:h-8 lg:w-8 select-none object-contain"
                height={logo.height || 24}
                loading="lazy"
                src={logo.src}
                width={logo.width || 24}
              />
              <span className="text-[10px] lg:text-xs text-white/80 font-medium text-center line-clamp-2">
                {logo.alt}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      {...props}
      className={cn(
        "w-full overflow-visible py-2 lg:py-3 flex flex-col lg:flex-row items-center gap-2 lg:gap-4",
        className
      )}
      ref={containerRef}
    >
      <div className="flex items-center gap-2 px-4 lg:px-6 flex-shrink-0">
        <h3 className="text-xs lg:text-sm font-semibold text-white/90 whitespace-nowrap">{title}</h3>
        <div className="relative z-[1001]">
          <button
            onClick={handleExpand}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            aria-label="Expand skills list"
          >
            <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          {/* Tooltip - shown only on first pill until any interaction */}
          {showTooltip && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 border border-white/20 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
              Click to view list
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-[1px] w-2 h-2 bg-black/90 border-t border-l border-white/20 rotate-45"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <InfiniteSlider gap={16} reverse={reverse} speed={speed} speedOnHover={50} className="lg:[--gap:32px]">
          {logos.map((logo) => (
            <div key={`logo-${logo.alt}`} className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <img
                alt={logo.alt}
                className="pointer-events-none h-4 w-4 lg:h-6 lg:w-6 select-none object-contain"
                height={logo.height || 24}
                loading="lazy"
                src={logo.src}
                width={logo.width || 24}
              />
              <span className="text-xs lg:text-sm text-white/80 font-medium whitespace-nowrap">{logo.alt}</span>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}
