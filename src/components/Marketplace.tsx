import React, { useState, useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import { useUser } from '../contexts/UserContext';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  MessageCircle,
  Heart,
  Search,
  Filter,
  Grid,
  List,
  Phone,
  Mail,
  Award,
  ShoppingCart,
  Plus,
  Check
} from 'lucide-react';

interface Artisan {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  crafts: string[];
  experience: string;
  verified: boolean;
  phone: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  artisanId: string;
  artisanName: string;
  price: string;
  imageUrl: string;
  category: string;
  materials: string[];
  craftTime: string;
}

interface MarketplaceProps {
  onBack: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, getCartItems } = useUser();
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  const cartItems = getCartItems();

  const categories = [
    { id: 'all', label: 'All Crafts' },
    { id: 'textiles', label: 'Textiles' },
    { id: 'pottery', label: 'Pottery' },
    { id: 'jewelry', label: 'Jewelry' },
    { id: 'woodwork', label: 'Woodwork' },
    { id: 'metalwork', label: 'Metalwork' }
  ];

  const artisans: Artisan[] = [
    {
      id: '1',
      name: 'Almaz Tadesse',
      specialty: 'Traditional Weaving',
      location: 'Addis Ababa',
      bio: 'Master weaver with 25 years of experience creating traditional Ethiopian textiles. Specializes in handwoven cotton and silk fabrics with intricate patterns.',
      rating: 4.9,
      reviewCount: 127,
      imageUrl: 'https://images.pexels.com/photos/17464867/pexels-photo-17464867.jpeg',
      crafts: ['Habesha Kemis', 'Netela', 'Traditional Scarves'],
      experience: '25+ years',
      verified: true,
      phone: '0995055673',
      email: 'bettyaaron6090@gmail.com'
    },
    {
      id: '2',
      name: 'Bekele Worku',
      specialty: 'Wood Carving',
      location: 'Lalibela',
      bio: 'Renowned wood carver creating religious artifacts and decorative pieces. His work is inspired by the ancient churches of Lalibela.',
      rating: 4.8,
      reviewCount: 89,
      imageUrl: 'https://images.pexels.com/photos/8197946/pexels-photo-8197946.jpeg',
      crafts: ['Religious Crosses', 'Decorative Panels', 'Traditional Furniture'],
      experience: '20+ years',
      verified: true,
      phone: '0995055673',
      email: 'bettyaaron6090@gmail.com'
    },
    {
      id: '3',
      name: 'Hanan Mohammed',
      specialty: 'Silver Jewelry',
      location: 'Harar',
      bio: 'Third-generation silversmith creating traditional Ethiopian jewelry with modern touches. Known for intricate filigree work.',
      rating: 4.9,
      reviewCount: 156,
      imageUrl: 'https://images.pexels.com/photos/13597863/pexels-photo-13597863.jpeg',
      crafts: ['Traditional Necklaces', 'Earrings', 'Bracelets'],
      experience: '15+ years',
      verified: true,
      phone: '0995055673',
      email: 'bettyaaron6090@gmail.com'
    },
    {
      id: '4',
      name: 'Desta Abebe',
      specialty: 'Pottery & Ceramics',
      location: 'Gondar',
      bio: 'Traditional potter creating functional and decorative ceramics using ancient techniques passed down through generations.',
      rating: 4.7,
      reviewCount: 73,
      imageUrl: 'https://images.pexels.com/photos/6275759/pexels-photo-6275759.jpeg',
      crafts: ['Coffee Ceremony Sets', 'Decorative Vases', 'Traditional Bowls'],
      experience: '18+ years',
      verified: false,
      phone: '0995055673',
      email: 'bettyaaron6090@gmail.com'
    }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Handwoven Habesha Kemis',
      description: 'Traditional Ethiopian dress with intricate border patterns',
      artisanId: '1',
      artisanName: 'Almaz Tadesse',
      price: '3120 ETB - 5180 ETB',
      imageUrl: 'https://media.istockphoto.com/id/2195463329/photo/traditional-ethiopian-kemis-a-white-dress-with-colorful-embroidery-worn-by-women-during-the.jpg?b=1&s=612x612&w=0&k=20&c=yjJxJyZubvwdDc0oMLOZ_K7XfBj0UliP9Ag6c6x0uWk=',
      category: 'textiles',
      materials: ['100% Cotton', 'Natural Dyes'],
      craftTime: '2-3 weeks'
    },
    {
      id: '2',
      name: 'Lalibela Cross',
      description: 'Hand-carved wooden cross inspired by ancient designs',
      artisanId: '2',
      artisanName: 'Bekele Worku',
      price: '450 ETB - 850 ETB',
      imageUrl: 'https://media.istockphoto.com/id/1735666451/photo/bet-giyorgis-rock-hewn-church-in-the-night-with-the-moon-in-lalibela-ethiopia.jpg?b=1&s=612x612&w=0&k=20&c=6EVaSIFUHMGlPkR06M-iWYl7CgmTJKpaB5X5GtHRJK8=',
      category: 'woodwork',
      materials: ['Olive Wood', 'Natural Finish'],
      craftTime: '1 week'
    },
    {
      id: '3',
      name: 'Traditional Silver Necklace',
      description: 'Filigree silver necklace with traditional Ethiopian motifs',
      artisanId: '3',
      artisanName: 'Hanan Mohammed',
      price: '950 ETB - 1500 ETB',
      imageUrl: 'https://media.istockphoto.com/id/885749794/photo/ethiopian-cross-necklace-with-old-handmade-glass-beads.jpg?b=1&s=612x612&w=0&k=20&c=81W-iwazYa6jWt3MZ00tIxfC9x35P5EfTHmEQEfuiX8=',
      category: 'jewelry',
      materials: ['Sterling Silver', 'Traditional Techniques'],
      craftTime: '2 weeks'
    },
    {
      id: '4',
      name: 'Coffee Ceremony Set',
      description: 'Complete traditional Ethiopian coffee ceremony pottery set',
      artisanId: '4',
      artisanName: 'Desta Abebe',
      price: '650 ETB - 950 ETB',
      imageUrl: 'https://media.istockphoto.com/id/629802306/photo/young-african-girl-preparing-coffee-ethiopia-east-africa.jpg?b=1&s=612x612&w=0&k=20&c=-EZoO0p3l9Km49oUt0D_q_Dg-LYm4q_mMmj1dQs8SMM=',
      category: 'pottery',
      materials: ['Local Clay', 'Natural Glazes'],
      craftTime: '10 days'
    },
    {
      id: '5',
      name: 'Handwoven Shawl',
      description: 'Beautiful traditional shawl with geometric patterns',
      artisanId: '1',
      artisanName: 'Almaz Tadesse',
      price: '800 ETB - 1200 ETB',
      imageUrl: 'https://images.pexels.com/photos/19113143/pexels-photo-19113143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'textiles',
      materials: ['Cotton', 'Traditional Dyes'],
      craftTime: '1-2 weeks'
    },
    {
      id: '6',
      name: 'Carved Wooden Bowl',
      description: 'Traditional serving bowl carved from olive wood',
      artisanId: '2',
      artisanName: 'Bekele Worku',
      price: '200 ETB - 350 ETB',
      imageUrl: 'https://images.pexels.com/photos/6207350/pexels-photo-6207350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'woodwork',
      materials: ['Olive Wood', 'Food Safe Finish'],
      craftTime: '3-5 days'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    const priceRange = product.price.split(' - ');
    const avgPrice = priceRange.length === 2 
      ? (parseInt(priceRange[0].replace(/[^\d]/g, '')) + parseInt(priceRange[1].replace(/[^\d]/g, ''))) / 2
      : parseInt(product.price.replace(/[^\d]/g, ''));

    const cartItem = {
      id: product.id,
      type: 'product' as const,
      title: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      addedAt: new Date().toISOString(),
      quantity: 1,
      price: avgPrice,
      priceRange: product.price
    };

    addToCart(cartItem);
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId && item.type === 'product');
  };

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

  const ArtisanCard = ({ artisan }: { artisan: Artisan }) => (
    <div 
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onClick={() => setSelectedArtisan(artisan)}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img 
            src={artisan.imageUrl} 
            alt={artisan.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {artisan.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <Award size={12} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
            {artisan.name}
          </h3>
          <p className="text-gray-600 text-sm">{artisan.specialty}</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Star size={12} className="text-amber-400 fill-current" />
              <span className="text-xs text-gray-600">{artisan.rating}</span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600">{artisan.reviewCount} reviews</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{artisan.bio}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-gray-500">
          <MapPin size={12} />
          <span className="text-xs">{artisan.location}</span>
        </div>
        <span className="text-emerald-600 text-sm font-medium">View Profile →</span>
      </div>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => setSelectedProduct(product)}
        />
        <div className="absolute top-3 right-3">
          <FavoriteButton item={product} type="product" size="sm" />
        </div>
      </div>
      <div className="p-4">
        <div onClick={() => setSelectedProduct(product)}>
          <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">by {product.artisanName}</p>
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-emerald-600 font-semibold">{product.price}</span>
            <span className="text-xs text-gray-500">{product.craftTime}</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
          disabled={addedToCart[product.id]}
          className={`w-full py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
  addedToCart[product.id]
    ? 'bg-green-500 text-white'
    : isInCart(product.id)
    ? 'bg-gray-100 text-gray-600 border border-gray-200'
    : '[background-image:linear-gradient(to_right,#E1E0C9,#367EA5)] text-white hover:shadow-lg'
          }`}
        >
          {addedToCart[product.id] ? (
            <>
              <Check size={16} />
              <span>Added to Cart!</span>
            </>
          ) : isInCart(product.id) ? (
            <>
              <ShoppingCart size={16} />
              <span>In Cart</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const ArtisanProfile = ({ artisan }: { artisan: Artisan }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedArtisan(null)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{artisan.name}</h1>
              <p className="text-sm text-gray-600">{artisan.specialty}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <img 
                src={artisan.imageUrl} 
                alt={artisan.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              {artisan.verified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Award size={16} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{artisan.name}</h2>
              <p className="text-gray-600">{artisan.specialty}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-amber-400 fill-current" />
                  <span className="font-medium">{artisan.rating}</span>
                  <span className="text-gray-500">({artisan.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin size={14} />
                  <span className="text-sm">{artisan.location}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{artisan.bio}</p>
          <div className="flex space-x-3">
            <button className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle size={16} />
              <span>Contact Artisan</span>
            </button>
            <a 
              href={`tel:${artisan.phone}`}
              className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Phone size={16} className="text-gray-600" />
            </a>
            <a 
              href={`mailto:${artisan.email}`}
              className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Mail size={16} className="text-gray-600" />
            </a>
          </div>
        </div>

        {/* Crafts & Experience */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Specialties</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Experience</h4>
              <p className="text-gray-600 text-sm">{artisan.experience}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Verification</h4>
              <div className="flex items-center space-x-1">
                {artisan.verified ? (
                  <>
                    <Award size={14} className="text-emerald-500" />
                    <span className="text-emerald-600 text-sm">Verified Artisan</span>
                  </>
                ) : (
                  <span className="text-gray-500 text-sm">Pending Verification</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Craft Types</h4>
            <div className="flex flex-wrap gap-2">
              {artisan.crafts.map((craft, index) => (
                <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                  {craft}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Crafts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.filter(p => p.artisanId === artisan.id).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProductDetail = ({ product }: { product: Product }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{product.name}</h1>
              <p className="text-sm text-gray-600">by {product.artisanName}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-4">
        {/* Product Image */}
        <div className="h-64 rounded-2xl overflow-hidden mb-6">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h2>
              <p className="text-emerald-600 text-lg font-semibold">{product.price}</p>
            </div>
            <div className="flex-shrink-0">
              <FavoriteButton item={product} type="product" size="md" />
            </div>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Materials</h4>
              <div className="space-y-1">
                {product.materials.map((material, index) => (
                  <span key={index} className="block text-gray-600 text-sm">{material}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Craft Time</h4>
              <p className="text-gray-600 text-sm">{product.craftTime}</p>
            </div>
          </div>
          <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2">
            <MessageCircle size={16} />
            <span>Contact Artisan</span>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            disabled={addedToCart[product.id]}
            className={`w-full py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
  addedToCart[product.id]
    ? 'bg-green-500 text-white'
    : isInCart(product.id)
    ? 'bg-gray-100 text-gray-600 border border-gray-200'
    : '[background-image:linear-gradient(to_right,#E1E0C9,#367EA5)] text-white hover:shadow-lg'
            }`}
          >
            {addedToCart[product.id] ? (
              <>
                <Check size={16} />
                <span>Added to Cart!</span>
              </>
            ) : isInCart(product.id) ? (
              <>
                <ShoppingCart size={16} />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

        {/* Artisan Info */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About the Artisan</h3>
          <div 
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 rounded-xl p-3 -m-3 transition-colors"
            onClick={() => {
              const artisan = artisans.find(a => a.id === product.artisanId);
              if (artisan) setSelectedArtisan(artisan);
            }}
          >
            <img 
              src={artisans.find(a => a.id === product.artisanId)?.imageUrl} 
              alt={product.artisanName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{product.artisanName}</h4>
              <p className="text-gray-600 text-sm">{artisans.find(a => a.id === product.artisanId)?.specialty}</p>
            </div>
            <div className="text-gray-400">→</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedArtisan) {
    return <ArtisanProfile artisan={selectedArtisan} />;
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} />;
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
              <h1 className="text-xl font-bold text-gray-800">Artisan Marketplace</h1>
              <p className="text-sm text-gray-600">Connect with master craftspeople</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="px-6 py-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search artisans and crafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-6 pb-24">
        {/* Featured Artisans */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Featured Artisans</h2>
            <span className="text-sm text-gray-500">{filteredArtisans.length} artisans</span>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          )}
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Featured Crafts</h2>
            <span className="text-sm text-gray-500">{filteredProducts.length} items</span>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Marketplace;