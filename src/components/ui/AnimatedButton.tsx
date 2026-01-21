'use client';

import * as React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { Loader2 } from 'lucide-react';

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  glow?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    icon, 
    iconPosition = 'left',
    children, 
    disabled,
    fullWidth,
    glow,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
    
    const variants = {
      primary: 'bg-accent-primary dark:bg-accent-primary text-white hover:bg-accent-primary-dark dark:hover:bg-accent-primary-light focus:ring-accent-primary shadow-md hover:shadow-elegant dark:shadow-dark-soft',
      secondary: 'bg-accent-secondary dark:bg-accent-secondary text-white hover:bg-accent-primary dark:hover:bg-accent-primary focus:ring-accent-secondary shadow-md hover:shadow-elegant',
      outline: 'border-2 border-accent-primary dark:border-accent-secondary text-accent-primary dark:text-accent-secondary hover:bg-accent-primary dark:hover:bg-accent-secondary hover:text-white focus:ring-accent-primary',
      ghost: 'text-foreground-light dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-300 dark:focus:ring-gray-700',
      danger: 'bg-status-error text-white hover:bg-red-700 focus:ring-status-error shadow-md',
      success: 'bg-status-success text-white hover:bg-green-700 focus:ring-status-success shadow-md',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-3',
      xl: 'px-10 py-5 text-xl gap-3',
    };

    const glowStyles = glow ? 'shadow-glow hover:shadow-glow-lg' : '';

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles, 
          variants[variant], 
          sizes[size], 
          glowStyles,
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="relative z-10">{icon}</span>
            )}
            <span className="relative z-10">{children}</span>
            {icon && iconPosition === 'right' && (
              <span className="relative z-10">{icon}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
