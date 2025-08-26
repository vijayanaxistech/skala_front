'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import breadcrumbImage from '../../../public/assets/Why us Page.jpg';
import shopnowbg from '../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
import shopWomen from '../../../public/assets/shopWomwn.png';
import styles from '../page.module.css';
import Link from 'next/link';
import Bullet from '../../../public/assets/bullet.jpg';
import Loader from '@/components/Loader';

const features = [
  {
    title: 'Wider Networks',
    description:
      'At Suvarnakala, we constantly focus on extending our roots to every nook and corner of the country, helping us build a consolidated nationwide presence.',
  },
  {
    title: 'Free Gold Purity Check',
    description:
      'We offer customers 100% guaranteed purity. Our cutting-edge karatmeter accurately measures the purity and weight of gold, ensuring the best quality jewellery.',
  },
  {
    title: 'Brand New Jewellery',
    description:
      'Each jewellery piece at Suvarnakala is brand new, crafted fresh with passion and precision.',
  },
  {
    title: 'Safe Jewellery Purchase',
    description:
      'With schemes like GSS, you can buy your dream jewellery in easy monthly installments, ensuring complete peace of mind.',
  },
  {
    title: 'Exclusive Designs',
    description:
      'Our designs are uniquely crafted with intricate patterns, making each piece stand out with magnificent charm.',
  },
  {
    title: 'Best Exchange Value',
    description:
      'We offer guaranteed pure jewellery and the best exchange rates for your Suvarnakala jewellery.',
  },
  {
    title: 'BIS Hallmarked Jewellery',
    description: 'All our gold jewellery is BIS hallmarked, ensuring quality and trust.',
  },
  {
    title: 'Internationally Certified Diamonds',
    description:
      'Our diamonds meet internationally accepted certification and highest quality standards.',
  },
];

const WhySuvarnakala = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <>
      {/* Banner Image */}
      <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>

      <div className=" pb-5">
        <div className="p-5 py-4 ">
          <div className="custom-heading-wrapper d-flex align-items-center mb-4">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <span className="fraunces">
                Why <span className="text-red fraunces"> Suvarnakala ? </span>
              </span>
              <div className="decorative-line">
                <div className="diamond"></div>
                <div className="line"></div>
                <div className="diamond"></div>
              </div>
            </h2>
          </div>
        </div>
        {/* Features Sectionsss */}
        <div  className="why px-3 px-md-5">
  
            {features.map((feature, index) => (
              <Row className="mb-4" key={index}>
                <Col xs={12}>
                  <div className="d-flex align-items-start">
                    <div className="me-3 text-red" style={{ fontSize: '1.10rem' }}>
                      <Image
                        src={Bullet}
                        alt="Section Icon"
                        width={20}
                        height={20}
                        className="rounded-circle" // Bootstrap for rounded-full
                      />{' '}
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1 lora">{feature.title}</h5>
                      <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
        </div>
      </div>

    </>
  );
};

export default WhySuvarnakala;
