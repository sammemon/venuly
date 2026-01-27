import * as React from 'react';
import { cn } from '@/utils/helpers';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, iconRight, type, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--text)] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'w-full px-4 py-3 rounded-xl border transition-all duration-200',
              'bg-[var(--card)] text-[var(--text)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--primary-muted)] focus:border-[var(--primary)]',
              'placeholder:text-[var(--muted)]',
              error 
                ? 'border-[var(--error)] focus:ring-[var(--error-light)]' 
                : 'border-[var(--border)] hover:border-[var(--border-strong)]',
              icon && 'pl-11',
              iconRight && 'pr-11',
              className
            )}
            ref={ref}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
              {iconRight}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-[var(--error)]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[var(--muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
