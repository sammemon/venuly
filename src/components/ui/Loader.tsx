import React from 'react';
import { cn } from '@/utils/helpers';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-gray-200 border-t-accent',
          sizes[size]
        )}
      />
    </div>
  );
};

export default Loader;
