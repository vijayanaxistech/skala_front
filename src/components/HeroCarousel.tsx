'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getHeroes, BASE_URL } from '../lib/api';
import Image from 'next/image';
import Loader from '@/components/Loader';

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
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const data = await getHeroes();
        setHeroes(data || []);
      } catch (error) {
        console.error('Failed to fetch heroes:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch attempt
      }
    }
    fetchHeroes();
  }, []);

  const sortedHeroes = [...heroes]
    .filter((hero) => hero.isActive)
    .sort((a, b) => a.priority - b.priority);

  // Duplicate for infinite loop
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

  // Autoplay
  useEffect(() => {
    if (slideWidth === 0 || sortedHeroes.length === 0 || isLoading) return; // Add isLoading check
    const interval = setInterval(() => goNext(), 4000);
    return () => clearInterval(interval);
  }, [slideWidth, goNext, sortedHeroes.length, isLoading]); // Add isLoading to dependency array

  // Infinite loop logic
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        if (currentIndex === duplicatedHeroes.length - 1) {
          setIsTransitioning(false);
          setCurrentIndex(1);
        } else if (currentIndex === 0) {
          setIsTransitioning(false);
          setCurrentIndex(duplicatedHeroes.length - 2);
        } else {
          setIsTransitioning(false);
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning, duplicatedHeroes.length]);

  // Handle dot click
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // +1 because of duplicated first slide
  };

  if (isLoading) {
    return (
 <Loader />
    );
  }

  return (
    <div
      ref={containerRef}
      className="position-relative overflow-hidden hero-section"
      style={{ width: '100%', maxWidth: '100vw', margin: 'auto' }}
      aria-label="Suvarnakala Hero Section Carousel"
    >
      {duplicatedHeroes.length > 0 && (
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
                  }}
                />

                {/* Desktop Overlay */}
                <div
                  className="d-none d-md-flex flex-column justify-content-center"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: '5%',
                    height: '100%',
                    color: 'white',
                    maxWidth: '30%',
                    paddingRight: '15px',
                    zIndex: 2,
                    display: isMobile ? 'none' : 'flex',
                  }}
                >
                  <h2 className="fraunces">{title}</h2>
                  <p className=" lora mb-4">{description}</p>
                  <a
                    href={validLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn custom-btn bg-white text-dark btn-lg w-auto px-4"
                  >
                    View More
                  </a>
                </div>

                {/* Mobile Overlay */}
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
                  <p className="mb-4">{description}</p>
                  <a
                    href={validLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn custom-btn bg-white text-dark"
                  >
                    View More
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dots */}
      <div
        className="position-absolute w-100 d-flex justify-content-center"
        style={{ bottom: 15, zIndex: 10 }}
      >
        {sortedHeroes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: 'none',
              margin: '0 5px',
              backgroundColor: currentIndex === idx + 1 ? '#fff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;