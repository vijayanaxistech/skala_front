'use client';
import React from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import demoBg from '../../public/assets/demo_bg.png';
import goldSet from '../../public/assets/indian-traditional-jewellery_136354-6545.avif';
import diamondSet from '../../public/assets/gold-mangalsutra-necklace_864595-690.avif';
import silverSet from '../../public/assets/women-s-earings_8408-3.avif';

const slides = [
  {
    content: 'Timeless Gold Elegance',
    description:
      'Experience the exquisite craftsmanship and unparalleled beauty of our exclusive gold jewelry collection—designed to celebrate every moment.',
    explore: '→ Gold Collection',
    image: goldSet,
  },
  {
    content: 'Sparkling Real Diamonds',
    description:
      'Discover the captivating sparkle and eternal allure of authentic diamonds, meticulously set to enhance your unique style.',
    explore: '→ Diamond Treasures',
    image: diamondSet,
  },
  {
    content: 'Exquisite Silver Designs',
    description:
      'Explore our stunning silver jewelry pieces, crafted to add a touch of grace and sophistication to any outfit.',
    explore: '→ Silver Collection',
    image: silverSet,
  },
];

const responsive = {
  all: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
  },
};

const About = () => {
  return (
    <section className="about_section">
      <div className="container">
        <div className="row d-flex align-items-center position-relative mt-3 mb-3">
          {/* Left Column */}
          <div className="col-md-6">
            <div className="custom-heading-wrapper d-flex align-items-center mb-4">
              <h3 className="m-0 custom-heading text-wrap me-3">
                <span className="fraunces">
                  Discover Our <span className="text-red fraunces">Variety</span>
                </span>
                <div className="decorative-line">
                  <div className="diamond"></div>
                  <div className="line"></div>
                  <div className="diamond"></div>
                </div>
              </h3>
            </div>
            <div className="about_title">
              <h5 className="text-center lora text-md-start text-sm-center">
                Timeless Elegance, Redefined
              </h5>
              <p className="text-justify mt-3 p-1 p-md-0">
                Discover the enduring charm of Gold, the brilliance of Real Diamonds, and the
                innovation of Lab-Grown Diamonds. Whether you seek classic luxury, natural sparkle,
                or sustainable sophistication, our carefully curated collection offers something for
                every style and occasion. Crafted to perfection, each piece reflects purity, beauty,
                and value you can treasure forever .
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <Carousel
              responsive={responsive}
              infinite
              showDots
              arrows={false}
              dotListClass="custom-dot-list"
              itemClass="pb-3"
            >
              {slides.map((slide, index) => (
                <div key={index} className="about_right_wrapper">
                  <div className="about_patternshape position-relative">
                    <Image src={demoBg} alt="Background Pattern" />
                    <div className="about_sub_content position-absolute">
                      <p>
                        <span className="text-red">{slide.content}</span>
                        <br />
                        {slide.description}
                        <br />
                        <span className="text-red">{slide.explore}</span>
                      </p>
                    </div>
                  </div>
                  <div className="about_main_image">
                    <Image
                      src={slide.image}
                      alt={slide.content}
                      width={500}
                      height={300}
                      style={{
                        width: '370px',
                        height: '370px',
                        borderRadius: '20px',
                        objectFit: 'cover', // Optional: keeps image nicely cropped
                      }}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .about_section .react-multi-carousel-list {
          position: relative;
          width: 100%;
          min-height: 400px; /* Ensure carousel has space */
        }

        .about_right_wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px; /* Ensure content visibility */
        }
      `}</style>
    </section>
  );
};

export default About;
