"use client";

import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getTestimonials } from "../lib/api";

interface Testimonial {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1441 }, items: 3 },
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1023, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        const activeTestimonials = data.filter((testimonial: Testimonial) => testimonial.isActive);
        setTestimonials(activeTestimonials);
      })
      .catch((err) => console.error("Failed to fetch testimonials:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className=" p-3 px-md-5 py-md-4  pb-4 pt-4"
      aria-label="Suvarnakala Customer Testimonials Section"
    >
      <div className="custom-heading-wrapper d-flex align-items-center mb-4">
        <h2 className="m-0 custom-heading text-wrap me-3">
          <span className="fraunces">
            Customer <span className="text-red fraunces">Stories :</span>
          </span>
          <div className="decorative-line">
            <div className="diamond"></div>
            <div className="line"></div>
            <div className="diamond"></div>
          </div>
        </h2>
        <span className="heading-extension fraunces">Stories Behind Every Sparkle</span>
      </div>

      {isLoading ? (
        <p className="text-center text-muted">Loading testimonials...</p>
      ) : testimonials && testimonials.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          arrows={false}
          containerClass="carousel-container"
          itemClass="px-1 pb-2 "
          aria-live="polite"
        >
          {testimonials.map((testimonial, index) => (
            <div
              className="testimonial-card p-4 rounded-4 shadow-sm bg-white position-relative d-flex flex-column h-100 w-100"
              role="group"
              aria-label={`Testimonial by ${testimonial.name}`}
            >
              {/* Quote icon */}


              {/* Testimonial text */}
              <p
                className="text-muted  mb-auto"
              >
                “{testimonial.description}”
              </p>

              {/* Author info at bottom */}
              <div className="pt-3 border-top mt-3 d-flex justify-content-end">
                <h6 className="m-0 fw-medium lora text-dark">- {testimonial.name}</h6>
              </div>

            </div>

          ))}
        </Carousel>
      ) : (
        <p className="text-center text-muted">No testimonials available at the moment.</p>
      )}
    </div>
  );
};

export default Testimonials;
