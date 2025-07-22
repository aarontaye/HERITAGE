import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Archive, 
  MapPin, 
  ShoppingBag,
  Grid,
  List,
  Trash2,
  Calendar
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface FavoritesProps {
  onBack: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onBack }) => {
  const { getFavorites, removeFromFavorites } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'archive' | 'tour' | 'product'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const favorites = getFavorites();
  
  const categories = [
    { id: 'all', label: 'All', icon: Heart, color: 'bg-gray-500' },
    { id: 'archive', label: 'Archive', icon: Archive, color: 'bg-amber-500' },
    { id: 'tour', label: 'Tours', icon: MapPin, color: 'bg-emerald-500' },
    { id: 'product', label: 'Products', icon: ShoppingBag, color: 'bg-rose-500' }
  ];

  const filteredFavorites = favorites.filter(item => 
    selectedCategory === 'all' || item.type === selectedCategory
  );

  const handleRemoveFavorite = (itemId: string, type: 'archive' | 'tour' | 'product') => {
    removeFromFavorites(itemId, type);
  };

  const FavoriteCard = ({ item }: { item: typeof favorites[0] }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${
            categories.find(cat => cat.id === item.type)?.color || 'bg-gray-500'
          }`}>
            {categories.find(cat => cat.id === item.type)?.label}
          </span>
        </div>
        <button
          onClick={() => handleRemoveFavorite(item.id, item.type)}
          className="absolute top-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>Added {new Date(item.addedAt).toLocaleDateString()}</span>
          </div>
          <Heart size={12} className="text-red-500 fill-current" />
        </div>
      </div>
    </div>
  );

  const FavoriteListItem = ({ item }: { item: typeof favorites[0] }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex space-x-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors truncate">
              {item.title}
            </h3>
            <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
              <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${
                categories.find(cat => cat.id === item.type)?.color || 'bg-gray-500'
              }`}>
                {categories.find(cat => cat.id === item.type)?.label}
              </span>
              <button
                onClick={() => handleRemoveFavorite(item.id, item.type)}
                className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-200 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar size={12} />
            <span>Added {new Date(item.addedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">My Favorites</h1>
                <p className="text-sm text-gray-600">{filteredFavorites.length} saved items</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="px-6 py-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <category.icon size={16} />
              <span className="text-sm font-medium">{category.label}</span>
              {category.id !== 'all' && (
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                  {favorites.filter(item => item.type === category.id).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-6 pb-24">
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === 'all' 
                ? 'Start exploring and save items you love!'
                : `No ${selectedCategory} items in your favorites yet.`
              }
            </p>
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredFavorites.map((item) => (
              viewMode === 'grid' ? (
                <FavoriteCard key={`${item.type}-${item.id}`} item={item} />
              ) : (
                <FavoriteListItem key={`${item.type}-${item.id}`} item={item} />
              )
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;