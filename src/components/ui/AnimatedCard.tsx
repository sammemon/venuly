'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';

export interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass' | 'featured';
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
    const baseStyles = 'rounded-2xl transition-all duration-200 relative overflow-hidden';
    
    const variants = {
      default: 'bg-[var(--card)] border border-[var(--border)] shadow-soft',
      bordered: 'bg-[var(--card)] border-2 border-[var(--primary)]',
      elevated: 'bg-[var(--card)] border border-[var(--border)] shadow-soft-md',
      glass: cn(
        'bg-[var(--card)]/90 backdrop-blur-xl',
        'border border-[var(--border)]'
      ),
      featured: cn(
        'bg-[var(--card)] border-2 border-[var(--primary)]',
        'shadow-glow'
      ),
    };
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverStyles = hoverable 
      ? 'hover:shadow-soft-lg hover:-translate-y-1 hover:border-[var(--border-strong)] cursor-pointer' 
      : '';

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
