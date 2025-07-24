import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { FavoriteItem } from '../types/user';

interface FavoriteButtonProps {
  item: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  type: 'archive' | 'tour' | 'product';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  item, 
  type, 
  className = '', 
  size = 'md' 
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useUser();
  const isInCart = isFavorite(item.id, type);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
    if (isInCart) {
      removeFromFavorites(item.id, type);
    } else {
      const favoriteItem: FavoriteItem = {
        id: item.id,
        type,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        addedAt: new Date().toISOString()
      };
      addToFavorites(favoriteItem);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${
        isInCart
          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-emerald-500 shadow-sm'
      } ${className}`}
      title={isInCart ? 'Remove from cart' : 'Add to cart'}
    >
      <ShoppingCart 
        size={iconSizes[size]} 
        className={isInCart ? 'fill-current' : ''} 
      />
    </button>
  );
};

export default FavoriteButton;