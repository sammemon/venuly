import React from 'react';
import { getInitials } from '@/utils/helpers';
import { cn } from '@/utils/helpers';

interface AvatarProps {
  src?: string;
  alt?: string;
  firstName?: string;
  lastName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  firstName,
  lastName,
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const initials = firstName && lastName ? getInitials(firstName, lastName) : '??';

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-medium overflow-hidden',
        sizes[size],
        !src && 'bg-gradient-to-br from-accent to-primary-dark text-white',
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
