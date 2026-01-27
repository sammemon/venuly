'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { Loader2 } from 'lucide-react';

export interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  glow?: boolean;
  children?: React.ReactNode;
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
    const baseStyles = cn(
      'inline-flex items-center justify-center font-semibold rounded-xl',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'relative overflow-hidden group'
    );
    
    const variants = {
      primary: cn(
        'bg-[var(--primary)] text-white',
        'hover:bg-[var(--primary-hover)] focus-visible:ring-[var(--primary)]',
        'shadow-soft'
      ),
      secondary: cn(
        'bg-[var(--secondary)] text-[var(--text-inverse)]',
        'hover:bg-[var(--secondary-hover)] focus-visible:ring-[var(--secondary)]'
      ),
      accent: cn(
        'bg-[var(--accent)] text-white',
        'hover:bg-[var(--accent-hover)] focus-visible:ring-[var(--accent)]'
      ),
      outline: cn(
        'border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent',
        'hover:bg-[var(--primary)] hover:text-white focus-visible:ring-[var(--primary)]'
      ),
      ghost: cn(
        'text-[var(--text)] bg-transparent',
        'hover:bg-[var(--primary-muted)] hover:text-[var(--primary)]',
        'focus-visible:ring-[var(--primary)]'
      ),
      danger: cn(
        'bg-[var(--error)] text-white',
        'hover:brightness-110 focus-visible:ring-[var(--error)]'
      ),
      success: cn(
        'bg-[var(--success)] text-white',
        'hover:brightness-110 focus-visible:ring-[var(--success)]'
      ),
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
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -2 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
        
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="relative z-10 shrink-0">{icon}</span>
            )}
            <span className="relative z-10">{children}</span>
            {icon && iconPosition === 'right' && (
              <span className="relative z-10 shrink-0">{icon}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
