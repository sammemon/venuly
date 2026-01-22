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

    const baseStyles = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none bg-white text-dark';
    
    const stateStyles = error 
      ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
      : success
      ? 'border-green-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
      : 'border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20';

    return (
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <motion.label 
            className="text-sm font-medium text-dark"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
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
              <AlertCircle className="w-5 h-5 text-danger" />
            </div>
          )}

          {success && !error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          )}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-danger flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.p>
        )}

        {success && !error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-green-600 flex items-center gap-1"
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
