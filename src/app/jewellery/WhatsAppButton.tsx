"use client";
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

interface WhatsAppButtonProps {
  product: {
    id: string;
    title: string;
    jewelleryType: string;
    purity: string;
    grossWeight: string;
    category: { name: string };
  };
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ product }) => {
  const slug = product.title.toLowerCase().replace(/\s+/g, "-");
  const categoryName = product.category?.name || "unknown";
  // const productPageUrl = `http://localhost:3000/jewelry/${categoryName.toLowerCase().replace(/\s+/g, "-")}/${slug}`;

  const messageBody =
    `Product Inquiry:%0A` +
    `Product Name: ${product.title}%0A` +
    `Metal Type: ${product.jewelleryType}%0A` +
    `Purity : ${product.purity}%0A` +
    `Gross Weight : ${product.grossWeight}%0A`;
  // `View Product: ${productPageUrl}`;

  const phoneNumber = "917874011144";

  const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${messageBody}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-link p-0 m-0 fs-5"
      style={{ color: "#33CC33" }}
    >
      <IoLogoWhatsapp />
    </button>
  );
};

export default WhatsAppButton;
