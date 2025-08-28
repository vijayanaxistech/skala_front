"use client";

import React from "react";
import Image from "next/image";
import giftcard from "../../public/assets/Gift Card 2.png";
import goldIcon from "../../public/assets/6fe12d1ca7e63ca786546007ade02bf47d451b70.png";
import calendarIcon from "../../public/assets/58ffe92b446f8b39c2730187c40eb5601690961e.png";
import playstore from "../../public/assets/googleplay.png";
import appstore from "../../public/assets/appstore.png";
const GiftCard = () => {
  return (
    <>
      <div className=" pb-2 mt-5 ">
        <div className=" bg-color" aria-label="Suvarnakala Gift Card Section">
          <div className="p-3 p-md-5 pt-3 pb-2 ">
            <div className="row align-items-center">
              <div className="custom-heading-wrapper d-flex align-items-center mb-4">
                <h2 className="m-0 custom-heading text-wrap me-3">
                  <span className="fraunces">
                    Suvarnakala <span className="text-red fraunces">Gift Card </span>
                  </span>
                  <div className="decorative-line">
                    <div className="diamond"></div>
                    <div className="line"></div>
                    <div className="diamond"></div>
                  </div>
                </h2>
              </div>
              <p className=" mt-2 text-justify  text-md-start">
                Not sure which piece to choose? Let them decide with the Suvarnakala Gift Card, a
                perfect way to celebrate special moments with the beauty of fine jewelry.
              </p>
              {/* Text Content */}
              <div className="col-12 col-md-7 mb-4 mb-md-0">
                <h6 className="lora  mt-1 mb-3 text-red text-start">
                  Why a Suvarnakala Gift Card?
                </h6>
                <ul className=" ps-0 ps-md-3  text-justify text-md-start list-unstyled list-md-bullet">
                  <li className="mb-2">
                    Perfect for Any Occasion — Birthdays, weddings, anniversaries, or just because.
                  </li>
                  <li className="mb-2">
                    Freedom to Choose — From delicate everyday pieces to statement bridal sets.
                  </li>
                  <li className="mb-2">
                    Elegant Presentation — Available as a luxury physical card or a convenient
                    digital option.
                  </li>
                </ul>

                <div className="d-flex flex-column flex-md-row gap-3 mt-4 justify-content-center justify-content-md-start">
                  <div className="d-flex gift-card flex-column align-items-center justify-content-center px-4 py-3 shadow">
                    <Image
                      src={goldIcon}
                      alt="Suvarnakala Gold Rate Booking Icon"
                      width={30}
                      height={30}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                    <span className="mt-3 lora">Gold Rate Booking</span>
                  </div>

                  <div className="d-flex flex-column gift-card align-items-center justify-content-center px-4 py-3 shadow">
                    <Image
                      src={calendarIcon}
                      alt="Suvarnakala Monthly Installment Icon"
                      width={30}
                      height={30}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                    <span className="mt-3 lora">Monthly Installment</span>
                  </div>
                </div>

                <p className="mt-4 text-red lora text-center text-md-start">
                  For latest updates and offers, download our app today.
                </p>
                <div className="text-center text-md-start">
                  <div className="d-inline-flex gap-3 mb-3 align-items-center">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.dsoft.suvarnakalajewellers&hl=en_IN"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={playstore} alt="Play Store" width={120} height={40} />
                    </a>

                    <a
                      href="https://apps.apple.com/in/app/suvarnakala/id6466986702"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={appstore} alt="App Store" width={120} height={40} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-5 mb-4 text-center">
                <Image
                  src={giftcard}
                  alt="Suvarnakala Gift Card for Jewelry"
                  className="img-fluid rounded"
                  width={400}
                  height={300}
                  style={{ maxHeight: "280px", objectFit: "contain", width: "100%" }}
                  sizes="(max-width: 768px) 100vw, 400px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftCard;
