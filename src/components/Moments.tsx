'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BASE_URL } from '../lib/api'; // Update path as needed

interface Moment {
  _id: string;
  filePath?: string;
  imagePath?: string;
  mediaType?: 'image' | 'video';
  createdAt: string;
  title?: string;
}

interface MomentsProps {
  moments: Moment[];
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1441 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1023, min: 768 },
    items: 3,
  },
  smallTablet: {
    breakpoint: { max: 767, min: 576 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 575, min: 0 },
    items: 1,
  },
};

const Moments: React.FC<MomentsProps> = ({ moments = [] }) => {
  return (
    <div className="p-5 pt-4 pb-0" aria-label="Suvarnakala Defining Moments Section">
      <div className="custom-heading-wrapper d-flex align-items-center mb-4">
        <h2 className="m-0 custom-heading text-wrap me-3">
          <span className='fraunces'>
            Suvarnakala’s Defining <span className="text-red fraunces">Moments : </span>
          </span>
          <div className="decorative-line">
            <div className="diamond"></div>
            <div className="line"></div>
            <div className="diamond"></div>
          </div>
        </h2>
        <span className="heading-extension fraunces">Elevate Your Look with the Latest Designs</span>
      </div>

      <div className="mt-4">
        {moments.length === 0 ? (
          <div className="text-center" role="alert">
            No moments available. Please check the admin panel or try again later.
          </div>
        ) : (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            arrows={false}
            containerClass="carousel-container"
            itemClass="px-2 pb-5"
            aria-live="polite"
          >
            {moments.map((moment, index) => {
              const mediaSource = moment.filePath || moment.imagePath;
              const isVideo = moment.mediaType === 'video';
              const title = moment.title || `Moment ${index + 1}`;

              return (
                <div
                  className="card border-0 shadow-sm moment-card"
                  key={moment._id}
                  role="group"
                  aria-label={`Moment ${index + 1}: ${title}`}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '60%',
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                  >
                    {isVideo ? (
                      <video
                        src={
                          mediaSource
                            ? `${BASE_URL}/${mediaSource}`
                            : 'https://via.placeholder.com/300x180?text=No+Video'
                        }
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        aria-label={`Suvarnakala Defining Moment ${index + 1} - ${title}`}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Video';
                        }}
                      />
                    ) : (
                      <Image
                        src={
                          mediaSource
                            ? `${BASE_URL}/${mediaSource}`
                            : 'https://via.placeholder.com/300x180?text=No+Image'
                        }
                        alt={`Suvarnakala Defining Moment ${index + 1} - ${title}`}
                        fill
                        sizes="(max-width: 576px) 100vw, 300px"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/300x180?text=No+Image';
                        }}
                      />
                    )}
                    <div
                      className="moment-overlay"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(14, 13, 13, 0.3)',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none',
                        zIndex: 10,
                      }}
                    >
                      <span
                        className="moment-title"
                        style={{
                          color: '#ffffff',
                          fontSize: '1.3rem',
                          fontWeight: '500',
                          textAlign: 'center',
                          padding: '0.5rem 1rem',
                          textTransform: 'capitalize',
                          letterSpacing: '1px',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      >
                        {title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap');

        .moment-card {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
        }

        .moment-card:hover .moment-overlay {
          opacity: 1 !important;
        }

        .moment-card:hover .moment-title {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default Moments;
