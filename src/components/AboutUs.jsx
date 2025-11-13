import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-6 text-gray-800">About Aleeza Beauty Makeover Studio</h2>
            <p className="text-lg text-gray-600 mb-4">
              At Aleeza Beauty Makeover Studio, we believe that beauty is not just about appearance, but about feeling confident and empowered. Our team of expert stylists and beauty professionals are passionate about transforming your look and enhancing your natural beauty.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              With years of experience in bridal styling, makeovers, and skincare, we provide personalized services that cater to your unique needs. Our commitment to excellence and attention to detail ensure that every client leaves our studio feeling radiant and beautiful.
            </p>
            <p className="text-lg text-gray-600">
              Join us in redefining your beauty journey.
            </p>
          </div>
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 h-96 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-gray-500 text-xl">Salon Interior Image</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;