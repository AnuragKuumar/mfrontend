import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiCheck, 
  FiShield, 
  FiTruck, 
  FiClock
} from 'react-icons/fi';
import { 
  MdPhoneIphone,
  MdBatteryChargingFull,
  MdPowerInput,
  MdVolumeUp,
  MdWaterDrop,
  MdCameraAlt
} from 'react-icons/md';

const Services = () => {
  const services = [
    {
      id: 1,
      name: 'Display Replacement',
      icon: <MdPhoneIphone className="w-12 h-12 text-blue-600" />,
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
      icon: <MdBatteryChargingFull className="w-12 h-12 text-green-600" />,
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
      icon: <MdPowerInput className="w-12 h-12 text-yellow-600" />,
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
      icon: <MdVolumeUp className="w-12 h-12 text-purple-600" />,
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
      icon: <MdWaterDrop className="w-12 h-12 text-cyan-600" />,
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
      icon: <MdCameraAlt className="w-12 h-12 text-red-600" />,
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
      icon: <FiTruck className="w-8 h-8 text-blue-600" />,
      description: 'We come to your location for pickup and delivery',
      features: [
        'Free pickup from your location',
        'Repair at our service center',
        'Free delivery back to you',
        'Extra convenience charge: ₹99'
      ],
      recommended: true,
      available: false,
      comingSoon: true
    },
    {
      title: 'In-Door Service',
      icon: <FiShield className="w-8 h-8 text-purple-600" />,
      description: 'Professional repair service at your home or office',
      features: [
        'Technician visits your location',
        'Repair done at your premises',
        'Watch the repair process',
        'Premium service experience'
      ],
      recommended: false,
      available: false,
      comingSoon: true
    },
    {
      title: 'Store Visit',
      icon: <FiClock className="w-8 h-8 text-green-600" />,
      description: 'Visit our service center for immediate assistance',
      features: [
        'Walk-in service available',
        'Immediate diagnosis',
        'Watch your repair process',
        'No additional charges'
      ],
      recommended: false,
      available: true
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
      color: 'text-gray-700'
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Professional <span className="text-blue-600">Repair Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Expert mobile repair services with genuine parts, certified technicians, 
            and warranty coverage for all major brands.
          </p>
          <Link
            to="/repair-booking"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 shadow-md"
          >
            <span>Book Repair Now</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Repair Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional repair services for all types of mobile device issues
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative">
                {service.popular && (
                  <div className="absolute -top-3 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <div className="text-blue-600 font-bold text-lg">{service.price}</div>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <FiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/repair-booking"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Service Option</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the most convenient way to get your device repaired
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {serviceOptions.map((option, index) => (
              <div key={index} className={`bg-white p-6 rounded-lg border shadow-sm relative ${option.recommended ? 'border-blue-600' : 'border-gray-200'} ${!option.available ? 'opacity-75' : ''}`}>
                {option.recommended && (
                  <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                )}
                
                {option.comingSoon && (
                  <div className="absolute -top-3 right-6 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <FiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {option.available ? (
                  <Link
                    to="/repair-booking"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Book Now</span>
                    <FiArrowRight />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span>Coming Soon</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Brands */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Brands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We repair devices from all major brands with genuine parts and expert service
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow duration-300">
                <div className={`flex justify-center mb-3 ${brand.color}`}>
                  {brand.logo}
                </div>
                <span className="text-gray-900 font-medium text-sm">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Repair Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{process.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Warranty & Quality Assurance</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FiShield className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">1 Months Warranty</h3>
                    <p className="text-gray-600 text-sm">
                      Extended warranty on iPhone display replacements with premium quality parts
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiCheck className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Genuine Parts</h3>
                    <p className="text-gray-600 text-sm">
                      We use only authentic and high-quality replacement parts for all repairs
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiClock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Quality Testing</h3>
                    <p className="text-gray-600 text-sm">
                      Every repaired device undergoes thorough testing before delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
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
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Fix Your Device?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your repair service now and get your device fixed by certified professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/repair-booking"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book Repair Service
            </Link>
            <a
              href="tel:+917407926912"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call Now: +91 7407926912 / 9800999600
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;