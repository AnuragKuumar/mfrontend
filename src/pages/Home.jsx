import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiStar, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!phoneNumber) {
      alert('Please enter your mobile number');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    navigate('/repair-booking', { state: { phoneNumber } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full"></div>
      </div>
      {/* Main Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Your SVG File */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 min-h-[300px] lg:min-h-[400px] flex items-center justify-center shadow-xl transition-shadow duration-300 order-2 lg:order-1">
              <img 
                src="/images/file.svg" 
                alt="Professional iPhone Repair Service" 
                className="w-full h-full object-contain rounded-3xl"
                style={{ minHeight: '300px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback if SVG doesn't load */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center text-white p-4 lg:p-8">
                  <div className="text-4xl lg:text-6xl mb-4">📱</div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">Professional iPhone Repair</h3>
                  <p className="text-base lg:text-lg opacity-90">Expert service with genuine parts</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none"></div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-4 lg:p-8 border border-gray-700/50 hover:border-pink-500/50 transition-colors duration-300 shadow-xl order-1 lg:order-2">
              <div className="text-center mb-6 lg:mb-8">
                <h1 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight">
                  Book Free Device Repairs
                </h1>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 lg:py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 text-sm lg:text-base"
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 lg:py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 text-sm lg:text-base"
                  />
                </div>

                {/* Pincode Field */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="flex-1 px-4 py-3 lg:py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 text-sm lg:text-base"
                  />
                  <button className="px-4 lg:px-6 py-3 lg:py-4 bg-gray-600/80 backdrop-blur-sm border border-gray-600 rounded-lg sm:rounded-r-lg sm:rounded-l-none sm:border-l-0 text-gray-300 hover:bg-gray-500/80 hover:text-white transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
                    Check
                  </button>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 lg:py-4 px-6 rounded-lg transition-colors duration-300 shadow-lg text-sm lg:text-base"
                >
                  Book Now
                </button>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 lg:gap-4 pt-4 lg:pt-6 border-t border-gray-600/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FiStar className="text-yellow-400 w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                      <span className="font-bold text-white text-xs lg:text-sm">4.7/5</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-tight">Based on 7000+ Reviews</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-pink-400 mb-1 text-xs lg:text-sm">1,25,000+</div>
                    <p className="text-xs text-gray-400 leading-tight">Trusted by Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-400 mb-1 text-xs lg:text-sm">7000+</div>
                    <p className="text-xs text-gray-400 leading-tight">Devices Pickup Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Section */}
      <section className="py-12 lg:py-20 px-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-center justify-center mb-4 lg:mb-6">
                <img 
                  src="/images/mkitone-logo.svg" 
                  alt="Mobi repair Logo" 
                  className="w-12 h-12 lg:w-16 lg:h-16"
                />
              </div>
              
              <h2 className="text-2xl lg:text-4xl font-bold text-white leading-tight text-center lg:text-left">
                Your Reliable Repair Partner
              </h2>

              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-700/50">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <span className="text-gray-300 text-sm lg:text-base">Free Checkup for your device</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-700/50">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <span className="text-gray-300 text-sm lg:text-base">Free Pickup & Delivery</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-700/50">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <span className="text-gray-300 text-sm lg:text-base">1,25,000+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-700/50">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">4</span>
                  </div>
                  <span className="text-gray-300 text-sm lg:text-base">200+ Repairs Done per day</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-700/50">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">5</span>
                  </div>
                  <span className="text-gray-300 text-sm lg:text-base">Repairs done under CCTV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-20 px-4 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Our Repair Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm lg:text-base">
              Professional mobile repair services with genuine parts and expert technicians
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              { 
                name: 'Display Replacement', 
                logo: '/images/iphone-15-pro.svg', 
                brand: 'iPhone',
                desc: 'Cracked or damaged screen repair' 
              },
              { 
                name: 'Battery Replacement', 
                logo: '/images/samsung-s24-ultra.svg', 
                brand: 'Samsung',
                desc: 'Poor battery life or charging issues' 
              },
              { 
                name: 'Charging Port Repair', 
                logo: '/images/mkitone-logo.svg', 
                brand: 'All Brands',
                desc: 'Charging port not working properly' 
              },
              { 
                name: 'Speaker/Mic Repair', 
                logo: '/images/iphone-15-pro.svg', 
                brand: 'iPhone',
                desc: 'Audio issues and microphone problems' 
              },
              { 
                name: 'Water Damage Repair', 
                logo: '/images/samsung-s24-ultra.svg', 
                brand: 'Samsung',
                desc: 'Device got wet or water damaged' 
              },
              { 
                name: 'In-Door Service', 
                logo: '/images/mkitone-logo.svg', 
                brand: 'Coming Soon',
                desc: 'Professional repair at your location',
                comingSoon: true
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl p-4 lg:p-6 border border-gray-700/50 hover:border-pink-500/50 transition-colors duration-300 shadow-xl relative">
                {service.comingSoon && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </div>
                )}
                <div className="text-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-sm">
                    <img 
                      src={service.logo} 
                      alt={service.brand} 
                      className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                    />
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold text-white mb-2">{service.name}</h3>
                  <p className={`text-xs lg:text-sm font-medium mb-2 ${service.comingSoon ? 'text-purple-400' : 'text-pink-400'}`}>{service.brand}</p>
                  <p className="text-gray-300 text-xs lg:text-sm mb-3 lg:mb-4">{service.desc}</p>
                  {service.comingSoon ? (
                    <button
                      disabled
                      className="inline-flex items-center space-x-2 text-gray-500 cursor-not-allowed text-sm"
                    >
                      <span>Coming Soon</span>
                    </button>
                  ) : (
                    <Link
                      to="/repair-booking"
                      className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors text-sm"
                    >
                      <span>Book Now</span>
                      <FiArrowRight />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 px-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Fix Your Device?
          </h2>
          <p className="text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto text-sm lg:text-base">
            Get your mobile device repaired by certified technicians with genuine parts and warranty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/repair-booking" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg text-sm lg:text-base">
              Book Repair Service
            </Link>
            <Link to="/store" className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-sm lg:text-base">
              Shop Accessories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;