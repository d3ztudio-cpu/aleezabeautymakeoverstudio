import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-pink-200 to-rose-300"
      >
        {/* Placeholder for salon imagery */}
      </motion.div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-serif mb-4 drop-shadow-lg">Redefine Your Beauty with Aleeza.</h1>
        <button
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl hover:scale-105 font-medium"
        >
          Book Appointment
        </button>
      </div>
    </section>
  );
};

export default Hero;