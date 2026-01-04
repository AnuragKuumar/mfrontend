import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FiSearch, FiFilter, FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sort: 'featured'
  });
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart, isInCart, getItemQuantity } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        params: filters
      });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/products/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/api/products/brands');
      setBrands(response.data.brands || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= Number(filters.maxPrice));
    }

    // Sort
    switch (filters.sort) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      sort: 'featured'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  // Mock products for demo (since we don't have a seeded database)
  const mockProducts = [
    {
      _id: '1',
      name: 'iPhone 15 Pro Max',
      description: 'Latest iPhone with A17 Pro chip and titanium design',
      category: 'Mobile Phones',
      brand: 'Apple',
      price: 159900,
      originalPrice: 169900,
      images: [
        '/images/iphone-15-pro.svg',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&crop=center',
        'https://via.placeholder.com/400x400/1f2937/ffffff?text=iPhone+15+Pro+Max'
      ],
      rating: { average: 4.8, count: 245 },
      stock: 10,
      isFeatured: true
    },
    {
      _id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Android phone with S Pen and AI features. 200MP camera, S Pen included, 5000mAh battery',
      category: 'Mobile Phones',
      brand: 'Samsung',
      price: 129999,
      originalPrice: 139999,
      images: [
        '/images/samsung-s24-ultra.svg',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
        'https://via.placeholder.com/400x400/1f2937/ffffff?text=Samsung+Galaxy+S24+Ultra'
      ],
      rating: { average: 4.7, count: 189 },
      stock: 15,
      isFeatured: true
    },
    {
      _id: '3',
      name: 'Apple MagSafe Charger',
      description: 'Wireless charging pad for iPhone with MagSafe technology',
      category: 'Chargers',
      brand: 'Apple',
      price: 4500,
      originalPrice: 4900,
      images: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
        'https://via.placeholder.com/400x400/1f2937/ffffff?text=MagSafe+Charger'
      ],
      rating: { average: 4.5, count: 67 },
      stock: 25,
      isFeatured: false
    },
    {
      _id: '4',
      name: 'AirPods Pro (2nd Gen)',
      description: 'Active noise cancellation earphones with spatial audio',
      category: 'Earphones',
      brand: 'Apple',
      price: 24900,
      originalPrice: 26900,
      images: [
        'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop&crop=center',
        'https://via.placeholder.com/400x400/1f2937/ffffff?text=AirPods+Pro'
      ],
      rating: { average: 4.9, count: 312 },
      stock: 8,
      isFeatured: true
    },
    {
      _id: '5',
      name: 'Spigen Tough Armor Case',
      description: 'Heavy duty protection case for iPhone 15 series',
      category: 'Covers',
      brand: 'Spigen',
      price: 2499,
      originalPrice: 2999,
      images: [
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&crop=center',
        'https://via.placeholder.com/400x400/1f2937/ffffff?text=Spigen+Case'
      ],
      rating: { average: 4.4, count: 89 },
      stock: 50,
      isFeatured: false
    },
    {
      _id: '6',
      name: 'Anker PowerCore 20000mAh',
      description: 'High capacity portable power bank with fast charging',
      category: 'Power Banks',
      brand: 'Anker',
      price: 3999,
      originalPrice: 4499,
      images: [
        'https://images.unsplash.com/photo-1609592806787-3d9c1b8e5e8e?w=400&h=400&fit=crop&crop=center',
        'https://via.placeholder.com/400x400/1f2937/ffffff?text=Anker+PowerBank'
      ],
      rating: { average: 4.6, count: 156 },
      stock: 30,
      isFeatured: false
    }
  ];

  // Use mock products if no products loaded
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : mockProducts;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Online Store</h1>
          <p className="text-dark-300">
            Shop the latest mobile phones and accessories with fast delivery
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="input-field lg:w-48"
            >
              <option value="featured">Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2 lg:w-auto"
            >
              <FiFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="card mb-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="₹0"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="₹999999"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-primary-400 hover:text-primary-300 text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => {
            const discount = calculateDiscount(product.originalPrice, product.price);
            const inCart = isInCart(product._id);
            const quantity = getItemQuantity(product._id);

            return (
              <div key={product._id} className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-pink-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10 group">
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300x300?text=Product'}
                    alt={product.name}
                    className="w-full h-56 object-contain bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.log(`Image failed to load: ${e.target.src}`);
                      // Try next image in array or fallback
                      if (product.images && product.images.length > 1) {
                        const currentIndex = product.images.indexOf(e.target.src);
                        const nextIndex = currentIndex + 1;
                        if (nextIndex < product.images.length) {
                          e.target.src = product.images[nextIndex];
                          console.log(`Trying next image: ${product.images[nextIndex]}`);
                        } else {
                          e.target.src = `https://via.placeholder.com/300x300/1f2937/ffffff?text=${encodeURIComponent(product.name)}`;
                        }
                      } else {
                        e.target.src = `https://via.placeholder.com/300x300/1f2937/ffffff?text=${encodeURIComponent(product.name)}`;
                      }
                    }}
                    onLoad={(e) => {
                      console.log(`Image loaded successfully: ${e.target.src}`);
                    }}
                  />
                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      {discount}% OFF
                    </div>
                  )}
                  {product.isFeatured && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ Featured
                    </div>
                  )}
                  <button className="absolute bottom-3 right-3 p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 hover:bg-pink-500 hover:text-white">
                    <FiHeart className="w-5 h-5" />
                  </button>
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-pink-400 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 font-medium">
                      {product.brand}
                    </p>
                  </div>
                  
                  <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating.average) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-400 ml-2">
                          {product.rating.average} ({product.rating.count})
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {product.stock > 0 ? (
                        <span className="text-green-400 flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          In Stock ({product.stock} left)
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="pt-2">
                    {inCart ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                          <span className="text-green-400 text-sm font-medium flex items-center">
                            <FiShoppingCart className="w-4 h-4 mr-2" />
                            In Cart ({quantity})
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25"
                        >
                          Add More
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product, 1)}
                        disabled={product.stock === 0}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <FiShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Products Found */}
        {displayProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-dark-300 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button (if needed) */}
        {displayProducts.length > 0 && displayProducts.length % 12 === 0 && (
          <div className="text-center mt-8">
            <button className="btn-outline">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;