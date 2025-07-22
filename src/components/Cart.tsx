import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2,
  Plus,
  Minus,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface CartProps {
  onBack: () => void;
}

interface CartItem {
  id: string;
  type: 'archive' | 'tour' | 'product';
  title: string;
  description: string;
  imageUrl: string;
  addedAt: string;
  quantity: number;
  price?: string;
}

const Cart: React.FC<CartProps> = ({ onBack }) => {
  const { getCartItems, removeFromFavorites } = useUser();
  const cartItems = getCartItems();
  
  // Convert cart items to include quantity
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>(
    cartItems.reduce((acc, item) => ({ ...acc, [`${item.type}-${item.id}`]: 1 }), {})
  );

  const updateQuantity = (itemKey: string, change: number) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemKey]: Math.max(1, (prev[itemKey] || 1) + change)
    }));
  };

  const handleRemoveItem = (itemId: string, type: 'archive' | 'tour' | 'product') => {
    removeFromFavorites(itemId, type);
    const itemKey = `${type}-${itemId}`;
    setItemQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[itemKey];
      return newQuantities;
    });
  };

  const CartItemCard = ({ item }: { item: typeof cartItems[0] }) => {
    const itemKey = `${item.type}-${item.id}`;
    const quantity = itemQuantities[itemKey] || 1;

    return (
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex space-x-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-gray-800 truncate">
                {item.title}
              </h3>
              <button
                onClick={() => handleRemoveItem(item.id, item.type)}
                className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-200 transition-colors ml-2 flex-shrink-0"
              >
                <Trash2 size={12} />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar size={12} />
                <span>Added {new Date(item.addedAt).toLocaleDateString()}</span>
              </div>
              {item.type === 'product' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(itemKey, -1)}
                    className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(itemKey, 1)}
                    className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case 'archive': return 'Archive Items';
      case 'tour': return 'Tour Sites';
      case 'product': return 'Products';
      default: return 'Items';
    }
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

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
                <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
                <p className="text-sm text-gray-600">{cartItems.length} items</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <ShoppingCart size={20} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 pb-24">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">
              Start exploring and add items you love to your cart!
            </p>
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([type, items]) => (
              <div key={type}>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {getCategoryLabel(type)} ({items.length})
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <CartItemCard key={`${item.type}-${item.id}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
            
            {/* Cart Actions */}
            <div className="bg-white rounded-2xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ready to proceed?</h3>
              <div className="space-y-3">
                <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle size={16} />
                  <span>Contact for Inquiry</span>
                </button>
                <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;