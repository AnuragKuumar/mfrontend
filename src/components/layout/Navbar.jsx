import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  FiMenu, 
  FiX, 
  FiShoppingCart, 
  FiUser, 
  FiLogOut,
  FiPhone,
  FiMail
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Track Status', path: '/track' },
  ];

  return (
    <>
      {/* Top Header */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container-max">
          <div className="flex items-center justify-between py-2 text-sm">
            {/* Contact Info - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4" />
                <span>+91 7407926912 / 9800999600</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4" />
                <span>support@mobilerpairdurgapur.in</span>
              </div>
              <span className="hidden lg:block">Working Hours (MON-SAT) 10:30 AM - 09:30 PM</span>
            </div>

            {/* Mobile Contact - Show only phone on mobile */}
            <div className="flex md:hidden items-center space-x-2 text-gray-300">
              <FiPhone className="w-4 h-4" />
              <span>+91 7407926912 / 9800999600</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <a href="https://wa.me/917407926912" className="text-green-500 hover:text-green-400 transition-colors">
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-red-500 hover:text-red-400 transition-colors">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="container-max">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/images/mkitone-logo.svg" 
                alt="Mobile repair Logo" 
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-white">Mobile repair</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <FiShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <FiUser className="w-6 h-6" />
                    <span className="hidden md:block">{user?.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center space-x-2"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <span className="text-gray-600">/</span>
                  <Link
                    to="/register"
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-white hover:text-pink-400 transition-colors bg-gray-800/50 rounded-lg border border-gray-600"
              >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-700 bg-gray-900/95 backdrop-blur-sm">
              <div className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-white hover:text-pink-400 transition-colors duration-200 px-6 py-3 hover:bg-gray-800/50 border-b border-gray-700/50 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Links */}
                {!isAuthenticated && (
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <Link
                      to="/login"
                      className="block text-white hover:text-pink-400 transition-colors px-6 py-3 hover:bg-gray-800/50 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block text-pink-400 hover:text-pink-300 transition-colors px-6 py-3 hover:bg-gray-800/50 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                
                {/* Mobile User Menu */}
                {isAuthenticated && (
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="px-6 py-2 text-gray-400 text-sm">
                      Welcome, {user?.name}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block text-white hover:text-pink-400 transition-colors px-6 py-3 hover:bg-gray-800/50 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left text-white hover:text-pink-400 transition-colors px-6 py-3 hover:bg-gray-800/50 text-base font-medium flex items-center space-x-2"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;