import * as React from 'react';
import { cn } from '@/utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: 'default' | 'elevated' | 'featured' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-[var(--card)] border border-[var(--border)] shadow-soft',
      elevated: 'bg-[var(--card)] border border-[var(--border)] shadow-soft-md',
      featured: 'bg-[var(--card)] border-2 border-[var(--primary)] shadow-glow',
      ghost: 'bg-transparent border border-[var(--border)]',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-200',
          variants[variant],
          paddings[padding],
          hover && 'cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 hover:border-[var(--border-strong)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('mb-4', className)} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-xl font-semibold font-display text-[var(--text)]', className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-[var(--muted)] mt-1', className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('', className)} {...props} />;
  }
);

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('mt-6 pt-4 border-t border-[var(--divider)]', className)} 
        {...props} 
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

const CardImage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string }>(
  ({ className, src, alt, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('relative overflow-hidden rounded-t-2xl -mx-6 -mt-6 mb-4', className)} 
        {...props}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt || ''} 
            className="w-full h-48 object-cover"
          />
        ) : children}
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage };
