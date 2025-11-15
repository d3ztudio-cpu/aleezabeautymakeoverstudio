import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <AboutUs data-aos="fade-up" />
      <Services data-aos="fade-up" />
      <Gallery data-aos="fade-up" />
      <Testimonials data-aos="fade-up" />
      <BookingForm data-aos="fade-up" />
      <Footer />
    </div>
  );
}

export default App;
