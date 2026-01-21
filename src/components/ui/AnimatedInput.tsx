'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export interface AnimatedInputProps extends HTMLMotionProps<'input'> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ 
    className, 
    label,
    error,
    success,
    icon,
    type = 'text',
    fullWidth,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    const baseStyles = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none bg-white dark:bg-background-dark-secondary text-foreground-light dark:text-foreground-dark';
    
    const stateStyles = error 
      ? 'border-status-error focus:border-status-error focus:ring-2 focus:ring-status-error/20'
      : success
      ? 'border-status-success focus:border-status-success focus:ring-2 focus:ring-status-success/20'
      : 'border-gray-300 dark:border-gray-700 focus:border-accent-primary dark:focus:border-accent-secondary focus:ring-2 focus:ring-accent-primary/20 dark:focus:ring-accent-secondary/20';

    return (
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <motion.label 
            className="text-sm font-medium text-foreground-light dark:text-foreground-dark"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600">
              {icon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            type={inputType}
            className={cn(
              baseStyles,
              stateStyles,
              icon && 'pl-12',
              type === 'password' && 'pr-12',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            animate={{
              scale: isFocused ? 1.01 : 1,
            }}
            transition={{ duration: 0.2 }}
            {...props}
          />

          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}

          {error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-status-error" />
            </div>
          )}

          {success && !error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-status-success" />
            </div>
          )}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-status-error flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.p>
        )}

        {success && !error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-status-success flex items-center gap-1"
          >
            <CheckCircle className="w-4 h-4" />
            {success}
          </motion.p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';

export default AnimatedInput;
