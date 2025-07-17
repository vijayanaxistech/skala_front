'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import breadcrumbImage from '../../../public/assets/About breadcumb.png';
import scheme1Image from '../../../public/assets/scheme-1.png';
import scheme2Image from '../../../public/assets/scheme-2.png';
import playstore from '../../../public/assets/googleplay.png';
import appstore from '../../../public/assets/appstore.png';
import Loader from '@/components/Loader';

const totalYears = new Date().getFullYear() - 1970;

const MonthlySavingScheme = () => {
  const [animatedYears, setAnimatedYears] = useState(0);
  const [loading, setLoading] = useState(true);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  // Simulate loading (e.g., data/image loading)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // Show loader for 1.2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show loader while loading
  if (loading) return <Loader />;

  return (
    <>
      {/* Breadcrumb Section */}
      <div
        style={{ position: 'relative', width: '100%', height: '434px' }}
        className="about-banner"
      >
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="bg-color">
        <div className="p-5 py-4">
          <div className="custom-heading-wrapper d-flex align-items-center mb-4">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <span className="fraunces">
                Monthly <span className="text-red fraunces"> Saving Scheme </span>
              </span>
              <div className="decorative-line">
                <div className="diamond"></div>
                <div className="line"></div>
                <div className="diamond"></div>
              </div>
            </h2>
          </div>

          {/* Schemes Section */}
          <div className="row g-4 py-3 ">
            <div className="col-md-6">
              <div className="scheme-card ">
                <Image
                  src={scheme1Image}
                  alt="Scheme 1"
                  className="img-fluid "
                  layout="responsive"
                  width={600}
                  height={400}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="scheme-card ">
                <Image
                  src={scheme2Image}
                  alt="Scheme 1"
                  className="img-fluid "
                  layout="responsive"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>

          {/* App Store Links Section */}
          {/* <div className="app-section text-center py-5">
            <h2 className="fraunces mb-4">For More, Visit Our App</h2>
            <div className="d-flex justify-content-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.dsoft.suvarnakalajewellers&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="app-link"
              >
                <Image
                  src={playstore}
                  alt="Google Play Store"
                  width={150}
                  height={50}
                  className="img-fluid"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/suvarnakala/id6466986702"
                target="_blank"
                rel="noopener noreferrer"
                className="app-link"
              >
                <Image
                  src={appstore}
                  alt="Apple App Store"
                  width={150}
                  height={50}
                  className="img-fluid"
                />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MonthlySavingScheme;
