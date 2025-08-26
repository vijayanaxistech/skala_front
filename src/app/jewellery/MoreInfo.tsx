'use client';
import React from 'react';

interface MoreInfoButtonProps {
  product: {
    id: string;
    title: string;
    jewelleryType: string;
    purity: string;
    grossWeight: string;
    category: { name: string };
  };
}

const MoreInfoButton: React.FC<MoreInfoButtonProps> = ({ product }) => {
  // Generate slug from title without _id suffix
  const slug = product.title.toLowerCase().replace(/\s+/g, '-');
  // Construct product page URL with fallback for category
  const categoryName = product.category?.name || 'unknown';
  const productPageUrl = `http://localhost:3000/jewelry/${categoryName.toLowerCase().replace(/\s+/g, '-')}/${slug}`;

  const messageBody =
    `Product Inquiry:%0A` +
    `Product Name: ${product.title}%0A` +
    `Metal Type: ${product.jewelleryType}%0A` +
    `Purity (Karat): ${product.purity}%0A` +
    `Gross Weight (g): ${product.grossWeight}%0A` +
    `View Product: ${productPageUrl}`;

  const phoneNumber = '919429439061';

  const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${messageBody}`;

  const handleMoreInfoClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button onClick={handleMoreInfoClick} className="more-info-btn-sm">
      <span>More Info</span>
    </button>
  );
};

export default MoreInfoButton;
