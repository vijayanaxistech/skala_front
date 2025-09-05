"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BASE_URL } from "../../lib/api";

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
  const allImages = [mainImage, ...thumbnailImages];
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [currentIndex, setCurrentIndex] = useState(0); // 0 for main image, then 1, 2... for thumbnails
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000); // Change image every 3 seconds
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide(); // Clean up on component unmount
  }, [allImages, currentIndex]); // Restart timer if images or current index changes

  const handleSelectImage = (image: string, index: number) => {
    stopAutoSlide(); // Stop auto-slide when a dot is clicked
    setSelectedImage(image);
    setCurrentIndex(index);
    startAutoSlide(); // Restart auto-slide after manual selection
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(allImages[nextIndex]);
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
              className={`img-fluid main-image`} // Removed fade classes
              style={{
                objectFit: "contain",
                // Removed transition property here
              }}
            />
            <div
              className="d-flex justify-content-center position-absolute w-100"
              style={{
                bottom: "10px",
                zIndex: 10,
              }}
            >
              {allImages.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentIndex === index ? "active" : ""}`}
                  onClick={() => handleSelectImage(allImages[index], index)}
                  style={{
                    height: "10px",
                    width: "10px",
                    margin: "0 5px",
                    backgroundColor: currentIndex === index ? "#fff" : "rgba(255, 255, 255, 0.5)",
                    borderRadius: "50%",
                    display: "inline-block",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease", // Keep this for dot color transition
                  }}
                ></span>
              ))}
            </div>
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
            onClick={() => handleSelectImage(img, index + 1)} // +1 because main image is at index 0
          />
        ))}
      </div>

      <style jsx global>{`
        .image-wrapper:hover .main-image {
          transform: none; /* Removed scale on hover */
        }
        .dot.active {
          background-color: #fff; /* Active dot color */
        }
      `}</style>
    </>
  );
};

export default ProductImageGallery;