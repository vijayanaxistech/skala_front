'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import mobile from '../../public/assets/mobile.png';
import playstore from '../../public/assets/googleplay.png';
import appstore from '../../public/assets/appstore.png';

interface CelebrateProps {
  bachatMahotsavImages: string[];
}

export default function Celebrate({ bachatMahotsavImages }: CelebrateProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image slider effect
  useEffect(() => {
    if (bachatMahotsavImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bachatMahotsavImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [bachatMahotsavImages]);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Gold Bachat Mahotsav',
    description:
      'Join our exclusive Bachat Mahotsav for irresistible offers on gold, diamond, and silver jewelry.',
    image: bachatMahotsavImages[0] || '',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      description: 'Special discounts and making charge waivers on jewelry',
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };

  return (
    <>
      <Head>
        <title>Gold Bachat Mahotsav - Exclusive Jewelry Discounts</title>
        <meta name="description" content="Join Bachat Mahotsav for exclusive jewelry offers." />
        <meta name="keywords" content="gold, diamond, silver, jewelry, discounts" />
        <meta property="og:image" content={bachatMahotsavImages[0] || ''} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className=" pb-2">
        <section className="hero-section">
          <div className="p-2 p-md-5">
            <div className="row">
              <div className="col-md-6">
                <div className="main-title">
                  <div className="custom-heading-wrapper d-flex align-items-center mt-4  mb-4">
                    <h2 className="m-0 custom-heading text-wrap me-3">
                      <span className="fraunces">
                        Celebrate Savings <span className="text-red fraunces">with Style! </span>
                      </span>
                      <div className="decorative-line">
                        <div className="diamond"></div>
                        <div className="line"></div>
                        <div className="diamond"></div>
                      </div>
                    </h2>
                  </div>
                  <p className="text-justify">
                    Join our exclusive <span className="dark_font lora">Bachat Mahotsav</span> and
                    enjoy irresistible offers on gold, diamond, and silver jewelry. Special
                    discounts, making charge waivers, and festive combos – all crafted to bring
                    sparkle to your celebrations.
                  </p>
                  <p className="text-justify">
                    The most awaited <span className="dark_font lora">Gold Bachat Mahotsav</span> is
                    here! Its not just a festival — it’s your golden opportunity to save smart and
                    shine brighter with stunning jewellery collections and exclusive savings plans.
                  </p>
                </div>

                <div className="d-flex gap-3 align-items-center">
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

              <div className="col-md-6 hide-on-mobile">
                <div className="jewellary_image" aria-live="polite">
                  {bachatMahotsavImages.length > 0 && (
                    <img
                      src={bachatMahotsavImages[currentImageIndex]}
                      alt={`Bachat Mahotsav jewelry offer ${currentImageIndex + 1}`}
                      className=""
                      style={{ maxHeight: '377px', width: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  )}
                  <div className="mobile_img">
                    <Image
                      src={mobile}
                      alt="Mobile app showcasing Bachat Mahotsav offers"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <style>
          {`
          @media (max-width: 768px) {
            .hide-on-mobile {
              display: none !important;
            }
          }
        `}
        </style>
      </div>
    </>
  );
}
