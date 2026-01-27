import * as React from 'react';
import { cn } from '@/utils/helpers';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    icon, 
    iconPosition = 'left',
    fullWidth,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 font-medium',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'rounded-xl'
    );
    
    const variants = {
      primary: cn(
        'bg-[var(--primary)] text-white',
        'hover:bg-[var(--primary-hover)] hover:shadow-glow hover:-translate-y-0.5',
        'active:translate-y-0',
        'focus-visible:ring-[var(--primary)]',
        'shadow-soft'
      ),
      secondary: cn(
        'bg-[var(--secondary)] text-[var(--text-inverse)]',
        'hover:bg-[var(--secondary-hover)] hover:-translate-y-0.5',
        'active:translate-y-0',
        'focus-visible:ring-[var(--secondary)]'
      ),
      accent: cn(
        'bg-[var(--accent)] text-white',
        'hover:bg-[var(--accent-hover)] hover:-translate-y-0.5',
        'active:translate-y-0',
        'focus-visible:ring-[var(--accent)]'
      ),
      outline: cn(
        'border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent',
        'hover:bg-[var(--primary)] hover:text-white hover:-translate-y-0.5',
        'active:translate-y-0',
        'focus-visible:ring-[var(--primary)]'
      ),
      ghost: cn(
        'text-[var(--text)] bg-transparent',
        'hover:bg-[var(--primary-muted)] hover:text-[var(--primary)]',
        'focus-visible:ring-[var(--primary)]'
      ),
      danger: cn(
        'bg-[var(--error)] text-white',
        'hover:bg-[#B71C1C] hover:-translate-y-0.5',
        'active:translate-y-0',
        'focus-visible:ring-[var(--error)]'
      ),
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles, 
          variants[variant], 
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg 
            className="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
