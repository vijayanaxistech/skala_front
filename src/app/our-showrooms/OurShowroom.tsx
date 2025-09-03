"use client";

import Image from "next/image";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import breadcrumbImage from "../../../public/assets/our-showroom.jpg";
import st1 from "../../../public/assets/showrooms/Satellite/Satellite.jpg";
import cg1 from "../../../public/assets/showrooms/Cgroad/CG Road.jpg";
import mn1 from "../../../public/assets/showrooms/Maninagar/Maninagar.jpg";

import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

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
    window.open(mapLink, "_blank");
  };

  return (
    <section id={id} className="mb-5">
      <Row className="g-4">
        <Col lg={7}>
          <div style={{ width: "100%" }}>
            <Image
              src={image}
              alt={`${title} Showroom`}
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 768px) 100vw, 70vw"
              className="border-radius"
            />
          </div>
        </Col>

        <Col lg={5}>
          <Card className="h-100 border bg-light border-radius">
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
                  className="directions-btn w-100 border-radius"
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
      <div style={{ position: "relative", width: "100%", height: "auto" }}>
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>

      <div className="p-3 p-md-5 ">
        <ShowroomSection
          id="cgroad"
          title="C.G. Road"
          address=" National Plaza, Opp. Lal Bunglow, C. G. Road, Ahmedabad, Gujarat - 380006"
          image={cg1}
          contact="+91⁠ 99 2490 2223"
          mapLink="https://maps.app.goo.gl/xN92n1Y9FetfUznd8"
        />
        <ShowroomSection
          id="satellite"
          title="Satellite"
          address="Venus Amadeus Jodhpur Cross Road, B.R.T.S Bus Stand, Satellite, Ahmedabad, Gujarat 380015"
          image={st1}
          contact="+91 78740 11144"
          mapLink="https://maps.app.goo.gl/sMtWFAF2yPUSwYXZ6"
        />
        <ShowroomSection
          id="maninagar"
          title="Maninagar"
          address="Opp. Pintoo Garments, Maninagar Cross Rd, Maninagar, Ahmedabad, Gujarat 380008"
          image={mn1}
          contact="+91 8511 755 799"
          mapLink="https://maps.app.goo.gl/h7oETcXHRToqzaDT8"
        />
      </div>
    </ClientLayoutWrapper>
  );
};

export default WhySuvarnakala;
