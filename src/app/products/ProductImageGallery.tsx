"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BASE_URL } from "../../lib/api";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

interface ProductImageGalleryProps {
  mainImage: string;
  thumbnailImages: string[];
  productTitle: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  mainImage,
  thumbnailImages,
  productTitle,
}) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 represents main image
  const [isFading, setIsFading] = useState(false);

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      if (currentIndex === -1 || currentIndex === 0) {
        // From main image or first thumbnail to last thumbnail
        setCurrentIndex(thumbnailImages.length - 1);
        setSelectedImage(thumbnailImages[thumbnailImages.length - 1]);
      } else {
        // Previous thumbnail
        setCurrentIndex(currentIndex - 1);
        setSelectedImage(thumbnailImages[currentIndex - 1]);
      }
      setIsFading(false);
    }, 300); // Match with CSS transition duration
  };

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      if (currentIndex === -1) {
        // From main image to first thumbnail
        setCurrentIndex(0);
        setSelectedImage(thumbnailImages[0]);
      } else if (currentIndex === thumbnailImages.length - 1) {
        // From last thumbnail to first thumbnail
        setCurrentIndex(0);
        setSelectedImage(thumbnailImages[0]);
      } else {
        // Next thumbnail
        setCurrentIndex(currentIndex + 1);
        setSelectedImage(thumbnailImages[currentIndex + 1]);
      }
      setIsFading(false);
    }, 300); // Match with CSS transition duration
  };

  return (
    <>
      <div className="col-12 col-md-5 d-flex align-items-center justify-content-center order-md-2">
        <div>
          <div
            className="image-wrapper position-relative"
            style={{
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <Image
              src={`${BASE_URL}/${selectedImage}`}
              alt={productTitle}
              width={370}
              height={370}
              className={`img-fluid main-image ${isFading ? "fade-out" : "fade-in"}`}
              style={{
                objectFit: "contain",
                transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              }}
            />
            <button
              className="btn btn-light position-absolute"
              onClick={handlePrev}
              style={{
                zIndex: 10,
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.8,
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <BsChevronLeft />
            </button>
            <button
              className="btn btn-light position-absolute"
              onClick={handleNext}
              style={{
                zIndex: 10,
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.8,
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <BsChevronRight />{" "}
            </button>
          </div>
        </div>
      </div>

      <div
        className="col-12 col-md-1 d-flex flex-md-column align-items-center justify-content-center order-md-1 thumbnails-container"
        style={{ gap: "12px" }}
      >
        {thumbnailImages.map((img, index) => (
          <Image
            key={index}
            src={`${BASE_URL}/${img}`}
            alt={`Thumbnail ${index}`}
            width={70}
            height={70}
            className="rounded-2 shadow-sm"
            style={{
              cursor: "pointer",
              objectFit: "cover",
              background: "#fff",
              border: selectedImage === img ? "2px solid #ddd" : "1px solid #ddd",
            }}
            onClick={() => {
              setIsFading(true);
              setTimeout(() => {
                setSelectedImage(img);
                setCurrentIndex(index);
                setIsFading(false);
              }, 300); // Match with CSS transition duration
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        .image-wrapper:hover .main-image {
          transform: scale(1.05);
        }
        .image-wrapper:hover .btn-light {
          opacity: 1;
        }
        .btn-light:hover {
          background-color: rgba(224, 224, 224, 0.9) !important;
        }
        .fade-in {
          opacity: 1;
        }
        .fade-out {
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default ProductImageGallery;
