'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import breadcrumbImage from '../../../public/assets/why-choose.jpg';
import shopnowbg from '../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
import shopWomen from '../../../public/assets/shopWomwn.png';
import styles from '../page.module.css';
import Link from 'next/link';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

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
  return (
    <>
      {/* Banner Image */}
      <div style={{ position: 'relative', width: '100%', height: '600px',}} className='banner'>
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Features Section */}
      <div style={{ backgroundColor: '#F5E7D6', padding: '40px 0' }} className='why'>
        <Container
          style={{
            backgroundColor: '#fff',
            padding: '30px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          }}
        >
          <div className="custom-heading-wrapper text-center justify-content-center d-flex align-items-center mb-4">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <span className="heading-underline">
                <span className="text-red">Why Suvarnakala ?</span>
              </span>
            </h2>
          </div>

          {features.map((feature, index) => (
            <Row className="mb-4" key={index}>
              <Col xs={12}>
                <div className="d-flex align-items-start">
                  <div className="me-3 text-red" style={{ fontSize: '1.10rem' }}>
                    <IoIosCheckmarkCircleOutline />{' '}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">{feature.title}</h5>
                    <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      </div>

      {/* Shop Now Section */}
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image src={shopnowbg} alt="Shop Now Banner" layout="fill" objectFit="cover" priority />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '0 20px',
          }}
        >
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="d-none d-md-flex justify-content-start">
                <Image
                  src={shopWomen}
                  alt="Shop Girl"
                  width={300}
                  height={300}
                  objectFit="contain"
                />
              </Col>
              <Col xs={12} md={6} className="text-center text-md-start text-white">
                <h1 className="fs-4 fs-md-3 fw-semibold lh-tight mb-4">
                  Elevate Every Moment with Timeless Jewellery
                </h1>
                <Link href="/collections">
                  <Button
                    variant="outline-light rounded-0"
                    className={styles.shopNowBtn}
                    style={{ textDecoration: 'none' }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <style>{`
        
          @media (max-width: 767px) {
          .banner {
            height: 215px !important;
          }
            .why{
            paddingtop: 0 ;
            }
          
        }
      `}</style>
    </>
  );
};

export default WhySuvarnakala;
