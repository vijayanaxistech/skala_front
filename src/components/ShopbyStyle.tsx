'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_URL, getCategories } from '../lib/api';

interface Category {
  _id: string;
  name: string;
  image?: string;
  isActive: boolean;
}

const ShopbyStyle = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => {
        // Filter only active categories
        const activeCategories = data.filter((category: Category) => category.isActive === true);
        setCategories(activeCategories);
      })
      .catch((err) => {
        console.error('Failed to fetch categories:', err);
        setCategories([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const displayedCategories = categories.slice(0, 7);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/250x250?text=No+Image';
  };

  return (
    <div className="p-5 pb-0 pt-4" aria-label="Suvarnakala Shop by Style Section">
      <div className="custom-heading-wrapper d-flex align-items-center mb-4">
        <h2 className="m-0 custom-heading text-wrap me-3">
          <span>
            Shop by <span className="text-red">Style :</span>
          </span>
          <div className="decorative-line">
            <div className="diamond"></div>
            <div className="line"></div>
            <div className="diamond"></div>
          </div>
        </h2>
        <span className="heading-extension">Find Your Perfect Match</span>
      </div>

      <div className="categories-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {isLoading ? (
          <div className="text-center col-span-full">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="text-center col-span-full">No active categories available</div>
        ) : (
          <>
            {displayedCategories.map((item, index) => (
              <Link
                href={`/collections/jewelry/${encodeURIComponent(item.name)}`}
                key={item._id}
                className={`category-item text-decoration-none ${index < 4 ? 'top-row' : 'bottom-row'}`}
                role="group"
                aria-label={`Category: ${item.name}`}
              >
                <div
                  className="image-wrapper"
                  style={{
                    overflow: 'hidden',
                    borderRadius: '0.80rem',
                    aspectRatio: '1/1',
                  }}
                >
                  <Image
                    src={
                      item.image && item.image.startsWith('uploads/')
                        ? `${BASE_URL}/${item.image}`
                        : 'https://via.placeholder.com/250x250?text=No+Image'
                    }
                    alt={`Suvarnakala ${item.name} Jewelry Collection`}
                    width={250}
                    height={250}
                    className="img-fluid category-image"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
                <p className="text-red mt-2 fs-5 sm:fs-5 text-center">
                  {item.name === 'Managalsutra' ? 'Mangalsutra' : item.name}
                </p>
              </Link>
            ))}

            <Link
              href="/collections"
              key="view-all"
              className="category-item text-decoration-none bottom-row"
              role="group"
              aria-label="Explore Additional Categories"
            >
              <div
                className="image-wrapper d-flex flex-column justify-content-center align-items-center text-center"
                style={{
                  background: 'linear-gradient(135deg, #F5E7D6 0%, #F5E7D6 100%)',
                  overflow: 'hidden',
                  borderRadius: '0.80rem',
                  aspectRatio: '1/1',
                  width: '100%',
                  color: '#6b4c2d',
                  fontFamily: "'Playfair Display', serif",
                  padding: '1.5rem',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                }}
              >
                <p
                  className="fs-5 fw-bold mb-0"
                  style={{ textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em' }}
                >
                  Discover
                </p>
                <p className="fs-4" style={{ fontWeight: '500', marginTop: '0.25rem' }}>
                  Exclusive Collections
                </p>
              </div>
              <p className="text-red mt-2 fs-5 sm:fs-5 text-center">View all</p>
            </Link>
          </>
        )}
      </div>

      <style jsx global>{`
        .category-item:hover .category-image {
          transform: scale(1.05);
        }
        @media (min-width: 768px) {
          .top-row {
            grid-column: auto;
          }
          .bottom-row {
            grid-column: auto;
          }
        }
        @media (max-width: 767px) {
          .categories-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .top-row:nth-child(1),
          .top-row:nth-child(2) {
            grid-column: 1;
          }
          .top-row:nth-child(3),
          .top-row:nth-child(4) {
            grid-column: 2;
          }
          .bottom-row:nth-child(5),
          .bottom-row:nth-child(6) {
            grid-column: 1;
          }
          .extra-category {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </div>
  );
};

export default ShopbyStyle;