import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2,
  Plus,
  Minus,
  Calendar,
  MessageCircle,
  Package,
  CreditCard,
  Bookmark
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface CartProps {
  onBack: () => void;
}

const Cart: React.FC<CartProps> = ({ onBack }) => {
  const { getCartItems, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useUser();
  const cartItems = getCartItems();
  const [showCheckout, setShowCheckout] = useState(false);
  const [savedForLater, setSavedForLater] = useState<string[]>([]);

  const updateQuantity = (itemId: string, type: 'archive' | 'tour' | 'product', change: number) => {
    const item = cartItems.find(i => i.id === itemId && i.type === type);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateCartQuantity(itemId, type, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string, type: 'archive' | 'tour' | 'product') => {
    removeFromCart(itemId, type);
  };

  const handleSaveForLater = (itemId: string, type: 'archive' | 'tour' | 'product') => {
    const itemKey = `${type}-${itemId}`;
    setSavedForLater(prev => [...prev, itemKey]);
    removeFromCart(itemId, type);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} ETB`;
  };

  const getItemTotal = (item: typeof cartItems[0]) => {
    return item.price * item.quantity;
  };

  const CartItemCard = ({ item }: { item: typeof cartItems[0] }) => {
    const itemTotal = getItemTotal(item);

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
            {item.price && (
              <div className="mb-2">
                <span className="text-emerald-600 font-semibold">
                  {formatPrice(item.price)}
                </span>
                {item.priceRange && (
                  <span className="text-gray-500 text-xs ml-2">({item.priceRange})</span>
                )}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar size={12} />
                <span>Added {new Date(item.addedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.type, -1)}
                  className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.type, 1)}
                  className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
            {item.price && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-800">{formatPrice(itemTotal)}</span>
                </div>
              </div>
            )}
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => handleSaveForLater(item.id, item.type)}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <Bookmark size={10} />
                <span>Save for later</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CheckoutSummary = () => {
    const total = getCartTotal();
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <div className="bg-white rounded-2xl p-6 sticky top-24">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Items ({itemCount})</span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-emerald-600">Free</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-bold text-lg text-emerald-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <button 
            onClick={() => setShowCheckout(true)}
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
          >
            <CreditCard size={16} />
            <span>Proceed to Checkout</span>
          </button>
          <button 
            onClick={() => {
              setSavedForLater(prev => [...prev, ...cartItems.map(item => `${item.type}-${item.id}`)]);
              clearCart();
            }}
            className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Bookmark size={16} />
            <span>Save All for Later</span>
          </button>
        </div>
      </div>
    );
  };

  const CheckoutModal = () => {
    if (!showCheckout) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Contact Artisans</h3>
            <p className="text-gray-600 text-sm">
              We'll connect you with the artisans to discuss your order details, 
              customization options, and arrange payment and delivery.
            </p>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle size={16} />
              <span>Contact via WhatsApp</span>
            </button>
            <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle size={16} />
              <span>Send Email Inquiry</span>
            </button>
            <button 
              onClick={() => setShowCheckout(false)}
              className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
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

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
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
                <p className="text-sm text-gray-600">{totalItems} items</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <ShoppingCart size={20} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 pb-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(groupedItems).map(([type, items]) => (
                <div key={type}>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {getCategoryLabel(type)} ({items.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <CartItemCard key={`${item.type}-${item.id}`} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <CheckoutSummary />
            </div>
          </div>
        )}
      </main>
    </div>
      <CheckoutModal />
    </>
  );
};

export default Cart;