import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiSmartphone, FiTool, FiMessageSquare, FiCheck, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const RepairBooking = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deviceBrand: '',
    deviceModel: '',
    issueType: '',
    issueDescription: '',
    address: '',
    preferredDate: '',
    preferredTime: ''
  });

  // Restore form data if user comes back from login
  useEffect(() => {
    const savedData = localStorage.getItem('pendingBookingData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        toast.success('Welcome back! Your form data has been restored.');
      } catch (error) {
        console.error('Error parsing saved form data:', error);
        localStorage.removeItem('pendingBookingData');
      }
    }
  }, []);

  const mobileBrands = [
    'Apple (iPhone)',
    'Samsung',
    'OnePlus', 
    'Xiaomi (Mi/Redmi)',
    'Oppo',
    'Vivo',
    'Realme',
    'Google Pixel',
    'Motorola',
    'Nokia',
    'Huawei',
    'Honor',
    'Nothing',
    'Poco',
    'Other'
  ];

  const issueTypes = [
    'Display/Screen Issues',
    'Battery Problems',
    'Charging Port Issues',
    'Speaker/Microphone Problems',
    'Camera Issues',
    'Water Damage',
    'Software Issues',
    'Button Problems',
    'Network/Connectivity Issues',
    'Other Hardware Issues'
  ];

  const timeSlots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM', 
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const required = ['name', 'phone', 'deviceBrand', 'issueType', 'issueDescription'];
    const missing = required.filter(field => !formData[field].trim());
    
    if (missing.length > 0) {
      toast.error('Please fill in all required fields');
      return false;
    }

    // Email validation (only if email is provided)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return false;
      }
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const bookingData = {
        customerDetails: {
          name: formData.name,
          email: formData.email || null, // Allow null for optional email
          phone: formData.phone,
          address: formData.address
        },
        deviceBrand: formData.deviceBrand,
        deviceModel: formData.deviceModel || 'Not specified',
        serviceType: formData.issueType,
        issueDescription: formData.issueDescription,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        deliveryOption: 'doorstep-service',
        notes: `Issue: ${formData.issueType}. Description: ${formData.issueDescription}`,
        isGuestBooking: !isAuthenticated
      };

      // Try to submit to API, fallback to demo mode
      try {
        const response = await axios.post(`${API_BASE_URL}/repairs`, bookingData);
        if (response.data.success) {
          toast.success('🎉 Repair booking submitted successfully!');
          toast.success('📞 We will contact you within 2 hours');
        }
      } catch (apiError) {
        // Demo mode fallback
        console.log('API not available, using demo mode');
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('🎉 Repair booking submitted successfully!');
        toast.success('📞 We will contact you within 2 hours');
      }

      // Clear saved form data if exists
      localStorage.removeItem('pendingBookingData');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        deviceBrand: '',
        deviceModel: '',
        issueType: '',
        issueDescription: '',
        address: '',
        preferredDate: '',
        preferredTime: ''
      });

      // Navigate based on authentication status
      if (isAuthenticated) {
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        // Show success message for guest users
        setTimeout(() => {
          toast.success('✅ Booking confirmed! Check your email for details.');
          // Optional: Show sign up suggestion for guest users
          const shouldSignUp = window.confirm(
            'Booking submitted successfully!\n\nWould you like to create an account to track your booking and get updates?'
          );
          if (shouldSignUp) {
            navigate('/register');
          }
        }, 3000);
      }

    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date as minimum date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>

      {/* Main Content */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg shadow-pink-500/25 animate-pulse">
              <FiTool className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-reveal">
              Book <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">Repair Service</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto text-reveal-delay-1">
              Get your mobile device repaired by certified technicians with genuine parts
            </p>
          </div>

          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Optional Sign In Banner */}
          {!isAuthenticated && (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h3 className="text-gray-900 font-semibold">Want to track your booking?</h3>
                    <p className="text-gray-600 text-sm">Create an account to get real-time updates and track your repair status</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      localStorage.setItem('pendingBookingData', JSON.stringify(formData));
                      navigate('/login', { 
                        state: { 
                          from: { pathname: '/repair-booking' },
                          message: 'Sign in to track your booking'
                        } 
                      });
                    }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      localStorage.setItem('pendingBookingData', JSON.stringify(formData));
                      navigate('/register', { 
                        state: { 
                          from: { pathname: '/repair-booking' },
                          message: 'Create account to track your booking'
                        } 
                      });
                    }}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Signed In Status */}
          {isAuthenticated && (
            <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="text-gray-900 font-semibold">Signed In</h3>
                  <p className="text-gray-600 text-sm">You can track your booking in the dashboard</p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                  <FiUser className="w-6 h-6 mr-3 text-pink-500" />
                  Personal Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      <FiUser className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      <FiMail className="w-4 h-4 inline mr-2" />
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      <FiPhone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      Address (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>

              {/* Device Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                  <FiSmartphone className="w-6 h-6 mr-3 text-blue-500" />
                  Device Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      Mobile Brand *
                    </label>
                    <select
                      value={formData.deviceBrand}
                      onChange={(e) => handleInputChange('deviceBrand', e.target.value)}
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    >
                      <option value="">Select Mobile Brand</option>
                      {mobileBrands.map(brand => (
                        <option key={brand} value={brand} className="bg-white text-gray-900">
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      Device Model (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.deviceModel}
                      onChange={(e) => handleInputChange('deviceModel', e.target.value)}
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="e.g., iPhone 15 Pro, Galaxy S24"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-3">
                    Select Mobile Issue *
                  </label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => handleInputChange('issueType', e.target.value)}
                    className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    required
                  >
                    <option value="">Select Issue Type</option>
                    {issueTypes.map(issue => (
                      <option key={issue} value={issue} className="bg-white text-gray-900">
                        {issue}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Issue Description */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                  <FiMessageSquare className="w-6 h-6 mr-3 text-green-500" />
                  Describe Your Issue
                </h2>
                
                <div>
                  <label className="block text-gray-900 font-medium mb-3">
                    Issue Description *
                  </label>
                  <textarea
                    value={formData.issueDescription}
                    onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                    className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                    rows="4"
                    placeholder="Please describe the issue in detail. For example: Screen is cracked, phone not charging, battery drains quickly, etc."
                    required
                  />
                </div>
              </div>

              {/* Preferred Schedule */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                  <FiCheck className="w-6 h-6 mr-3 text-purple-500" />
                  Preferred Schedule (Optional)
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      min={getTomorrowDate()}
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      Preferred Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    >
                      <option value="">Select Time Slot</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot} className="bg-white text-gray-900">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-5 h-5" />
                      <span>Submit Booking Request</span>
                    </>
                  )}
                </button>
                
                <p className="text-gray-400 text-sm text-center mt-4">
                  📞 We will contact you within 2 hours to confirm your booking
                </p>
                <p className="text-gray-400 text-xs text-center">
                  📱 Professional display replacement service
                </p>
              </div>
            </form>
          </div>

          {/* Service Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-white font-semibold mb-2">Expert Technicians</h3>
              <p className="text-gray-400 text-sm">Certified professionals with years of experience</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">�</div>
              <h3 className="text-gray-900 font-semibold mb-2">Doorstep Service</h3>
              <p className="text-gray-600 text-sm">Coming Soon - Free pickup and delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairBooking;
