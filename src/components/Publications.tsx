import { cn } from "@/lib/utils";
import { BookOpenIcon, LightBulbIcon } from "@/components/ui/icons";
import { useEffect, useState } from "react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  type?: string;
  accentColor?: "blue" | "yellow";
}

// Mobile card - no skew, no transforms, simpler styling for carousel
function MobileDisplayCard({
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  type = "Publication",
  accentColor = "blue",
}: Omit<DisplayCardProps, 'className'>) {
  const isYellow = accentColor === "yellow";
  
  return (
    <div
      className={cn(
        "relative flex h-36 w-[80vw] max-w-[320px] flex-shrink-0 select-none flex-col justify-between rounded-xl border-2 border-white/20 bg-black/70 backdrop-blur-xl px-4 py-3 transition-all duration-300",
        "hover:border-white/40 hover:bg-black/80",
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span className={cn(
          "text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shrink-0",
          isYellow ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
        )}>
          {type}
        </span>
        <p className="text-gray-500 text-xs">{date}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn(
          "relative inline-block rounded-full p-1 shrink-0",
          isYellow ? "bg-yellow-500/30" : "bg-blue-500/30"
        )}>
          {icon}
        </span>
        <p className={cn(
          "text-sm font-medium leading-tight line-clamp-2",
          isYellow ? "text-yellow-400" : "text-blue-400"
        )}>{title}</p>
      </div>
      <p className="text-xs text-white/80 line-clamp-1">{description}</p>
    </div>
  );
}

// Desktop card - with skew and stack transforms
function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  type = "Publication",
  accentColor = "blue",
}: DisplayCardProps) {
  const isYellow = accentColor === "yellow";
  
  return (
    <div
      className={cn(
        "relative flex h-40 w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-white/20 bg-black/70 backdrop-blur-xl px-5 py-4 transition-all duration-500",
        "hover:border-white/40 hover:bg-black/80",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span className={cn(
          "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shrink-0",
          isYellow ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
        )}>
          {type}
        </span>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
      <div>
        <span className={cn(
          "relative inline-block rounded-full p-1.5 shrink-0",
          isYellow ? "bg-yellow-500/30" : "bg-blue-500/30"
        )}>
          {icon}
        </span>
        <p className={cn(
          "text-base font-medium leading-tight line-clamp-2",
          isYellow ? "text-yellow-400" : "text-blue-400"
        )}>{title}</p>
      </div>
      <p className="text-sm text-white/80 line-clamp-1">{description}</p>
    </div>
  );
}

// Card data - shared between mobile and desktop
const cardsData = [
  {
    icon: <BookOpenIcon className="w-3.5 h-3.5 text-blue-300" />,
    iconDesktop: <BookOpenIcon className="w-4 h-4 text-blue-300" />,
    title: "Development of wearable device for monitoring hypertension",
    description: "National Journal of Technology - ISSN: 0973-1334",
    date: "2019",
    type: "Publication",
    accentColor: "blue" as const,
  },
  {
    icon: <BookOpenIcon className="w-3.5 h-3.5 text-blue-300" />,
    iconDesktop: <BookOpenIcon className="w-4 h-4 text-blue-300" />,
    title: "Non-invasive device for extraction of jugular venous pulse",
    description: "National Journal of Technology - ISSN: 0973-1334",
    date: "2019",
    type: "Publication",
    accentColor: "blue" as const,
  },
  {
    icon: <LightBulbIcon className="w-3.5 h-3.5 text-yellow-300" />,
    iconDesktop: <LightBulbIcon className="w-4 h-4 text-yellow-300" />,
    title: "Immersive VR based high fidelity digital rectal examination setup with haptic feedback",
    description: "Indian Patent Rights (IPR)",
    date: "2020",
    type: "Patent",
    accentColor: "yellow" as const,
  },
];

// Desktop stack classNames
const desktopClassNames = [
  "[grid-area:stack] -translate-x-16 -translate-y-12 hover:-translate-y-[calc(12*0.25rem+10rem-3rem)] before:absolute before:w-full before:rounded-xl before:h-full before:content-[''] before:bg-black/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0 before:z-10",
  "[grid-area:stack] hover:-translate-y-[calc(10rem-3rem)] before:absolute before:w-full before:rounded-xl before:h-full before:content-[''] before:bg-black/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0 before:z-10",
  "[grid-area:stack] translate-x-16 translate-y-12 hover:-translate-y-[calc(10rem-3rem-3rem)]",
];

export default function Publications() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll carousel on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cardsData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="publications" className="py-12 md:py-16 px-4">
      <div className="w-full px-2 sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Publications & Patents
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto px-2">
            Research contributions and intellectual property in healthcare technology.
          </p>
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cardsData.map((card, index) => (
                <div key={index} className="w-full flex-shrink-0 flex justify-center px-2">
                  <MobileDisplayCard
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    date={card.date}
                    type={card.type}
                    accentColor={card.accentColor}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {cardsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index ? "bg-white w-6" : "bg-white/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Desktop Stack */}
        <div className="hidden lg:flex min-h-[350px] w-full items-center justify-center">
          <div className="grid [grid-template-areas:'stack'] place-items-center">
            {cardsData.map((card, index) => (
              <DisplayCard 
                key={index} 
                icon={card.iconDesktop}
                title={card.title}
                description={card.description}
                date={card.date}
                type={card.type}
                accentColor={card.accentColor}
                className={desktopClassNames[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
