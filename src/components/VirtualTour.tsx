import React, { useState, useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import { useUser } from '../contexts/UserContext';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Camera,
  Play,
  Info,
  Star,
  ChevronRight,
  Plus,
  Check,
  ShoppingCart
} from 'lucide-react';

interface TourSite {
  id: string;
  name: string;
  location: string;
  description: string;
  historicalPeriod: string;
  significance: string;
  imageUrl: string;
  galleryImages: string[];
  facts: string[];
  visitDuration: string;
  bestTimeToVisit: string;
}

interface VirtualTourProps {
  onBack: () => void;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, getCartItems } = useUser();
  const [selectedSite, setSelectedSite] = useState<TourSite | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  const cartItems = getCartItems();

  const tourSites: TourSite[] = [
    {
      id: 'lalibela',
      name: 'Rock-Hewn Churches of Lalibela',
      location: 'Lalibela, Amhara Region',
      description: 'Eleven medieval monolithic churches carved directly into the volcanic rock, representing a New Jerusalem.',
      historicalPeriod: '12th-13th Century',
      significance: 'UNESCO World Heritage Site and active pilgrimage destination',
      imageUrl: 'https://media.istockphoto.com/id/530628231/photo/church-of-st-george-unesco-world-heritage-lalibela-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=87hIk5lWuUVQudD8ZU75MjQKz3d3tHWmkTSGSnW3N84=',
      galleryImages: [
        'https://media.istockphoto.com/id/530628231/photo/church-of-st-george-unesco-world-heritage-lalibela-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=87hIk5lWuUVQudD8ZU75MjQKz3d3tHWmkTSGSnW3N84=',
        'https://media.istockphoto.com/id/530628231/photo/church-of-st-george-unesco-world-heritage-lalibela-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=87hIk5lWuUVQudD8ZU75MjQKz3d3tHWmkTSGSnW3N84=',
        'https://media.istockphoto.com/id/530628231/photo/church-of-st-george-unesco-world-heritage-lalibela-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=87hIk5lWuUVQudD8ZU75MjQKz3d3tHWmkTSGSnW3N84='
      ],
      facts: [
        'Carved from single pieces of volcanic rock',
        'Still used for religious ceremonies today',
        'Connected by underground tunnels',
        'Built during King Lalibela\'s reign'
      ],
      visitDuration: '2-3 hours',
      bestTimeToVisit: 'October to March'
    },
    {
      id: 'axum',
      name: 'Ancient Kingdom of Axum',
      location: 'Axum, Tigray Region',
      description: 'Former capital of the Axumite Empire, featuring towering granite obelisks and ancient ruins.',
      historicalPeriod: '1st-8th Century AD',
      significance: 'Birthplace of Ethiopian civilization and Christianity',
      imageUrl: 'https://media.istockphoto.com/id/1173442743/photo/the-northern-stelae-park-of-aksum-famous-obelisks-in-axum-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=GuFUL8PmrlQdf_oGvc3nFU-AnDeGrmWjTanf2PPlJ_c=',
      galleryImages: [
        'https://media.istockphoto.com/id/1173442743/photo/the-northern-stelae-park-of-aksum-famous-obelisks-in-axum-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=GuFUL8PmrlQdf_oGvc3nFU-AnDeGrmWjTanf2PPlJ_c=',
        'https://media.istockphoto.com/id/1173442743/photo/the-northern-stelae-park-of-aksum-famous-obelisks-in-axum-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=GuFUL8PmrlQdf_oGvc3nFU-AnDeGrmWjTanf2PPlJ_c=',
        'https://media.istockphoto.com/id/1173442743/photo/the-northern-stelae-park-of-aksum-famous-obelisks-in-axum-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=GuFUL8PmrlQdf_oGvc3nFU-AnDeGrmWjTanf2PPlJ_c='
      ],
      facts: [
        'Home to the largest ancient obelisk in the world',
        'Legendary resting place of the Ark of the Covenant',
        'Major trading hub connecting Africa, Arabia, and the Mediterranean',
        'Birthplace of the Queen of Sheba legend'
      ],
      visitDuration: '3-4 hours',
      bestTimeToVisit: 'November to February'
    },
    {
      id: 'gondar',
      name: 'Royal Enclosure of Gondar',
      location: 'Gondar, Amhara Region',
      description: 'Former imperial capital featuring castles, palaces, and churches from the 17th-18th centuries.',
      historicalPeriod: '17th-18th Century',
      significance: 'Ethiopian Camelot with unique architectural fusion',
      imageUrl: 'https://images.pexels.com/photos/17853346/pexels-photo-17853346.jpeg',
      galleryImages: [
        'https://images.pexels.com/photos/17853346/pexels-photo-17853346.jpeg',
        'https://images.pexels.com/photos/17853346/pexels-photo-17853346.jpeg',
        'https://images.pexels.com/photos/17853346/pexels-photo-17853346.jpeg'
      ],
      facts: [
        'Blend of Ethiopian, Portuguese, and Moorish architecture',
        'Six castles within the Royal Enclosure',
        'Famous for Debre Berhan Selassie Church ceiling',
        'Capital of Ethiopia for over 200 years'
      ],
      visitDuration: '2-3 hours',
      bestTimeToVisit: 'October to March'
    },
    {
      id: 'harar',
      name: 'Historic Fortified City of Harar',
      location: 'Harar, Harari Region',
      description: 'Ancient walled city known as the fourth holiest city in Islam, with unique cultural traditions.',
      historicalPeriod: '13th Century onwards',
      significance: 'Cultural crossroads and center of Islamic learning',
      imageUrl: 'https://media.istockphoto.com/id/506194357/photo/harar-jugol.jpg?b=1&s=612x612&w=0&k=20&c=xQO0Gcfm8EJO3hltpQ8021Zy7oI_KatrRqR1XjJHeIU=',
      galleryImages: [
        'https://media.istockphoto.com/id/506194357/photo/harar-jugol.jpg?b=1&s=612x612&w=0&k=20&c=xQO0Gcfm8EJO3hltpQ8021Zy7oI_KatrRqR1XjJHeIU=',
        'https://images.pexels.com/photos/30327295/pexels-photo-30327295.jpeg',
        'https://media.istockphoto.com/id/601363406/photo/african-woman-holding-basket-full-of-coffee-cherries-east-africa.jpg'
      ],
      facts: [
        '368 alleyways within ancient walls',
        'Home to 82 mosques and 102 shrines',
        'Famous hyena feeding tradition',
        'Birthplace of coffee culture'
      ],
      visitDuration: '4-5 hours',
      bestTimeToVisit: 'November to March'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (site: TourSite) => {
    const cartItem = {
      id: site.id,
      type: 'tour' as const,
      title: site.name,
      description: site.description,
      imageUrl: site.imageUrl,
      addedAt: new Date().toISOString(),
      quantity: 1,
      price: 1500, // Tour booking fee
      priceRange: 'Tour booking fee'
    };

    addToCart(cartItem);
    setAddedToCart(prev => ({ ...prev, [site.id]: true }));
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [site.id]: false }));
    }, 2000);
  };

  const isInCart = (siteId: string) => {
    return cartItems.some(item => item.id === siteId && item.type === 'tour');
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-100 rounded mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  const SiteCard = ({ site }: { site: TourSite }) => (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={() => setSelectedSite(site)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={site.imageUrl} 
          alt={site.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-2 mb-1">
            <MapPin size={14} />
            <span className="text-sm">{site.location}</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play size={16} className="text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <FavoriteButton item={site} type="tour" size="sm" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
          {site.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{site.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span>{site.visitDuration}</span>
          </div>
          <span className="text-emerald-600 font-medium">Explore →</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(site);
          }}
          disabled={addedToCart[site.id]}
          className={`w-full py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            addedToCart[site.id]
              ? 'bg-green-500 text-white'
              : isInCart(site.id)
              ? 'bg-gray-100 text-gray-600 border border-gray-200'
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
        >
          {addedToCart[site.id] ? (
            <>
              <Check size={16} />
              <span>Added to Cart!</span>
            </>
          ) : isInCart(site.id) ? (
            <>
              <ShoppingCart size={16} />
              <span>In Cart</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Book Tour</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const SiteDetail = ({ site }: { site: TourSite }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedSite(null)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{site.name}</h1>
              <p className="text-sm text-gray-600">{site.location}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="px-6 py-4">
        <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
          <img 
            src={site.galleryImages[currentImageIndex]} 
            alt={site.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {site.galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Site Info */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">About This Site</h2>
            <div className="flex items-center space-x-1 text-amber-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium">UNESCO Site</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{site.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Historical Period</h4>
              <p className="text-gray-600 text-sm">{site.historicalPeriod}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Best Time to Visit</h4>
              <p className="text-gray-600 text-sm">{site.bestTimeToVisit}</p>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4">
            <h4 className="font-semibold text-emerald-800 mb-2">Cultural Significance</h4>
            <p className="text-emerald-700 text-sm">{site.significance}</p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleAddToCart(site)}
              disabled={addedToCart[site.id]}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                addedToCart[site.id]
                  ? 'bg-green-500 text-white'
                  : isInCart(site.id)
                  ? 'bg-gray-100 text-gray-600 border border-gray-200'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {addedToCart[site.id] ? (
                <>
                  <Check size={16} />
                  <span>Added to Cart!</span>
                </>
              ) : isInCart(site.id) ? (
                <>
                  <ShoppingCart size={16} />
                  <span>In Cart</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Book This Tour</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interesting Facts */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Fascinating Facts</h3>
          <div className="space-y-3">
            {site.facts.map((fact, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info size={12} className="text-amber-600" />
                </div>
                <p className="text-gray-700 text-sm">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedSite) {
    return <SiteDetail site={selectedSite} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Virtual Heritage Tour</h1>
              <p className="text-sm text-gray-600">Explore Ethiopia's wonders</p>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Tour Banner */}
      <div className="px-6 py-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-500 p-6 text-white mb-6">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <Camera size={20} />
              <span className="text-sm font-medium">360° Virtual Experience</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Journey Through Time</h2>
            <p className="text-emerald-100 text-sm">Immerse yourself in Ethiopia's most sacred and historic sites</p>
          </div>
          <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
        </div>
      </div>

      {/* Tour Sites */}
      <main className="px-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Heritage Sites</h2>
          <span className="text-sm text-gray-500">{tourSites.length} locations</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tourSites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default VirtualTour;