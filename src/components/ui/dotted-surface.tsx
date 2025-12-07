import { cn } from '@/lib/utils';
import React from 'react';
import Particles from './particles';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  return (
    <div 
      className={cn("fixed inset-0 w-full h-full bg-black -z-10 pointer-events-none", className)} 
      {...props}
    >
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
        className="w-full h-full"
      />
    </div>
  );
}
