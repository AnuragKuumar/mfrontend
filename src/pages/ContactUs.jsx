import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const locations = [
    {
      name: 'Mobi repair Durgapur',
      address: 'Ananda Gopal, Bhiringi Girls school, Benachity, Durgapur, West Bengal 713213',
      city: 'Durgapur, West Bengal',
      phone: '+91 7407926912',
      email: 'support@mobilerpairdurgapur.in',
      hours: 'Mon-Sat: 10:30 AM - 09:30 PM',
      mapUrl: 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.2090!3d28.5355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzA3LjgiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Contact <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get in touch with us for any queries, support, or feedback. We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* Visit Us */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center hover:border-pink-500 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiMapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Visit Us</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-pink-400 font-bold text-lg mb-2">Sanjay Telecom</p>
                <p>Ananda Gopal,</p>
                <p>Bhiringi Girls school,</p>
                <p>Benachity, Durgapur,</p>
                <p className="text-pink-400 font-semibold mt-4">West Bengal 713213</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center hover:border-pink-500 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiPhone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Call Us</h3>
              <div className="space-y-2 text-gray-300">
                <p>We're only a call away whenever</p>
                <p>you need us.</p>
                <a 
                  href="tel:+917407926912" 
                  className="block text-pink-400 font-bold text-xl mt-4 hover:text-pink-300 transition-colors"
                >
                  +91 7407926912
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center hover:border-pink-500 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiMessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-300">
                <p>Reach out anytime, we're here to</p>
                <p>help.</p>
                <a 
                  href="mailto:support@mobilerpairdurgapur.in" 
                  className="block text-pink-400 font-bold mt-4 hover:text-pink-300 transition-colors"
                >
                  support@mobilerpairdurgapur.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Find Our Location</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Visit <span className="text-pink-400 font-semibold">Sanjay Telecom</span> for immediate assistance and device repairs
            </p>
          </div>

          {/* Interactive Map */}
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14607.626!2d87.3119!3d23.5204!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMxJzEzLjYiTiA4N8KwMTgnNDIuOCJF!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sanjay Telecom - Mobi repair Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Send Us a Message</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have a question or need support? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                  >
                    <option value="">Select a subject</option>
                    <option value="repair-inquiry">Repair Inquiry</option>
                    <option value="track-order">Track Order</option>
                    <option value="warranty-claim">Warranty Claim</option>
                    <option value="general-support">General Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 resize-none"
                  placeholder="Enter your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <FiSend className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Business Hours & Social Media */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Business Hours */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <FiClock className="w-6 h-6 text-pink-500 mr-3" />
                <h3 className="text-2xl font-bold text-white">Business Hours</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monday - Saturday</span>
                  <span className="text-white font-medium">10:30 AM - 09:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-red-400 font-medium">Closed</span>
                </div>
                <div className="border-t border-gray-600 pt-4 mt-6">
                  <p className="text-gray-400 text-sm">
                    * Emergency repairs may be available outside business hours. Please call for availability.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media & Quick Contact */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
              
              {/* Social Media Links */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="https://wa.me/917407926912" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                    <FaWhatsapp className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <FaFacebook className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                    <FaInstagram className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <FaYoutube className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Quick Contact */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Quick Contact</h4>
                <div className="space-y-3">
                  <a href="tel:+917407926912" className="flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-colors">
                    <FiPhone className="w-5 h-5" />
                    <span>+91 7407926912</span>
                  </a>
                  <a href="mailto:support@mobilerpairdurgapur.in" className="flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-colors">
                    <FiMail className="w-5 h-5" />
                    <span>support@mobilerpairdurgapur.in</span>
                  </a>
                  <a href="https://wa.me/917407926912" className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors">
                    <FaWhatsapp className="w-5 h-5" />
                    <span>WhatsApp Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;