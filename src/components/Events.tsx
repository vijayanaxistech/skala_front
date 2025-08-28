'use client';

import Image from 'next/image';
import Head from 'next/head';
import four from '../../public/assets/Every Events/4.jpg';
import one from '../../public/assets/Every Events/1.jpg';
import two from '../../public/assets/Every Events/2.jpg';
import three from '../../public/assets/Every Events/3.jpg';
import styles from '../app/page.module.css';

const categories = [
  { img: four },
  { img: two },
  { img: one },
  { img: three },
];

export default function CategoryGrid() {
  return (
    <>
      <div
        className="p-3 px-md-5 py-md-4 pb-0 pt-4"
        aria-label="Suvarnakala Jewelry Collections"
      >
        <div className="custom-heading-wrapper d-flex align-items-center mb-4">
          <h2 className="m-0 custom-heading text-wrap me-3">
            <span className="fraunces">
              The Right Fit{' '}
              <span className="text-red fraunces">for Every Events :</span>
            </span>
            <div className="decorative-line">
              <div className="diamond"></div>
              <div className="line"></div>
              <div className="diamond"></div>
            </div>
          </h2>
          <span className="heading-extension fraunces">
            From Casual to Glam, Effortlessly
          </span>
        </div>

        <div className="row g-3">
          {/* LEFT BIG IMAGE */}
          <div className="col-12 col-md-6">
            <div className={`${styles.card} position-relative`}>
              <div className={styles.desktopOnly}>
                <Image
                  src={categories[0].img}
                  alt="Suvarnakala Jewelry Collection"
                  fill
                  priority
                  className={styles.responsiveImage}
                  style={{ borderRadius: '12px' }}
                />
              </div>
              <div className={styles.mobileOnly}>
                <Image
                  src={categories[0].img}
                  alt="Suvarnakala Jewelry Collection"
                  priority
                  className={styles.actualImage}
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SMALL IMAGES */}
          <div className="col-12 col-md-6 d-flex flex-column gap-3">
            {categories.slice(1).map((item, index) => (
              <div
                key={index}
                className={`${styles.cardSmall} position-relative`}
              >
                <div className={styles.desktopOnly}>
                  <Image
                    src={item.img}
                    alt="Suvarnakala Jewelry Collection"
                    fill
                    loading="lazy"
                    className={styles.responsiveImage}
                    style={{ borderRadius: '12px' }}
                  />
                </div>
                <div className={styles.mobileOnly}>
                  <Image
                    src={item.img}
                    alt="Suvarnakala Jewelry Collection"
                    loading="lazy"
                    className={styles.actualImage}
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
