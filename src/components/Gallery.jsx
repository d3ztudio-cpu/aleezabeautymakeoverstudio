import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Supabase configuration
const supabaseUrl = 'https://eaamxtitxrsteidkmskl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhYW14dGl0eHJzdGVpZGttc2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTg1MzAsImV4cCI6MjA3ODU3NDUzMH0.p3Ee1NH1LfsPfkRg6KtxoY9azmwmqquFO0HqwswRXO8';
const bucketName = 'gallary';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cache management
const CACHE_KEY = 'gallery_images_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const galleryRef = useRef(null);

  // Cache functions
  const getCachedImages = () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { images, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return images;
  };

  const setCachedImages = (images) => {
    const cacheData = {
      images,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  };

  // Load images from Supabase
  const loadImages = async () => {
    const cached = getCachedImages();
    if (cached) {
      setImages(cached);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.storage.from(bucketName).list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });

      if (error) throw error;

      const imageList = [];
      for (const file of data) {
        if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(file.name);
          imageList.push({
            src: urlData.publicUrl,
            alt: file.name
          });
        }
      }

      setCachedImages(imageList);
      setImages(imageList);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to real-time updates
  useEffect(() => {
    loadImages();

    const channel = supabase
      .channel('storage-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'storage',
        table: 'objects',
        filter: `bucket_id=eq.${bucketName}`
      }, (payload) => {
        console.log('Storage change detected:', payload);
        localStorage.removeItem(CACHE_KEY);
        loadImages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // No complex scroll animations to avoid refreshing issues

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">Gallery</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <style>
        {`
          .gallery-scroll-container {
            overflow: hidden;
            width: 100%;
          }
          .gallery-scroll-content {
            display: flex;
            gap: 20px;
            animation: scroll-left 30s linear infinite;
          }
          .gallery-item {
            flex-shrink: 0;
          }
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">Gallery</h2>
        <div className="gallery-scroll-container">
          <div className="gallery-scroll-content">
            {[...images, ...images].map((img, i) => (
              <div key={i} className="gallery-item">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-64 h-48 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-80 transition"
          >
            View All Images
          </button>
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images}
          index={index}
        />
      </div>
    </section>
  );
};

export default Gallery;