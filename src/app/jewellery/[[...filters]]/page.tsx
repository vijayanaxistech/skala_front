"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";
import defaultBreadcrumbImage from "../../../../public/assets/collections.jpg";
import FilterDropdown from "./FilterDropdown";
import WhatsAppButton from "../WhatsAppButton";
import MoreInfoButton from "../MoreInfo";
import { getProducts, getCategories, getDefaultBreadcrumbBanner, BASE_URL } from "@/lib/api";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import notFoundImg from "../../../../public/assets/product-not-found-101.jpg";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { slugify, unslugify } from "@/lib/slugify"; // Import both slugify and unslugify

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
  netWeight: string;
  diamondWeight: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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

        const normalized = fetchedProducts.map((product: Product) => ({
          ...product,
          purity: product.purity || product.metalPurity || "",
          jewelleryType: product.jewelleryType || "",
          occasion: product.occasion || "",
          category: { ...product.category, name: product.category?.name || "" },
        }));

        setProducts(normalized);
        setCategories(fetchedCategories);
        setDefaultBanner(fetchedBanner[0] || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const segments = pathname?.split("/").filter(Boolean) ?? [];
    const filtersIndex = segments.findIndex((s) => s === "jewellery");
    const filterSegments = segments.slice(filtersIndex + 1);
    const pairs: { [key: string]: string } = {};

    for (let i = 0; i < filterSegments.length - 1; i += 2) {
      const key = filterSegments[i];
      const val = filterSegments[i + 1];
      if (key === "products") pairs["category"] = val;
      else pairs[key] = val;
    }

    setSelectedFilters(pairs);
  }, [pathname]);

  useEffect(() => {
    let filtered = [...products];
    if (selectedFilters.category) {
      filtered = filtered.filter((p) => slugify(p.category.name) === selectedFilters.category);
    }
    if (selectedFilters.jewelleryType) {
      filtered = filtered.filter((p) => slugify(p.jewelleryType) === selectedFilters.jewelleryType);
    }
    if (selectedFilters.purity) {
      filtered = filtered.filter((p) => slugify(p.purity) === selectedFilters.purity);
    }
    if (selectedFilters.occasion) {
      filtered = filtered.filter((p) => slugify(p.occasion) === selectedFilters.occasion);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedFilters, products]);

  const uniqueMetals = [...new Set(products.map((p) => p.jewelleryType).filter(Boolean))];
  const uniquePurities = [...new Set(products.map((p) => p.purity).filter(Boolean))];
  const uniqueOccasions = [...new Set(products.map((p) => p.occasion).filter(Boolean))];
  const uniqueCategories = [...new Set(products.map((p) => p.category.name).filter(Boolean))];

  // FIX: Unslugify the values before displaying them in the title
  const displayTitle = Object.values(selectedFilters).map(unslugify).join(", ") || "Jewellery";

  useEffect(() => {
    document.title = `${displayTitle} | Suvarnakala Pvt. Ltd`;
  }, [displayTitle]);

  let breadcrumbImageSrc: string | any = defaultBreadcrumbImage;
  let breadcrumbLink: string | null = null;

  if (selectedFilters.category) {
    const selectedCategory = categories.find((cat) => slugify(cat.name) === selectedFilters.category);
    if (selectedCategory?.banner) {
      breadcrumbImageSrc = `${BASE_URL}/${selectedCategory.banner}`;
    }
  } else if (defaultBanner) {
    breadcrumbImageSrc = `${BASE_URL}/${defaultBanner.image}`;
    breadcrumbLink = defaultBanner.link.replace(/^https?:\/\/[^\/]+/, "");
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const renderPaginationButtons = () => {
    const pageNumbers: (number | '...')[] = [];
    const pageRange = 2;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= pageRange + 1) {
        for (let i = 1; i <= pageRange + 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...', totalPages);
      } else if (currentPage >= totalPages - pageRange) {
        pageNumbers.push(1, '...');
        for (let i = totalPages - pageRange - 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...', totalPages);
      }
    }

    const finalPageNumbers: (number | '...')[] = [];
    pageNumbers.forEach((page, index) => {
      if (page === '...' && finalPageNumbers[finalPageNumbers.length - 1] === '...') {
        return;
      }
      finalPageNumbers.push(page);
    });

    return (
      <div className="custom-pagination mt-md-5 mt-3">
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous"
        >
          <BsChevronLeft />
        </button>
        {finalPageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => typeof number === 'number' && setCurrentPage(number)}
            className={`pagination-button ${number === '...' ? 'pagination-ellipsis' : ''} ${currentPage === number ? 'active' : ''}`}
            disabled={number === '...'}
          >
            {number}
          </button>
        ))}
        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next"
        >
          <BsChevronRight />
        </button>
      </div>
    );
  };

  return (
    <ClientLayoutWrapper>
      <Head>
        <title>{`${displayTitle} | Suvarnakala Pvt. Ltd`}</title>
      </Head>
      <div
        className="banner"
        style={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {breadcrumbLink ? (
          <Link href={breadcrumbLink}>
            <Image
              src={breadcrumbImageSrc}
              alt={`${selectedFilters.category || "Jewellery"} Banner`}
              layout="responsive"
              width={1600}
              height={600}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
              }}
              priority
            />
          </Link>
        ) : (
          <Image
            src={breadcrumbImageSrc}
            alt={`${selectedFilters.category || "Jewellery"} Banner`}
            layout="responsive"
            width={1600}
            height={600}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "auto",
            }}
            priority
          />
        )}
      </div>

      <div className="py-md-5 px-md-5 p-md-1 p-3">
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
          <div className="d-flex flex-column items-center justify-center text-center py-16">
            <Image
              src={notFoundImg}
              alt="No Products Found"
              width={160}
              height={160}
              className="w-40 h-40 object-contain mb-6 opacity-90 mx-auto"
            />
            <h5 className="lora text-dark text-opacity-75">No Products Found...</h5>
          </div>
        ) : (
          <>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
              {currentProducts.map((product) => (
                <Col key={product._id}>
                  <Link
                    href={`/products/${slugify(product.category.name)}/${slugify(product.title)}`}
                    className="text-decoration-none"
                  >
                    <div className="product-card h-100 border-0">
                      <div className="product-image imageWrapper">
                        <Image
                          src={
                            product.mainImage
                              ? `${BASE_URL}/${product.mainImage}`
                              : "https://via.placeholder.com/300x300?text=No+Image"
                          }
                          alt={product.title}
                          width={400}
                          height={400}
                          className="categoryImage"
                          style={{ objectFit: "cover", width: "100%", height: "auto" }}
                        />
                      </div>

                      <div className="p-1 mt-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="card-title text-dark text-truncate mb-0 fraunces">
                            {product.title.length > 20
                              ? product.title.substring(0, 20) + "..."
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
                                  : "https://via.placeholder.com/300x300?text=No+Image",
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
                        {product.grossWeight &&
                          product.grossWeight.trim().toLowerCase() !== "n/a" && (
                            <p className="card-text text-dark mb-0">
                              <span className="fraunces">Gross Wt:</span> {product.grossWeight}
                            </p>
                          )}
                        {product.netWeight &&
                          product.netWeight.trim().toLowerCase() !== "n/a" && (
                            <p className="card-text text-dark mb-0">
                              <span className="fraunces">Net Wt:</span> {product.netWeight}
                            </p>
                          )}
                        {product.diamondWeight &&
                          product.diamondWeight.trim().toLowerCase() !== "n/a" && (
                            <p className="card-text text-dark mb-0">
                              <span className="fraunces">Diamond Wt :</span> {product.diamondWeight} Cent
                            </p>
                          )}
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
            {totalPages > 1 && renderPaginationButtons()}
          </>
        )}
      </div>
    </ClientLayoutWrapper>
  );
};

export default ProductsPage;