'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import breadcrumbImage from '../../../public/assets/our-showroom-bg.png';
import shopnowbg from '../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
import shopWomen from '../../../public/assets/shopWomwn.png';
import hrline from '../../../public/assets/Line 467.png';
import styles from '../page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Satellite
import st1 from '../../../public/assets/showrooms/Satellite/1.png';
import st2 from '../../../public/assets/showrooms/Satellite/2.png';
import st3 from '../../../public/assets/showrooms/Satellite/3.png';
// import st4 from '../../../public/assets/showrooms/Satellite/4.png';
// import st5 from '../../../public/assets/showrooms/Satellite/5.png';
// import st6 from '../../../public/assets/showrooms/Satellite/6.png';
// import st7 from '../../../public/assets/showrooms/Satellite/7.png';
// import st8 from '../../../public/assets/showrooms/Satellite/8.png';
// import st9 from '../../../public/assets/showrooms/Satellite/9.png';

// CG Road
import cg1 from '../../../public/assets/showrooms/Cgroad/1.png';
import cg2 from '../../../public/assets/showrooms/Cgroad/2.png';
import cg3 from '../../../public/assets/showrooms/Cgroad/3.png';
// import cg4 from '../../../public/assets/showrooms/Cgroad/4.png';
// import cg5 from '../../../public/assets/showrooms/Cgroad/5.png';
// import cg6 from '../../../public/assets/showrooms/Cgroad/6.png';
// import cg7 from '../../../public/assets/showrooms/Cgroad/7.png';
// import cg8 from '../../../public/assets/showrooms/Cgroad/8.png';
// import cg9 from '../../../public/assets/showrooms/Cgroad/9.png';

// Maninagar
import mn1 from '../../../public/assets/showrooms/Maninagar/1.png';
import mn2 from '../../../public/assets/showrooms/Maninagar/2.png';
import mn3 from '../../../public/assets/showrooms/Maninagar/3.png';
// import mn4 from '../../../public/assets/showrooms/Maninagar/4.png';
// import mn5 from '../../../public/assets/showrooms/Maninagar/5.png';
// import mn6 from '../../../public/assets/showrooms/Maninagar/6.png';

import Loader from '@/components/Loader';

// Image arrays
const St1 = [st1, st2, st3];
const Cgroad = [cg1, cg2, cg3];
const Maninagar = [mn1, mn2, mn3];

const WhySuvarnakala = () => {
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const handleImageClick = (img: string) => {
    setPreviewImage(img);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const renderImageGrid = (images: string[]) =>
    images.map((img, idx) => (
      <Col xs={12} sm={6} md={4} key={idx}>
        <div
          style={{
            width: '100%',
            height: '230px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => handleImageClick(img)}
        >
          <Image
            src={img}
            alt={`Showroom Image ${idx + 1}`}
            layout="responsive"
            width={350}
            height={250}
            style={{ objectFit: 'cover' }}
            placeholder="blur"
          />
        </div>
      </Col>
    ));
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '500px' }} className="banner">
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="fill"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className="bg-color p-5">
        <Row className="mt-4 g-4" id="cgroad">
          <div className="custom-heading-wrapper text-center justify-content-center d-flex align-items-center mb-1">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <p className="text-red mb-1 fs-3">C.G. Road</p>
              <Image
                src={hrline}
                alt="Horizontal Line"
                className="mb-0"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </h2>
          </div>
          <p className="text-blue mt-0 text-center">National Plaza, Opp. Lal Bungalow, C.G. Road</p>
          {renderImageGrid(Cgroad)}
        </Row>
        <Row className="g-4 mt-4" id="satellite">
          <div className="custom-heading-wrapper text-center justify-content-center d-flex align-items-center mb-1">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <p className="text-red mb-1 fs-3">Jodhpur Cross Roads, Satellite</p>
              <Image
                src={hrline}
                alt="Horizontal Line"
                className="mb-0"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </h2>
          </div>
          <p className="text-blue mt-0 text-center">
            Venus Amadeus Jodhpur Cross Road, B.R.T.S Bus Stand, Satellite
          </p>
          {renderImageGrid(St1)}
        </Row>
        <Row className="mt-4 g-4" id="maninagar">
          <div className="custom-heading-wrapper text-center justify-content-center d-flex align-items-center mb-1">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <p className="text-red mb-1 fs-3">Maninagar</p>
              <Image
                src={hrline}
                alt="Horizontal Line"
                className="mb-0"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </h2>
          </div>
          <p className="text-blue mt-0 text-center">
            Opp. Pintoo Garments, Maninagar Cross Rd, Maninagar
          </p>
          {renderImageGrid(Maninagar)}
        </Row>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
          src={shopnowbg}
          alt="Shop Now Banner"
          layout="fill"
          style={{ objectFit: 'cover' }}
          priority
        />
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
          }}
        >
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="d-none d-md-flex justify-content-start">
                <Image src={shopWomen} alt="Shop Girl" width={300} height={300} />
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

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="p-0 d-flex align-items-center justify-content-center">
          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              width={900}
              height={600}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          )}
        </Modal.Body>
      </Modal>
      <style>{`
        
          @media (max-width: 767px) {
          .banner {
            height: 215px !important;
          }
          
        }
      `}</style>
    </>
  );
};

export default WhySuvarnakala;
