import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiUser, 
  FiTool, 
  FiShoppingBag, 
  FiClock, 
  FiCheck, 
  FiEye,
  FiPlus
} from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Demo mode - use mock data
      if (localStorage.getItem('token') === 'demo-jwt-token-123') {
        const mockBookings = [
          {
            _id: '1',
            deviceBrand: 'Apple',
            deviceModel: 'iPhone 15 Pro',
            serviceType: 'Display Replacement',
            status: 'In Progress',
            totalCost: 12999,
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            deviceBrand: 'Samsung',
            deviceModel: 'Galaxy S24',
            serviceType: 'Battery Replacement',
            status: 'Completed',
            totalCost: 2999,
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        
        const mockOrders = [
          {
            _id: '1',
            orderNumber: 'GF202412300001',
            items: [{ product: { name: 'iPhone Case' }, quantity: 1 }],
            orderStatus: 'Delivered',
            total: 1999,
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ];
        
        setBookings(mockBookings);
        setOrders(mockOrders);
        setLoading(false);
        return;
      }
      
      const [bookingsRes, ordersRes] = await Promise.all([
        axios.get('/api/repairs/my-bookings'),
        axios.get('/api/orders/my-orders')
      ]);
      
      setBookings(bookingsRes.data.bookings || []);
      setOrders(ordersRes.data.orders || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Don't show error toast in demo mode
      if (localStorage.getItem('token') !== 'demo-jwt-token-123') {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'confirmed':
        return 'text-blue-400 bg-blue-400/10';
      case 'in progress':
      case 'processing':
        return 'text-purple-400 bg-purple-400/10';
      case 'completed':
      case 'delivered':
        return 'text-green-400 bg-green-400/10';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: <FiTool className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: <FiShoppingBag className="w-6 h-6" />,
      color: 'text-green-400'
    },
    {
      title: 'Pending Repairs',
      value: bookings.filter(b => ['pending', 'confirmed', 'in progress'].includes(b.status?.toLowerCase())).length,
      icon: <FiClock className="w-6 h-6" />,
      color: 'text-yellow-400'
    },
    {
      title: 'Completed Repairs',
      value: bookings.filter(b => b.status?.toLowerCase() === 'completed').length,
      icon: <FiCheck className="w-6 h-6" />,
      color: 'text-purple-400'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(144)].map((_, i) => (
              <div 
                key={i} 
                className="border border-pink-500/20 animate-pulse" 
                style={{animationDelay: `${i * 0.1}s`}}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header with Gradient */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg shadow-pink-500/25">
            <FiUser className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your repair bookings and orders from your dashboard
          </p>
        </div>

        {/* Stats Cards with Colorful Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
              style={{
                background: 'rgba(31, 41, 55, 0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div 
                  className={`p-3 rounded-xl shadow-lg text-white`}
                  style={{
                    background: index === 0 ? 'linear-gradient(to right, #3b82f6, #2563eb)' :
                               index === 1 ? 'linear-gradient(to right, #10b981, #059669)' :
                               index === 2 ? 'linear-gradient(to right, #f59e0b, #d97706)' :
                               'linear-gradient(to right, #8b5cf6, #7c3aed)'
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs with Modern Design */}
        <div 
          className="flex space-x-2 mb-8 p-2 rounded-2xl border border-gray-700/50"
          style={{
            background: 'rgba(31, 41, 55, 0.5)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {[
            { id: 'overview', label: 'Overview', icon: <FiUser className="w-4 h-4" /> },
            { id: 'bookings', label: 'Repair Bookings', icon: <FiTool className="w-4 h-4" /> },
            { id: 'orders', label: 'Orders', icon: <FiShoppingBag className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                activeTab === tab.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
              style={{
                background: activeTab === tab.id 
                  ? 'linear-gradient(to right, #ec4899, #8b5cf6)' 
                  : 'transparent',
                boxShadow: activeTab === tab.id 
                  ? '0 10px 25px rgba(236, 72, 153, 0.25)' 
                  : 'none'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions with Gradient Cards */}
            <div 
              className="rounded-2xl p-8 border border-gray-700/50 shadow-xl"
              style={{
                background: 'rgba(31, 41, 55, 0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div 
                  className="w-8 h-8 rounded-lg mr-3"
                  style={{background: 'linear-gradient(to right, #ec4899, #8b5cf6)'}}
                ></div>
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  to="/repair-booking"
                  className="group flex items-center space-x-4 p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  style={{background: 'rgba(236, 72, 153, 0.1)'}}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pink-500/25 transition-all duration-300"
                    style={{background: 'linear-gradient(to right, #ec4899, #8b5cf6)'}}
                  >
                    <FiPlus className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Book New Repair</h3>
                    <p className="text-gray-400">Schedule a repair service for your device</p>
                  </div>
                </Link>
                <Link
                  to="/store"
                  className="group flex items-center space-x-4 p-6 rounded-xl border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  style={{background: 'rgba(16, 185, 129, 0.1)'}}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 transition-all duration-300"
                    style={{background: 'linear-gradient(to right, #10b981, #3b82f6)'}}
                  >
                    <FiShoppingBag className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Shop Products</h3>
                    <p className="text-gray-400">Browse mobile accessories and parts</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity with Colorful Design */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
              <div 
                className="rounded-2xl p-6 border border-gray-700/50 shadow-xl"
                style={{
                  background: 'rgba(31, 41, 55, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <div 
                      className="w-6 h-6 rounded mr-3"
                      style={{background: 'linear-gradient(to right, #3b82f6, #8b5cf6)'}}
                    ></div>
                    Recent Bookings
                  </h2>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div 
                      key={booking._id} 
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300"
                      style={{background: 'rgba(55, 65, 81, 0.5)'}}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{background: 'linear-gradient(to right, #3b82f6, #8b5cf6)'}}
                        >
                          <FiTool className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{booking.deviceBrand} {booking.deviceModel}</p>
                          <p className="text-gray-400 text-sm">{booking.serviceType}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <div className="text-center py-8">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{background: 'linear-gradient(to right, #4b5563, #374151)'}}
                      >
                        <FiTool className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-400 mb-4">No bookings yet</p>
                      <Link 
                        to="/repair-booking" 
                        className="inline-flex items-center px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                        style={{background: 'linear-gradient(to right, #ec4899, #8b5cf6)'}}
                      >
                        Book Your First Repair
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Orders */}
              <div 
                className="rounded-2xl p-6 border border-gray-700/50 shadow-xl"
                style={{
                  background: 'rgba(31, 41, 55, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <div 
                      className="w-6 h-6 rounded mr-3"
                      style={{background: 'linear-gradient(to right, #10b981, #3b82f6)'}}
                    ></div>
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-green-400 hover:text-green-300 text-sm font-medium hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div 
                      key={order._id} 
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-600/30 hover:border-green-500/30 transition-all duration-300"
                      style={{background: 'rgba(55, 65, 81, 0.5)'}}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{background: 'linear-gradient(to right, #10b981, #3b82f6)'}}
                        >
                          <FiShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Order #{order.orderNumber}</p>
                          <p className="text-gray-400 text-sm">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="text-center py-8">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{background: 'linear-gradient(to right, #4b5563, #374151)'}}
                      >
                        <FiShoppingBag className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-400 mb-4">No orders yet</p>
                      <Link 
                        to="/store" 
                        className="inline-flex items-center px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                        style={{background: 'linear-gradient(to right, #10b981, #3b82f6)'}}
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                Repair Bookings
              </h2>
              <Link to="/repair-booking" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 font-medium">
                <FiPlus className="w-4 h-4 mr-2" />
                Book New Repair
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600/50">
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Device</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Service</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Date</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Total</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <FiTool className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{booking.deviceBrand}</p>
                            <p className="text-gray-400 text-sm">{booking.deviceModel}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{booking.serviceType}</td>
                      <td className="py-4 px-4 text-gray-300">{formatDate(booking.createdAt)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white font-semibold">
                        {formatCurrency(booking.totalCost)}
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-300">
                          <FiEye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiTool className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg mb-6">No repair bookings found</p>
                  <Link to="/repair-booking" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 font-medium">
                    <FiPlus className="w-4 h-4 mr-2" />
                    Book Your First Repair
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mr-3"></div>
                Orders
              </h2>
              <Link to="/store" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 font-medium">
                <FiShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600/50">
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Order #</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Date</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Items</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Total</th>
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <FiShoppingBag className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium">#{order.orderNumber}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{formatDate(order.createdAt)}</td>
                      <td className="py-4 px-4 text-gray-300">{order.items.length} items</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white font-semibold">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-all duration-300">
                          <FiEye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg mb-6">No orders found</p>
                  <Link to="/store" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 font-medium">
                    <FiShoppingBag className="w-4 h-4 mr-2" />
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;