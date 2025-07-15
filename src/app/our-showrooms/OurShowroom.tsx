'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import breadcrumbImage from '../../../public/assets/our-showroom-bg.png';
import shopnowbg from '../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
import shopWomen from '../../../public/assets/shopWomwn.png';
import styles from '../page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { TfiLayoutSliderAlt } from "react-icons/tfi";

// Satellite
import st1 from '../../../public/assets/showrooms/Satellite/1.png';
import st2 from '../../../public/assets/showrooms/Satellite/2.png';
import st3 from '../../../public/assets/showrooms/Satellite/3.png';

// CG Road
import cg1 from '../../../public/assets/showrooms/Cgroad/1.png';
import cg2 from '../../../public/assets/showrooms/Cgroad/2.png';
import cg3 from '../../../public/assets/showrooms/Cgroad/3.png';

// Maninagar
import mn1 from '../../../public/assets/showrooms/Maninagar/1.png';
import mn2 from '../../../public/assets/showrooms/Maninagar/2.png';
import mn3 from '../../../public/assets/showrooms/Maninagar/3.png';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

// Image arrays
const St1 = [st1, st2, st3];
const Cgroad = [cg1, cg2, cg3];
const Maninagar = [mn1, mn2, mn3];

interface ShowroomSectionProps {
  id: string;
  title: string;
  address: string;
  images: string[];
  contact?: string;
  hours?: string;
  mapLink: string;
}

const CustomCarousel: React.FC<{ images: string[], title: string, activeIndex: number, setActiveIndex: (index: number) => void }> = ({ images, title, activeIndex, setActiveIndex }) => {
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="custom-carousel" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          width: `${images.length * 100}%`,
          transform: `translateX(-${activeIndex * (100 / images.length)}%)`,
          transition: 'transform 0.6s ease-in-out',
        }}
      >
        {images.map((img, index) => (
          <div key={index} style={{ width: `${100 / images.length}%`, flexShrink: 0 }}>
            <Image
              src={img}
              alt={`${title} Showroom ${index + 1}`}
              width={1200}
              height={500}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '50%',
          padding: '10px',
          border: 'none',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
      >
        <FaArrowLeft size={20} color="#fff" />
      </button>
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '50%',
          padding: '10px',
          border: 'none',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
      >
        <FaArrowRight size={20} color="#fff" />
      </button>
    </div>
  );
};

const ShowroomSection: React.FC<ShowroomSectionProps> = ({ id, title, address, images, contact, hours, mapLink }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleGetDirections = () => {
    window.open(mapLink, '_blank');
  };

  return (
    <section id={id} className="mb-5">
      <Row className="g-4">
        <Col lg={7}>
          <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <Image
              src={images[0]}
              alt={`${title} Showroom`}
              fill
              style={{ objectFit: 'cover' }}
              placeholder="blur"
            />
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: 'white',
                cursor: 'pointer'
              }}
              onClick={handleShowModal}
            >
              <FaEye size={20} />
            </div>
          </div>
        </Col>

        <Col lg={5}>
          <Card className="h-100 border shadow-xs rounded-0">
            <Card.Body className="d-flex flex-column">
              <div className="mb-4">
                <h3 className="fw-bold lora text-red">{title}</h3>
                <div className="mb-3 mt-4">
                  <p className="text-uppercase text-blue small lora fw-bold mb-2">Location</p>
                  <p className="text-muted mb-4">{address}</p>
                </div>

                {contact && (
                  <div className="mb-3">
                    <p className="text-uppercase text-blue small lora fw-bold mb-2">Contact</p>
                    <p className="mb-3 text-muted">{contact}</p>
                  </div>
                )}
              </div>

              <div className="mt-auto">
                <button 
                  className="directions-btn w-100 rounded-0 mt-3"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="p-0">
          <CustomCarousel images={images} title={title} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </Modal.Body>
      </Modal>
    </section>
  );
};

const WhySuvarnakala = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ClientLayoutWrapper>
      <div style={{ position: 'relative', width: '100%', height: '500px' }} className="banner">
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="fill"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className="p-5 bg-color">
        <ShowroomSection
          id="cgroad"
          title="C.G. Road"
          address="101 National Plaza, Opp. Lal Bunglow, C. G. Road, Ahmedabad, Gujarat - 380 006"
          images={Cgroad}
          contact="+91 9924902223"
          hours="Monday - Saturday: 10:30 AM - 8:30 PM"
          mapLink="https://maps.app.goo.gl/xN92n1Y9FetfUznd8"
        />

        <ShowroomSection
          id="satellite"
          title="Jodhpur Cross Roads, Satellite"
          address="Venus Amadeus Jodhpur Cross Road, B.R.T.S Bus Stand, Satellite, Ahmedabad, Gujarat 380015"
          images={St1}
          contact="+91 9924902223"
          hours="Monday - Saturday: 10:30 AM - 8:30 PM"
          mapLink="https://maps.app.goo.gl/sMtWFAF2yPUSwYXZ6"
        />

        <ShowroomSection
          id="maninagar"
          title="Maninagar"
          address="Opp. Pintoo Garments, Maninagar Cross Rd, Maninagar, Ahmedabad, Gujarat 380008"
          images={Maninagar}
          contact="+91 9924902223"
          hours="Monday - Saturday: 10:30 AM - 8:30 PM"
                    mapLink="https://maps.app.goo.gl/h7oETcXHRToqzaDT8"

        />
      </div>

      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
          src={shopnowbg}
          alt="Shop Now Banner"
          layout="fill"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="d-none d-md-flex justify-content-start">
                <Image src={shopWomen} alt="Shop Girl" width={300} height={300} />
              </Col>
              <Col xs={12} md={6} className="text-center text-md-start text-white">
                <h1 className="fs-4 fs-md-3 lh-tight mb-4 fraunces">
                  Elevate Every Moment with Timeless Jewellery
                </h1>
                <Link href="/collections">
                  <Button
                    variant="outline-light rounded-0 fraunces"
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

      <style jsx>{`
        .custom-carousel {
          position: 'relative',
          width: '100%',
          overflow: 'hidden'
        }

        button:hover {
          transform: translateY(-50%) scale(1.1);
        }

        @media (max-width: 767px) {
          .banner {
            height: 215px !important;
          }
        }
      `}</style>
    </ClientLayoutWrapper>
  );
};

export default WhySuvarnakala;