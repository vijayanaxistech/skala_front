"use client";

import React from "react";
import Head from "next/head"; // For SEO metadata
import Image from "next/image";
import logo from "../../public/assets/Suvarnakala.png";
import { Nav } from "react-bootstrap";

import googleplay from "../../public/assets/googleplay.png";
import appstore from "../../public/assets/appstore.png";
import leaf from "../../public/assets/Group 41992.png";
import Link from "next/link";
import instagramIcon from "../../public/assets/icons/Instagram.svg";
import whatsappIcon from "../../public/assets/icons/whatsapp.svg";
import pinterestIcon from "../../public/assets/icons/pinterest.svg";
import facebookIcon from "../../public/assets/icons/facebook.svg";
import phone from "../../public/assets/icons/phone.svg";
import mail from "../../public/assets/icons/gmail.svg";
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <>
      <div className=" pb-0">
        <footer className="bg-color pt-5 pb-3 footer" aria-label="Suvarnakala Footer">
          <div className="container">
            <div className="footer-sections">
              <div className="footer-logo-section">
                <Image
                  src={logo}
                  alt="Suvarnakala Jewelry Logo"
                  className="img-fluid mb-3"
                  width={200}
                  height={80}
                  loading="lazy"
                />
                <p
                  className="text-dark lora small footer-description"
                  style={{ fontSize: "15px", fontWeight: 400 }}
                >
                  We offer personalized jewelry experiences, crafted by skilled artisans dedicated
                  to quality and timeless elegance.
                </p>
                <div className="d-flex gap-2 mt-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.dsoft.suvarnakalajewellers&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={googleplay}
                      alt="Download Suvarnakala App on Google Play"
                      width={120}
                      height={40}
                      loading="lazy"
                    />
                  </a>

                  <a
                    href="https://apps.apple.com/in/app/suvarnakala/id6466986702"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={appstore}
                      alt="Download Suvarnakala App on App Store"
                      width={120}
                      height={40}
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>

              <div className="footer-links-section">
                <h6 className="fw-bold mb-3 text-uppercase lora footer-title">Useful Links</h6>
                <ul className="list-unstyled ">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About Us", href: "/about" },
                    { name: "Our Showrooms", href: "/our-showrooms" },
                    { name: "Disclaimer", href: "/disclaimer" },
                    { name: "Privacy Policy", href: "/privacy-policy" },
                  ].map((link, index) => (
                    <li key={index} className="mb-1">
                      <Link
                        href={link.href}
                        className="text-dark lora text-decoration-none link-hover-red footer-link "
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-contact-section">
                <h6 className="fw-bold mb-3 text-uppercase lora footer-title">Get In Touch</h6>
                <ul className="list-unstyled text-dark small">
                  <li className="mb-2 d-flex align-items-center">
                    <Image
                      src={phone}
                      alt="Mail"
                      width={25}
                      height={25}
                      className="me-2 icon-small"
                    />{" "}
                    <a
                      href="tel:+917874011144"
                      className="text-dark lora link-hover-red text-decoration-none"
                      style={{ fontSize: "15px", fontWeight: 200 }}
                    >
                      +91 7874011144
                    </a>
                  </li>
                  <li className="d-flex align-items-center">
                    <Image
                      src={mail}
                      alt="Mail"
                      width={25}
                      height={25}
                      className="me-2 icon-small"
                    />{" "}
                    <a
                      href="mailto:support@suvarnakala.com"
                      className="text-dark lora text-decoration-none link-hover-red"
                      style={{ fontSize: "16px", fontWeight: 200 }}
                    >
                      support@suvarnakala.com
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-social-section social-media">
                <h6 className="fw-bold mb-3 lora text-uppercase footer-title">Social Media</h6>
                <div className="footer-social-icons">
                  <Nav.Link href="https://wa.me/917874011144" target="_blank">
                    <Image
                      src={whatsappIcon}
                      alt="WhatsApp"
                      className="rounded-5"
                      width={32}
                      height={32}
                    />
                  </Nav.Link>

                  <Nav.Link href="https://www.instagram.com/suvarnakalajewellers" target="_blank">
                    <Image
                      src={instagramIcon}
                      className="rounded-5"
                      alt="Instagram"
                      width={31}
                      height={31}
                    />
                  </Nav.Link>
                  <Nav.Link href=" https://www.facebook.com/Suvarnakala" target="_blank">
                    <Image src={facebookIcon} alt="Facebook" width={35} height={35} />
                  </Nav.Link>
                  <Nav.Link href="https://pin.it/3Uf6q82Hq" target="_blank">
                    <Image src={pinterestIcon} alt="Pinterest" width={32} height={32} />
                  </Nav.Link>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center my-">
              <div className="flex-grow-1 border-top border-secondary"></div>
              <div className="px-3">
                <Image
                  src={leaf}
                  alt="Decorative Leaf Icon"
                  width={70}
                  height={70}
                  loading="lazy"
                />
              </div>
              <div className="flex-grow-1 border-top border-secondary"></div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center px-3 ">
              <p className="text-blue mb-1 fraunces mb-md-0">
                © {currentYear} Suvarnakala. All Rights Reserved.
              </p>
              <p className="mb-1 mb-md-0 text-blue fraunces">
                Design and Developed By{" "}
                <a
                  href="https://anaxistech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none fraunces fw-medium text-red"
                >
                  Anaxistech
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
