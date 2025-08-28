"use client";

import React from "react";

const VideoSection: React.FC = () => {
  return (
    <div
      style={{
        width: "auto",
        padding: 0,
        boxSizing: "border-box",
      }}
      className="rounded-0  "
    >
      <video
        className="video"
        style={{
          backgroundColor: "#000",
          display: "block",
          width: "100%",
          height: "600px",
          maxHeight: "500px",
          objectFit: "cover",
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/1724486881975.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <style jsx>
        {`
          @media (max-width: 767px) {
            .video {
              height: 230px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default VideoSection;
