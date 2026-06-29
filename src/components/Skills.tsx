import { useState } from 'react';
import {
  programmingLogos,
  toolsLogos,
  webDevLogos,
  xrLogos,
} from '@/data/skillLogos';
import { GlassCard } from './ui/liquid-glass';
import { LogoCloud } from './ui/logo-cloud-3';
export default function Skills() {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleInteraction = () => {
    setShowTooltip(false);
  };

  return (
    <section id="skills" className="py-12 sm:py-16 px-4">
      <div className="w-full px-2 sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">
          Skills & Technologies
        </h2>
        
        <GlassCard className="p-1 rounded-full overflow-visible">
          <LogoCloud 
            logos={programmingLogos} 
            title="Programming" 
            speed={1.2} 
            reverse={false} 
            showTooltip={showTooltip}
            onInteraction={handleInteraction}
          />
        </GlassCard>

        <GlassCard className="p-1 rounded-full overflow-visible">
          <LogoCloud 
            logos={webDevLogos} 
            title="Web Development" 
            speed={1.2} 
            reverse={true}
            onInteraction={handleInteraction}
          />
        </GlassCard>

        <GlassCard className="p-1 rounded-full overflow-visible">
          <LogoCloud 
            logos={xrLogos} 
            title="XR & Prototyping" 
            speed={1.2} 
            reverse={false}
            onInteraction={handleInteraction}
          />
        </GlassCard>

        <GlassCard className="p-1 rounded-full overflow-visible">
          <LogoCloud 
            logos={toolsLogos} 
            title="Tools & Cloud" 
            speed={1.2} 
            reverse={true}
            onInteraction={handleInteraction}
          />
        </GlassCard>
      </div>
    </section>
  );
}

