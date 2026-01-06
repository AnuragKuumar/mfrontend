import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiStar, FiArrowRight } from 'react-icons/fi';
import { 
  MdPhoneIphone,
  MdBatteryChargingFull,
  MdPowerInput,
  MdVolumeUp,
  MdWaterDrop,
  MdHomeRepairService
} from 'react-icons/md';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!phoneNumber) {
      alert('Please enter your mobile number');
      return;
    }
    navigate('/repair-booking', { state: { phoneNumber } });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Main Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Your SVG File */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100 min-h-[300px] lg:min-h-[400px] flex items-center justify-center shadow-md order-2 lg:order-1">
              <img 
                src="/images/mobile-repair-workspace.jpg" 
                alt="Professional Mobile Repair Service" 
                className="w-full h-full object-cover rounded-lg"
                style={{ minHeight: '300px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback if SVG doesn't load */}
              <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center text-gray-700 p-4 lg:p-8">
                  <MdPhoneIphone className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">Professional Phone Repair</h3>
                  <p className="text-base lg:text-lg opacity-90">Expert service with genuine parts</p>
                </div>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="bg-white rounded-lg p-4 lg:p-8 border border-gray-200 shadow-md order-1 lg:order-2">
              <div className="text-center mb-6 lg:mb-8">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  Book Free Device Repairs
                </h1>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 lg:py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 text-sm lg:text-base"
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 lg:py-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 text-sm lg:text-base"
                  />
                </div>

                {/* Pincode Field */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="flex-1 px-4 py-3 lg:py-4 bg-white border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 text-sm lg:text-base"
                  />
                  <button className="px-4 lg:px-6 py-3 lg:py-4 bg-gray-100 border border-gray-300 rounded-lg sm:rounded-r-lg sm:rounded-l-none sm:border-l-0 text-gray-700 hover:bg-gray-200 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
                    Check
                  </button>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={handleContinue}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 lg:py-4 px-6 rounded-lg transition-colors duration-300 shadow-md text-sm lg:text-base"
                >
                  Book Now
                </button>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 lg:gap-4 pt-4 lg:pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FiStar className="text-yellow-500 w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                      <span className="font-bold text-gray-900 text-xs lg:text-sm">4.7/5</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-tight">Based on 700+ Reviews</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600 mb-1 text-xs lg:text-sm">5000+</div>
                    <p className="text-xs text-gray-600 leading-tight">Trusted by Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600 mb-1 text-xs lg:text-sm">7000+</div>
                    <p className="text-xs text-gray-600 leading-tight">Devices Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discount Banner */}
      <section className="py-4 px-4 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🎉</span>
              <h3 className="text-white font-bold text-lg lg:text-xl">
                ₹100 Flat Discount on All Purchases
              </h3>
              <span className="text-2xl">🎉</span>
            </div>
            <p className="text-green-100 text-sm mt-1">
              Limited time offer - Valid on all repair services and accessories
            </p>
          </div>
        </div>
      </section>

      {/* Secondary Section */}
      <section className="py-12 lg:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-center justify-center mb-4 lg:mb-6">
                <img 
                  src="/images/mkitone-logo.svg" 
                  alt="Mobile repair Logo" 
                  className="w-12 h-12 lg:w-16 lg:h-16"
                />
              </div>
              
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight text-center lg:text-left">
                Your Reliable Repair Partner
              </h2>

              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <span className="text-gray-700 text-sm lg:text-base">Free Checkup for your device</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <span className="text-gray-700 text-sm lg:text-base">Free Pickup & Delivery Soon</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <span className="text-gray-700 text-sm lg:text-base">25,000+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">4</span>
                  </div>
                  <span className="text-gray-700 text-sm lg:text-base">200+ Repairs Done per day</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">5</span>
                  </div>
                  <span className="text-gray-700 text-sm lg:text-base">Repairs done under CCTV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Repair Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base">
              Professional mobile repair services with genuine parts and expert technicians
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              { 
                name: 'Display Replacement', 
                icon: <MdPhoneIphone className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />,
                brand: 'All Brands',
                desc: 'Cracked or damaged screen repair'
              },
              { 
                name: 'Battery Replacement', 
                icon: <MdBatteryChargingFull className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />,
                brand: 'All Brands',
                desc: 'Poor battery life or charging issues' 
              },
              { 
                name: 'Charging Port Repair', 
                icon: <MdPowerInput className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-600" />,
                brand: 'All Brands',
                desc: 'Charging port not working properly' 
              },
              { 
                name: 'Speaker/Mic Repair', 
                icon: <MdVolumeUp className="w-8 h-8 lg:w-10 lg:h-10 text-purple-600" />,
                brand: 'All Brands',
                desc: 'Audio issues and microphone problems' 
              },
              { 
                name: 'Water Damage Repair', 
                icon: <MdWaterDrop className="w-8 h-8 lg:w-10 lg:h-10 text-cyan-600" />,
                brand: 'All Brands',
                desc: 'Device got wet or water damaged' 
              },
              { 
                name: 'In-Door Service', 
                icon: <MdHomeRepairService className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600" />,
                brand: 'Coming Soon',
                desc: 'Professional repair at your location',
                comingSoon: true
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-4 lg:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative">
                {service.comingSoon && (
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </div>
                )}
                <div className="text-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  {service.brand && (
                    <p className={`text-xs lg:text-sm font-medium mb-2 ${service.comingSoon ? 'text-blue-600' : 'text-blue-600'}`}>{service.brand}</p>
                  )}
                  <p className="text-gray-600 text-xs lg:text-sm mb-2">{service.desc}</p>
                  {service.comingSoon ? (
                    <button
                      disabled
                      className="inline-flex items-center space-x-2 text-gray-400 cursor-not-allowed text-sm"
                    >
                      <span>Coming Soon</span>
                    </button>
                  ) : (
                    <Link
                      to="/repair-booking"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors text-sm"
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
      <section className="py-12 lg:py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Ready to Fix Your Device?
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto text-sm lg:text-base">
            Get your mobile device repaired by certified technicians with genuine parts and warranty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/repair-booking" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md text-sm lg:text-base">
              Book Repair Service
            </Link>
            <Link to="/store" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-sm lg:text-base">
              Shop Accessories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;