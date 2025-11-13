import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { name: 'Bridal Makeover', description: 'Complete bridal styling and makeup for your special day.' },
  { name: 'Hair Styling', description: 'Professional hair styling and treatments.' },
  { name: 'Facials & Skincare', description: 'Rejuvenating facials and skincare treatments.' },
  { name: 'Manicure & Pedicure', description: 'Nail care and styling services.' },
  { name: 'Hair Treatments', description: 'Advanced hair treatments for healthy, beautiful hair.' },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 text-rose-600">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;