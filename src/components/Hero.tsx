import { GlassButton } from './ui/liquid-glass';
import { ChevronDownIcon } from './ui/icons';
import Lanyard from './Lanyard';

export default function Hero() {
  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col lg:flex-row items-center justify-center text-white px-4 sm:px-6 relative pt-16 sm:pt-20">
      {/* Lanyard Container - Desktop: Full screen overlay positioned to the right */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
        <div className="w-full h-full pointer-events-auto">
           <Lanyard position={[-3, 0, 15]} gravity={[0, -40, 0]} fov={20} />
        </div>
      </div>

      {/* Mobile/Tablet Lanyard - Full hero section overlay for drag room, camera positioned high */}
      <div className="absolute inset-0 pointer-events-none lg:hidden">
        <div className="w-full h-full pointer-events-auto">
          <Lanyard position={[0, -3, 30]} gravity={[0, -40, 0]} fov={24} />
        </div>
      </div>

      {/* Spacer for mobile/tablet lanyard - positions content below lanyard */}
      <div className="h-[48vh] xs:h-[47vh] sm:h-[46vh] md:h-[44vh] w-full lg:hidden" />

      <div className="w-full px-4 sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto flex gap-8 relative z-10 pointer-events-none">
        {/* Left side - Content (full width on mobile/tablet, 60% on desktop) */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center pointer-events-auto">
          <div className="animate-fade-in-up text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">
              Prem Aravindan Jeyakumar
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-gray-300">
              Developer & Healthcare Technology Innovator
            </p>
            <p className="text-sm md:text-base mb-6 sm:mb-8 text-gray-400 max-w-xl mx-auto lg:mx-0">
              Dedicated to advancing healthcare technology and product development through innovative engineering solutions
            </p>
            <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
              <div onClick={(e) => scrollToSection(e, '#projects')}>
                <GlassButton className="text-sm">
                  <span className="text-white">View My Work</span>
                </GlassButton>
              </div>
              <div onClick={(e) => scrollToSection(e, '#contact')}>
                <GlassButton className="text-sm">
                  <span className="text-white">Get In Touch</span>
                </GlassButton>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Spacer (40%) - only on desktop */}
        <div className="w-2/5 hidden lg:block"></div>
      </div>

      {/* Scroll indicator - visible on mobile/tablet */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce lg:hidden">
        <ChevronDownIcon className="w-5 h-5 text-white/60" />
      </div>
    </section>
  );
}
