'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import defaultBreadcrumbImage from '../../../../public/assets/collections.jpg';
import FilterDropdown from './FilterDropdown';
import WhatsAppButton from '../WhatsAppButton';
import MoreInfoButton from '../MoreInfo';
import { getProducts, getCategories, getDefaultBreadcrumbBanner, BASE_URL } from '@/lib/api';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import { usePathname, useRouter } from 'next/navigation';
import notFoundImg from "../../../../public/assets/product-not-found-101.jpg";

// Interfaces
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
  jewelleryType: string;
  purity: string;
  occasion: string;
  grossWeight: string;
  mainImage: string;
  subImages: string[];
  metalPurity?: string;
}

interface DefaultBanner {
  _id: string;
  link: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
  const [defaultBanner, setDefaultBanner] = useState<DefaultBanner | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedProducts, fetchedCategories, fetchedBanner] = await Promise.all([
          getProducts(),
          getCategories(),
          getDefaultBreadcrumbBanner(),
        ]);

        // Normalize products
        const normalized = fetchedProducts.map((product: Product) => ({
          ...product,
          purity: product.purity || product.metalPurity || '',
          jewelleryType: product.jewelleryType || '',
          occasion: product.occasion || '',
          category: { ...product.category, name: product.category?.name || '' },
        }));

        setProducts(normalized);
        setCategories(fetchedCategories);
        setDefaultBanner(fetchedBanner[0] || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Parse filters from pathname
    const segments = pathname?.split('/').filter(Boolean) ?? [];
    const filtersIndex = segments.findIndex((s) => s === 'jewellery');
    const filterSegments = segments.slice(filtersIndex + 1);
    const pairs: { [key: string]: string } = {};

    for (let i = 0; i < filterSegments.length - 1; i += 2) {
      const key = decodeURIComponent(filterSegments[i]);
      const val = decodeURIComponent(filterSegments[i + 1]);
      if (key === 'products') pairs['category'] = val;
      else pairs[key] = val;
    }

    setSelectedFilters(pairs);
    console.log('Selected Filters:', pairs); // Debug log
  }, [pathname]);

  useEffect(() => {
    let filtered = [...products];
    if (selectedFilters.category) {
      filtered = filtered.filter((p) => p.category.name === selectedFilters.category);
    }
    if (selectedFilters.jewelleryType) {
      filtered = filtered.filter((p) => p.jewelleryType === selectedFilters.jewelleryType);
    }
    if (selectedFilters.purity) {
      filtered = filtered.filter((p) => p.purity === selectedFilters.purity);
    }
    if (selectedFilters.occasion) {
      filtered = filtered.filter((p) => p.occasion === selectedFilters.occasion);
    }

    setFilteredProducts(filtered);
  }, [selectedFilters, products]);

  const uniqueMetals = [...new Set(products.map((p) => p.jewelleryType).filter(Boolean))];
  const uniquePurities = [...new Set(products.map((p) => p.purity).filter(Boolean))];
  const uniqueOccasions = [...new Set(products.map((p) => p.occasion).filter(Boolean))];
  const uniqueCategories = [...new Set(products.map((p) => p.category.name).filter(Boolean))];

  const displayTitle = Object.values(selectedFilters).join(', ') || 'Jewellery';

  // Set document title client-side
  useEffect(() => {
    console.log('Setting document title:', `${displayTitle} | Suvarnakala Pvt. Ltd`); // Debug log
    document.title = `${displayTitle} | Suvarnakala Pvt. Ltd`;
  }, [displayTitle]);

  // Determine banner image and link
  let breadcrumbImageSrc: string | any = defaultBreadcrumbImage;
  let breadcrumbLink: string | null = null;

  if (selectedFilters.category) {
    const selectedCategory = categories.find((cat) => cat.name === selectedFilters.category);
    if (selectedCategory?.banner) {
      breadcrumbImageSrc = `${BASE_URL}/${selectedCategory.banner}`;
    }
  } else if (defaultBanner) {
    breadcrumbImageSrc = `${BASE_URL}/${defaultBanner.image}`;
    breadcrumbLink = defaultBanner.link.replace(/^https?:\/\/[^\/]+/, '');
  }

  return (
    <ClientLayoutWrapper>
      <Head>
        <title>{`${displayTitle} | Suvarnakala Pvt. Ltd`}</title>
      </Head>
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
              alt={`${selectedFilters.category || 'Jewellery'} Banner`}
              layout="responsive"
              width={1600} // Use your actual image dimensions here
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
            alt={`${selectedFilters.category || 'Jewellery'} Banner`}
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

      <div className="py-md-5 p-3">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h3 className="mb-0 fs-5 fs-md-4 lora">
            {displayTitle} ({filteredProducts.length})
          </h3>
          <div className="ms-auto">
            <FilterDropdown
              categories={uniqueCategories}
              metals={uniqueMetals}
              purities={uniquePurities}
              occasions={uniqueOccasions}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className=" items-center justify-center text-center py-16">
            {/* Image */}
            <Image
              src={notFoundImg}
              alt="No Products Found"
              className="w-40 h-40 object-contain mb-6 opacity-90"
            />


          </div>) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
            {filteredProducts.map((product) => (
              <Col key={product._id}>
                <Link
                  href={`/products/${product.category.name.toLowerCase().replace(/\s+/g, '-')}/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
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
                        width={400}
                        height={400}
                        className="categoryImage"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <div className="p-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="card-title text-dark text-truncate mb-0 fraunces">
                          {product.title.length > 20
                            ? product.title.substring(0, 20) + '...'
                            : product.title}
                        </h6>

                        <div className="d-flex align-items-center gap-2">
                          <MoreInfoButton
                            product={{
                              title: product.title,
                              jewelleryType: product.jewelleryType,
                              purity: product.purity,
                              grossWeight: product.grossWeight,
                              mainImage: product.mainImage
                                ? `${BASE_URL}/${product.mainImage}`
                                : 'https://via.placeholder.com/300x300?text=No+Image',
                              category: product.category,
                            }}
                          />
                          <WhatsAppButton
                            product={{
                              id: product._id,
                              title: product.title,
                              jewelleryType: product.jewelleryType,
                              purity: product.purity,
                              grossWeight: product.grossWeight,
                              category: product.category,
                            }}
                          />
                        </div>
                      </div>
                      <p className="card-text text-dark mb-1">
                        <span className="fraunces">Jewellery Type:</span> {product.jewelleryType}
                      </p>
                      <p className="card-text text-dark mb-1">
                        <span className="fraunces">Purity:</span> {product.purity}
                      </p>
                      <p className="card-text text-dark mb-0">
                        <span className="fraunces">Gross Wt:</span> {product.grossWeight}
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>

    </ClientLayoutWrapper>
  );
};

export default ProductsPage;
