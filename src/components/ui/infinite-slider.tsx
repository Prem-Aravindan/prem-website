'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
  speed?: number; // Added to match usage in LogoCloud
  speedOnHover?: number; // Added to match usage in LogoCloud
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
  speed,
  speedOnHover,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  // Handle speed prop if provided (convert speed to duration roughly)
  // This is a rough approximation since the original code used duration
  // If speed is provided, we might want to use it to calculate duration based on content size
  // But for now, let's stick to the original implementation or adapt if needed.
  // The user provided code for LogoCloud uses `speed={80}` and `speedOnHover={25}`.
  // The InfiniteSlider implementation provided uses `duration`.
  // Let's assume the user wants us to use the provided InfiniteSlider implementation
  // but the LogoCloud usage implies it accepts speed.
  // I will map speed to duration for now, or just use duration if passed.
  
  // Actually, looking at the LogoCloud code: <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
  // And the InfiniteSlider code provided: duration = 25.
  // I should probably update InfiniteSlider to accept speed or map it.
  // Let's just use the provided InfiniteSlider code exactly as requested, 
  // but I noticed the LogoCloud usage passes `speed` and `speedOnHover` which are NOT in the InfiniteSlider props.
  // I will modify InfiniteSlider to accept speed/speedOnHover and use them if duration is not explicitly set, 
  // or just alias them.
  
  useEffect(() => {
    if (speed) {
        // Speed is a multiplier - higher speed = faster animation
        // We use 50 as a base so speed=1 gives 50ms per unit, speed=2 gives 100ms per unit, etc.
        // This makes it much slower and more controllable
        setCurrentDuration(speed * 50);
    }
  }, [speed]);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = (durationOnHover || speedOnHover)
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover || speedOnHover || duration);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration || speed || 25);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
