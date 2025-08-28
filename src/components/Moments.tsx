"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BASE_URL } from "../lib/api";

interface Moment {
  _id: string;
  filePath?: string;
  imagePath?: string;
  mediaType?: "image" | "video";
  createdAt: string;
  title?: string;
}

interface MomentsProps {
  moments: Moment[];
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1441 }, items: 3 },
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1023, min: 768 }, items: 3 },
  smallTablet: { breakpoint: { max: 767, min: 576 }, items: 2 },
  mobile: { breakpoint: { max: 575, min: 0 }, items: 1 },
};

const Moments: React.FC<MomentsProps> = ({ moments = [] }) => {
  return (
    <div className="p-5 pt-4 pb-0" aria-label="Suvarnakala Defining Moments Section">
      <div className="custom-heading-wrapper d-flex align-items-center mb-4">
        <h2 className="m-0 custom-heading text-wrap me-3">
          <span className="fraunces">
            Suvarnakala’s Defining <span className="text-red fraunces">Moments : </span>
          </span>
          <div className="decorative-line">
            <div className="diamond"></div>
            <div className="line"></div>
            <div className="diamond"></div>
          </div>
        </h2>
        <span className="heading-extension fraunces">
          Elevate Your Look with the Latest Designs
        </span>
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
              const isVideo = moment.mediaType === "video";
              const title = moment.title || `Moment ${index + 1}`;

              return (
                <div
                  className="card border-0 shadow-sm moment-card"
                  key={moment._id}
                  role="group"
                  aria-label={`Moment ${index + 1}: ${title}`}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      {isVideo ? (
                        <video
                          src={
                            mediaSource
                              ? `${BASE_URL}/${mediaSource}`
                              : "https://via.placeholder.com/300x180?text=No+Video"
                          }
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                          aria-label={`Suvarnakala Defining Moment ${index + 1} - ${title}`}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/300x180?text=No+Video";
                          }}
                        />
                      ) : (
                        <Image
                          src={
                            mediaSource
                              ? `${BASE_URL}/${mediaSource}`
                              : "https://via.placeholder.com/300x180?text=No+Image"
                          }
                          alt={`Suvarnakala Defining Moment ${index + 1} - ${title}`}
                          fill
                          sizes="(max-width: 576px) 100vw, 300px"
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/300x180?text=No+Image";
                          }}
                        />
                      )}
                    </div>
                    <div className="flip-card-back">
                      <span
                        className="moment-title text-dark heading-extension fraunces"
                        style={{
                          fontSize: "1.4rem",
                          textAlign: "center",
                          padding: "0.5rem 1rem",
                          textTransform: "capitalize",
                          letterSpacing: "1px",
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
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap");

        .moment-card {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          padding-top: 60%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .moment-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 8px;
        }

        .flip-card-front {
          z-index: 2;
        }

        .flip-card-back {
          background: #fff9f3;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotateY(180deg);
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default Moments;
