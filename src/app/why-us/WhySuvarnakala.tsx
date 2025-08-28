"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import breadcrumbImage from "../../../public/assets/Why us Page.jpg";
import Bullet from "../../../public/assets/bullet.jpg";
import Loader from "@/components/Loader";

// ✅ New Data in Array (title + description split by "–")
const feature = [
  {
    title: "Best Value for Your Gold",
    description: "Get the most competitive exchange value.",
  },
  {
    title: "100% Hallmarked Jewellery",
    description: "Every piece certified for purity and authenticity.",
  },
  {
    title: "Certified Diamond Jewellery",
    description: "Each diamond comes with an international certificate.",
  },
  {
    title: "Craftsmanship & Design",
    description: "A perfect balance of tradition and contemporary style.",
  },
  {
    title: "Customer Trust",
    description: "Service as precious as our jewellery.",
  },
  {
    title: "Trusted by Generations",
    description: "Since 1970 | Over 1,00,000 Happy Families | 3 Showrooms Across Ahmedabad",
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
      <div style={{ position: "relative", width: "100%", height: "auto" }}>
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>

      <div className="pb-5">
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

        {/* New Promise Section */}
        <div className="px-3 px-md-5">
          {feature.map((item, index) => (
            <Row className="mb-4" key={index}>
              <Col xs={12}>
                <div className="d-flex align-items-start">
                  <div className="me-3 text-red" style={{ fontSize: "1.10rem" }}>
                    <Image
                      src={Bullet}
                      alt="Section Icon"
                      width={20}
                      height={20}
                      className="rounded-circle" // Bootstrap for rounded-full
                    />{" "}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 lora">{item.title}</h5>
                    <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          ))}

          <p className="mt-4 text-muted">
            With showrooms at <strong className="text-dark">CG Road, Satellite, and Maninagar</strong>, Suvarnakala
            continues to be Ahmedabad’s trusted jewellery destination, where every piece tells a
            story of elegance, emotion, and excellence.
          </p>

          <p className="mt-3 text-muted">
            At Suvarnakala, jewellery is not just bought – it is experienced. Step into our world
            and discover the sparkle of trust, artistry, and timeless elegance.
          </p>
        </div>
      </div>
    </>
  );
};

export default WhySuvarnakala;
