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
    <div className="row g-4 align-items-stretch">
      
      {/* Left side - 3 scheme cards in grid */}
      <div className="col-12 col-md-6">
        <div className="row g-3 h-100">
          {schemes.map((item, idx) => (
            <div
              key={idx}
              className={idx < 2 ? "col-12 col-sm-6" : "col-12"} // 2 half width, 1 full width
            >
              <div className="scheme-box shadow-sm text-center p-4 h-100 d-flex flex-column justify-content-center">
                <div className="scheme-icon mb-3 mx-auto">
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

      {/* Right side - Gift card */}
      <div className="col-12 col-md-6 d-flex">
        <div className="gift-feature-card shadow-sm p-4 p-md-5 text-center w-100 d-flex flex-column justify-content-center">
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
      </div>
    </div>
</div>



      </div>
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h3 className="fraunces  mb-5">
          Scan QR or Tap the links below to download the Suvarnakala App

        </h3>

        <div className="row justify-content-center g-4">
          {/* Google Play Modern Card */}
          <div className="col-12 col-md-4">
            <div className="p-4 bg-white border-radius shadow-sm h-100 d-flex flex-column align-items-center">
              <div className="p-3 bg-light border-radius shadow-sm mb-3">
                <Image
                  src={qrPlaystore}
                  alt="Google Play QR"
                  width={200}
                  height={200}
                  className="rounded-3"
                />
              </div>
              {/* <h6 className="mt-2 mb-3 text-muted">Google Play</h6> */}
              <a
                href="https://play.google.com/store/apps/details?id=com.dsoft.suvarnakalajewellers&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={playstore}
                  alt="Play Store"
                  width={160}
                  height={50}
                  className="rounded-3 shadow-sm"
                />
              </a>
            </div>
          </div>

          {/* App Store Modern Card */}
          <div className="col-12 col-md-4">
            <div className="p-4 bg-white border-radius shadow-sm h-100 d-flex flex-column align-items-center">
              <div className="p-3 bg-light border-radius shadow-sm mb-3">
                <Image
                  src={qrAppstore}
                  alt="App Store QR"
                  width={200}
                  height={200}
                  className="rounded-3"
                />
              </div>
              {/* <h6 className="mt-2 mb-3 text-muted">App Store</h6> */}
              <a
                href="https://apps.apple.com/in/app/suvarnakala/id6466986702"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={appstore}
                  alt="App Store"
                  width={160}
                  height={50}
                  className="rounded-3 shadow-sm"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default Investment;
