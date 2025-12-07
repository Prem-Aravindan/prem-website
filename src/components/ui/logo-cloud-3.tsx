import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

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
};

export function LogoCloud({ className, logos, title, speed = 30, reverse = false, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-full overflow-hidden py-2 lg:py-3 flex flex-col lg:flex-row items-center",
        className
      )}
    >
      {title && (
        <h3 className="text-xs lg:text-sm font-semibold text-white/90 px-4 lg:px-6 whitespace-nowrap lg:min-w-[140px] mb-2 lg:mb-0">{title}</h3>
      )}
      <div className="relative flex-1 w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
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
