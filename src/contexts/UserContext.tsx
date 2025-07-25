import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, QuizResult, FavoriteItem, CartItem } from '../types/user';

interface UserContextType {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (itemId: string, type: 'archive' | 'tour' | 'product') => void;
  isFavorite: (itemId: string, type: 'archive' | 'tour' | 'product') => boolean;
  addQuizResult: (result: QuizResult) => void;
  getCartItems: () => CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, type: 'archive' | 'tour' | 'product') => void;
  updateCartQuantity: (itemId: string, type: 'archive' | 'tour' | 'product', quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const defaultUser: User = {
  id: '1',
  name: 'Desta Tadesse',
  email: 'desta@example.com',
  interests: ['history', 'culture', 'language'],
  preferredLanguage: 'english',
  joinDate: '2024-01-15',
  quizHistory: [
    {
      id: '1',
      quizName: 'Ethiopian Culture Quiz',
      score: 4,
      totalQuestions: 5,
      completedAt: '2024-12-15T10:30:00Z',
      timeSpent: 180
    },
    {
      id: '2',
      quizName: 'History Quiz',
      score: 3,
      totalQuestions: 5,
      completedAt: '2024-12-10T14:20:00Z',
      timeSpent: 240
    }
  ],
  favorites: {
    archiveItems: ['1', '3'],
    tourSites: ['lalibela'],
    products: ['1', '2']
  },
  cart: []
};

// Mock favorite items data
const mockFavoriteItems: FavoriteItem[] = [
  {
    id: '1',
    type: 'archive',
    title: 'Book of Enoch',
    description: 'Ancient Ethiopian manuscript containing apocryphal texts',
    imageUrl: 'https://mefthe.com/wp-content/uploads/2015/12/51EODEjrl7L-325x500.jpg',
    addedAt: '2024-12-10T10:00:00Z'
  },
  {
    id: '3',
    type: 'archive',
    title: 'Lalibela Cross',
    description: 'Ornate processional cross from the medieval period',
    imageUrl: 'https://media.istockphoto.com/id/1305435687/photo/lalibela-ethiopia-famous-rock-hewn-church-of-saint-george-bete-giyorgis.jpg',
    addedAt: '2024-12-12T15:30:00Z'
  },
  {
    id: 'lalibela',
    type: 'tour',
    title: 'Rock-Hewn Churches of Lalibela',
    description: 'Eleven medieval monolithic churches carved directly into the volcanic rock',
    imageUrl: 'https://media.istockphoto.com/id/530628231/photo/church-of-st-george-unesco-world-heritage-lalibela-ethiopia.jpg',
    addedAt: '2024-12-08T09:15:00Z'
  },
  {
    id: '1',
    type: 'product',
    title: 'Handwoven Habesha Kemis',
    description: 'Traditional Ethiopian dress with intricate border patterns',
    imageUrl: 'https://media.istockphoto.com/id/2195463329/photo/traditional-ethiopian-kemis-a-white-dress-with-colorful-embroidery-worn-by-women-during-the.jpg',
    addedAt: '2024-12-14T11:45:00Z'
  },
  {
    id: '2',
    type: 'product',
    title: 'Lalibela Cross',
    description: 'Hand-carved wooden cross inspired by ancient designs',
    imageUrl: 'https://media.istockphoto.com/id/1735666451/photo/bet-giyorgis-rock-hewn-church-in-the-night-with-the-moon-in-lalibela-ethiopia.jpg',
    addedAt: '2024-12-13T16:20:00Z'
  }
];

// Mock cart items data
const mockCartItems: CartItem[] = [
  {
    id: '1',
    type: 'product',
    title: 'Handwoven Habesha Kemis',
    description: 'Traditional Ethiopian dress with intricate border patterns',
    imageUrl: 'https://media.istockphoto.com/id/2195463329/photo/traditional-ethiopian-kemis-a-white-dress-with-colorful-embroidery-worn-by-women-during-the.jpg?b=1&s=612x612&w=0&k=20&c=yjJxJyZubvwdDc0oMLOZ_K7XfBj0UliP9Ag6c6x0uWk=',
    addedAt: '2024-12-14T11:45:00Z',
    quantity: 1,
    price: 4150,
    priceRange: '3120 ETB - 5180 ETB'
  },
  {
    id: 'lalibela',
    type: 'tour',
    title: 'Rock-Hewn Churches of Lalibela',
    description: 'Eleven medieval monolithic churches carved directly into the volcanic rock',
    imageUrl: 'https://media.istockphoto.com/id/530628231/photo/church-of-st-george-unesco-world-heritage-lalibela-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=87hIk5lWuUVQudD8ZU75MjQKz3d3tHWmkTSGSnW3N84=',
    addedAt: '2024-12-08T09:15:00Z',
    quantity: 1,
    price: 1500,
    priceRange: 'Tour booking fee'
  },
  {
    id: '3',
    type: 'product',
    title: 'Traditional Silver Necklace',
    description: 'Filigree silver necklace with traditional Ethiopian motifs',
    imageUrl: 'https://media.istockphoto.com/id/885749794/photo/ethiopian-cross-necklace-with-old-handmade-glass-beads.jpg?b=1&s=612x612&w=0&k=20&c=81W-iwazYa6jWt3MZ00tIxfC9x35P5EfTHmEQEfuiX8=',
    addedAt: '2024-12-13T16:20:00Z',
    quantity: 2,
    price: 1225,
    priceRange: '950 ETB - 1500 ETB'
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>(mockFavoriteItems);
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addToFavorites = (item: FavoriteItem) => {
    if (!user) return;
    
    const updatedFavorites = { ...user.favorites };
    if (!updatedFavorites[`${item.type}Items` as keyof typeof updatedFavorites].includes(item.id)) {
      updatedFavorites[`${item.type}Items` as keyof typeof updatedFavorites].push(item.id);
      setUser({ ...user, favorites: updatedFavorites });
      setFavoriteItems(prev => [...prev, item]);
    }
  };

  const removeFromFavorites = (itemId: string, type: 'archive' | 'tour' | 'product') => {
    if (!user) return;
    
    const updatedFavorites = { ...user.favorites };
    const key = `${type}Items` as keyof typeof updatedFavorites;
    updatedFavorites[key] = updatedFavorites[key].filter(id => id !== itemId);
    setUser({ ...user, favorites: updatedFavorites });
    setFavoriteItems(prev => prev.filter(item => !(item.id === itemId && item.type === type)));
  };

  const isFavorite = (itemId: string, type: 'archive' | 'tour' | 'product') => {
    if (!user) return false;
    const key = `${type}Items` as keyof typeof user.favorites;
    return (user.favorites[key] || []).includes(itemId);
  };

  const addQuizResult = (result: QuizResult) => {
    if (!user) return;
    const updatedHistory = [result, ...user.quizHistory.slice(0, 9)]; // Keep last 10 results
    setUser({ ...user, quizHistory: updatedHistory });
  };

  const getCartItems = () => cartItems;

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id && cartItem.type === item.type);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id && cartItem.type === item.type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string, type: 'archive' | 'tour' | 'product') => {
    setCartItems(prev => prev.filter(item => !(item.id === itemId && item.type === type)));
  };

  const updateCartQuantity = (itemId: string, type: 'archive' | 'tour' | 'product', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId, type);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId && item.type === type
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      addQuizResult,
      getCartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </UserContext.Provider>
  );
};