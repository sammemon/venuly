'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';

export interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  delay?: number;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    hoverable = true,
    delay = 0,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-300 relative overflow-hidden';
    
    const variants = {
      default: 'bg-white border border-gray-200',
      bordered: 'bg-white border-2 border-accent',
      elevated: 'bg-white shadow-soft-lg',
      glass: 'bg-white/90 backdrop-blur-lg border border-gray-200',
    };
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverStyles = hoverable ? 'hover:shadow-elegant hover:-translate-y-1 cursor-pointer' : '';

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles, 
          variants[variant], 
          paddings[padding],
          hoverStyles,
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        whileHover={hoverable ? { scale: 1.01 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;
