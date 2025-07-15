'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { FaWhatsapp, FaTwitter, FaFacebook, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { getNavbar, getProducts } from '../lib/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Goldrate from './GoldRate';
import logo from '../../public/assets/Suvarnakala.png';
import Image1 from '../../public/assets/category1.jpg';
import Image2 from '../../public/assets/category2.jpg';
import Image3 from '../../public/assets/category3.jpg';
import Image4 from '../../public/assets/category4.jpg';

interface NavLink {
  _id: string;
  name: string;
  path: string;
  show: boolean;
}

interface Product {
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  purity: string;
  occasion: string;
  jewelleryType: string;
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showCollectionsDropdown, setShowCollectionsDropdown] = useState(false);
  const [showInvestmentDropdown, setShowInvestmentDropdown] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const desiredOrder = [
    'Home',
    'About Us',
    'Collections',
    'Why Us',
    'Our Showrooms',
    'Investment', // Ensure Investment is in the desired order
    'Events',
    'Contact Us',
    'Book an Appointment',
  ];

  const investmentLinks = [
    { name: 'Digi-Gold', path: '/investment/digi-gold' },
    { name: 'Book My Gold', path: '/investment/book-my-gold' },
    { name: 'Monthly Saving Scheme', path: '/investment/monthly-saving-scheme' },
  ];

  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const data = await getNavbar();
        // Filter out Investment from API data to avoid duplication
        const filteredLinks = data.filter((link: NavLink) => link.name !== 'Investment');
        const sortedLinks = filteredLinks.sort((a: NavLink, b: NavLink) => {
          const aIndex = desiredOrder.indexOf(a.name);
          const bIndex = desiredOrder.indexOf(b.name);
          return (
            (aIndex === -1 ? desiredOrder.length : aIndex) -
            (bIndex === -1 ? desiredOrder.length : bIndex)
          );
        });
        setNavLinks(sortedLinks);
      } catch (error) {
        console.error('Error fetching navbar data:', error);
        setNavLinks([]);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchNavLinks();
    fetchProducts();

    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleToggle = () => setExpanded((prev) => !prev);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (dropdown === 'Collections') {
      setShowCollectionsDropdown(true);
    } else if (dropdown === 'Investment') {
      setShowInvestmentDropdown(true);
    }
  };

  const handleMouseLeave = (dropdown: string) => {
    dropdownTimeoutRef.current = setTimeout(() => {
      if (dropdown === 'Collections') {
        setShowCollectionsDropdown(false);
      } else if (dropdown === 'Investment') {
        setShowInvestmentDropdown(false);
      }
    }, 200);
  };

  const categories = Array.from(new Set(products.map((p) => p.category.name))).sort();
  const jewelleryTypes = Array.from(new Set(products.map((p) => p.jewelleryType))).sort();
  const occasions = Array.from(new Set(products.map((p) => p.occasion))).sort();
  const purities = Array.from(new Set(products.map((p) => p.purity))).sort();

  return (
    <>
      <Goldrate />
      <ToastContainer />

      <Navbar expand="lg" expanded={expanded} className="custom-navbar shadow-sm" sticky="top">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <div className="header-logo">
            <Link href="/" passHref legacyBehavior={false}>
              <Navbar.Brand onClick={() => setExpanded(false)} style={{ cursor: 'pointer' }}>
                <Image src={logo} alt="Suvarnakala Logo" width={150} height={60} />
              </Navbar.Brand>
            </Link>
          </div>

          <Navbar.Toggle as="div" className="custom-toggler d-lg-none" onClick={handleToggle}>
            {expanded ? (
              <FaTimes size={24} color="#D41B1F" />
            ) : (
              <FaBars size={24} color="#D41B1F" />
            )}
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="gap-3 text-center flex-column flex-lg-row align-items-center">
              {desiredOrder.map((name, index) => {
                if (name === 'Investment') {
                  // Static Investment navlink
                  return (
                    <div
                      key={`investment-${index}`}
                      className="nav-item position-relative"
                      onMouseEnter={() => handleMouseEnter('Investment')}
                      onMouseLeave={() => handleMouseLeave('Investment')}
                    >
                      <Link
                        href="/investment"
                        passHref
                        legacyBehavior={false}
                        className="custom-nav-link navlinks-hover"
                        style={{ textDecoration: 'none' }}
                        onClick={() => setExpanded(false)}
                      >
                        <Nav.Link
                          as="span"
                          className={`navlinks-hover ${
                            pathname.startsWith('/investment') ? 'active-link' : ''
                          }`}
                        >
                          Investment
                        </Nav.Link>
                      </Link>
                      <div
                        className={`dropdown-menu-full ${showInvestmentDropdown ? 'show' : ''}`}
                        onMouseEnter={() => handleMouseEnter('Investment')}
                        onMouseLeave={() => handleMouseLeave('Investment')}
                      >
                        <div className="dropdown-content">
                          <div className="dropdown-left">
                            <div className="dropdown-section">
                              <h6 className="lora">Investment Options</h6>
                              <ul className="mt-1">
                                {investmentLinks.map((link) => (
                                  <li key={link.name}>
                                    <Link
                                      href={link.path}
                                      className="lora link-hover-red text-gray text-decoration-none"
                                      onClick={() => {
                                        setShowInvestmentDropdown(false);
                                        setExpanded(false);
                                      }}
                                    >
                                      {link.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Dynamic navlinks from API
                const navLink = navLinks.find((link) => link.name === name);
                if (!navLink) return null;

                const isBookAppointment = name === 'Book an Appointment';
                const isCollections = name === 'Collections';
                const isActive = !isBookAppointment && !isCollections
                  ? pathname === navLink.path || pathname.startsWith(navLink.path + '/')
                  : false;

                return (
                  <div
                    key={navLink._id}
                    className="nav-item position-relative"
                    onMouseEnter={isCollections ? () => handleMouseEnter('Collections') : undefined}
                    onMouseLeave={isCollections ? () => handleMouseLeave('Collections') : undefined}
                  >
                    <Link
                      href={navLink.path}
                      passHref
                      legacyBehavior={false}
                      className="custom-nav-link navlinks-hover"
                      onClick={(e) => {
                        if (isBookAppointment) {
                          e.preventDefault();
                          handleShowModal();
                        }
                        setExpanded(false);
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      <Nav.Link
                        as="span"
                        className={`navlinks-hover ${isActive ? 'active-link' : ''}`}
                      >
                        {navLink.name}
                      </Nav.Link>
                    </Link>
                    {isCollections && (
                      <div
                        className={`dropdown-menu-full ${showCollectionsDropdown ? 'show' : ''}`}
                        onMouseEnter={() => handleMouseEnter('Collections')}
                        onMouseLeave={() => handleMouseLeave('Collections')}
                      >
                        <div className="dropdown-content">
                          <div className="dropdown-left">
                            <div className="dropdown-section">
                              <h6 className="lora">Shop By Category</h6>
                              <ul className="mt-1">
                                {categories.map((category) => (
                                  <li key={category}>
                                    <Link
                                      href={`/collections/products/${category}`}
                                      className="lora link-hover-red text-gray text-decoration-none"
                                      onClick={() => {
                                        setShowCollectionsDropdown(false);
                                        setExpanded(false);
                                      }}
                                    >
                                      {category}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="dropdown-section">
                              <h6 className="lora">Shop By Jewellery</h6>
                              <ul className="mt-1">
                                {jewelleryTypes.map((type) => (
                                  <li key={type}>
                                    <Link
                                      href={`/collections/jewelleryType/${type}`}
                                      className="lora link-hover-red text-gray text-decoration-none"
                                      onClick={() => {
                                        setShowCollectionsDropdown(false);
                                        setExpanded(false);
                                      }}
                                    >
                                      {type}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="dropdown-section">
                              <h6 className="lora">Shop By Occasion</h6>
                              <ul className="mt-1">
                                {occasions.map((occasion) => (
                                  <li key={occasion}>
                                    <Link
                                      href={`/collections/occasion/${occasion}`}
                                      className="lora link-hover-red text-gray text-decoration-none"
                                      onClick={() => {
                                        setShowCollectionsDropdown(false);
                                        setExpanded(false);
                                      }}
                                    >
                                      {occasion}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="dropdown-section">
                              <h6 className="lora">Shop By Purity</h6>
                              <ul className="mt-1">
                                {purities.map((purity) => (
                                  <li key={purity}>
                                    <Link
                                      href={`/collections/purity/${purity}`}
                                      className="lora link-hover-red text-gray text-decoration-none"
                                      onClick={() => {
                                        setShowCollectionsDropdown(false);
                                        setExpanded(false);
                                      }}
                                    >
                                      {purity}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="dropdown-right">
                            <div className="image-grid">
                              {[Image1, Image2, Image3, Image4].map((img, index) => (
                                <Image
                                  key={index}
                                  src={img}
                                  alt={`Image ${index + 1}`}
                                  width={140}
                                  height={140}
                                  style={{ objectFit: 'cover' }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </Nav>
          </Navbar.Collapse>

          <div className="d-none d-lg-flex align-items-center gap-3 social-icons">
            <Nav.Link href="https://wa.me/your-number" target="_blank">
              <FaWhatsapp />
            </Nav.Link>
            <Nav.Link href="https://twitter.com/your-profile" target="_blank">
              <FaTwitter />
            </Nav.Link>
            <Nav.Link href="https://facebook.com/your-profile" target="_blank">
              <FaFacebook />
            </Nav.Link>
            <Nav.Link href="https://instagram.com/your-profile" target="_blank">
              <FaInstagram />
            </Nav.Link>
          </div>
        </Container>
      </Navbar>
      
      <style jsx>{`
        .custom-navbar {
          background-color: #fff;
          padding: 10px 0;
        }
        .custom-nav-link {
          color: #333;
          font-weight: 500;
          text-decoration: none;
          position: relative;
        }
        .custom-nav-link:hover {
          color: #d41b1f !important;
        }
        .social-icons a {
          color: #333;
          font-size: 20px;
        }
        .social-icons a:hover {
          color: #d41b1f;
        }
        .custom-toggler {
          border: none;
        }
        .active-link {
          font-weight: 600;
        }
        .nav-item {
          position: relative;
        }
        .image-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .dropdown-menu-full {
          display: none;
          position: absolute;
          top: 100%;
          left: 103%;
          transform: translateX(-50%);
          width: 100vw;
          background-color: #fff9f3;
          z-index: 1000;
          padding: 20px;
          box-sizing: border-box;
          margin-top: 18px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, visibility 0.2s ease;
        }
        .dropdown-menu-full.show {
          display: block;
          opacity: 1;
          visibility: visible;
        }
        .dropdown-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .dropdown-left {
          flex: 3;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 20px;
          text-align: left;
        }
        .dropdown-section {
          display: flex;
          flex-direction: column;
        }
        .dropdown-section h6 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
          text-align: left;
        }
        .dropdown-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .dropdown-section li {
          margin-bottom: 8px;
          text-align: left;
        }
        .dropdown-section a {
          color: #333;
          text-decoration: none;
          text-align: left;
        }
        .dropdown-section a:hover {
          color: #d41b1f;
        }
        .dropdown-right {
          flex: 1;
          margin-left: 20px;
          max-width: 300px;
        }
        .dropdown-right img {
          width: 100%;
          height: auto;
          max-height: 400px;
          border-radius: 0;
          box-shadow: none;
          object-fit: cover;
        }
        @media (max-width: 991px) {
          .dropdown-menu-full {
            display: none;
          }
          .dropdown-left {
            grid-template-columns: 1fr;
          }
          .dropdown-right {
            display: none;
          }
        }
        @media (min-width: 992px) {
          .dropdown-menu-full {
            min-width: 800px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;