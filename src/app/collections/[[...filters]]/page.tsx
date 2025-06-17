import React from 'react';
import Image from 'next/image';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import defaultBreadcrumbImage from '../../../../public/assets/collections.png';
import shopnowbg from '../../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
import shopWomen from '../../../../public/assets/shopWomwn.png';
import banglesImage from '../../../../public/assets/1.jpg';
import braceletsImage from '../../../../public/assets/2.jpg';
import chainsImage from '../../../../public/assets/3.jpg';
import earringsImage from '../../../../public/assets/4.jpg';
import mangalsutraImage from '../../../../public/assets/5.jpg';
import necklessImage from '../../../../public/assets/6.jpg';
import pendantImage from '../../../../public/assets/women-s-earings_8408-3.avif';
import ringImage from '../../../../public/assets/cf111899016362517bb2fe4c9508dfd5281ec129.png';
import styles from '@/app/page.module.css';
import FilterDropdown from './FilterDropdown';
import WhatsAppButton from '../WhatsAppButton';
import MoreInfoButton from '../MoreInfo';
import { getProducts, getCategories, BASE_URL } from '@/lib/api';
import { Metadata } from 'next';

// Define interfaces for TypeScript
interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
  banner?: string;
}

interface Product {
  _id: string;
  title: string;
  category: Category;
  description: string;
  metal: string;
  purity: string;
  occasion: string;
  grossWeight: string;
  mainImage: string;
  subImages: string[];
  metalPurity?: string;
}

export const metadata: Metadata = {
  title: 'Collections | Suvarnakala Pvt. Ltd',
};

// Category image mapping for product cards
const categoryImages: { [key: string]: any } = {
  Bangles: banglesImage,
  Bracelets: braceletsImage,
  Chains: chainsImage,
  Earrings: earringsImage,
  Mangalsutra: mangalsutraImage,
  Necklace: necklessImage,
  Pendant: pendantImage,
  Ring: ringImage,
};

export async function generateStaticParams() {
  const categories = await getCategories();
  const paths = categories.map((category: Category) => ({
    filters: ['jewelry', category.name],
  }));
  return [
    { filters: [] }, // Fallback route for /collections
    ...paths,
  ];
}

// Server Component
export default async function ProductsPage({ params }: { params: { filters?: string[] } }) {
  // Fetch products and categories server-side
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  // Normalize products
  const normalizedProducts = products.map((product: Product) => ({
    ...product,
    purity: product.purity || product.metalPurity || '',
    metalPurity: undefined,
    metal: product.metal || '',
    occasion: product.occasion || '',
    category: { ...product.category, name: product.category?.name || '' },
  }));

  // Extract unique filter options
  const uniqueMetals = [...new Set(normalizedProducts.map((p) => p.metal).filter(Boolean))];
  const uniquePurities = [...new Set(normalizedProducts.map((p) => p.purity).filter(Boolean))];
  const uniqueOccasions = [...new Set(normalizedProducts.map((p) => p.occasion).filter(Boolean))];
  const uniqueCategories = [
    ...new Set(normalizedProducts.map((p) => p.category.name).filter(Boolean)),
  ];

  // Extract filter parameters from URL segments
  const filters = params.filters || [];
  const filterPairs: { [key: string]: string } = {};
  for (let i = 0; i < filters.length - 1; i += 2) {
    const type = decodeURIComponent(filters[i]);
    const value = decodeURIComponent(filters[i + 1]);
    if (type === 'jewelry') {
      filterPairs['category'] = value;
    } else if (['metal', 'purity', 'occasion'].includes(type)) {
      filterPairs[type] = value;
    }
  }

  // Log for debugging
  console.log('Active Filters:', filterPairs);

  // Filter products server-side based on all active filters
  let filteredProducts = [...normalizedProducts];
  if (filterPairs.category) {
    filteredProducts = filteredProducts.filter((p) => p.category.name === filterPairs.category);
  }
  if (filterPairs.metal) {
    filteredProducts = filteredProducts.filter((p) => p.metal === filterPairs.metal);
  }
  if (filterPairs.purity) {
    filteredProducts = filteredProducts.filter((p) => p.purity === filterPairs.purity);
  }
  if (filterPairs.occasion) {
    filteredProducts = filteredProducts.filter((p) => p.occasion === filterPairs.occasion);
  }

  // Log filtered product count
  console.log('Filtered Products Count:', filteredProducts.length);

  // Determine display title
  const displayTitle = Object.values(filterPairs).join(', ') || 'All Products';

  // Determine breadcrumb image based on category banner
  let breadcrumbImageSrc = defaultBreadcrumbImage;
  if (filterPairs.category) {
    const selectedCategory = categories.find((cat: Category) => cat.name === filterPairs.category);
    if (selectedCategory?.banner) {
      breadcrumbImageSrc = `${BASE_URL}/${selectedCategory.banner}`;
    }
  }

  return (
    <>
      {/* Banner Image */}
      <div className="banner" style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src={breadcrumbImageSrc}
          alt={`${filterPairs.category || 'Collections'} Banner`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="py-5 p-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h3 className="mb-0 fs-5 fs-md-4">
            {displayTitle} ({filteredProducts.length})
          </h3>
          <div className="ms-auto">
            <FilterDropdown
              categories={uniqueCategories}
              metals={uniqueMetals}
              purities={uniquePurities}
              occasions={uniqueOccasions}
              selectedFilters={filterPairs}
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center">No products found.</div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
            {filteredProducts.map((product: Product) => (
              <Col key={product._id}>
                <Link
                  href={`/jewelry/${product.category.name.toLowerCase().replace(/\s+/g, '-')}/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-decoration-none"
                >
                  <div className="product-card h-100 border-0">
                    <div className="product-image imageWrapper">
                      <Image
                        src={
                          product.mainImage
                            ? `${BASE_URL}/${product.mainImage}`
                            : 'https://via.placeholder.com/300x300?text=No+Image'
                        }
                        alt={product.title}
                        width={350}
                        height={350}
                        className="categoryImage"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <div className="p-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="card-title text-dark text-truncate mb-0">
                          {product.title.length > 20
                            ? product.title.substring(0, 20) + '...'
                            : product.title}
                        </h6>

                        <div className="d-flex align-items-center gap-2">
                          <MoreInfoButton
                            product={{
                              title: product.title,
                              metal: product.metal,
                              purity: product.purity,
                              grossWeight: product.grossWeight,
                              mainImage: product.mainImage
                                ? `${BASE_URL}/${product.mainImage}`
                                : 'https://via.placeholder.com/300x300?text=No+Image',
                              category: product.category, // Add category object
                            }}
                          />
                          <WhatsAppButton
                            product={{
                              id: product._id,
                              title: product.title,
                              metal: product.metal,
                              purity: product.purity,
                              grossWeight: product.grossWeight,
                              category: product.category,
                            }}
                          />
                        </div>
                      </div>

                      <p className="card-text text-dark mb-1">
                        Metal Purity: {product.metal} {product.purity}
                      </p>
                      <p className="card-text text-dark mb-0">Gross Wt: {product.grossWeight}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Shop Now Section */}
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image src={shopnowbg} alt="Shop Now Banner" layout="fill" objectFit="cover" priority />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="d-none d-md-flex justify-content-start">
                <Image src={shopWomen} alt="Shop Girl" width={300} height={300} />
              </Col>
              <Col xs={12} md={6} className="text-center text-md-start text-white">
                <h1 className="fs-4 fs-md-3 fw-semibold lh-tight mb-4">
                  Elevate Every Moment with Timeless Jewellery
                </h1>
                <Link href="/collections">
                  <Button
                    variant="outline-light rounded-0"
                    className={styles.shopNowBtn}
                    style={{ textDecoration: 'none' }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
