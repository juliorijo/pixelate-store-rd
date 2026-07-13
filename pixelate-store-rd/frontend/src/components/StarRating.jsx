import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, size = 'sm', showText = true, interactive = false, onRate = null }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'lg':
        return { icon: 24, container: 'gap-2', text: 'text-lg' };
      case 'md':
        return { icon: 20, container: 'gap-1', text: 'text-base' };
      case 'sm':
      default:
        return { icon: 16, container: 'gap-0.5', text: 'text-sm' };
    }
  };

  const sizeClasses = getSizeClasses();
  const ratingRounded = Math.round(rating * 2) / 2; // Permite medias estrellas
  const fullStars = Math.floor(ratingRounded);
  const hasHalfStar = ratingRounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  // Estrellas llenas
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <button
        key={`full-${i}`}
        onClick={() => interactive && onRate && onRate(i + 1)}
        className="transition-transform hover:scale-110 focus:outline-none"
      >
        <Star
          size={sizeClasses.icon}
          className="fill-accent text-accent"
          strokeWidth={1.5}
        />
      </button>
    );
  }

  // Media estrella
  if (hasHalfStar) {
    stars.push(
      <button
        key="half"
        onClick={() => interactive && onRate && onRate(fullStars + 0.5)}
        className="transition-transform hover:scale-110 focus:outline-none relative"
      >
        <div className="relative inline-block">
          <Star
            size={sizeClasses.icon}
            className="text-tertiary-light"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star
              size={sizeClasses.icon}
              className="fill-accent text-accent"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </button>
    );
  }

  // Estrellas vacías
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <button
        key={`empty-${i}`}
        onClick={() => interactive && onRate && onRate(fullStars + (hasHalfStar ? 1 : 0) + i + 1)}
        className="transition-transform hover:scale-110 focus:outline-none"
      >
        <Star
          size={sizeClasses.icon}
          className="text-tertiary-light"
          strokeWidth={1.5}
        />
      </button>
    );
  }

  return (
    <div className={`flex items-center ${sizeClasses.container}`}>
      <div className="flex gap-0.5">
        {stars}
      </div>
      {showText && (
        <span className={`${sizeClasses.text} text-text-secondary font-medium ml-2`}>
          {rating > 0 ? rating.toFixed(1) : 'Sin calificación'}
        </span>
      )}
    </div>
  );
};

export default StarRating;
