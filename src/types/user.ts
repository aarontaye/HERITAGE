export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  interests: string[];
  preferredLanguage: 'amharic' | 'english';
  joinDate: string;
  quizHistory: QuizResult[];
  favorites: {
    archiveItems: string[];
    tourSites: string[];
    products: string[];
  };
  cart: CartItem[];
}

export interface QuizResult {
  id: string;
  quizName: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeSpent: number; // in seconds
}

export interface FavoriteItem {
  id: string;
  type: 'archive' | 'tour' | 'product';
  title: string;
  description: string;
  imageUrl: string;
  addedAt: string;
}

export interface CartItem extends FavoriteItem {
  quantity: number;
  price: number;
  priceRange?: string;
}