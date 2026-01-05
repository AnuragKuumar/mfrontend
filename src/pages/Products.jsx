import { useState } from 'react';
import { FiShoppingCart, FiStar, FiSearch, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All Products', count: 45 },
    { id: 'mobiles', name: 'Mobile Phones', count: 15 },
    { id: 'accessories', name: 'Accessories', count: 30 }
  ];

  const products = [
    // Mobile Phones
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      category: 'mobiles',
      price: 159900,
      originalPrice: 169900,
      image: '📱',
      rating: 4.8,
      reviews: 245,
      inStock: true,
      features: ['256GB Storage', 'A17 Pro Chip', 'Pro Camera System', '6.7" Display'],
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      category: 'mobiles',
      price: 129999,
      originalPrice: 139999,
      image: '📱',
      rating: 4.7,
      reviews: 189,
      inStock: true,
      features: ['512GB Storage', 'Snapdragon 8 Gen 3', 'S Pen Included', '6.8" Display'],
      colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow']
    },
    {
      id: 3,
      name: 'OnePlus 12',
      brand: 'OnePlus',
      category: 'mobiles',
      price: 64999,
      originalPrice: 69999,
      image: '📱',
      rating: 4.6,
      reviews: 156,
      inStock: true,
      features: ['256GB Storage', 'Snapdragon 8 Gen 3', '100W Fast Charging', '6.82" Display'],
      colors: ['Silky Black', 'Flowy Emerald', 'Glacial White']
    },
    {
      id: 4,
      name: 'Xiaomi 14 Ultra',
      brand: 'Xiaomi',
      category: 'mobiles',
      price: 99999,
      originalPrice: 109999,
      image: '📱',
      rating: 4.5,
      reviews: 134,
      inStock: true,
      features: ['512GB Storage', 'Snapdragon 8 Gen 3', 'Leica Camera', '6.73" Display'],
      colors: ['Black', 'White']
    },
    {
      id: 5,
      name: 'Google Pixel 8 Pro',
      brand: 'Google',
      category: 'mobiles',
      price: 106999,
      originalPrice: 116999,
      image: '📱',
      rating: 4.4,
      reviews: 98,
      inStock: true,
      features: ['256GB Storage', 'Google Tensor G3', 'AI Photography', '6.7" Display'],
      colors: ['Obsidian', 'Porcelain', 'Bay']
    },

    // Accessories
    {
      id: 6,
      name: 'Apple AirPods Pro (2nd Gen)',
      brand: 'Apple',
      category: 'accessories',
      price: 24900,
      originalPrice: 26900,
      image: '🎧',
      rating: 4.8,
      reviews: 567,
      inStock: true,
      features: ['Active Noise Cancellation', 'Spatial Audio', 'MagSafe Charging', 'Up to 30hrs Battery'],
      colors: ['White']
    },
    {
      id: 7,
      name: 'Samsung Galaxy Buds2 Pro',
      brand: 'Samsung',
      category: 'accessories',
      price: 17999,
      originalPrice: 19999,
      image: '🎧',
      rating: 4.6,
      reviews: 234,
      inStock: true,
      features: ['ANC', '360 Audio', 'IPX7 Rating', '29hrs Battery'],
      colors: ['Graphite', 'White', 'Bora Purple']
    },
    {
      id: 8,
      name: 'Anker PowerCore 20000mAh',
      brand: 'Anker',
      category: 'accessories',
      price: 2999,
      originalPrice: 3499,
      image: '🔋',
      rating: 4.7,
      reviews: 445,
      inStock: true,
      features: ['20000mAh Capacity', 'Fast Charging', 'Dual USB Ports', 'LED Indicator'],
      colors: ['Black', 'White']
    },
    {
      id: 9,
      name: 'Belkin MagSafe Wireless Charger',
      brand: 'Belkin',
      category: 'accessories',
      price: 4999,
      originalPrice: 5999,
      image: '🔌',
      rating: 4.5,
      reviews: 178,
      inStock: true,
      features: ['15W Fast Charging', 'MagSafe Compatible', 'LED Indicator', 'Case Friendly'],
      colors: ['White', 'Black']
    },
    {
      id: 10,
      name: 'Spigen Tough Armor Case',
      brand: 'Spigen',
      category: 'accessories',
      price: 1999,
      originalPrice: 2499,
      image: '📱',
      rating: 4.6,
      reviews: 289,
      inStock: true,
      features: ['Military Grade Protection', 'Air Cushion Technology', 'Kickstand', 'Wireless Charging Compatible'],
      colors: ['Black', 'Gunmetal', 'Rose Gold']
    },
    {
      id: 11,
      name: 'SanDisk Ultra 128GB USB-C',
      brand: 'SanDisk',
      category: 'accessories',
      price: 1299,
      originalPrice: 1599,
      image: '💾',
      rating: 4.4,
      reviews: 156,
      inStock: true,
      features: ['128GB Storage', 'USB-C 3.2', 'Up to 400MB/s', 'Compact Design'],
      colors: ['Black']
    },
    {
      id: 12,
      name: 'Logitech MX Master 3S',
      brand: 'Logitech',
      category: 'accessories',
      price: 8999,
      originalPrice: 9999,
      image: '🖱️',
      rating: 4.8,
      reviews: 234,
      inStock: true,
      features: ['Ergonomic Design', 'Multi-Device', 'Fast Scrolling', '70-day Battery'],
      colors: ['Graphite', 'Pale Gray']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'under-5000' && product.price < 5000) ||
                        (priceRange === '5000-25000' && product.price >= 5000 && product.price <= 25000) ||
                        (priceRange === '25000-50000' && product.price > 25000 && product.price <= 50000) ||
                        (priceRange === 'above-50000' && product.price > 50000);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleAddToCart = (product) => {
    addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      brand: product.brand,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Our <span className="text-blue-600">Products</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Discover the latest mobile phones and premium accessories from top brands
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600"
            >
              <option value="all">All Prices</option>
              <option value="under-5000">Under ₹5,000</option>
              <option value="5000-25000">₹5,000 - ₹25,000</option>
              <option value="25000-50000">₹25,000 - ₹50,000</option>
              <option value="above-50000">Above ₹50,000</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All Products' : 
               activeCategory === 'mobiles' ? 'Mobile Phones' : 'Accessories'} 
              <span className="text-gray-600 ml-2">({filteredProducts.length} items)</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg group">
                
                {/* Product Image */}
                <div className="text-center mb-4 relative">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  {product.originalPrice > product.price && (
                    <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                  <button className="absolute top-2 right-2 p-2 bg-gray-100 rounded-full text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500 hover:text-white">
                    <FiHeart className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">{product.brand}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900 text-sm ml-1 font-medium">{product.rating}</span>
                    </div>
                    <span className="text-gray-600 text-sm">({product.reviews} reviews)</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="text-gray-700 text-xs flex items-center">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Colors */}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-xs">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300 hover:scale-110 transition-transform duration-200"
                          style={{
                            backgroundColor: color.toLowerCase().includes('black') ? '#000' :
                                           color.toLowerCase().includes('white') ? '#fff' :
                                           color.toLowerCase().includes('blue') ? '#3b82f6' :
                                           color.toLowerCase().includes('red') ? '#ef4444' :
                                           color.toLowerCase().includes('green') ? '#10b981' :
                                           color.toLowerCase().includes('purple') ? '#8b5cf6' :
                                           color.toLowerCase().includes('yellow') ? '#f59e0b' :
                                           color.toLowerCase().includes('gray') ? '#6b7280' : '#9ca3af'
                          }}
                        ></div>
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-gray-600 text-xs">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-500 line-through text-sm">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      product.inStock ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    <button className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all duration-300">
                      <FiHeart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best in mobile technology with our premium products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🚚',
                title: 'Free Delivery',
                description: 'Free delivery on orders above ₹999'
              },
              {
                icon: '🔒',
                title: 'Secure Payment',
                description: '100% secure payment with multiple options'
              },
              {
                icon: '↩️',
                title: 'Easy Returns',
                description: '7-day easy return and exchange policy'
              },
              {
                icon: '🛡️',
                title: 'Warranty',
                description: 'Official warranty on all products'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;