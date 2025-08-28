"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import breadcrumbImage from "../../../public/assets/Why us Page.jpg";

import Image1 from "../../../public/assets/icons/gold.png";
import Image2 from "../../../public/assets/icons/money.png";
import Image3 from "../../../public/assets/icons/coin.png";
import giftcard from "../../../public/assets/Gift Card 2.png";
import playstore from "../../../public/assets/googleplay.png";
import appstore from "../../../public/assets/appstore.png";

const Investment = () => {
  const schemes = [
    {
      icon: Image1,
      title: "Digi Gold",
      description: "Digital Gold benefits",
    },
    {
      icon: Image3,
      title: "Book My Gold",
      description: "Book My Gold Benefits and How it works?",
    },
    {
      icon: Image2,
      title: "Monthly Saving Scheme",
      description: "Golden treasure",
    },
  ];

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
        <div className=" p-3 p-md-5 py-3">
      {/* Heading */}
      <div className="d-flex justify-content-center align-items-center ">
        <div className="custom-heading-wrapper d-flex align-items-center mb-4">
          <h3 className="m-0 custom-heading text-wrap me-3 text-center">
            <span className="fraunces">
              Easy Steps to <span className="text-red fraunces">Own Gold </span>
            </span>
            <div className="decorative-line">
              <div className="diamond"></div>
              <div className="line"></div>
              <div className="diamond"></div>
            </div>
          </h3>
        </div>
      </div>

      {/* Schemes + Gift Card */}
      <div className="p-md-2 mt-md-5 mt-2">
        <div className="row g-4 align-items-stretch">
          {/* Left - Schemes Card */}
          <div className="col-12 col-md-6 d-flex">
            <div className="bg-color shadow-sm border-0 rounded-4 p-4 w-100">
              <h4 className="fraunces text-center mb-3 text-dark">
                Explore Our <span className="text-red fraunces">Gold Schemes</span>
              </h4>
              <div className="d-flex flex-column gap-4">
                {schemes.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center bg-white rounded-3 p-3 hover-shadow-sm"
                  >
                    <div className="me-3 flex-shrink-0">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <h6 className="fraunces mb-1 text-red">{item.title}</h6>
                      <p className="text-muted small mb-0">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Gift Card */}
          <div className="col-12 col-md-6 d-flex">
            <div className="bg-color shadow-sm border-0 rounded-4 p-4 w-100 d-flex flex-column justify-content-center align-items-center">
              <h4 className="fraunces mb-3 text-dark text-center">
                Explore Our <span className="text-red fraunces">Gift Card</span> Benefits
              </h4>
              <Image
                src={giftcard}
                alt="Gift Card"
                className="img-fluid rounded mb-3"
                width={500}
                height={350}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
</div>
      {/* App Download */}
      <div className=" text-center py-5 bg-light">
        <h3 className="fraunces">
Unlock Exclusive Gold Offers - Download Our App Today      </h3>
        <div className="d-flex justify-content-center gap-3 mt-4">

                              <a
                      href="https://play.google.com/store/apps/details?id=com.dsoft.suvarnakalajewellers&hl=en_IN"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={playstore} alt="Play Store" width={160} height={50} />
                    </a>

                    <a
                      href="https://apps.apple.com/in/app/suvarnakala/id6466986702"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={appstore} alt="App Store" width={160} height={50} />
                    </a>
        </div>
      </div>
    </>
  );
};

export default Investment;
