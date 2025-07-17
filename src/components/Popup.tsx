'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import popupImage from '../../public/assets/offers.png';
import androidApp from '../../public/assets/googleplay.png';
import iosApp from '../../public/assets/appstore.png';

export default function Popup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem('popupShown');
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShow(true);
        sessionStorage.setItem('popupShown', 'true');
      }, 1000); // 10-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        contentClassName="border-0"
        dialogClassName="rounded-3 overflow-hidden"
        className="full-box "
      >
        <div className="d-flex flex-column  flex-md-row popup">
          {/* Close Icon */}
          <button
            onClick={handleClose}
            className="btn-close btn-close-dark position-absolute"
            style={{ top: '12px', right: '12px', zIndex: 1 }}
            aria-label="Close"
          ></button>

          {/* Left Side Image */}
          <div className="col-12 col-md-6 p-0">
            <Image
              src={popupImage}
              alt="Suvarnakala Welcome"
              className="popup-image"
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '200px' }}
            />
          </div>

          {/* Right Side Content */}
          <div className="col-12 col-md-6 bg-white text-dark p-3 p-md-4 d-flex flex-column position-relative">
            {/* Content */}
            <div className="d-flex flex-column justify-content-between flex-grow-1">
              <div>
                <h2 className="mb-2 mt-3 mt-md-4 fraunces">Login to avail Offers</h2>
                <h6 className="mt-3 lora">🎁 Exclusive Deals Await!</h6>
                <p className="mt-3 mb-2 lora">Get ₹1,000 off after signup</p>
                <p className="lora">Get started by registering on the app</p>
                <div className="mt-3 mt-md-4">
                  <div className="d-flex flex-column flex-sm-row justify-content-start justify-content-sm-start gap-2 gap-sm-3">
                    <a
                      href="https://play.google.com/store"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={androidApp}
                        alt="Android App"
                        width={135}
                        height={40}
                        style={{ width: '100%', height: 'auto', maxWidth: '135px' }}
                      />
                    </a>
                    <a
                      href="https://www.apple.com/in/app-store/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={iosApp}
                        alt="iOS App"
                        width={135}
                        height={40}
                        style={{ width: '100%', height: 'auto', maxWidth: '135px' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .modal-dialog {
          max-width: 900px;
          width: 90%;
          margin: 1rem auto;
        }

        .modal-content {
          border-radius: 8px !important;
          overflow: hidden;
        }

        /* Extra Small Screens (below 576px) */
        @media (max-width: 575.98px) {
          .modal-dialog {
            margin: 0.5rem;
            width: 95%;
          }
          h2 {
            font-size: 1.25rem;
          }
          h6 {
            font-size: 0.9rem;
          }
          p {
            font-size: 0.8rem;
            line-height: 1.3;
          }
          .bg-dark {
            padding: 1.5rem !important;
          }
          .d-flex.gap-2.gap-sm-3 {
            flex-direction: row !important;
            align-items: center;
            gap: 1rem !important;
          }
          .d-flex.gap-2.gap-sm-3 a {
            width: 100%;
            max-width: 120px;
          }
          .d-flex.gap-2.gap-sm-3 img {
            width: 100% !important;
            height: auto !important;
          }
        }

        /* Small Screens (576px and up) */
        @media (min-width: 576px) and (max-width: 767.98px) {
          .modal-dialog {
            width: 80%;
          }
          h2 {
            font-size: 1.5rem;
          }
          h6 {
            font-size: 1rem;
          }
          p {
            font-size: 0.9rem;
            line-height: 1.4;
          }
          .d-flex.gap-2.gap-sm-3 {
            flex-direction: row !important;
            justify-content: center;
            gap: 1.5rem !important;
          }
          .d-flex.gap-2.gap-sm-3 a {
            max-width: 130px;
          }
        }

        /* Medium Screens (768px and up) */
        @media (min-width: 768px) {
          .modal-dialog {
            width: 85%;
          }
          h2 {
            font-size: 1.75rem;
          }
          h6 {
            font-size: 1.1rem;
          }
          p {
            font-size: 1rem;
            line-height: 1.5;
          }
          .d-flex.gap-2.gap-sm-3 {
            flex-direction: row;
            justify-content: start;
            gap: 1.5rem !important;
          }
        }

        /* Large Screens (992px and up) */
        @media (min-width: 992px) {
          .modal-dialog {
            width: 80%;
            max-width: 900px;
          }
          h2 {
            font-size: 2rem;
          }
          .bg-dark {
            padding: 2rem !important;
          }
        }
      `}</style>
    </>
  );
}
