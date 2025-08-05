'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getHeroes, BASE_URL } from '../lib/api';
import Image from 'next/image';

interface Hero {
  _id: string;
  title: string;
  description: string;
  image: string;
  priority: number;
  link: string;
  isActive: boolean;
}

const HeroCarousel: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first "real" slide
  const [isTransitioning, setIsTransitioning] = useState(false); // To control transitions
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Filter active heroes and sort by priority
  const sortedHeroes = [...heroes]
    .filter((hero) => hero.isActive)
    .sort((a, b) => a.priority - b.priority);

  // Add a copy of the last and first heroes for seamless looping
  const duplicatedHeroes = [...sortedHeroes];
  if (sortedHeroes.length > 0) {
    duplicatedHeroes.unshift(sortedHeroes[sortedHeroes.length - 1]);
    duplicatedHeroes.push(sortedHeroes[0]);
  }

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setSlideWidth(containerRef.current.clientWidth);
      } else {
        setSlideWidth(window.innerWidth);
      }
      setIsMobile(window.innerWidth < 768);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Autoplay functionality
  useEffect(() => {
    if (slideWidth === 0 || sortedHeroes.length === 0) return;
    const interval = setInterval(() => goNext(), 7000);
    return () => clearInterval(interval);
  }, [slideWidth, goNext, sortedHeroes.length]);

  // Logic to handle the infinite loop jump
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        if (currentIndex === duplicatedHeroes.length - 1) {
          setIsTransitioning(false);
          setCurrentIndex(1); // Jump to the first "real" slide
        } else if (currentIndex === 0) {
          setIsTransitioning(false);
          setCurrentIndex(duplicatedHeroes.length - 2); // Jump to the last "real" slide
        } else {
          setIsTransitioning(false);
        }
      }, 700); // Match this duration with your CSS transition time
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning, duplicatedHeroes.length]);

  return (
    <div
      ref={containerRef}
      className="position-relative overflow-hidden hero-section"
      style={{ width: '100%', maxWidth: '100vw', margin: 'auto' }}
      aria-label="Suvarnakala Hero Section Carousel"
    >
      {duplicatedHeroes.length > 0 ? (
        <div
          style={{
            display: 'flex',
            width: `${duplicatedHeroes.length * slideWidth}px`,
            transform: `translateX(-${currentIndex * slideWidth}px)`,
            transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none',
          }}
          aria-live="polite"
        >
          {duplicatedHeroes.map(({ title, description, image, link }, idx) => {
            const imageUrl = image.startsWith('http') ? image : `${BASE_URL}/${image}`;
            const validLink = link?.startsWith('http') ? link : '#';
            return (
              <div
                key={idx}
                style={{
                  width: `${slideWidth}px`,
                  position: 'relative',
                  flexShrink: 0,
                }}
                className="hero-banner"
                role="group"
                aria-label={`Slide ${idx + 1}: ${title}`}
              >
                {/* Use Next.js Image component for optimized loading */}
                <Image
                  src={imageUrl || '/fallback-image.jpg'}
                  alt={title}
                  width={isMobile ? slideWidth : slideWidth}
                  height={isMobile ? 450 : 600}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  priority={true}
                  onError={(e) => {
                    e.currentTarget.src = '/fallback-image.jpg';
                    console.error('Failed to load hero image, using fallback.');
                  }}
                />

                {/* Overlay for Desktop */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    display: isMobile ? 'none' : 'block',
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
                    display: isMobile ? 'none' : 'flex',
                  }}
                >
                  <h1 className="display-6 fw-semibold lora mb-4">{title}</h1>
                  <p className="lead mb-5 ">{description}</p>
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
                  className="d-flex d-md-none flex-column justify-content-center align-items-center text-center hero-mobile"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '20px',
                    color: 'white',
                    zIndex: 2,
                    display: isMobile ? 'flex' : 'none',
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
      ) : null}

      {/* Navigation Buttons */}
      {sortedHeroes.length > 0 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous Slide"
            className="position-absolute top-50 start-0 translate-middle-y btn btn-white rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              marginLeft: '10px',
              backgroundColor: 'white',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          >
            <svg viewBox="0 0 24 24" fill="black" width="32px" height="32px">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next Slide"
            className="position-absolute top-50 end-0 translate-middle-y btn btn-white rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              marginRight: '10px',
              backgroundColor: 'white',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          >
            <svg viewBox="0 0 24 24" fill="black" width="32px" height="32px">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
