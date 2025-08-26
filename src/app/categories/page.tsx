'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_URL, getCategories, getDefaultBreadcrumbBanner } from '../../lib/api';
import { Row, Col, Button } from 'react-bootstrap';
import defaultBreadcrumbImage from '../../../public/assets/collections.jpg';
import Loader from '@/components/Loader';
import ScrollToTopButton from '@/components/ScrollToTopOnPageLoad';

interface Category {
  _id: string;
  name: string;
  image?: string;
  isActive: boolean;
  banner?: string;
}

interface DefaultBanner {
  _id: string;
  link: string;
  image: string;
}

const ShopAllCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [defaultBanner, setDefaultBanner] = useState<DefaultBanner | null>(null);

  if (!BASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE_URL in .env.local');
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedCategories, fetchedBanner] = await Promise.all([
          getCategories(),
          getDefaultBreadcrumbBanner(),
        ]);

        const activeCategories = fetchedCategories.filter(
          (category: Category) => category.isActive === true,
        );
        setCategories(activeCategories);
        setDefaultBanner(fetchedBanner[0] || null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setCategories([]);
        setDefaultBanner(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/250x250?text=No+Image';
  };

  // Determine banner image and link
  let breadcrumbImageSrc: string | any = defaultBreadcrumbImage;
  let breadcrumbLink: string | null = null;

  if (defaultBanner) {
    breadcrumbImageSrc = `${BASE_URL}/${defaultBanner.image}`;
    breadcrumbLink = defaultBanner.link.replace(/^https?:\/\/[^\/]+/, '');
  }

  if (loading) return <Loader />;

  return (
    <>
      {/* Banner */}
      <div
        className="banner"
        style={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {breadcrumbLink ? (
          <Link href={breadcrumbLink}>
            <Image
              src={breadcrumbImageSrc}
              alt="Collections Banner"
              layout="responsive"
              width={1600}
              height={600}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
              }}
              priority
            />
          </Link>
        ) : (
          <Image
            src={breadcrumbImageSrc}
            alt="Collections Banner"
            layout="responsive"
            width={1600}
            height={600}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
            }}
            priority
          />
        )}
      </div>

      <div className="p-3 p-md-5 pb-0 pt-4" aria-label="Suvarnakala All Categories Section">
        <div className="custom-heading-wrapper d-flex align-items-center mb-4">
          <h2 className="m-0 custom-heading text-wrap me-3">
            <span className="fraunces">
              Shop by <span className="text-red fraunces">Style :</span>
            </span>
            <div className="decorative-line">
              <div className="diamond"></div>
              <div className="line"></div>
              <div className="diamond"></div>
            </div>
          </h2>
          <span className="heading-extension fraunces">Find Your Perfect Match</span>
        </div>

        <div className="suvarnakala-categories-container">
          <Row>
            {categories.length === 0 ? (
              <div className="text-center">No active categories available</div>
            ) : (
              categories.map((item) => (
                <Col xs={6} lg={3} key={item._id} className=" mb-lg-2">
                  <Link
                    href={`/collections/products/${encodeURIComponent(item.name)}`}
                    className="suvarnakala-category-item text-decoration-none"
                    role="group"
                    aria-label={`Category: ${item.name}`}
                  >
                    <div
                      className="image-wrapper"
                      style={{
                        overflow: 'hidden',
                        borderRadius: '12px',
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
                    <p
                      className="text-gray mt-3 fs-4 fs-lg-5 text-center lora"
                      style={{ fontWeight: 100 }}
                    >
                      {item.name === 'Managalsutra' ? 'Mangalsutra' : item.name}
                    </p>
                  </Link>
                </Col>
              ))
            )}
          </Row>
        </div>
      </div>



      <ScrollToTopButton />
    </>
  );
};

export default ShopAllCategories;
