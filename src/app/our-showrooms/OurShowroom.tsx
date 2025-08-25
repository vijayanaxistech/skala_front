'use client';

import Image from 'next/image';
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import breadcrumbImage from '../../../public/assets/our-showroom-bg.png';
import shopnowbg from '../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
import shopWomen from '../../../public/assets/shopWomwn.png';
import styles from '../page.module.css';
import Link from 'next/link';

// Satellite
import st1 from '../../../public/assets/showrooms/Satellite/Satellite.jpg';
// CG Road
import cg1 from '../../../public/assets/showrooms/Cgroad/CG Road.jpg';
// Maninagar
import mn1 from '../../../public/assets/showrooms/Maninagar/Maninagar.jpg';

import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

interface ShowroomSectionProps {
  id: string;
  title: string;
  address: string;
  image: any;
  contact?: string;
  mapLink: string;
}

const ShowroomSection: React.FC<ShowroomSectionProps> = ({
  id,
  title,
  address,
  image,
  contact,
  mapLink,
}) => {
  const handleGetDirections = () => {
    window.open(mapLink, '_blank');
  };

  return (
    <section id={id} className="mb-5">
      <Row className="g-4">
        <Col lg={7}>
          <div style={{ width: '100%' }}>
            <Image
              src={image}
              alt={`${title} Showroom`}
              style={{ width: '100%', height: 'auto' }}
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>
        </Col>

        <Col lg={5}>
          <Card className="h-100 border shadow-xs rounded-0">
            <Card.Body className="d-flex flex-column">
              <div>
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
                  className="directions-btn w-100 rounded-0"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

const WhySuvarnakala = () => {
  return (
    <ClientLayoutWrapper>
      <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>

      <div className="p-3 p-md-5 bg-color">
        <ShowroomSection
          id="cgroad"
          title="C.G. Road"
          address="101 National Plaza, Opp. Lal Bunglow, C. G. Road, Ahmedabad, Gujarat - 380 006"
          image={cg1}
          contact="+91 9924902223"
          mapLink="https://maps.app.goo.gl/xN92n1Y9FetfUznd8"
        />
        <ShowroomSection
          id="satellite"
          title="Jodhpur Cross Roads, Satellite"
          address="Venus Amadeus Jodhpur Cross Road, B.R.T.S Bus Stand, Satellite, Ahmedabad, Gujarat 380015"
          image={st1}
          contact="+91 9924902223"
          mapLink="https://maps.app.goo.gl/sMtWFAF2yPUSwYXZ6"
        />
        <ShowroomSection
          id="maninagar"
          title="Maninagar"
          address="Opp. Pintoo Garments, Maninagar Cross Rd, Maninagar, Ahmedabad, Gujarat 380008"
          image={mn1}
          contact="+91 9924902223"
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
    </ClientLayoutWrapper>
  );
};

export default WhySuvarnakala;