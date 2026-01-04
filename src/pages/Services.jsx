import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiShield, FiTruck, FiClock } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      id: 1,
      name: 'Display Replacement',
      icon: '📱',
      description: 'Professional screen replacement for cracked, damaged, or unresponsive displays',
      features: [
        'Original quality displays',
        'Touch functionality testing',
        '6 months warranty',
        'Same day service available'
      ],
      price: 'Starting from ₹799',
      popular: true
    },
    {
      id: 2,
      name: 'Battery Replacement',
      icon: '🔋',
      description: 'Replace old, degraded batteries to restore your device\'s battery life',
      features: [
        'High capacity batteries',
        'Battery health optimization',
        '3 months warranty',
        'Quick 30-minute service'
      ],
      price: 'Starting from ₹399',
      popular: false
    },
    {
      id: 3,
      name: 'Charging Port Repair',
      icon: '🔌',
      description: 'Fix charging issues, loose connections, and damaged charging ports',
      features: [
        'Complete port replacement',
        'Charging speed optimization',
        '2 months warranty',
        'Free charging cable'
      ],
      price: 'Starting from ₹199',
      popular: false
    },
    {
      id: 4,
      name: 'Speaker/Mic Repair',
      icon: '🔊',
      description: 'Restore audio quality and fix microphone issues for clear communication',
      features: [
        'Audio quality testing',
        'Microphone calibration',
        '2 months warranty',
        'Call quality assurance'
      ],
      price: 'Starting from ₹199',
      popular: false
    },
    {
      id: 5,
      name: 'Water Damage Repair',
      icon: '💧',
      description: 'Professional water damage restoration to save your device and data',
      features: [
        'Complete disassembly',
        'Ultrasonic cleaning',
        'Component replacement',
        'Data recovery attempt'
      ],
      price: 'Starting from ₹599',
      popular: false
    },
    {
      id: 6,
      name: 'Camera Repair',
      icon: '📷',
      description: 'Fix camera issues including blurry images, focus problems, and lens damage',
      features: [
        'Camera module replacement',
        'Focus calibration',
        'Image quality testing',
        '2 months warranty'
      ],
      price: 'Starting from ₹499',
      popular: false
    }
  ];

  const serviceOptions = [
    {
      title: 'Doorstep Service',
      icon: <FiTruck className="w-8 h-8 text-blue-400" />,
      description: 'We come to your location for pickup and delivery',
      features: [
        'Free pickup from your location',
        'Repair at our service center',
        'Free delivery back to you',
        'Extra convenience charge: ₹99'
      ],
      recommended: true
    },
    {
      title: 'Store Visit',
      icon: <FiShield className="w-8 h-8 text-green-400" />,
      description: 'Visit our service center for immediate assistance',
      features: [
        'Walk-in service available',
        'Immediate diagnosis',
        'Watch your repair process',
        'No additional charges'
      ],
      recommended: false
    }
  ];

  const brands = [
    { 
      name: 'Apple', 
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      color: 'text-gray-300'
    },
    { 
      name: 'Samsung', 
      logo: (
        <div className="text-blue-600 font-bold text-lg">SAMSUNG</div>
      ),
      color: 'text-blue-600'
    },
    { 
      name: 'Vivo', 
      logo: (
        <div className="text-blue-500 font-bold text-lg">vivo</div>
      ),
      color: 'text-blue-500'
    },
    { 
      name: 'iQOO', 
      logo: (
        <div className="text-orange-500 font-bold text-lg">iQOO</div>
      ),
      color: 'text-orange-500'
    },
    { 
      name: 'Nokia', 
      logo: (
        <div className="text-blue-700 font-bold text-lg">NOKIA</div>
      ),
      color: 'text-blue-700'
    },
    { 
      name: 'Motorola', 
      logo: (
        <div className="text-red-500 font-bold text-lg">motorola</div>
      ),
      color: 'text-red-500'
    },
    { 
      name: 'Oppo', 
      logo: (
        <div className="text-green-600 font-bold text-lg">OPPO</div>
      ),
      color: 'text-green-600'
    },
    { 
      name: 'Asus', 
      logo: (
        <div className="text-gray-700 font-bold text-lg">ASUS</div>
      ),
      color: 'text-gray-700'
    },
    { 
      name: 'Dell', 
      logo: (
        <div className="text-blue-600 font-bold text-lg">DELL</div>
      ),
      color: 'text-blue-600'
    },
    { 
      name: 'HP', 
      logo: (
        <div className="text-blue-500 font-bold text-lg">hp</div>
      ),
      color: 'text-blue-500'
    },
    { 
      name: 'Micromax', 
      logo: (
        <div className="text-orange-600 font-bold text-lg">micromax</div>
      ),
      color: 'text-orange-600'
    },
    { 
      name: 'Acer', 
      logo: (
        <div className="text-green-500 font-bold text-lg">acer</div>
      ),
      color: 'text-green-500'
    },
    { 
      name: 'Honor', 
      logo: (
        <div className="text-blue-400 font-bold text-lg">HONOR</div>
      ),
      color: 'text-blue-400'
    },
    { 
      name: 'Nothing', 
      logo: (
        <div className="text-gray-600 font-bold text-lg">Nothing</div>
      ),
      color: 'text-gray-600'
    },
    { 
      name: 'Poco', 
      logo: (
        <div className="text-yellow-500 font-bold text-lg">POCO</div>
      ),
      color: 'text-yellow-500'
    },
    { 
      name: 'Google', 
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ),
      color: 'text-blue-500'
    },
    { 
      name: 'Lava', 
      logo: (
        <div className="text-red-500 font-bold text-lg">LAVA</div>
      ),
      color: 'text-red-500'
    },
    { 
      name: 'Infinix', 
      logo: (
        <div className="text-gray-700 font-bold text-lg">Infinix</div>
      ),
      color: 'text-gray-700'
    },
    { 
      name: 'Tecno', 
      logo: (
        <div className="text-blue-500 font-bold text-lg">TECNO</div>
      ),
      color: 'text-blue-500'
    },
    { 
      name: 'LG', 
      logo: (
        <div className="text-red-600 font-bold text-lg">LG</div>
      ),
      color: 'text-red-600'
    },
    { 
      name: 'Lenovo', 
      logo: (
        <div className="text-red-600 font-bold text-lg">Lenovo</div>
      ),
      color: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white animated-background">
      {/* Enhanced Animated Background */}
      <div className="gradient-mesh"></div>
      <div className="liquid-bg"></div>
      <div className="animated-grid"></div>
      <div className="glow-orb glow-orb-1 parallax-slow breathing"></div>
      <div className="glow-orb glow-orb-2 parallax-fast"></div>
      <div className="glow-orb glow-orb-3 breathing"></div>
      
      {/* Interactive Background Elements */}
      <div className="interactive-bg-element"></div>
      <div className="interactive-bg-element"></div>
      <div className="interactive-bg-element"></div>
      
      {/* Morphing Shapes */}
      <div className="morphing-shape"></div>
      <div className="morphing-shape"></div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      {/* Floating Icons */}
      <div className="floating-icon">🔧</div>
      <div className="floating-icon">📱</div>
      <div className="floating-icon">⚡</div>
      
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
      
      {/* Hero Section */}
      <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 backdrop-blur-sm">
        <div className="container-max text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-reveal">
            Professional <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">Repair Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 text-reveal-delay-1 px-4">
            Expert mobile repair services with genuine parts, certified technicians, 
            and warranty coverage for all major brands.
          </p>
          <Link
            to="/repair-booking"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 morph-button btn-glow text-reveal-delay-2"
          >
            <span>Book Repair Now</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 text-reveal">Our Repair Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-reveal-delay-1">
              Professional repair services for all types of mobile device issues
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            {services.map((service, index) => (
              <div key={service.id} className={`bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-pink-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10 relative group float-card glow-on-hover card-entrance`} style={{animationDelay: `${index * 0.1}s`}}>
                {service.popular && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg enhanced-glow">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 magnetic-hover">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300">{service.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <div className="text-pink-400 font-bold text-lg">{service.price}</div>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 animate-on-scroll">
                      <FiCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/repair-booking"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 flex items-center justify-center space-x-2 morph-button ripple"
                >
                  <span>Book Now</span>
                  <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="section-padding bg-dark-800">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Service Option</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              Select the most convenient way to get your device repaired
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 justify-center">
            {serviceOptions.map((option, index) => (
              <div key={index} className={`card relative ${option.recommended ? 'border-primary-500' : ''}`}>
                {option.recommended && (
                  <div className="absolute -top-3 left-6 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                  <p className="text-dark-300 text-sm">{option.description}</p>
                </div>

                <div className="space-y-3">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <FiCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-dark-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Brands */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Supported Brands</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              We repair devices from all major brands with genuine parts and expert service
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brands.map((brand, index) => (
              <div key={index} className="card text-center py-6 hover:border-primary-500 transition-all duration-300 group">
                <div className={`flex justify-center mb-3 ${brand.color} group-hover:scale-110 transition-transform duration-300`}>
                  {brand.logo}
                </div>
                <span className="text-white font-medium text-sm">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Repair Process</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              Simple, transparent, and professional repair process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Book Service', desc: 'Schedule your repair online or call us' },
              { step: '2', title: 'Diagnosis', desc: 'Free device checkup and cost estimate' },
              { step: '3', title: 'Repair', desc: 'Professional repair with genuine parts' },
              { step: '4', title: 'Delivery', desc: 'Quality check and device delivery' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{process.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{process.title}</h3>
                <p className="text-dark-300 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Warranty & Quality Assurance</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FiShield className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">6 Months Warranty</h3>
                    <p className="text-dark-300 text-sm">
                      Extended warranty on iPhone display replacements with premium quality parts
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiCheck className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Genuine Parts</h3>
                    <p className="text-dark-300 text-sm">
                      We use only authentic and high-quality replacement parts for all repairs
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiClock className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Quality Testing</h3>
                    <p className="text-dark-300 text-sm">
                      Every repaired device undergoes thorough testing before delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <FiShield className="w-20 h-20 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Quality Guaranteed</h3>
                  <p className="text-green-100">Warranty on all repairs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Fix Your Device?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Book your repair service now and get your device fixed by certified professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/repair-booking"
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Book Repair Service
            </Link>
            <a
              href="tel:+917407926912"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Call Now: +91 7407926912
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;