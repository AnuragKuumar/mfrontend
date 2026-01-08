import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPhone, 
  FiCheck, 
  FiCheckCircle, 
  FiClock, 
  FiUser, 
  FiSmartphone,
  FiRefreshCw,
  FiEye,
  FiX,
  FiLogOut,
  FiMessageSquare,
  FiTrash2
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalBookings: 0,
    totalProducts: 0
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      toast.error('Please login as admin first');
      navigate('/admin/login');
      return;
    }
    
    try {
      setAdminUser(JSON.parse(user));
      fetchDashboardData();
    } catch (error) {
      console.error('Error parsing admin user:', error);
      navigate('/admin/login');
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // Fetch dashboard stats and bookings
      const [dashboardRes, bookingsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/dashboard`, config),
        axios.get(`${API_BASE_URL}/admin/bookings?limit=20`, config)
      ]);

      if (dashboardRes.data.success) {
        setStats(dashboardRes.data.stats);
      }

      if (bookingsRes.data.success) {
        setBookings(bookingsRes.data.bookings);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        handleLogout();
      } else {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.put(
        `${API_BASE_URL}/admin/bookings/${bookingId}`,
        { status },
        config
      );

      if (response.data.success) {
        toast.success('Booking status updated successfully');
        if (response.data.smsNotification) {
          toast.success('📱 Customer notified via SMS', { duration: 3000 });
        }
        fetchDashboardData(); // Refresh data
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
    }
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone, customerName, deviceModel) => {
    const message = `Hello ${customerName}, this is regarding your ${deviceModel} repair booking. How can we help you?`;
    const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSMS = async (phone, customerName) => {
    const message = prompt(`Send SMS to ${customerName}:`, 'Your device repair update from Mobile Repair...');
    if (message) {
      try {
        const token = localStorage.getItem('adminToken');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.post(
          `${API_BASE_URL}/admin/send-sms`,
          { phone, customerName, message },
          config
        );

        if (response.data.success) {
          toast.success('📱 SMS sent successfully!');
        }
      } catch (error) {
        console.error('Error sending SMS:', error);
        toast.error('Failed to send SMS');
      }
    }
  };

  const handleDeleteBooking = async (bookingId, customerName, status) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the booking for ${customerName}?\n\nStatus: ${status}\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.delete(
        `${API_BASE_URL}/admin/bookings/${bookingId}`,
        config
      );

      if (response.data.success) {
        toast.success('🗑️ Booking deleted successfully');
        fetchDashboardData(); // Refresh data
        setShowModal(false); // Close modal if open
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || 'Cannot delete this booking');
      } else {
        toast.error('Failed to delete booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiClock className="w-4 h-4" />;
      case 'accepted': return <FiCheck className="w-4 h-4" />;
      case 'in-progress': return <FiRefreshCw className="w-4 h-4" />;
      case 'completed': return <FiCheckCircle className="w-4 h-4" />;
      case 'cancelled': return <FiX className="w-4 h-4" />;
      default: return <FiClock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">Welcome back, {adminUser?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center sm:justify-start px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors w-full sm:w-auto"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiUser className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiSmartphone className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <FiSmartphone className="w-4 h-4 sm:w-6 sm:h-6 text-pink-600" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">Recent Repair Bookings</h2>
              <button
                onClick={fetchDashboardData}
                className="flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.customerName || booking.customerDetails?.name || 'No name'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.customerPhone || booking.customerDetails?.phone || 'No phone'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.deviceModel}</div>
                      <div className="text-sm text-gray-500">{booking.deviceBrand}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {booking.issueDescription}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1">{booking.status === 'in-progress' ? 'In Progress' : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCall(booking.customerPhone || booking.customerDetails?.phone)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Call Customer"
                        >
                          <FiPhone className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleWhatsApp(
                            booking.customerPhone || booking.customerDetails?.phone, 
                            booking.customerName || booking.customerDetails?.name, 
                            `${booking.deviceBrand} ${booking.deviceModel}`
                          )}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="WhatsApp Customer"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSMS(
                            booking.customerPhone || booking.customerDetails?.phone, 
                            booking.customerName || booking.customerDetails?.name
                          )}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Send SMS"
                        >
                          <FiMessageSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(
                            booking.id, 
                            booking.customerName || booking.customerDetails?.name,
                            booking.status
                          )}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete Booking"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {booking.customerName || booking.customerDetails?.name || 'No name'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {booking.customerPhone || booking.customerDetails?.phone || 'No phone'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {booking.deviceBrand} {booking.deviceModel}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1">{booking.status === 'in-progress' ? 'In Progress' : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      <span className="font-medium">Issue:</span> {booking.issueDescription}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleCall(booking.customerPhone || booking.customerDetails?.phone)}
                        className="flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-full transition-colors"
                        title="Call Customer"
                      >
                        <FiPhone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleWhatsApp(
                          booking.customerPhone || booking.customerDetails?.phone, 
                          booking.customerName || booking.customerDetails?.name, 
                          `${booking.deviceBrand} ${booking.deviceModel}`
                        )}
                        className="flex items-center justify-center w-8 h-8 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-full transition-colors"
                        title="WhatsApp Customer"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSMS(
                          booking.customerPhone || booking.customerDetails?.phone, 
                          booking.customerName || booking.customerDetails?.name
                        )}
                        className="flex items-center justify-center w-8 h-8 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-full transition-colors"
                        title="Send SMS"
                      >
                        <FiMessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(
                          booking.id, 
                          booking.customerName || booking.customerDetails?.name,
                          booking.status
                        )}
                        className="flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Booking"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowModal(true);
                      }}
                      className="px-3 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-12">
              <FiSmartphone className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
              <p className="mt-1 text-sm text-gray-500">No repair bookings found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
          <div className="relative top-4 sm:top-20 mx-auto border max-w-md sm:max-w-lg shadow-lg rounded-md bg-white">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Customer:</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedBooking.customerName || selectedBooking.customerDetails?.name || 'No name'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone:</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedBooking.customerPhone || selectedBooking.customerDetails?.phone || 'No phone'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Device:</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedBooking.deviceBrand} {selectedBooking.deviceModel}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Issue:</label>
                  <p className="text-sm text-gray-900 mt-1 break-words">{selectedBooking.issueDescription}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Current Status:</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                      {getStatusIcon(selectedBooking.status)}
                      <span className="ml-1">{selectedBooking.status === 'in-progress' ? 'In Progress' : selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700 mb-3 block">Update Status:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'in-progress')}
                    className="w-full px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                    className="w-full px-4 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Complete
                  </button>
                </div>
                
                {/* Delete Button - Admin can delete any booking */}
                <div className="mt-4">
                  <button
                    onClick={() => handleDeleteBooking(
                      selectedBooking.id, 
                      selectedBooking.customerName || selectedBooking.customerDetails?.name,
                      selectedBooking.status
                    )}
                    className="w-full px-4 py-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span>Delete Booking</span>
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    ⚠️ This action cannot be undone
                  </p>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Actions:</label>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleCall(selectedBooking.customerPhone || selectedBooking.customerDetails?.phone)}
                    className="flex items-center justify-center w-12 h-12 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-full transition-colors"
                    title="Call Customer"
                  >
                    <FiPhone className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp(
                      selectedBooking.customerPhone || selectedBooking.customerDetails?.phone, 
                      selectedBooking.customerName || selectedBooking.customerDetails?.name, 
                      `${selectedBooking.deviceBrand} ${selectedBooking.deviceModel}`
                    )}
                    className="flex items-center justify-center w-12 h-12 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-full transition-colors"
                    title="WhatsApp Customer"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleSMS(
                      selectedBooking.customerPhone || selectedBooking.customerDetails?.phone, 
                      selectedBooking.customerName || selectedBooking.customerDetails?.name
                    )}
                    className="flex items-center justify-center w-12 h-12 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-full transition-colors"
                    title="Send SMS"
                  >
                    <FiMessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;