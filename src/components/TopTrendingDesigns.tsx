'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Configure base URL for API
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log('BASE_URL', BASE_URL);

interface TrendingDesign {
  _id: string;
  name: string;
  image?: string;
  instaLink: string;
  priority: number;
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1441 }, items: 4 },
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1023, min: 768 }, items: 3 },
  smallTablet: { breakpoint: { max: 767, min: 576 }, items: 2 },
  mobile: { breakpoint: { max: 575, min: 0 }, items: 1 },
};

interface TopTrendingDesignProps {
  initialDesigns: TrendingDesign[];
}

const TopTrendingDesign: React.FC<TopTrendingDesignProps> = ({ initialDesigns }) => {
  const [designs, setDesigns] = useState<TrendingDesign[]>(initialDesigns);

  useEffect(() => {
    // Sort designs by priority in descending order
    const sortedDesigns = [...initialDesigns].sort((a, b) => b.priority - a.priority);
    setDesigns(sortedDesigns);
  }, [initialDesigns]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Suvarnakala Top Trending Designs',
    description:
      'Explore Suvarnakala’s top trending jewelry designs, featuring the latest styles in gold, diamond, and more for every occasion.',
    itemListElement: designs.map((design, index) => ({
      '@type': 'Product',
      position: index + 1,
      name: design.name,
      image: design.image
        ? `${BASE_URL}/${design.image}`
        : 'https://via.placeholder.com/300x300?text=No+Image',
      description: `Suvarnakala ${design.name} trending jewelry design.`,
      brand: { '@type': 'Brand', name: 'Suvarnakala' },
    })),
  };

  return (
    <>
      <Head>
        <title>Suvarnakala Top Trending Jewelry Designs - Latest Styles</title>
        <meta
          name="description"
          content="Discover Suvarnakala’s top trending jewelry designs, featuring the latest in gold, diamond, and more."
        />
        <meta
          name="keywords"
          content="Suvarnakala, trending jewelry, top jewelry designs, gold jewelry, diamond jewelry, latest jewelry styles"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourwebsite.com/top-trending-designs" />
        <meta
          property="og:title"
          content="Suvarnakala Top Trending Jewelry Designs - Latest Styles"
        />
        <meta
          property="og:description"
          content="Explore Suvarnakala’s top trending jewelry designs, featuring the latest in gold, diamond, and more."
        />
        <meta
          property="og:image"
          content={
            designs.length > 0 && designs[0].image
              ? `${BASE_URL}/${designs[0].image}`
              : 'https://via.placeholder.com/300x300?text=No+Image'
          }
        />
        <meta property="og:url" content="https://yourwebsite.com/top-trending-designs" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <style jsx>{`
        .image-container {
          position: relative;
          width: 100%;
          padding-top: 100%;
          overflow: hidden;
          // border-radius: 12px;
          cursor: pointer;
        }
        .image-container img {
          transition:
            transform 0.3s ease,
            filter 0.3s ease;
        }
        .image-container:hover img {
          transform: scale(1.1);
          filter: brightness(60%) contrast(1.1);
        }
        .link-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          border-radius: 50%;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-container:hover .link-icon {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.1);
        }
        .custom-icon {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
      `}</style>

      <div className=" p-2 px-md-5 py-md-4 pb-0 pt-4" aria-label="Suvarnakala Top Trending Designs Section">
        <div className="custom-heading-wrapper d-flex align-items-center mb-4">
          <h2 className="m-0 custom-heading text-wrap me-3">
            <span className="fraunces">
              Top Trending <span className="text-red fraunces">Designs :</span>
            </span>
            <div className="decorative-line">
              <div className="diamond"></div>
              <div className="line"></div>
              <div className="diamond"></div>
            </div>
          </h2>
          <span className="heading-extension fraunces">
            Elevate Your Look with the Latest Designs
          </span>
        </div>

        <div className="mt-4">
          {designs.length === 0 ? (
            <div className="text-center">No trending designs available</div>
          ) : (
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={3000}
              showDots={false}
              arrows={false}
              containerClass="carousel-container"
              itemClass="px-2 "
              aria-live="polite"
            >
              {designs.map((item) => {
                const imageUrl = item.image
                  ? `${BASE_URL}/${item.image}`
                  : 'https://via.placeholder.com/300x300?text=No+Image';

                return (
                  <div
                    key={item._id}
                    className="bg-transparent"
                    role="group"
                    aria-label={`Trending Design: ${item.name}`}
                  >
                    <div className="image-container rounded-top-4">
                      <a
                        href={item.instaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit Instagram link for ${item.name}`}
                      >
                        <Image
                          src={imageUrl}
                          alt={`Suvarnakala ${item.name} Trending Jewelry Design`}
                          fill
                        
                          sizes="(max-width: 576px) 100vw, 300px"
                          style={{ objectFit: 'cover', borderRadius:'12px', transition: 'filter 0.3s ease' }}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://via.placeholder.com/300x300?text=No+Image';
                          }}
                        />
                        <span className="link-icon">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="custom-icon"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.468.067-2.847.364-3.928 1.445-1.081 1.081-1.378 2.46-1.445 3.928-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.067 1.468.364 2.847 1.445 3.928 1.081 1.081 2.46 1.378 3.928 1.445 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.468-.067 2.847-.364 3.928-1.445 1.081-1.081 1.378-2.46 1.445-3.928.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.067-1.468-.364-2.847-1.445-3.928-1.081-1.081-2.46-1.378-3.928-1.445-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441s.645-1.441 1.441-1.441 1.441.645 1.441 1.441-.645 1.441-1.441 1.441z" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </div>
    </>
  );
};

export default TopTrendingDesign;
