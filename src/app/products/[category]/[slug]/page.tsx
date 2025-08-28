'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import defaultBreadcrumbImage from '../../../../../public/assets/collections.jpg';
import { getProductBySlug, getProducts, BASE_URL } from '../../../../lib/api';
import WhatsAppButton from '../../../jewellery/WhatsAppButton';
import MoreInfoButton from '../../../jewellery/MoreInfo';
import ProductImageGallery from '../../ProductImageGallery';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

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

const transformProduct = (raw: RawProduct): Product => ({
  ...raw,
  subImages: [raw.subImage1, raw.subImage2, raw.subImage3].filter(Boolean),
});

export default function ProductDetailPage() {
  const { category, slug } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductData() {
      setLoading(true);

      try {
        const rawProduct = await getProductBySlug(slug as string);
        if (!rawProduct) {
          router.push('/404');
          return;
        }

        const transformed = transformProduct(rawProduct);

        // Redirect if category mismatch
        const normalizedCategory = transformed.category.name.toLowerCase().replace(/\s+/g, '-');
        if (normalizedCategory !== category) {
          router.push('/404');
          return;
        }

        setProduct(transformed);

        const allRaw = await getProducts();
        const allProducts = allRaw.map(transformProduct);
        const filtered = allProducts.filter(
          (p) => p.category._id === transformed.category._id && p._id !== transformed._id,
        );
        setSimilarProducts(filtered.slice(0, 3));
      } catch (error) {
        console.error(error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();
  }, [slug, category, router]);

  if (loading || !product) {
    return (
      <ClientLayoutWrapper>
        <div className="text-center py-5">Loading...</div>
      </ClientLayoutWrapper>
    );
  }

  const thumbnailImages = [
    product.mainImage,
    ...product.subImages.filter((img) => img !== product.mainImage),
  ];

  const breadcrumbImageSrc = product.category.banner
    ? `${BASE_URL}/${product.category.banner}`
    : defaultBreadcrumbImage;

  return (
    <ClientLayoutWrapper>
      {/* Banner */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <Image
          src={breadcrumbImageSrc}
          alt={`${product.category.name} Banner`}
          layout="responsive"
          width={1920}
          height={400}
          objectFit="contain"
          priority
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* Product Section */}
      <div>
        <div className="p-3 p-md-5 py-5">
          <div className="row g-4 ">
            <ProductImageGallery
              mainImage={product.mainImage}
              thumbnailImages={thumbnailImages}
              productTitle={product.title}
            />

            {/* Details */}
            <div className="col-12 col-md-6 d-flex flex-column justify-content-center order-md-3 ">
              <div className="px-md-4 px-2 ">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 className="text-red fraunces mb-0">{product.category.name}</h6>

                </div>

                <h3 className="fw-medium fraunces text-blue  mb-3" style={{ fontWeight: '100' }}>
                  {product.title}
                </h3>



                <p className="mb-3">
                  <strong className="dm-serif-text-regular">Category :</strong>{' '}
                  <span className="text-dark">{product.category.name}</span>
                </p>
                <p className="mb-3">
                  <strong className="dm-serif-text-regular">Jewellery Type :</strong>{' '}
                  <span className="text-dark">{product.jewelleryType}</span>
                </p>
                <p className="mb-3">
                  <strong className="dm-serif-text-regular">Purity :</strong>{' '}
                  <span className="text-dark">{product.purity}</span>
                </p>
                {product.grossWeight && (
                  <p className="mb-0">
                    <strong className="dm-serif-text-regular">Gross Wt :</strong>{' '}
                    <span className="text-dark">{product.grossWeight}</span>
                  </p>
                )}
                <div className="d-flex align-items-center gap-2 mt-3">
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
            </div>
          </div>


          {similarProducts.length > 0 && (
            <div className="row py-5 mt-4">
              <h5 className="fw-bold text-dark lora">Related Products</h5>

              <div className="d-flex gap-3 mt-4 overflow-auto pb-2">
                {similarProducts.map((item) => (
                  <div key={item._id} className="flex-shrink-0" style={{ width: "auto" }}>
                    <Link
                      href={`/products/${item.category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/${item.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="product-card h-100 border-0">
                        <div className="product-image imageWrapper">
                          <Image
                            src={`${BASE_URL}/${item.mainImage}`}
                            alt={item.title}
                            width={300}
                            height={300}
                            className="categoryImage"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="p-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="card-title text-dark text-truncate mb-0 fraunces">
                              {item.title.length > 20
                                ? item.title.substring(0, 20) + "..."
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
                                    : "https://via.placeholder.com/300x300?text=No+Image",
                                  category: item.category,
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
                            <span className="fraunces">Jewellery Type:</span>{" "}
                            {item.jewelleryType}
                          </p>
                          <p className="card-text text-dark mb-1">
                            <span className="fraunces">Purity:</span> {item.purity}
                          </p>
                          {item.grossWeight && (
                            <p className="card-text text-dark mb-0">
                              <span className="fraunces">Gross Wt:</span>{" "}
                              {item.grossWeight}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          )}
        </div>
      </div>
    </ClientLayoutWrapper>
  );
}

