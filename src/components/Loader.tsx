import React from "react";

const Loader = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff9f3",
        }}
      >
        <img
          src="/assets/Suvarnakala.png"
          alt="Suvarnakala Loading Logo"
          className="loading-logo"
          style={{
            maxWidth: "250px",
            maxHeight: "250px",
            objectFit: "contain",
            animation: "zoom 2s ease-in-out infinite",
          }}
          onError={(e) => {
            e.currentTarget.src = "/fallback-image.jpg";
            console.error("Failed to load Suvarnakala.png, using fallback image");
          }}
        />
      </div>
      <style jsx>
        {`
          .loading-logo {
            animation: zoom 3s ease-in-out infinite;
          }

          @keyframes zoom {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }
        `}
      </style>
    </>
  );
};

export default Loader;
