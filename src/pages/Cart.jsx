import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft, FiShield, FiTruck, FiCreditCard } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const calculateShipping = () => {
    return total >= 999 ? 0 : 49;
  };

  const calculateTax = () => {
    return Math.round(total * 0.18); // 18% GST
  };

  const calculateFinalTotal = () => {
    return total + calculateShipping() + calculateTax();
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const validateAddress = () => {
    const required = ['name', 'phone', 'street', 'city', 'state', 'pincode'];
    return required.every(field => shippingAddress[field].trim() !== '');
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    if (!validateAddress()) {
      toast.error('Please fill in all required address fields');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod: 'COD', // Default to Cash on Delivery
        notes: ''
      };

      const response = await axios.post('/api/orders', orderData);
      
      if (response.data.success) {
        toast.success('Order placed successfully!');
        clearCart();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-white backdrop-blur-lg rounded-3xl p-12 border border-gray-200 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 shadow-xl">
              <div className="text-8xl mb-6 animate-bounce">🛒</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <FiShoppingBag className="w-5 h-5" />
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      <div className="glow-orb glow-orb-3"></div>
      
      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Shopping <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cart</span>
              </h1>
              <p className="text-gray-600 text-lg">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-300 border border-gray-300 transform hover:scale-105 shadow-sm"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => {
              // Handle both old format (with product wrapper) and new format (direct product)
              const product = item.product || item;
              const productId = product._id || product.id;
              const productName = product.name || 'Unknown Product';
              const productPrice = product.price || 0;
              const productBrand = product.brand || '';
              const productImage = product.image || '📱';
              const itemQuantity = item.quantity || 1;
              
              return (
                <div 
                  key={productId} 
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-28 h-28 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-300 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
                        <img
                          src={product.images?.[0] || product.image || 'https://via.placeholder.com/112x112?text=Product'}
                          alt={productName}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            // Try next image in array or fallback
                            if (product.images && product.images.length > 1) {
                              e.target.src = product.images[1];
                            } else {
                              e.target.src = `https://via.placeholder.com/112x112/1f2937/ffffff?text=${encodeURIComponent(productName.substring(0, 10))}`;
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        {productName}
                      </h3>
                      {productBrand && (
                        <p className="text-gray-400 text-sm mb-3 font-medium">
                          Brand: {productBrand}
                        </p>
                      )}
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {formatCurrency(productPrice)}
                        </span>
                        {product.originalPrice && product.originalPrice > productPrice && (
                          <span className="text-gray-500 line-through text-lg">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && product.originalPrice > productPrice && (
                        <div className="mt-2">
                          <span className="text-green-400 text-sm font-medium">
                            You save {formatCurrency(product.originalPrice - productPrice)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 bg-white border border-gray-300/50 backdrop-blur-sm rounded-xl p-3 border border-gray-300">
                      <button
                        onClick={() => handleQuantityChange(productId, itemQuantity - 1)}
                        className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-blue-500 hover:to-blue-600 rounded-full flex items-center justify-center text-gray-900 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 border border-gray-300">
                        <span className="text-gray-900 font-bold text-lg w-8 text-center block">
                          {itemQuantity}
                        </span>
                      </div>
                      <button
                        onClick={() => handleQuantityChange(productId, itemQuantity + 1)}
                        className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-blue-500 hover:to-blue-600 rounded-full flex items-center justify-center text-gray-900 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Item Total & Remove - Now Inside Card */}
                    <div className="flex flex-col items-center space-y-3">
                      <div className="bg-white border border-gray-300/80 backdrop-blur-sm rounded-lg p-4 border border-gray-300/50 min-w-[120px]">
                        <div className="text-xs text-gray-400 mb-1 text-center">Total</div>
                        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
                          {formatCurrency(productPrice * itemQuantity)}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(productId)}
                        className="w-10 h-10 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-gray-900 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 border border-red-500/30 hover:border-red-500"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

              {/* Clear Cart */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300 hover:underline"
                >
                  Clear All Items
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              
              {/* Summary Card */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 transition-all duration-500 sticky top-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiShield className="w-6 h-6 mr-3 text-blue-500" />
                  Order Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-semibold">{formatCurrency(total)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <FiTruck className="w-4 h-4 mr-2" />
                      Shipping
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {calculateShipping() === 0 ? (
                        <span className="text-green-400 font-bold">Free</span>
                      ) : (
                        formatCurrency(calculateShipping())
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (GST 18%)</span>
                    <span className="text-gray-900 font-semibold">{formatCurrency(calculateTax())}</span>
                  </div>
                  
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(calculateFinalTotal())}
                      </span>
                    </div>
                  </div>
                </div>

                {total < 999 && (
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <p className="text-blue-400 text-sm text-center">
                      🚚 Add {formatCurrency(999 - total)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                {!showCheckout ? (
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full mt-6 bg-white border border-gray-300 hover:bg-gray-600 text-gray-900 font-medium py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Back to Summary
                  </button>
                )}
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <FiCreditCard className="w-5 h-5 mr-2 text-blue-500" />
                  Payment Options
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      defaultChecked
                      className="text-blue-500"
                    />
                    <label htmlFor="cod" className="text-green-400 font-medium">
                      💰 Cash on Delivery (COD)
                    </label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white border border-gray-300/50 rounded-lg opacity-50">
                    <input
                      type="radio"
                      id="online"
                      name="payment"
                      disabled
                      className="text-blue-500"
                    />
                    <label htmlFor="online" className="text-gray-400">
                      💳 Online Payment (Coming Soon)
                    </label>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
                <FiShield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-gray-900 font-semibold mb-2">Secure Checkout</h4>
                <p className="text-gray-600 text-sm">Your information is protected with 256-bit SSL encryption</p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          {showCheckout && (
            <div className="mt-12">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  🚚 Shipping Address
                </h3>
                
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={shippingAddress.name}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={shippingAddress.email}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                  
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address *"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    required
                  />
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State *"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode *"
                      value={shippingAddress.pincode}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      '🎉 Place Order (COD)'
                    )}
                  </button>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      By placing your order, you agree to our{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-500 underline">
                        Terms & Conditions
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
