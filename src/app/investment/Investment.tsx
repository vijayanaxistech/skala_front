'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Image1 from '../../../public/assets/icons/gold.png';
import Image2 from '../../../public/assets/icons/money.png';
import Image3 from '../../../public/assets/icons/coin.png';
import breadcrumbImage from '../../../public/assets/Why us Page.jpg';
import androidAppImage from '../../../public/assets/googleplay.png';
import iosAppImage from '../../../public/assets/appstore.png';
import giftcard from '../../../public/assets/Gift Card 2.png';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Investment = () => {
    const schemes = [
        {
            icon: Image1,
            title: 'Digi Gold',
            description: 'Digital Gold benefits',
        },
        {
            icon: Image3,
            title: 'Book My Gold',
            description: 'Book My Gold Benefits and How it works?',
        },
        {
            icon: Image2,
            title: 'Monthly Saving Scheme',
            description: 'Golden treasure',
        },
    ];

    const responsive = {
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            {/* Banner Image */}
            <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                <Image
                    src={breadcrumbImage}
                    alt="Suvarnakala Banner"
                    layout="responsive"
                    objectFit="contain"
                    priority
                />
            </div>
            <div className=" py-4 py-md-5 text-center px-3 px-md-3">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="custom-heading-wrapper d-flex align-items-center mb-5">
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
                {/* Mobile View - Carousel */}
                <div className="d-block d-md-none">
                    <Carousel
                        responsive={responsive}
                        autoPlay
                        autoPlaySpeed={5000}
                        infinite
                        showDots
                        arrows={false}
                        renderDotsOutside={false}
                        itemClass="pb-3"
                    >
                        {schemes.map((item, idx) => (
                            <div key={idx} className="d-flex flex-column align-items-center px-3 mt-3">
                                <div className="rounded-4 iconbox d-flex justify-content-center align-items-center mb-3">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={40}
                                        height={40}
                                        className="iconbox-image"
                                    />
                                </div>
                                <h5 className="heading-extension text-red fraunces mt-3">{item.title}</h5>
                                <p className="text-muted mt-1">{item.description}</p>
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Desktop View - Grid */}
                <div className="row mt-4 d-none d-md-flex">
                    {schemes.map((item, idx) => (
                        <div key={idx} className="col-12 col-sm-6 col-md-4">
                            <div className="d-flex flex-column align-items-center px-3 mt-3 mt-md-0">
                                <div className="rounded-4 iconbox d-flex justify-content-center align-items-center mb-3">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={40}
                                        height={40}
                                        className="iconbox-image"
                                    />
                                </div>
                                <h5 className="heading-extension text-red fraunces mt-3">{item.title}</h5>
                                <p className="text-muted mt-1">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New section for app download */}
            <div className="container py-4 text-center">
                <h3 className="fraunces">Access exclusive gold benefits by downloading our app</h3>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <Link href="#">
                        <Image
                            src={androidAppImage}
                            alt="Download on Google Play"
                            width={150}
                            height={50}
                        />
                    </Link>
                    <Link href="#">
                        <Image
                            src={iosAppImage}
                            alt="Download on the App Store"
                            width={150}
                            height={50}
                        />
                    </Link>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="custom-heading-wrapper d-flex align-items-center mb-5">
                    <h3 className="m-0 custom-heading text-wrap me-3 text-center">
                        <span className="fraunces">
                            Gift  <span className="text-red fraunces">Card </span>
                        </span>
                        <div className="decorative-line">
                            <div className="diamond"></div>
                            <div className="line"></div>
                            <div className="diamond"></div>
                        </div>
                    </h3>
                </div>
            </div>
      <div className="container py-4">
        <div className="row flex-column-reverse flex-md-row justify-content-center align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start">
            <h3 className="fraunces mb-3">
              Unlock Exclusive Gift Card Benefits - Download Our App Today!
            </h3>
            <p className="lead text-muted d-none d-md-block">
              Give the gift of gold with our beautifully designed gift cards, perfect for any special occasion.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-4">
              <Link href="#">
                <Image src={androidAppImage} alt="Download on Google Play" width={150} height={50} />
              </Link>
              <Link href="#">
                <Image src={iosAppImage} alt="Download on the App Store" width={150} height={50} />
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
            <Image
              src={giftcard}
              alt="Suvarnakala Gift Card for Jewelry"
              className="img-fluid rounded"
              width={400}
              height={300}
              style={{ maxHeight: '280px', objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 400px"
              loading="lazy"
            />
          </div>
        </div>
      </div>

        </>
    );
};

export default Investment;