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
          phone: '+91 7407926912',
          experience: '5+ years'
        },
        serviceCenter: {
          name: 'Mobi repair Service Center - Durgapur',
          address: 'Ananda Gopal, Bhiringi Girls school, Benachity, Durgapur, West Bengal 713213',
          phone: '+91 7407926912'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="gradient-mesh"></div>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      <div className="glow-orb glow-orb-3"></div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      {/* Particle System */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Morphing Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full animate-pulse transform rotate-45"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full animate-pulse">
          {[...Array(144)].map((_, i) => (
            <div 
              key={i} 
              className="border border-pink-500/10 animate-pulse" 
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Liquid Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
        <div className="absolute -bottom-40 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '10s', animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg shadow-pink-500/25 animate-pulse">
            <FiSearch className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-reveal">
            Repair Service <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent animate-pulse">Tracking</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto text-reveal-delay-1">
            Track your device repair status in real-time with our advanced tracking system
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-500 shadow-xl glow-on-hover card-entrance">
            <div className="text-center mb-8 text-reveal">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 enhanced-glow animate-pulse">
                <FiPackage className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 text-reveal-delay-1">Enter Tracking Details</h2>
              <p className="text-gray-300 text-reveal-delay-2">
                Enter your repair service tracking code to check the current status of your device.
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-reveal-delay-3">
                <label className="block text-white font-medium mb-3">Tracking Code*</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. SR2509010001"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 enhanced-glow"
                  />
                  <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-pulse" />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  You can find this code on your repair receipt or confirmation email
                </p>
              </div>

              <button
                onClick={handleTrackDevice}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 btn-glow ripple morph-button"
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
        <section className="relative z-10 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Device Info Card */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 mb-8 shadow-xl glow-on-hover card-entrance">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-reveal">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 enhanced-glow animate-pulse"></div>
                    Device Information
                  </h3>
                  <div className="space-y-4 stagger-animation">
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                      <span className="text-gray-400">Tracking Code:</span>
                      <span className="text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 rounded-full text-sm animate-pulse">{trackingResult.trackingCode}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                      <span className="text-gray-400">Device:</span>
                      <span className="text-white font-medium">{trackingResult.deviceInfo.brand} {trackingResult.deviceInfo.model}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                      <span className="text-gray-400">Issue:</span>
                      <span className="text-white font-medium">{trackingResult.deviceInfo.issue}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                      <span className="text-gray-400">Service Type:</span>
                      <span className="text-white font-medium">{trackingResult.deviceInfo.serviceType}</span>
                    </div>
                  </div>
                </div>
                <div className="text-reveal-delay-1">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mr-3 enhanced-glow animate-pulse"></div>
                    Current Status
                  </h3>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-center shadow-lg enhanced-glow animate-pulse">
                    <div className="text-white font-bold text-2xl mb-2">{trackingResult.currentStatus}</div>
                    <div className="text-pink-100 text-sm">
                      Expected completion: {trackingResult.estimatedCompletion}
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg glow-on-hover">
                    <div className="flex items-center text-green-400">
                      <FiCheckCircle className="w-5 h-5 mr-2 animate-pulse" />
                      <span className="font-medium">On Track</span>
                    </div>
                    <p className="text-green-300 text-sm mt-1">Your repair is progressing as scheduled</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 mb-8 shadow-xl glow-on-hover card-entrance">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center text-reveal">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mr-3 enhanced-glow animate-pulse"></div>
                Repair Timeline
              </h3>
              <div className="space-y-6 stagger-animation">
                {trackingResult.timeline.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 glow-on-hover">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.completed 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 enhanced-glow animate-pulse' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold text-lg ${step.completed ? 'text-white' : 'text-gray-400'}`}>
                          {step.status}
                        </h4>
                        <span className="text-gray-400 text-sm bg-gray-700/50 px-3 py-1 rounded-full">{step.timestamp}</span>
                      </div>
                      <p className={`text-sm ${step.completed ? 'text-gray-300' : 'text-gray-500'}`}>
                        {step.description}
                      </p>
                      {step.completed && (
                        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-8 stagger-animation">
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl glow-on-hover card-entrance">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center text-reveal">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center enhanced-glow animate-pulse">
                    <FiTool className="w-4 h-4 text-white" />
                  </div>
                  Assigned Technician
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-medium">{trackingResult.technician.name}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                    <span className="text-gray-400">Experience:</span>
                    <span className="text-white font-medium">{trackingResult.technician.experience}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                    <span className="text-gray-400">Contact:</span>
                    <a href={`tel:${trackingResult.technician.phone}`} className="text-pink-400 hover:text-pink-300 font-medium morph-button">
                      {trackingResult.technician.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl glow-on-hover card-entrance">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center text-reveal">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mr-3 flex items-center justify-center enhanced-glow animate-pulse">
                    <FiMapPin className="w-4 h-4 text-white" />
                  </div>
                  Service Center
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                    <span className="text-gray-400 block mb-2">Location:</span>
                    <p className="text-white font-medium">{trackingResult.serviceCenter.name}</p>
                    <p className="text-gray-300 text-sm mt-1">{trackingResult.serviceCenter.address}</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg glow-on-hover">
                    <span className="text-gray-400">Phone:</span>
                    <a href={`tel:${trackingResult.serviceCenter.phone}`} className="text-pink-400 hover:text-pink-300 font-medium morph-button">
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
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 text-center shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6">
              <FiClock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find your tracking code or have questions about your repair? Our support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+917407926912"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <FiPhone className="w-5 h-5 mr-2" />
                Call Support: +91 7407926912
              </a>
              <a
                href="mailto:support@mobilerpairdurgapur.in"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <FiMail className="w-5 h-5 mr-2" />
                Email Support
              </a>
            </div>
            
            {/* Quick Tips */}
            <div className="mt-8 grid md:grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <FiSearch className="w-6 h-6 text-blue-400 mb-2" />
                <h4 className="text-white font-medium mb-1">Lost Tracking Code?</h4>
                <p className="text-gray-400 text-sm">Check your email or SMS for the tracking code</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <FiClock className="w-6 h-6 text-green-400 mb-2" />
                <h4 className="text-white font-medium mb-1">Repair Updates</h4>
                <p className="text-gray-400 text-sm">Get real-time updates via SMS and email</p>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <FiTool className="w-6 h-6 text-purple-400 mb-2" />
                <h4 className="text-white font-medium mb-1">Quality Assured</h4>
                <p className="text-gray-400 text-sm">All repairs come with warranty and quality check</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackStatus;