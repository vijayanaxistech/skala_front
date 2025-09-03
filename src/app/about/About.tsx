"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import aboutImage from "../../../public/assets/About_us_bottom.jpg";
import qualityBadge from "../../../public/assets/Quality.png";
import serviceBadge from "../../../public/assets/Service.png";
import valueBadge from "../../../public/assets/Value.png";
import breadcrumbImage from "../../../public/assets/About us.jpg";
import legacyImage from "../../../public/assets/Our_legacy_bottom.jpg";
import cornerImage from "../../../public/assets/Group 41992.png";
import roseImage from "../../../public/assets/rose.png";
import BIS from "../../../public/assets/BIS.svg";
import GIA from "../../../public/assets/GIA.svg";
import EXCHANGE from "../../../public/assets/EXCHANGE.svg";
import Loader from "@/components/Loader";

const totalYears = new Date().getFullYear() - 1970;

const About = () => {
  const [animatedYears, setAnimatedYears] = useState(0);
  const [loading, setLoading] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && counterRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const end = totalYears;
            const duration = 2500;
            const stepTime = Math.max(10, Math.floor(duration / end));

            const timer = setInterval(() => {
              start += 1;
              setAnimatedYears(start);
              if (start >= end) clearInterval(timer);
            }, stepTime);
          }
        },
        { threshold: 0.6 },
      );

      observer.observe(counterRef.current);

      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "auto" }}>
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>

      <div className="position-relative py-4" style={{ background: "#fff9f3" }}>
        <div className="position-absolute top-0 end-0 p-2 d-none d-md-block" style={{ zIndex: 10 }}>
          <Image src={roseImage} alt="Rose" width={100} height={200} className="img-fluid" />
        </div>

        <div className=" p-3 p-md-5 py-3">
          <div className="custom-heading-wrapper d-flex align-items-center mb-4">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <span className="fraunces">
                About <span className="text-red fraunces">Suvarnakala </span>
              </span>
              <div className="decorative-line">
                <div className="diamond"></div>
                <div className="line"></div>
                <div className="diamond"></div>
              </div>
            </h2>
          </div>
          <div className="row align-items-center">
            <div className="col-md-5 mb-4 mb-md-0">
              <Image
                src={aboutImage}
                alt="About Suvarnakala"
                width={500}
                height={400}
                className="img-fluid border-radius "
              />
            </div>

            <div className="col-md-7">
              <h4 className="  mb-3 lora">Suvarnakala — The Pride of a Woman</h4>
              <p className=" text-justify text-muted">
                At Suvarnakala, every piece of jewellery is more than just an ornament – it is a
                reflection of tradition, artistry, and trust. With a legacy built on purity and
                perfection, we have been part of countless celebrations, milestones, and cherished
                memories in the lives of our valued customers.
              </p>
              <p className="text-justify text-muted">
                From everyday elegance to timeless bridal treasures, our collections are crafted to
                seamlessly blend heritage with modern design. Each creation is thoughtfully designed
                and hallmarked for purity, ensuring you don’t just wear jewellery, but carry forward
                a legacy of trust.
              </p>
              <div className="row text-center text-md-start my-4">
                <div className="col-4 col-sm-4">
                  <Image
                    src={qualityBadge}
                    alt="Best Quality"
                    width={80}
                    height={80}
                    className="img-fluid mb-2 badge-guarantee"
                  />
                  <p className="text-danger fw-semibold small lora">The Purity Guarantee</p>
                </div>
                <div className="col-4 col-sm-4">
                  <Image
                    src={serviceBadge}
                    alt="Best Service"
                    width={80}
                    height={80}
                    className="img-fluid mb-2  badge-service"
                  />
                  <p className="text-danger fw-semibold small lora">Service Excellence</p>
                </div>
                <div className="col-4 col-sm-4">
                  <Image
                    src={valueBadge}
                    alt="Best Value"
                    width={80}
                    height={80}
                    className="img-fluid mb-2  badge-value"
                  />
                  <p className="text-danger fw-semibold small lora">Amazing Value Everyday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 p-md-5 position-relative">
        <div
          className="position-absolute bottom-0 start-0 mb-0 ms-0"
          style={{ zIndex: 1, transform: "rotate(35deg)" }}
        >
          <Image src={cornerImage} alt="Decorative corner" width={70} height={70} />
        </div>

        <div className="row align-items-center">
          <div className="col-md-7 mb-3">
            <div className="custom-heading-wrapper d-flex align-items-center mb-4">
              <h2 className="m-0 custom-heading text-wrap me-3">
                <span className="fraunces">
                  Our <span className="text-red fraunces">Legacy </span>
                </span>
                <div className="decorative-line">
                  <div className="diamond"></div>
                  <div className="line"></div>
                  <div className="diamond"></div>
                </div>
              </h2>
            </div>{" "}
            <h4 className="  mb-3 mt-md-5 lora">At Suvarnakala, legacy is an art form. </h4>
            <p className="text-justify text-muted">
              For generations, we have crafted jewels that embody timeless elegance, uncompromising
              purity, and enduring value. Each creation is a masterpiece—born of heritage, perfected
              by craftsmanship, and designed to celebrate life’s most precious milestones.
            </p>
            <p className="text-justify text-muted">
              Our promise goes beyond jewellery, it is the promise of trust, refinement, and luxury
              that lasts forever.
            </p>
          </div>

          <div className="col-md-5  mt-md-1 mb-3 text-center position-relative">
            <Image
              src={legacyImage}
              alt="Suvarnakala Store"
              className="img-fluid mb-5 mb-md-0 border-radius"
            />
          </div>
        </div>
      </div>

      <div style={{ padding: "30px 0" }} className="bg-light">
        <div className="d-flex flex-wrap align-items-center gap-3 justify-content-center justify-content-md-evenly">
          {[
            { img: BIS, text: " ⁠100% BIS hallmarked gold jewellery" },
            { img: GIA, text: "⁠100% certified diamond jewellery " },
            { img: EXCHANGE, text: "⁠100% exchange value" },
          ].map((item, index) => (
            <div
              key={index}
              className="d-flex flex-column align-items-center text-center p-2"
              style={{ minWidth: "250px" }}
            >
              <Image src={item.img} alt={item.text} width={100} height={100} />
              <span
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                className="lora text-gray"
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rotateCircle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }


          
        }
      `}</style>
    </>
  );
};

export default About;
