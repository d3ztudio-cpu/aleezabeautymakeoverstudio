import React from 'react';
import { motion } from 'framer-motion';

const SideMenu = ({ isOpen, setIsOpen, scrollToSection }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'tween' }}
      className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-pink-100 to-rose-100 z-50 shadow-lg"
    >
      <div className="p-6">
        <button onClick={() => setIsOpen(false)} className="text-2xl mb-8 text-gray-800">×</button>
        <ul className="space-y-6">
          <li><button onClick={() => scrollToSection('home')} className="text-lg text-gray-800 hover:text-rose-600 transition-colors">Home</button></li>
          <li><button onClick={() => scrollToSection('about')} className="text-lg text-gray-800 hover:text-rose-600 transition-colors">About Us</button></li>
          <li><button onClick={() => scrollToSection('services')} className="text-lg text-gray-800 hover:text-rose-600 transition-colors">Services</button></li>
          <li><button onClick={() => scrollToSection('gallery')} className="text-lg text-gray-800 hover:text-rose-600 transition-colors">Gallery</button></li>
          <li><button onClick={() => scrollToSection('testimonials')} className="text-lg text-gray-800 hover:text-rose-600 transition-colors">Testimonials</button></li>
          <li><button onClick={() => scrollToSection('booking')} className="text-lg text-gray-800 hover:text-rose-600 transition-colors">Booking / Contact</button></li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SideMenu;