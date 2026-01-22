import * as React from 'react';
import { cn } from '@/utils/helpers';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-accent-primary dark:bg-accent-primary text-white hover:bg-accent-primary-dark dark:hover:bg-accent-primary-light focus:ring-accent-primary shadow-md hover:shadow-elegant',
      secondary: 'bg-accent-secondary dark:bg-accent-secondary text-white hover:bg-accent-primary dark:hover:bg-accent-primary focus:ring-accent-secondary shadow-md hover:shadow-elegant',
      outline: 'border-2 border-accent-primary dark:border-accent-secondary text-accent-primary dark:text-accent-secondary hover:bg-accent-primary dark:hover:bg-accent-secondary hover:text-white focus:ring-accent-primary',
      ghost: 'text-foreground-light dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-300',
      danger: 'bg-status-error text-white hover:bg-red-700 focus:ring-status-error shadow-md',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
