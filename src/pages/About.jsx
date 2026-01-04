import React from 'react';
import { FiShield, FiTruck, FiClock, FiStar, FiUsers, FiAward } from 'react-icons/fi';

const About = () => {
  const stats = [
    { icon: <FiUsers className="w-8 h-8" />, value: '1,25,000+', label: 'Happy Customers' },
    { icon: <FiStar className="w-8 h-8" />, value: '4.7/5', label: 'Customer Rating' },
    { icon: <FiClock className="w-8 h-8" />, value: '200+', label: 'Repairs Daily' },
    { icon: <FiAward className="w-8 h-8" />, value: '5+', label: 'Years Experience' }
  ];

  const features = [
    {
      icon: <FiShield className="w-12 h-12 text-green-400" />,
      title: 'Quality Assurance',
      description: 'We use only genuine parts and provide warranty on all repairs to ensure your device works like new.'
    },
    {
      icon: <FiTruck className="w-12 h-12 text-blue-400" />,
      title: 'Free Pickup & Delivery',
      description: 'Convenient doorstep service with free pickup and delivery for your damaged devices.'
    },
    {
      icon: <FiClock className="w-12 h-12 text-purple-400" />,
      title: 'Quick Turnaround',
      description: 'Most repairs completed within 24-48 hours with express service options available.'
    },
    {
      icon: <FiStar className="w-12 h-12 text-yellow-400" />,
      title: 'Expert Technicians',
      description: 'Certified technicians with years of experience in mobile device repair and maintenance.'
    }
  ];

  const team = [
    {
      name: 'Sanjay Kumar',
      role: 'Founder & CEO',
      image: '👨‍💼',
      description: '10+ years in mobile technology and repair industry'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: '👩‍💼',
      description: 'Expert in service operations and customer experience'
    },
    {
      name: 'Amit Singh',
      role: 'Lead Technician',
      image: '👨‍🔧',
      description: 'Certified repair specialist with 8+ years experience'
    },
    {
      name: 'Sneha Patel',
      role: 'Customer Success Manager',
      image: '👩‍💻',
      description: 'Dedicated to ensuring customer satisfaction and support'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
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
      
      {/* Particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
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
      <section className="section-padding bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative z-10">
        <div className="container-max text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-reveal">
            About <span className="gradient-text">Mobi repair</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed text-reveal-delay-1">
            We are India's leading mobile repair service provider, committed to delivering 
            professional, reliable, and affordable repair solutions for all your mobile devices.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-dark-800 relative z-10">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {stats.map((stat, index) => (
              <div key={index} className="text-center card-hover float-card">
                <div className="flex justify-center mb-4 text-pink-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-dark-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding relative z-10">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-reveal">
              <h2 className="text-3xl font-bold text-white">Our Story</h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Founded in 2019, Mobi repair started with a simple mission: to provide reliable, 
                  professional mobile repair services that customers can trust. What began as 
                  a small repair shop has grown into one of India's most trusted mobile repair 
                  service providers.
                </p>
                <p>
                  We recognized the frustration customers faced with unreliable repair services, 
                  poor quality parts, and lack of warranty. That's why we built Mobi repair with a 
                  focus on transparency, quality, and customer satisfaction.
                </p>
                <p>
                  Today, we serve over 125,000 happy customers across multiple cities, 
                  completing more than 200 repairs daily with our team of certified technicians 
                  and genuine parts inventory.
                </p>
              </div>
            </div>
            <div className="flex justify-center card-entrance">
              <div className="w-80 h-80 bg-gradient-to-br from-pink-500 to-purple-700 rounded-2xl flex items-center justify-center glow-on-hover enhanced-glow">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🏢</div>
                  <h3 className="text-xl font-bold mb-2">Mobi repair Headquarters</h3>
                  <p className="text-pink-100">Durgapur, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-dark-800 relative z-10">
        <div className="container-max">
          <div className="text-center mb-12 text-reveal">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Mobi repair?</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              We're committed to providing the best mobile repair experience with 
              professional service and genuine parts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4 card-hover float-card">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding relative z-10">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="card glow-on-hover card-entrance">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-dark-300 leading-relaxed">
                To provide professional, reliable, and affordable mobile repair services 
                that exceed customer expectations. We strive to make mobile repair 
                convenient and trustworthy through innovative service delivery and 
                transparent communication.
              </p>
            </div>
            <div className="card glow-on-hover card-entrance">
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-dark-300 leading-relaxed">
                To become India's most trusted mobile repair service provider, known for 
                quality, reliability, and customer satisfaction. We envision a future where 
                mobile repair is hassle-free, transparent, and accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-dark-800 relative z-10">
        <div className="container-max">
          <div className="text-center mb-12 text-reveal">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              Our dedicated team of professionals is committed to providing you with 
              the best mobile repair experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {team.map((member, index) => (
              <div key={index} className="card text-center glow-on-hover float-card">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-pink-400 text-sm mb-3">{member.role}</p>
                <p className="text-dark-300 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative z-10">
        <div className="container-max">
          <div className="text-center mb-12 text-reveal">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              These core values guide everything we do at Mobi repair.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            <div className="text-center space-y-4 card-hover float-card">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto enhanced-glow">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Trust</h3>
              <p className="text-dark-300">
                We build trust through transparency, honest communication, and reliable service delivery.
              </p>
            </div>
            <div className="text-center space-y-4 card-hover float-card">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto enhanced-glow">
                <FiStar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Excellence</h3>
              <p className="text-dark-300">
                We strive for excellence in every repair, using quality parts and skilled technicians.
              </p>
            </div>
            <div className="text-center space-y-4 card-hover float-card">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto enhanced-glow">
                <FiUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Customer First</h3>
              <p className="text-dark-300">
                Our customers are at the heart of everything we do. Their satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-pink-500 to-purple-600 relative z-10">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold text-white mb-4 text-reveal">
            Ready to Experience the Mobi repair Difference?
          </h2>
          <p className="text-pink-100 mb-8 max-w-2xl mx-auto text-reveal-delay-1">
            Join thousands of satisfied customers who trust Mobi repair for their mobile repair needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-reveal-delay-2">
            <a
              href="/repair-booking"
              className="bg-white text-pink-600 font-semibold py-3 px-8 rounded-lg hover:bg-pink-50 transition-colors morph-button ripple"
            >
              Book Repair Service
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-pink-600 transition-colors morph-button ripple"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;