// Gallery JavaScript with Supabase Integration

let supabaseClient = null;
const galleryContainer = document.getElementById('gallery-container');
const backgroundElement = document.getElementById('gallery-background');
const bucketName = 'gallery'; // Replace with your bucket name
let currentOffset = 0;
const batchSize = 20;
let isLoading = false;
let allImagesLoaded = false;

// Initialize Supabase
async function initSupabase() {
    const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your Supabase URL
    const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Supabase anon key

    supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase initialized');
}

// Cache management
const CACHE_KEY = 'gallery_images_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedImages() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { images, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
    return images;
}

function setCachedImages(images) {
    const cacheData = {
        images: images,
        timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

// Load images from Supabase bucket in batches
async function loadImagesFromBucket(limit = batchSize, offset = 0) {
    if (isLoading || allImagesLoaded) return [];

    // Use cache for initial load (offset 0)
    if (offset === 0) {
        const cached = getCachedImages();
        if (cached) {
            currentOffset = cached.length;
            allImagesLoaded = cached.length < batchSize;
            return cached.slice(0, limit);
        }
    }

    isLoading = true;
    showLoadingIndicator();

    try {
        const { data, error } = await supabaseClient.storage.from(bucketName).list('', {
            limit: limit,
            offset: offset,
            sortBy: { column: 'created_at', order: 'desc' }
        });

        if (error) throw error;

        if (data.length < limit) {
            allImagesLoaded = true;
        }

        const images = [];
        for (const file of data) {
            if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                const { data: urlData } = supabaseClient.storage.from(bucketName).getPublicUrl(file.name);
                images.push({
                    url: urlData.publicUrl,
                    name: file.name
                });
            }
        }

        currentOffset += data.length;

        // Cache the full list on initial load
        if (offset === 0) {
            setCachedImages(images);
        }

        return images;
    } catch (error) {
        console.error('Error loading images:', error);
        return [];
    } finally {
        isLoading = false;
        hideLoadingIndicator();
    }
}

// Subscribe to real-time updates
function subscribeToUpdates() {
    const channel = supabaseClient
        .channel('storage-changes')
        .on('postgres_changes', {
            event: '*',
            schema: 'storage',
            table: 'objects',
            filter: `bucket_id=eq.${bucketName}`
        }, async (payload) => {
            console.log('Storage change detected:', payload);
            // Clear cache and reset gallery
            localStorage.removeItem(CACHE_KEY);
            resetGallery();
            await loadInitialImages();
        })
        .subscribe();
}

// Render gallery (append new images)
function renderGallery(images, append = false) {
    if (!append) {
        galleryContainer.innerHTML = '';
    }

    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.dataset.src = image.url; // For lazy loading
        img.alt = image.name;
        img.loading = 'lazy';

        item.appendChild(img);
        galleryContainer.appendChild(item);
    });

    // Apply animations after rendering
    applyScrollAnimations();
    if (!append) {
        applyBackgroundEffects();
    }
}

// Show loading indicator
function showLoadingIndicator() {
    let loader = document.getElementById('gallery-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'gallery-loader';
        loader.innerHTML = '<div class="loading-spinner"></div><p>Loading images...</p>';
        galleryContainer.appendChild(loader);
    }
    loader.style.display = 'block';
}

// Hide loading indicator
function hideLoadingIndicator() {
    const loader = document.getElementById('gallery-loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

// Reset gallery state
function resetGallery() {
    currentOffset = 0;
    allImagesLoaded = false;
    galleryContainer.innerHTML = '';
}

// Apply scroll animations using IntersectionObserver
function applyScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => observer.observe(item));

    // Parallax effect
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rect = entry.boundingClientRect;
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const offset = (scrollPercent - 0.5) * 100;
                entry.target.style.setProperty('--parallax-offset', `${offset}px`);
                entry.target.classList.add('parallax');
            }
        });
    }, { threshold: 0 });

    items.forEach(item => parallaxObserver.observe(item));

    // Load more images when scrolling near bottom
    const loadMoreObserver = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && !isLoading && !allImagesLoaded) {
            const newImages = await loadImagesFromBucket();
            if (newImages.length > 0) {
                renderGallery(newImages, true);
            }
        }
    }, {
        threshold: 0.1,
        rootMargin: '100px'
    });

    // Observe the last item
    if (items.length > 0) {
        loadMoreObserver.observe(items[items.length - 1]);
    }
}

// Apply background effects
function applyBackgroundEffects() {
    // Floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        backgroundElement.appendChild(particle);
    }

    // Gradient shift is handled in CSS
}

// Lazy load images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Load initial batch of images
async function loadInitialImages() {
    const images = await loadImagesFromBucket();
    renderGallery(images);
}

// Initialize everything
async function init() {
    await initSupabase();
    await loadInitialImages();
    subscribeToUpdates();
    lazyLoadImages();
}

document.addEventListener('DOMContentLoaded', init);