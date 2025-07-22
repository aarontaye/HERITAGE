import React, { useState, useEffect } from 'react';
import { useUser } from './contexts/UserContext';
import CulturalArchive from './components/CulturalArchive';
import VirtualTour from './components/VirtualTour';
import Marketplace from './components/Marketplace';
import LearningPortal from './components/LearningPortal';
import ThemeToggle from './components/ThemeToggle';
import { 
  Home, 
  Archive, 
  MapPin, 
  ShoppingBag, 
  BookOpen,
  ShoppingCart,
  Mountain,
  ScrollText,
  Palette,
  Languages,
  Star,
  ChevronRight
} from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCategoryClick = (categoryId: string) => {
    setCurrentPage('archive');
    setActiveTab('archive');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setActiveTab('home');
  };

  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'archive') {
      setCurrentPage('archive');
    } else if (tabId === 'tour') {
      setCurrentPage('tour');
    } else if (tabId === 'marketplace') {
      setCurrentPage('marketplace');
    } else if (tabId === 'learn') {
      setCurrentPage('learn');
    } else {
      setCurrentPage('home');
    }
  };

  const categories = [
    {
      id: 'historical',
      title: 'Historical Sites',
      icon: Mountain,
      color: 'bg-emerald-500',
      description: 'Ancient wonders'
    },
    {
      id: 'manuscripts',
      title: 'Ancient Manuscripts',
      icon: ScrollText,
      color: 'bg-amber-500',
      description: 'Sacred texts'
    },
    {
      id: 'arts',
      title: 'Arts & Crafts',
      icon: Palette,
      color: 'bg-rose-500',
      description: 'Traditional crafts'
    },
    {
      id: 'language',
      title: 'Language Learning',
      icon: Languages,
      color: 'bg-blue-500',
      description: 'Learn Amharic'
    }
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'tour', label: 'Tour', icon: MapPin },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'learn', label: 'Learn', icon: BookOpen }
  ];

  const ShimmerCard = () => (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm animate-pulse`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className={`w-12 h-12 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-xl`}></div>
        <div className="flex-1">
          <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
          <div className={`h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'} rounded w-3/4`}></div>
        </div>
      </div>
      <div className={`h-32 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-xl mb-4`}></div>
      <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
      <div className={`h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'} rounded w-2/3`}></div>
    </div>
  );

  const CategoryCard = ({ category, index }: { category: typeof categories[0], index: number }) => (
    <div 
      className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white'} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
          <category.icon size={24} />
        </div>
        <ChevronRight size={20} className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-hover:text-emerald-500 transition-colors`} />
      </div>
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-1`}>{category.title}</h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{category.description}</p>
    </div>
  );

  if (currentPage === 'archive') {
    return <CulturalArchive onBack={handleBackToHome} />;
  }

  if (currentPage === 'tour') {
    return <VirtualTour onBack={handleBackToHome} />;
  }

  if (currentPage === 'marketplace') {
    return <Marketplace onBack={handleBackToHome} />;
  }

  if (currentPage === 'learn') {
    return <LearningPortal onBack={handleBackToHome} />;
  }


  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50'
    }`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md shadow-sm sticky top-0 z-50`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>ቅርስ Heritage</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Shopping Cart</p>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-full flex items-center justify-center text-white">
                <ShoppingCart size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-24">
        {/* Featured Banner */}
        <div className="mt-6 mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-8 text-white">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Discover Ethiopia</h2>
              <p className="text-emerald-100 mb-4">Journey through 3,000 years of rich cultural heritage</p>
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors">
                Start Exploring
              </button>
            </div>
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute right-8 bottom-0 w-20 h-20 bg-amber-300/20 rounded-full translate-y-4"></div>
          </div>
        </div>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Explore Heritage</h2>
            <button className="text-emerald-600 text-sm font-medium">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={category.id} onClick={() => handleCategoryClick(category.id)}>
                <CategoryCard category={category} index={index} />
              </div>
            ))}
          </div>
        </section>

        {/* Heritage Highlight of the Day */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Heritage Highlight</h2>
            </div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today</span>
          </div>
          
          {isLoading ? (
            <ShimmerCard />
          ) : (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                  <Mountain size={24} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Rock-Hewn Churches of Lalibela</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>UNESCO World Heritage Site</p>
                </div>
              </div>
              <div className={`h-48 ${isDarkMode ? 'bg-gradient-to-br from-amber-900/20 to-orange-900/20' : 'bg-gradient-to-br from-amber-100 to-orange-100'} rounded-xl mb-4 flex items-center justify-center`}>
                <div className={`text-center ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  <Mountain size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Historical imagery would appear here</p>
                </div>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
                Discover the magnificent 13th-century churches carved entirely from solid volcanic rock. 
                These architectural marvels represent one of Ethiopia's greatest treasures and continue 
                to serve as active places of worship today.
              </p>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border-t px-6 py-3`}>
        <div className="flex items-center justify-between overflow-x-auto">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : isDarkMode 
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;