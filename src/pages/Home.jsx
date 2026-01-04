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
      {/* Animated Background Elements */}
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
        {[...Array(15)].map((_, i) => (
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

      {/* Liquid Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
        <div className="absolute -bottom-40 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '10s', animationDelay: '4s'}}></div>
      </div>
      {/* Main Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Your SVG File */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 min-h-[400px] flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 glow-on-hover">
              <img 
                src="/images/file.svg" 
                alt="Professional iPhone Repair Service" 
                className="w-full h-full object-contain rounded-3xl"
                style={{ minHeight: '400px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback if SVG doesn't load */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold mb-2">Professional iPhone Repair</h3>
                  <p className="text-lg opacity-90">Expert service with genuine parts</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none"></div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-500 shadow-xl glow-on-hover">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-4">
                  Book Free Pickup for Device Repairs
                </h1>
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>

                {/* Pincode Field */}
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="flex-1 px-4 py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  />
                  <button className="px-6 py-4 bg-gray-600/80 backdrop-blur-sm border border-l-0 border-gray-600 rounded-r-lg text-gray-300 hover:bg-gray-500/80 hover:text-white transition-all duration-300">
                    Check
                  </button>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 btn-glow"
                >
                  Book Now
                </button>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-600/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FiStar className="text-yellow-400 w-4 h-4 mr-1 animate-pulse" />
                      <span className="font-bold text-white">4.7/5</span>
                    </div>
                    <p className="text-xs text-gray-400">Based on 7000+ Reviews</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-pink-400 mb-1 animate-pulse">1,25,000+</div>
                    <p className="text-xs text-gray-400">Trusted by Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-400 mb-1 animate-pulse">7000+</div>
                    <p className="text-xs text-gray-400">Devices Pickup Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src="/images/mkitone-logo.svg" 
                  alt="Mobi repair Logo" 
                  className="w-16 h-16 animate-pulse"
                />
              </div>
              
              <h2 className="text-4xl font-bold text-white leading-tight">
                Your Reliable Repair Partner
              </h2>

              <div className="space-y-4 stagger-animation">
                <div className="flex items-center space-x-3 glow-on-hover p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <span className="text-gray-300">Free Checkup for your device</span>
                </div>
                <div className="flex items-center space-x-3 glow-on-hover p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <span className="text-gray-300">Free Pickup & Delivery</span>
                </div>
                <div className="flex items-center space-x-3 glow-on-hover p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <span className="text-gray-300">1,25,000+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-3 glow-on-hover p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm">4</span>
                  </div>
                  <span className="text-gray-300">200+ Repairs Done per day</span>
                </div>
                <div className="flex items-center space-x-3 glow-on-hover p-3 rounded-lg bg-gray-700/30 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm">5</span>
                  </div>
                  <span className="text-gray-300">Repairs done under CCTV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Repair Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Professional mobile repair services with genuine parts and expert technicians
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
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
                name: 'Camera Repair', 
                logo: '/images/mkitone-logo.svg', 
                brand: 'All Brands',
                desc: 'Camera not working or blurry images' 
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-500 glow-on-hover shadow-xl">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-sm">
                    <img 
                      src={service.logo} 
                      alt={service.brand} 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-pink-400 text-sm font-medium mb-2">{service.brand}</p>
                  <p className="text-gray-300 text-sm mb-4">{service.desc}</p>
                  <Link
                    to="/repair-booking"
                    className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors morph-button"
                  >
                    <span>Book Now</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Fix Your Device?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get your mobile device repaired by certified technicians with genuine parts and warranty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/repair-booking" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 morph-button">
              Book Repair Service
            </Link>
            <Link to="/store" className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 morph-button">
              Shop Accessories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;