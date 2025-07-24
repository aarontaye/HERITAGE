import React, { useState } from 'react';
import Cart from './components/Cart';

const App: React.FC = () => {
  const [showCart, setShowCart] = useState(true);

  const handleBackFromCart = () => {
    setShowCart(false);
    // You can add navigation logic here to show other components
  };

  return (
    <div className="App">
      {showCart ? (
        <Cart onBack={handleBackFromCart} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the App</h1>
            <button 
              onClick={() => setShowCart(true)}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;