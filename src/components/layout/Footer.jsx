import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 border-t border-dark-700">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/images/mkitone-logo.svg" 
                alt="Mobile repair Logo" 
                className="w-8 h-8"
              />
            </div>
            <p className="text-dark-300 text-sm leading-relaxed">
              Your reliable repair partner for all mobile devices. Professional service, 
              quality parts, and customer satisfaction guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-500 hover:text-green-400 transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-red-500 hover:text-red-400 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Mobile Repair
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Mobile Accessories
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Track Repair
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-dark-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/repair-booking" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Book Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-dark-300 text-sm">Display Replacement</li>
              <li className="text-dark-300 text-sm">Battery Replacement</li>
              <li className="text-dark-300 text-sm">Charging Port Repair</li>
              <li className="text-dark-300 text-sm">Speaker/Mic Repair</li>
              <li className="text-dark-300 text-sm">Water Damage Repair</li>
              <li className="text-dark-300 text-sm">Free Pickup & Delivery</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiPhone className="w-4 h-4 text-primary-400" />
                <span className="text-dark-300 text-sm">+91 7407926912 / 9800999600</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="w-4 h-4 text-primary-400" />
                <span className="text-dark-300 text-sm">support@mobilerpairdurgapur.in</span>
              </div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-4 h-4 text-primary-400 mt-1" />
                <span className="text-dark-300 text-sm">
                  Ananda Gopal, Bhiringi Girls school,<br />
                  Benachity, Durgapur, West Bengal 713213
                </span>
              </div>
            </div>
            <div className="text-dark-300 text-sm">
              <p className="font-medium text-white">Working Hours:</p>
              <p>Monday - Sunday</p>
              <p>10:30 AM - 09:30 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-dark-300 text-sm">
              © {currentYear} Mobile repair. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-dark-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-dark-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/warranty" className="text-dark-300 hover:text-white transition-colors">
                Warranty Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;