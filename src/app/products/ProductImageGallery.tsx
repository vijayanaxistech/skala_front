'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BASE_URL } from '../../lib/api';

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

  return (
    <>
      {/* Main Image */}
      <div className="col-12 col-md-5 d-flex align-items-center justify-content-center order-md-2">
        <div >
          <div
            className="image-wrapper"
            style={{
              overflow: 'hidden',
              borderRadius: '12px',
            }}
          >
            <Image
              src={`${BASE_URL}/${selectedImage}`}
              alt={productTitle}
              width={370}
              height={370}
              className="img-fluid main-image"
              style={{
                objectFit: 'contain',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="col-12 col-md-1 d-flex flex-md-column align-items-center justify-content-center order-md-1 thumbnails-container"
        style={{ gap: '12px' }}
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
              cursor: 'pointer',
              objectFit: 'cover',
              background: '#fff',
              border: selectedImage === img ? '2px solid #ddd' : '1px solid #ddd',
            }}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      <style jsx global>{`
        .image-wrapper:hover .main-image {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

export default ProductImageGallery;
