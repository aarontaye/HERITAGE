import React, { useState, useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import { 
  ArrowLeft, 
  ScrollText, 
  BookOpen, 
  Crown, 
  Mountain,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';

interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  category: 'manuscripts' | 'stories' | 'artifacts' | 'places';
  imageUrl: string;
  date?: string;
  location?: string;
}

interface CulturalArchiveProps {
  onBack: () => void;
}

const CulturalArchive: React.FC<CulturalArchiveProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All', icon: Grid, color: 'bg-gray-500' },
    { id: 'manuscripts', label: 'Manuscripts', icon: ScrollText, color: 'bg-amber-500' },
    { id: 'stories', label: 'Stories', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'artifacts', label: 'Artifacts', icon: Crown, color: 'bg-rose-500' },
    { id: 'places', label: 'Places', icon: Mountain, color: 'bg-emerald-500' }
  ];

  const archiveItems: ArchiveItem[] = [
    {
      id: '1',
      title: 'Book of Enoch',
      description: 'Ancient Ethiopian manuscript containing apocryphal texts',
      category: 'manuscripts',
      imageUrl: 'https://mefthe.com/wp-content/uploads/2015/12/51EODEjrl7L-325x500.jpg',
      date: '4th Century',
      location: 'Axum'
    },
    {
      id: '2',
      title: 'Queen of Sheba Legend',
      description: 'The legendary tale of Queen Makeda and King Solomon',
      category: 'stories',
      imageUrl: 'https://www.ancient-origins.net/sites/default/files/field/image/Queen-of-Sheba.jpg',
      date: '10th Century BC',
      location: 'Axum'
    },
    {
      id: '3',
      title: 'Lalibela Cross',
      description: 'Ornate processional cross from the medieval period',
      category: 'artifacts',
      imageUrl: 'https://media.istockphoto.com/id/1305435687/photo/lalibela-ethiopia-famous-rock-hewn-church-of-saint-george-bete-giyorgis.jpg?b=1&s=612x612&w=0&k=20&c=odHB_4VkRDb7-pOHrRLTDQ9X6b6UiE8e19W9xaHk_Rc=',
      date: '12th Century',
      location: 'Lalibela'
    },
    {
      id: '4',
      title: 'Rock Churches of Lalibela',
      description: 'Monolithic churches carved from solid rock',
      category: 'places',
      imageUrl: 'https://images.pexels.com/photos/12344991/pexels-photo-12344991.jpeg',
      date: '12th Century',
      location: 'Lalibela'
    },
    {
      id: '5',
      title: 'Kebra Nagast',
      description: 'The Glory of the Kings - Ethiopian national epic',
      category: 'manuscripts',
      imageUrl: 'https://i.ytimg.com/vi/S3G5ZklLkm0/maxresdefault.jpg',
      date: '14th Century',
      location: 'Various monasteries'
    },
    {
      id: '6',
      title: 'Coffee Origin Story',
      description: 'The legend of Kaldi and the dancing goats',
      category: 'stories',
      imageUrl: 'https://www.thespruceeats.com/thmb/DFwO2OZTr1v7tk6f3EjDX_G50XM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Coffee-beans-in-sack-582cd4c93df78c6f6a9f903a.jpg',
      date: '9th Century',
      location: 'Kaffa Province'
    },
    {
      id: '7',
      title: 'Axum Obelisks',
      description: 'Ancient granite stelae marking royal tombs',
      category: 'places',
      imageUrl: 'https://media.istockphoto.com/id/186914973/photo/obelisk-in-the-aksum-kingdom-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=HVdwe-YAf5blG2yWYpP8ueNrr7O6bd69YejRKa2T_wQ=',
      date: '4th Century',
      location: 'Axum'
    },
    {
      id: '8',
      title: 'Traditional Habesha Kemis',
      description: 'Handwoven cotton dress with intricate borders',
      category: 'artifacts',
      imageUrl: 'https://images.pexels.com/photos/19113143/pexels-photo-19113143.jpeg',
      date: 'Traditional',
      location: 'Various regions'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = archiveItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-100 rounded mb-3 w-3/4"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  const ArchiveCard = ({ item }: { item: ArchiveItem }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${
            categories.find(cat => cat.id === item.category)?.color || 'bg-gray-500'
          }`}>
            {categories.find(cat => cat.id === item.category)?.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <FavoriteButton item={item} type="archive" size="sm" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{item.date}</span>
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  );

  const ListCard = ({ item }: { item: ArchiveItem }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
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
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ml-2 flex-shrink-0 ${
              categories.find(cat => cat.id === item.category)?.color || 'bg-gray-500'
            }`}>
              {categories.find(cat => cat.id === item.category)?.label}
            </span>
          </div>
          <div className="ml-2 flex-shrink-0">
            <FavoriteButton item={item} type="archive" size="sm" />
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{item.date}</span>
            <span>{item.location}</span>
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
                <h1 className="text-xl font-bold text-gray-800">Cultural Archive</h1>
                <p className="text-sm text-gray-600">{filteredItems.length} items</p>
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

      {/* Search and Filters */}
      <div className="px-6 py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search heritage items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <category.icon size={16} />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-6 pb-24">
        {isLoading ? (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredItems.map((item) => (
              viewMode === 'grid' ? (
                <ArchiveCard key={item.id} item={item} />
              ) : (
                <ListCard key={item.id} item={item} />
              )
            ))}
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CulturalArchive;