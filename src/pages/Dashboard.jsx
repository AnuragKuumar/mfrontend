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
import { 
  MdPhoneIphone,
  MdBatteryChargingFull,
  MdPowerInput,
  MdVolumeUp,
  MdWaterDrop,
  MdCameraAlt
} from 'react-icons/md';
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
        return 'text-yellow-700 bg-yellow-100 border border-yellow-200';
      case 'confirmed':
        return 'text-blue-700 bg-blue-100 border border-blue-200';
      case 'in progress':
      case 'processing':
        return 'text-purple-700 bg-purple-100 border border-purple-200';
      case 'completed':
      case 'delivered':
        return 'text-green-700 bg-green-100 border border-green-200';
      case 'cancelled':
        return 'text-red-700 bg-red-100 border border-red-200';
      default:
        return 'text-gray-700 bg-gray-100 border border-gray-200';
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

  const getServiceIcon = (serviceType) => {
    const service = serviceType?.toLowerCase() || '';
    if (service.includes('display') || service.includes('screen')) {
      return <MdPhoneIphone className="w-5 h-5 text-white" />;
    } else if (service.includes('battery')) {
      return <MdBatteryChargingFull className="w-5 h-5 text-white" />;
    } else if (service.includes('charging') || service.includes('port')) {
      return <MdPowerInput className="w-5 h-5 text-white" />;
    } else if (service.includes('speaker') || service.includes('mic') || service.includes('audio')) {
      return <MdVolumeUp className="w-5 h-5 text-white" />;
    } else if (service.includes('water') || service.includes('damage')) {
      return <MdWaterDrop className="w-5 h-5 text-white" />;
    } else if (service.includes('camera')) {
      return <MdCameraAlt className="w-5 h-5 text-white" />;
    } else {
      return <FiTool className="w-5 h-5 text-white" />;
    }
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
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <FiUser className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your repair bookings and orders from your dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-600">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 p-2 bg-gray-100 rounded-lg border border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: <FiUser className="w-4 h-4" /> },
            { id: 'bookings', label: 'Repair Bookings', icon: <FiTool className="w-4 h-4" /> },
            { id: 'orders', label: 'Orders', icon: <FiShoppingBag className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3"></div>
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  to="/repair-booking"
                  className="group flex items-center space-x-4 p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FiPlus className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Book New Repair</h3>
                    <p className="text-gray-600">Schedule a repair service for your device</p>
                  </div>
                </Link>
                <Link
                  to="/store"
                  className="group flex items-center space-x-4 p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FiShoppingBag className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Shop Products</h3>
                    <p className="text-gray-600">Browse mobile accessories and parts</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                    Recent Bookings
                  </h2>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div 
                      key={booking._id} 
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          {getServiceIcon(booking.serviceType)}
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">{booking.deviceBrand} {booking.deviceModel}</p>
                          <p className="text-gray-600 text-sm">{booking.serviceType}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiTool className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">No bookings yet</p>
                      <Link 
                        to="/repair-booking" 
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Book Your First Repair
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div 
                      key={order._id} 
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <FiShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">Order #{order.orderNumber}</p>
                          <p className="text-gray-600 text-sm">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiShoppingBag className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">No orders yet</p>
                      <Link 
                        to="/store" 
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3"></div>
                Repair Bookings
              </h2>
              <Link to="/repair-booking" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <FiPlus className="w-4 h-4 mr-2" />
                Book New Repair
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Device</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Service</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Date</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Total</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-gray-100 hover:bg-blue-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            {getServiceIcon(booking.serviceType)}
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">{booking.deviceBrand}</p>
                            <p className="text-gray-600 text-sm">{booking.deviceModel}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{booking.serviceType}</td>
                      <td className="py-4 px-4 text-gray-700">{formatDate(booking.createdAt)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-semibold">
                        {formatCurrency(booking.totalCost)}
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg">
                          <FiEye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiTool className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg mb-6">No repair bookings found</p>
                  <Link to="/repair-booking" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <FiPlus className="w-4 h-4 mr-2" />
                    Book Your First Repair
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3"></div>
                Orders
              </h2>
              <Link to="/store" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <FiShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Order #</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Date</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Items</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Total</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FiShoppingBag className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-900 font-medium">#{order.orderNumber}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{formatDate(order.createdAt)}</td>
                      <td className="py-4 px-4 text-gray-700">{order.items.length} items</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-semibold">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all">
                          <FiEye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg mb-6">No orders found</p>
                  <Link to="/store" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
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