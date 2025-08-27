'use client';

import Image from 'next/image';
import Head from 'next/head'; // For SEO metadata
import bridalBliss from '../../public/assets/Bridal Bliss.jpg';
import dazzlingDiamonds from '../../public/assets/2- Diamonds.jpg';
import goldenClassic from '../../public/assets/3- Gold Classic.jpg';
import effortlessEveryday from '../../public/assets/1- Effortless Every day.jpg';
import styles from '../app/page.module.css';

const categories = [
  { title: 'Bridal Bliss', img: bridalBliss },
  { title: 'Dazzling Diamonds', img: dazzlingDiamonds },
  { title: 'Golden Classic', img: goldenClassic },
  { title: 'Effortless Everyday', img: effortlessEveryday },
];

export default function CategoryGrid() {
  // Structured data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Suvarnakala Jewelry Categories',
    description:
      'Explore Suvarnakala’s jewelry collections, including Bridal Bliss, Dazzling Diamonds, Golden Classic, and Effortless Everyday, designed for every occasion.',
    itemListElement: categories.map((category, index) => ({
      '@type': 'ProductGroup',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: category.title,
        image: category.img.src,
        description: `Suvarnakala's ${category.title} jewelry collection for special occasions.`,
      },
    })),
  };

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Suvarnakala Jewelry Collections - Bridal, Diamonds, Gold, Everyday</title>
        <meta
          name="description"
          content="Discover Suvarnakala’s jewelry collections: Bridal Bliss, Dazzling Diamonds, Golden Classic, and Effortless Everyday, crafted for every occasion from casual to glamorous."
        />
        <meta
          name="keywords"
          content="Suvarnakala, Bridal Bliss, Dazzling Diamonds, Golden Classic, Effortless Everyday, jewelry collections, gold jewelry, diamond jewelry"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourwebsite.com/collections" />
        {/* Open Graph for social media */}
        <meta
          property="og:title"
          content="Suvarnakala Jewelry Collections - Bridal, Diamonds, Gold, Everyday"
        />
        <meta
          property="og:description"
          content="Explore Suvarnakala’s jewelry collections for every occasion, from Bridal Bliss to Effortless Everyday."
        />
        <meta property="og:image" content={categories[0].img.src} />
        <meta property="og:url" content="https://yourwebsite.com/collections" />
        <meta property="og:type" content="website" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="p-3 px-md-5 py-md-4 pb-0 pt-4  " aria-label="Suvarnakala Jewelry Collections">
        <div className="custom-heading-wrapper d-flex align-items-center mb-4">
          <h2 className="m-0 custom-heading  text-wrap me-3">
            <span className="fraunces">
              The Right Fit <span className="text-red fraunces">for Every Events :</span>
            </span>
            <div className="decorative-line">
              <div className="diamond"></div>
              <div className="line"></div>
              <div className="diamond"></div>
            </div>
          </h2>
          <span className="heading-extension fraunces">From Casual to Glam, Effortlessly</span>
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className={`${styles.card} position-relative`}>
              <Image
                src={categories[0].img}
                alt={`Suvarnakala ${categories[0].title} Jewelry Collection`}
                layout="fill"
                objectFit="cover"
                priority
                style={{ borderRadius: '12px' }}
              />
              <div className={`${styles.overlay} julee-regular text-white text-center  fs-1`}>
                {categories[0].title}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column gap-3">
            {categories.slice(1).map((item, index) => (
              <div key={index} className={`${styles.cardSmall} position-relative`}>
                <Image
                  src={item.img}
                  alt={`Suvarnakala ${item.title} Jewelry Collection`}
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  style={{ borderRadius: '12px' }}
                />
                <div className={`${styles.overlay} julee-regular fs-1 text-white`}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
