import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Row, Col, Button } from 'react-bootstrap';
import defaultBreadcrumbImage from '../../../../../public/assets/collections.png';
import shopnowbg from '../../../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
import shopWomen from '../../../../../public/assets/shopWomwn.png';
import styles from '../../../page.module.css';
import { getProductBySlug, getProducts, BASE_URL } from '../../../../lib/api';
import WhatsAppButton from '../../../collections/WhatsAppButton';
import MoreInfoButton from '../../../collections/MoreInfo';
import ProductImageGallery from '../../ProductImageGallery';
import { Metadata } from 'next';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

// Define interfaces
interface Category {
  _id: string;
  name: string;
  image: string;
  banner?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RawProduct {
  _id: string;
  title: string;
  category: Category;
  description: string;
  jewelleryType: string;
  purity: string;
  occasion: string;
  grossWeight: string;
  mainImage: string;
  subImage1: string;
  subImage2: string;
  subImage3: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Product {
  _id: string;
  title: string;
  category: Category;
  description: string;
  jewelleryType: string;
  purity: string;
  occasion: string;
  grossWeight: string;
  mainImage: string;
  subImages: string[];
}

export const metadata: Metadata = {
  title: 'Collections | Suvarnakala Pvt. Ltd',
};

// Transform raw product data
const transformProduct = (raw: RawProduct): Product => ({
  ...raw,
  subImages: [raw.subImage1, raw.subImage2, raw.subImage3].filter(Boolean),
});

// Generate static paths for jewelry/[category]/[slug]
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product: RawProduct) => ({
    category: product.category.name.toLowerCase().replace(/\s+/g, '-'),
    slug: product.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}

const ProductDetailPage = async ({ params }: { params: { category: string; slug: string } }) => {
  const { category, slug } = params;

  // Fetch single product by slug (title-based)
  const rawProduct = await getProductBySlug(slug);
  let product: Product | null = null;

  if (rawProduct) {
    product = transformProduct(rawProduct);
    // Verify category matches
    if (product.category.name.toLowerCase().replace(/\s+/g, '-') !== category) {
      notFound();
    }
  } else {
    notFound();
  }

  // Fetch all products for similar products
  const rawProducts = await getProducts();
  const allProducts = rawProducts.map(transformProduct);
  const similarProducts = product
    ? allProducts
        .filter((p) => p.category._id === product.category._id && p._id !== product._id)
        .slice(0, 3)
    : [];

  const thumbnailImages = [
    product.mainImage,
    ...product.subImages.filter((img) => img !== product.mainImage),
  ];

  // Determine breadcrumb image based on category banner
  let breadcrumbImageSrc = defaultBreadcrumbImage;
  if (product.category.banner) {
    breadcrumbImageSrc = `${BASE_URL}/${product.category.banner}`;
  }

  return (
    <>
      <ClientLayoutWrapper>
        {/* Banner */}
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
          <Image
            src={breadcrumbImageSrc}
            alt={`${product.category.name} Banner`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Product Section */}
        <div className="bg-color">
          <div className="p-5 py-5">
            <div className="row g-4">
              {/* Image Gallery */}
              <ProductImageGallery
                mainImage={product.mainImage}
                thumbnailImages={thumbnailImages}
                productTitle={product.title}
              />

              {/* Details */}
              <div className="col-12 col-md-6 d-flex flex-column justify-content-center order-md-3">
                <div className="px-2 px-md-4">
                  <h6 className="text-muted mb-1">{product.category.name}</h6>
                  <h3 className="fw-bold text-dark mb-1">{product.title}</h3>
                  <div className="mb-2">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i} style={{ color: '#FD7A08', fontSize: '1.2rem' }}>
                        {star}
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-muted"
                    style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify' }}
                  >
                    {product.description
                      ? product.description.substring(0, 400) +
                        (product.description.length > 400 ? '...' : '')
                      : 'Discover timeless elegance with this exquisitely crafted jewelry piece.'}
                  </p>

                  <p
                    className="mb-2"
                    style={{ borderBottom: '1px solid #C4C4C4', paddingBottom: '4px' }}
                  >
                    <strong>Category :</strong>{' '}
                    <span className="text-muted">{product.category.name}</span>
                  </p>
                  <p
                    className="mb-2"
                    style={{ borderBottom: '1px solid #C4C4C4', paddingBottom: '4px' }}
                  >
                    <strong>Jewellery Type :</strong>{' '}
                    <span className="text-dark">{product.jewelleryType}</span>
                  </p>
                  <p
                    className="mb-2"
                    style={{ borderBottom: '1px solid #C4C4C4', paddingBottom: '4px' }}
                  >
                    <strong>Purity :</strong> <span className="text-dark">{product.purity}</span>
                  </p>
                  <p
                    className="mb-0"
                    style={{ borderBottom: '1px solid #C4C4C4', paddingBottom: '4px' }}
                  >
                    <strong>Gross Wt :</strong>{' '}
                    <span className="text-dark">{product.grossWeight}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="row mt-5">
              <div className="col-12">
                <h5 className="fw-bold text-dark mb-3">Description</h5>
                <p
                  className="text-muted"
                  style={{ fontSize: '15px', lineHeight: '1.8', textAlign: 'justify' }}
                >
                  {product.description ||
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                </p>
              </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <div className="row mt-5">
                <h5 className="fw-bold text-dark mb-4">Related Products</h5>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
                  {similarProducts.map((item) => (
                    <Col key={item._id}>
                      <Link
                        href={`/jewelry/${item.category.name.toLowerCase().replace(/\s+/g, '-')}/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="product-card h-100 border-0">
                          <div className="product-image imageWrapper">
                            <Image
                              src={`${BASE_URL}/${item.mainImage}`}
                              alt={item.title}
                              width={350}
                              height={350}
                              className="categoryImage"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <div className="p-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="card-title text-dark text-truncate mb-0">
                                {item.title.length > 20
                                  ? item.title.substring(0, 20) + '...'
                                  : item.title}
                              </h6>
                              <div className="d-flex align-items-center gap-2">
                                <MoreInfoButton
                                  product={{
                                    title: item.title,
                                    jewelleryType: item.jewelleryType,
                                    purity: item.purity,
                                    grossWeight: item.grossWeight,
                                    mainImage: item.mainImage
                                      ? `${BASE_URL}/${item.mainImage}`
                                      : 'https://via.placeholder.com/300x300?text=No+Image',
                                    category: item.category, // Add category object
                                  }}
                                />
                                <WhatsAppButton
                                  product={{
                                    id: item._id,
                                    title: item.title,
                                    jewelleryType: item.jewelleryType,
                                    purity: item.purity,
                                    grossWeight: item.grossWeight,
                                    category: item.category,
                                  }}
                                />
                              </div>
                            </div>
                            <p className="card-text text-dark mb-1">
                              Jewellery Type: {item.jewelleryType}, Purity: {item.purity}
                            </p>
                            <p className="card-text text-dark mb-0">Gross Wt: {item.grossWeight}</p>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
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
                  <Image
                    src={shopWomen}
                    alt="Shop Girl"
                    width={300}
                    height={300}
                    style={{ objectFit: 'contain' }}
                  />
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
      </ClientLayoutWrapper>
    </>
  );
};

export default ProductDetailPage;
