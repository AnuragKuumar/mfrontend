import { useState } from 'react';
import { FiSearch, FiPackage, FiTool, FiTruck, FiCheckCircle, FiClock, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const TrackStatus = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackDevice = () => {
    if (!trackingCode.trim()) {
      alert('Please enter a tracking code');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock tracking data
      const mockData = {
        trackingCode: trackingCode,
        deviceInfo: {
          brand: 'Apple',
          model: 'iPhone 14 Pro',
          issue: 'Display Replacement',
          serviceType: 'Doorstep Service'
        },
        currentStatus: 'In Progress',
        estimatedCompletion: '2024-01-15',
        timeline: [
          {
            status: 'Booking Confirmed',
            description: 'Your repair booking has been confirmed',
            timestamp: '2024-01-10 10:30 AM',
            completed: true,
            icon: <FiCheckCircle className="w-5 h-5" />
          },
          {
            status: 'Device Picked Up',
            description: 'Device collected from your location',
            timestamp: '2024-01-11 02:15 PM',
            completed: true,
            icon: <FiPackage className="w-5 h-5" />
          },
          {
            status: 'Diagnosis Complete',
            description: 'Device diagnosis completed, repair in progress',
            timestamp: '2024-01-12 11:45 AM',
            completed: true,
            icon: <FiTool className="w-5 h-5" />
          },
          {
            status: 'Repair In Progress',
            description: 'Display replacement is currently being performed',
            timestamp: '2024-01-13 09:20 AM',
            completed: true,
            icon: <FiTool className="w-5 h-5" />
          },
          {
            status: 'Quality Check',
            description: 'Final quality testing and verification',
            timestamp: 'Expected: 2024-01-14 03:00 PM',
            completed: false,
            icon: <FiCheckCircle className="w-5 h-5" />
          },
          {
            status: 'Ready for Delivery',
            description: 'Device ready for pickup/delivery',
            timestamp: 'Expected: 2024-01-15 10:00 AM',
            completed: false,
            icon: <FiTruck className="w-5 h-5" />
          }
        ],
        technician: {
          name: 'Rajesh Kumar',
          phone: '+91 7407926912 / 9800999600',
          experience: '5+ years'
        },
        serviceCenter: {
          name: 'Mobile repair Service Center - Durgapur',
          address: 'Ananda Gopal, Bhiringi Girls school, Benachity, Durgapur, West Bengal 713213',
          phone: '+91 7407926912 / 9800999600'
        }
      };

      setTrackingResult(mockData);
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Booking Confirmed':
        return 'text-blue-500';
      case 'Device Picked Up':
        return 'text-purple-500';
      case 'Diagnosis Complete':
        return 'text-yellow-500';
      case 'Repair In Progress':
        return 'text-orange-500';
      case 'Quality Check':
        return 'text-indigo-500';
      case 'Ready for Delivery':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 shadow-lg">
            <FiSearch className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Repair Service <span className="text-blue-600">Tracking</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Track your device repair status in real-time with our advanced tracking system
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <FiPackage className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Tracking Details</h2>
              <p className="text-gray-600">
                Enter your repair service tracking code to check the current status of your device.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-900 font-medium mb-3">Tracking Code*</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. SR2509010001"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                  <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  You can find this code on your repair receipt or confirmation email
                </p>
              </div>

              <button
                onClick={handleTrackDevice}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Tracking...</span>
                  </>
                ) : (
                  <>
                    <FiSearch className="w-5 h-5" />
                    <span>Track My Device</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingResult && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Device Info Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3"></div>
                    Device Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Tracking Code:</span>
                      <span className="text-gray-900 font-medium bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{trackingResult.trackingCode}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Device:</span>
                      <span className="text-gray-900 font-medium">{trackingResult.deviceInfo.brand} {trackingResult.deviceInfo.model}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Issue:</span>
                      <span className="text-gray-900 font-medium">{trackingResult.deviceInfo.issue}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="text-gray-900 font-medium">{trackingResult.deviceInfo.serviceType}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-lg mr-3"></div>
                    Current Status
                  </h3>
                  <div className="bg-blue-600 rounded-xl p-6 text-center shadow-lg">
                    <div className="text-white font-bold text-2xl mb-2">{trackingResult.currentStatus}</div>
                    <div className="text-blue-100 text-sm">
                      Expected completion: {trackingResult.estimatedCompletion}
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center text-green-600">
                      <FiCheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">On Track</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">Your repair is progressing as scheduled</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg mr-3"></div>
                Repair Timeline
              </h3>
              <div className="space-y-6">
                {trackingResult.timeline.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.completed 
                        ? 'bg-green-500 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold text-lg ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </h4>
                        <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">{step.timestamp}</span>
                      </div>
                      <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.description}
                      </p>
                      {step.completed && (
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center">
                    <FiTool className="w-4 h-4 text-white" />
                  </div>
                  Assigned Technician
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Name:</span>
                    <span className="text-gray-900 font-medium">{trackingResult.technician.name}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Experience:</span>
                    <span className="text-gray-900 font-medium">{trackingResult.technician.experience}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Contact:</span>
                    <a href={`tel:${trackingResult.technician.phone}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {trackingResult.technician.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-lg mr-3 flex items-center justify-center">
                    <FiMapPin className="w-4 h-4 text-white" />
                  </div>
                  Service Center
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 block mb-2">Location:</span>
                    <p className="text-gray-900 font-medium">{trackingResult.serviceCenter.name}</p>
                    <p className="text-gray-700 text-sm mt-1">{trackingResult.serviceCenter.address}</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Phone:</span>
                    <a href={`tel:${trackingResult.serviceCenter.phone}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {trackingResult.serviceCenter.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
              <FiClock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Can't find your tracking code or have questions about your repair? Our support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+917407926912"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
              >
                <FiPhone className="w-5 h-5 mr-2" />
                Call Support: +91 7407926912 / 9800999600
              </a>
              <a
                href="mailto:support@mobilerpairdurgapur.in"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all duration-300"
              >
                <FiMail className="w-5 h-5 mr-2" />
                Email Support
              </a>
            </div>
            
            {/* Quick Tips */}
            <div className="mt-8 grid md:grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <FiSearch className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="text-gray-900 font-medium mb-1">Lost Tracking Code?</h4>
                <p className="text-gray-600 text-sm">Check your email or SMS for the tracking code</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <FiClock className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="text-gray-900 font-medium mb-1">Repair Updates</h4>
                <p className="text-gray-600 text-sm">Get real-time updates via SMS and email</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <FiTool className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="text-gray-900 font-medium mb-1">Quality Assured</h4>
                <p className="text-gray-600 text-sm">All repairs come with warranty and quality check</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackStatus;