import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { name: 'Sarah J.', image: 'https://via.placeholder.com/100?text=S', review: 'Amazing experience! The team made me feel beautiful and confident for my wedding day.' },
  { name: 'Emily R.', image: 'https://via.placeholder.com/100?text=E', review: 'The facials are incredible. My skin has never looked better!' },
  { name: 'Lisa M.', image: 'https://via.placeholder.com/100?text=L', review: 'Professional service and stunning results. Highly recommend!' },
  { name: 'Anna K.', image: 'https://via.placeholder.com/100?text=A', review: 'The bridal makeover was perfect. I felt like a princess!' },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">Testimonials</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto"
            >
              <img src={testimonials[current].image} alt={testimonials[current].name} className="w-16 h-16 rounded-full mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-4">"{testimonials[current].review}"</p>
              <p className="font-semibold text-rose-600">{testimonials[current].name}</p>
            </motion.div>
          </AnimatePresence>
          <button onClick={prev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-rose-600 text-white p-2 rounded-full hover:bg-rose-700 transition-colors">‹</button>
          <button onClick={next} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-rose-600 text-white p-2 rounded-full hover:bg-rose-700 transition-colors">›</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;