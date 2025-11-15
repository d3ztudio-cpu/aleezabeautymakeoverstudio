import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const images = [
  { src: 'https://via.placeholder.com/400x300?text=Bridal+Makeover+1', alt: 'Bridal Makeover 1' },
  { src: 'https://via.placeholder.com/400x300?text=Hair+Styling+1', alt: 'Hair Styling 1' },
  { src: 'https://via.placeholder.com/400x300?text=Facials+1', alt: 'Facials 1' },
  { src: 'https://via.placeholder.com/400x300?text=Manicure+1', alt: 'Manicure 1' },
  { src: 'https://via.placeholder.com/400x300?text=Hair+Treatments+1', alt: 'Hair Treatments 1' },
  { src: 'https://via.placeholder.com/400x300?text=Salon+Interior+1', alt: 'Salon Interior 1' },
  { src: 'https://via.placeholder.com/400x300?text=Client+Testimonial+1', alt: 'Client Testimonial 1' },
  { src: 'https://via.placeholder.com/400x300?text=Beauty+Tips+1', alt: 'Beauty Tips 1' },
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity shadow-lg"
              onClick={() => { setIndex(i); setOpen(true); }}
              loading="lazy"
            />
          ))}
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map(img => ({ src: img.src }))}
          index={index}
        />
      </div>
    </section>
  );
};

export default Gallery;