// components/Loader.tsx
import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // semi-transparent white
        // fade-in animation
      }}
    >
      <img
        src="/assets/Suvarnakala.png"
        alt="Suvarnakala Loading Logo"
        className="loading-logo"
        style={{
          maxWidth: '15%',
          maxHeight: '15%',
          objectFit: 'contain',
          animation: 'zoom 2s ease-in-out infinite',
        }}
        onError={(e) => {
          e.currentTarget.src = '/fallback-image.jpg'; // Fallback image
          console.error('Failed to load Suvarnakala.png, using fallback image');
        }}
      />
    </div>
  );
};

export default Loader;
