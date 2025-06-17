'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getHeroes, BASE_URL } from '../lib/api';

interface Hero {
  _id: string;
  title: string;
  description: string;
  image: string;
  priority: number;
  link: string;
}

const HeroCarousel: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const data = await getHeroes();
        setHeroes(data || []);
      } catch (error) {
        console.error('Failed to fetch heroes:', error);
      }
    }
    fetchHeroes();
  }, []);

  const sortedHeroes = [...heroes].sort((a, b) => a.priority - b.priority);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setSlideWidth(containerRef.current.clientWidth);
      } else {
        setSlideWidth(window.innerWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (sortedHeroes.length || 1));
  }, [sortedHeroes.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + (sortedHeroes.length || 1)) % (sortedHeroes.length || 1));
  }, [sortedHeroes.length]);

  useEffect(() => {
    if (slideWidth === 0 || sortedHeroes.length === 0) return;
    const interval = setInterval(() => goNext(), 3000);
    return () => clearInterval(interval);
  }, [slideWidth, goNext, sortedHeroes.length]);

  return (
    <div
      ref={containerRef}
      className="position-relative overflow-hidden"
      style={{ width: '100%', maxWidth: '100vw', height: '600px', margin: 'auto' }}
      aria-label="Suvarnakala Hero Section Carousel"
    >
      {sortedHeroes.length > 0 ? (
        <div
          style={{
            display: 'flex',
            width: `${sortedHeroes.length * slideWidth}px`,
            transform: `translateX(-${currentIndex * slideWidth}px)`,
            transition: 'transform 0.7s ease-in-out',
          }}
          aria-live="polite"
        >
          {sortedHeroes.map(({ title, description, image, link }, idx) => {
            // Fixed image URL construction by adding a leading slash
            const imageUrl = image.startsWith('http') ? image : `${BASE_URL}/${image}`;
            const validLink = link?.startsWith('http') ? link : '#';
            return (
              <div
                key={idx}
                style={{
                  width: `${slideWidth}px`,
                  height: '600px',
                  position: 'relative',
                  flexShrink: 0,
                  backgroundImage: `url(${imageUrl || '/fallback-image.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f0f0f0',
                }}
                role="group"
                aria-label={`Slide ${idx + 1}: ${title}`}
              >
                {/* Overlay for Desktop */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1,
                  }}
                />
                <div
                  className="d-none d-md-flex flex-column justify-content-center"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '5%',
                    height: '100%',
                    color: 'white',
                    maxWidth: '40%',
                    paddingRight: '15px',
                    zIndex: 2,
                  }}
                >
                  <h1 className="display-6 fw-semibold mb-4">{title}</h1>
                  <p className="lead mb-5">{description}</p>
                  <a
                    href={validLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn custom-btn btn-lg w-auto px-4"
                  >
                    View More
                  </a>
                </div>

                {/* Overlay for Mobile */}
                <div
                  className="d-flex d-md-none flex-column justify-content-center align-items-center text-center"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '20px',
                    color: 'white',
                    zIndex: 2,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0))',
                  }}
                >
                  <h3 className="fw-semibold mb-3">{title}</h3>
                  <p className="mb-4">{description}</p>
                  <a
                    href={validLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn custom-btn"
                  >
                    View More
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
          }}
        >
          <p>Loading banners...</p>
        </div>
      )}

      {/* Navigation Buttons */}
      {sortedHeroes.length > 0 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous Slide"
            className="position-absolute top-50 start-0 translate-middle-y btn btn-white rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '30px',
              height: '30px',
              marginLeft: '10px',
              backgroundColor: 'white',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          >
            <svg viewBox="0 0 24 24" fill="black" width="24px" height="24px">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next Slide"
            className="position-absolute top-50 end-0 translate-middle-y btn btn-white rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '30px',
              height: '30px',
              marginRight: '10px',
              backgroundColor: 'white',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          >
            <svg viewBox="0 0 24 24" fill="black" width="24px" height="24px">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;