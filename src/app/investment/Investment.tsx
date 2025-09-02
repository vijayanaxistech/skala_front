"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import breadcrumbImage from "../../../public/assets//Investment.jpg";

import Image1 from "../../../public/assets/icons/gold.png";
import Image2 from "../../../public/assets/icons/money.png";
import Image3 from "../../../public/assets/icons/coin.png";
import giftcard from "../../../public/assets/Gift Card 2.png";
import playstore from "../../../public/assets/googleplay.png";
import appstore from "../../../public/assets/appstore.png";
import qrPlaystore from "../../../public/assets/ANDROID_QR.png";
import qrAppstore from "../../../public/assets/IOS_QR.png";
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
        <div className="d-flex justify-content-center align-items-center ">
          <div className="custom-heading-wrapper d-flex align-items-center mb-4">
            <h3 className="m-0 custom-heading text-wrap me-3 text-center">
              <span className="fraunces">
                Explore Our
                <span className="text-red fraunces"> Gold Schemes & Gift Cards</span>
              </span>
              <div className="decorative-line">
                <div className="diamond"></div>
                <div className="line"></div>
                <div className="diamond"></div>
              </div>
            </h3>
          </div>
        </div>

<div className="modern-ui-section py-5">
  <div className="container">
    <div className="row g-4 align-items-stretch">
      
      {/* Left Side - Gift Card on top + 3 Schemes below */}
      <div className="col-12 col-lg-6 d-flex flex-column">
        
        {/* Gift Card */}
        <div className="gift-feature-card bg-light shadow-sm p-4 p-md-5 text-center mb-4">
          <div className="mb-3">
            <Image
              src={giftcard}
              alt="Gift Card"
              width={300}
              height={180}
              style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
            />
          </div>
          <h5 className="fraunces mb-2">Gift Card</h5>
        </div>

        {/* Gold Schemes */}
<div className="scheme-box shadow-sm bg-light text-center p-4 h-100 d-flex flex-column justify-content-center">
  <div className="row g-4">
    {schemes.map((item, idx) => (
      <div key={idx} className="col-12 col-sm-4">
        <div className="d-flex flex-column align-items-center">
          <div className="scheme-icon mb-3">
            <Image
              src={item.icon}
              alt={item.title}
              width={70}
              height={70}
              style={{ objectFit: "contain" }}
            />
          </div>
          <h6 className="fraunces mb-0">{item.title}</h6>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>

      {/* Right Side - QR Download Section */}
<div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
  <section className="py-4 bg-light border-radius shadow-sm text-center h-100 d-flex flex-column justify-content-center">
    <h3 className="fraunces mb-4">
      Scan QR or Tap the links below to download the Suvarnakala App
    </h3>

    <div className="p-4  border-radius  d-flex flex-column align-items-center">
      {/* Single QR (Android) */}
      <div className="p-3 mb-4">
        <Image
          src={qrPlaystore}
          alt="Download App QR"
          width={200}
          height={200}
          className="rounded-3"
        />
      </div>

      {/* Store Links */}
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <a
          href="https://play.google.com/store/apps/details?id=com.dsoft.suvarnakalajewellers&hl=en_IN"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={playstore}
            alt="Play Store"
            width={150}
            height={45}
            className="rounded-3 shadow-sm"
          />
        </a>

        <a
          href="https://apps.apple.com/in/app/suvarnakala/id6466986702"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={appstore}
            alt="App Store"
            width={150}
            height={45}
            className="rounded-3 shadow-sm"
          />
        </a>
      </div>
    </div>
  </section>
</div>

    </div>
  </div>
</div>




      </div>


    </>
  );
};

export default Investment;
