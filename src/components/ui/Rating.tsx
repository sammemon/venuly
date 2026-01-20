import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  onChange,
  readonly = false,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (value: number) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => {
          const isFilled = value <= (hoverRating || rating);
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleClick(value)}
              onMouseEnter={() => !readonly && setHoverRating(value)}
              onMouseLeave={() => !readonly && setHoverRating(0)}
              disabled={readonly}
              className={cn(
                'transition-colors',
                !readonly && 'cursor-pointer hover:scale-110',
                readonly && 'cursor-default'
              )}
            >
              <Star
                className={cn(
                  sizes[size],
                  isFilled ? 'fill-accent text-accent' : 'text-gray-300'
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
