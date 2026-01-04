import React, { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '+917407926912';

  const quickMessages = [
    {
      title: 'Repair Inquiry',
      message: 'Hi! I need help with mobile repair services. Can you provide more information?'
    },
    {
      title: 'Order Support',
      message: 'Hello! I need assistance with my order. Can you help me?'
    },
    {
      title: 'General Query',
      message: 'Hi! I have a question about your services. Can you help?'
    },
    {
      title: 'Store Location',
      message: 'Hello! Can you share your store location and working hours?'
    }
  ];

  const sendWhatsAppMessage = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 bg-white rounded-lg shadow-2xl w-80 max-w-[calc(100vw-2rem)]">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-green-500 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Mobi repair Support</h3>
                <p className="text-sm opacity-90">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-600 p-1 rounded"
            >
              <FaTimes />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 bg-gray-50">
            <div className="bg-white p-3 rounded-lg mb-4 shadow-sm">
              <p className="text-gray-800 text-sm">
                👋 Hi there! How can we help you today?
              </p>
            </div>

            {/* Quick Message Options */}
            <div className="space-y-2">
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => sendWhatsAppMessage(msg.message)}
                  className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                >
                  <div className="font-medium text-gray-800 text-sm">{msg.title}</div>
                  <div className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {msg.message}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Message */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => sendWhatsAppMessage('Hi! I need assistance.')}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <FaWhatsapp />
                <span>Start Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-bounce-gentle"
        aria-label="WhatsApp Chat"
      >
        {isOpen ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaWhatsapp className="text-2xl" />
        )}
      </button>


    </>
  );
};

export default WhatsAppButton;