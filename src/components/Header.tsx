'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Navbar, Nav, Container } from 'react-bootstrap';


import 'react-toastify/dist/ReactToastify.css';
import Goldrate from './GoldRate';
import { ToastContainer } from 'react-toastify';
import { getNavbar, getProducts } from '../lib/api';
import logo from '../../public/assets/Suvarnakala.png';
import Image1 from '../../public/assets/category1.jpg';
import Image2 from '../../public/assets/category2.jpg';
import Image3 from '../../public/assets/category3.jpg';
import Image4 from '../../public/assets/category1.jpg';
import digiGoldIcon from '../../public/assets/icons/gold.png';
import bookMyGoldIcon from '../../public/assets/icons/coin.png';
import monthlySavingIcon from '../../public/assets/icons/money.png';
import instagramIcon from '../../public/assets/icons/Instagram.svg';
import whatsappIcon from '../../public/assets/icons/whatsapp.svg';
import twitterIcon from '../../public/assets/icons/twitter.svg';
import facebookIcon from '../../public/assets/icons/facebook.svg';

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
  const [showMobileInvestment, setShowMobileInvestment] = useState(false);
  const [showMobileCollections, setShowMobileCollections] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const desiredOrder = ['Home', 'About Us', 'Collections', 'Why Us', 'Investment', 'Our Showrooms'];

  const investmentLinks = [
    { name: 'Digi-Gold', path: '/digi-gold', icon: digiGoldIcon },
    { name: 'Book My Gold', path: '/book-my-gold', icon: bookMyGoldIcon },
    { name: 'Monthly Saving Scheme', path: '/monthly-saving-scheme', icon: monthlySavingIcon },
  ];

  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const data = await getNavbar();
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
    setExpanded(false);
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

  const handleMobileInvestmentToggle = () => {
    setShowMobileInvestment((prev) => !prev);
  };

  const handleMobileCollectionsToggle = () => {
    setShowMobileCollections((prev) => !prev);
  };

  const categories = Array.from(new Set(products.map((p) => p.category.name))).sort();
  const jewelleryTypes = Array.from(new Set(products.map((p) => p.jewelleryType))).sort();
  const occasions = Array.from(new Set(products.map((p) => p.occasion))).sort();
  const purities = Array.from(new Set(products.map((p) => p.purity))).sort();

  // Check if current path is an investment sub-page
  const isInvestmentActive = investmentLinks.some((link) => pathname.startsWith(link.path));

  return (
    <>
      <Goldrate />
      <ToastContainer />

      <Navbar expand="lg" className="custom-navbar  bg-color shadow-sm" sticky="top">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <div className="header-logo">
            <Link href="/" passHref legacyBehavior={false}>
              <Navbar.Brand onClick={() => setExpanded(false)} style={{ cursor: 'pointer' }}>
                <Image src={logo} alt="Suvarnakala Logo" width={150} height={60} />
              </Navbar.Brand>
            </Link>
          </div>
          <div className="d-lg-none" onClick={handleToggle}>
            <div className={`burger-toggle ${expanded ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu  ${expanded ? 'show' : ''}`}>
            <div className="mobile-menu-header ">
              <Link href="/" onClick={() => setExpanded(false)}>
                <Image src={logo} alt="Suvarnakala Logo" width={120} height={48} />
              </Link>
              <div className="d-lg-none" onClick={handleToggle}>
                <div className={`burger-toggle ${expanded ? 'active' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <Nav className="mobile-nav flex-column">
              {desiredOrder.map((name, index) => {
                if (name === 'Investment') {
                  const isInvestmentActive = investmentLinks.some((link) =>
                    pathname.startsWith(link.path),
                  );
                  return (
                    <div key={`investment-${index}`} className="mobile-nav-item ">
                      <div
                        className={`mobile-nav-link lora ${isInvestmentActive ? 'active' : ''}`}
                        onClick={handleMobileInvestmentToggle}
                        style={{ cursor: 'pointer' }}
                      >
                        Investment
                        <span className="dropdown-arrow ms-2">
                          <i
                            className={`bi ${showMobileInvestment ? 'bi-caret-up' : 'bi-caret-down'}`}
                          ></i>
                        </span>
                      </div>
                      {showMobileInvestment && (
                        <div className="mobile-submenu">
                          {investmentLinks.map((link) => (
                            <Link
                              href={link.path}
                              key={link.name}
                              className={`mobile-submenu-item ${pathname === link.path ? 'active' : ''}`}
                              onClick={() => {
                                setShowMobileInvestment(false);
                                setExpanded(false);
                              }}
                            >
                              <Image
                                src={link.icon}
                                alt={link.name}
                                width={24}
                                height={24}
                                className="me-2"
                              />
                              <span className="lora ">{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (name === 'Collections') {
                  const isCollectionsActive = pathname.startsWith('/collections');
                  return (
                    <div key={`collections-${index}`} className="mobile-nav-item">
                      <Link
                        href="/collections"
                        className={`mobile-nav-link lora ${isCollectionsActive ? 'active' : ''}`}
                        onClick={(e) => {
                          if (pathname === '/collections' && showMobileCollections) {
                            e.preventDefault();
                            handleMobileCollectionsToggle();
                          } else if (pathname !== '/collections') {
                            setExpanded(false);
                          }
                        }}
                      >
                        Collections
                        <span
                          className="dropdown-arrow ms-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMobileCollectionsToggle();
                          }}
                        >
                          <i
                            className={`bi ${showMobileCollections ? 'bi-caret-up' : 'bi-caret-down'}`}
                          ></i>
                        </span>
                      </Link>
                      {showMobileCollections && (
                        <div className="mobile-submenu">
                          <div className="mobile-submenu-section">
                            <h6 className="lora">Shop By Category</h6>
                            {categories.map((category) => (
                              <Link
                                href={`/collections/products/${category}`}
                                key={category}
                                className="mobile-submenu-item"
                                onClick={() => {
                                  setShowMobileCollections(false);
                                  setExpanded(false);
                                }}
                              >
                                <span className="lora">{category}</span>
                              </Link>
                            ))}
                          </div>
                          <div className="mobile-submenu-section">
                            <h6 className="lora">Shop By Jewellery</h6>
                            {jewelleryTypes.map((type) => (
                              <Link
                                href={`/collections/jewelleryType/${type}`}
                                key={type}
                                className="mobile-submenu-item"
                                onClick={() => {
                                  setShowMobileCollections(false);
                                  setExpanded(false);
                                }}
                              >
                                <span className="lora">{type}</span>
                              </Link>
                            ))}
                          </div>
                          <div className="mobile-submenu-section">
                            <h6 className="lora">Shop By Occasion</h6>
                            {occasions.map((occasion) => (
                              <Link
                                href={`/collections/occasion/${occasion}`}
                                key={occasion}
                                className="mobile-submenu-item"
                                onClick={() => {
                                  setShowMobileCollections(false);
                                  setExpanded(false);
                                }}
                              >
                                <span className="lora">{occasion}</span>
                              </Link>
                            ))}
                          </div>
                          <div className="mobile-submenu-section">
                            <h6 className="lora">Shop By Purity</h6>
                            {purities.map((purity) => (
                              <Link
                                href={`/collections/purity/${purity}`}
                                key={purity}
                                className="mobile-submenu-item"
                                onClick={() => {
                                  setShowMobileCollections(false);
                                  setExpanded(false);
                                }}
                              >
                                <span className="lora">{purity}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                const navLink = navLinks.find((link) => link.name === name);
                if (!navLink) return null;

                const isBookAppointment = name === 'Book an Appointment';
                const isCollections = name === 'Collections'; // <-- This line was missing or misplaced
                const isActive =
                  !isBookAppointment && !isCollections
                    ? pathname === navLink.path || pathname.startsWith(navLink.path + '/')
                    : false;

                return (
                  <div key={navLink._id} className="mobile-nav-item">
                    <Link
                      href={navLink.path}
                      className={`mobile-nav-link lora ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        if (isBookAppointment) {
                          e.preventDefault();
                          handleShowModal();
                        } else {
                          setExpanded(false);
                        }
                      }}
                    >
                      {navLink.name}
                    </Link>
                  </div>
                );
              })}
              {/* Mobile Social Icons */}
              <div className="mobile-social-icons">
                <Nav.Link href="https://wa.me/your-number" target="_blank">
                  <Image
                    src={whatsappIcon}
                    alt="WhatsApp"
                    className="rounded-5"
                    width={32}
                    height={32}
                  />
                </Nav.Link>

                <Nav.Link href="https://twitter.com/your-profile" target="_blank">
                  <Image src={twitterIcon} alt="Twitter" width={38} height={38} />
                </Nav.Link>

                <Nav.Link href="https://instagram.com/your-profile" target="_blank">
                  <Image
                    src={instagramIcon}
                    className="rounded-5"
                    alt="Instagram"
                    width={31}
                    height={31}
                  />
                </Nav.Link>
                <Nav.Link href="https://facebook.com/your-profile" target="_blank">
                  <Image src={facebookIcon} alt="Facebook" width={35} height={35} />
                </Nav.Link>
              </div>
            </Nav>
          </div>

          {/* Desktop Navbar */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center d-none d-lg-flex"
          >
            <Nav className="gap-3 text-center flex-row align-items-center">
              {desiredOrder.map((name, index) => {
                if (name === 'Investment') {
                  return (
                    <div
                      key={`investment-${index}`}
                      className="nav-item position-relative"
                      onMouseEnter={() => handleMouseEnter('Investment')}
                      onMouseLeave={() => handleMouseLeave('Investment')}
                    >
                      <Nav.Link
                        as="span"
                        className={`navlinks-hover custom-nav-link lora ${isInvestmentActive ? 'active-link' : ''}`}
                        onClick={() => setShowInvestmentDropdown(true)}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        Investment
                      </Nav.Link>
                      <div
                        className={`dropdown-menu-full-investment ${showInvestmentDropdown ? 'show' : ''}`}
                        onMouseEnter={() => handleMouseEnter('Investment')}
                        onMouseLeave={() => handleMouseLeave('Investment')}
                      >
                        <div className="dropdown-content-investment">
                          <div className="dropdown-left-investment">
                            <div className="dropdown-section-investment">
                              <div className="d-flex justify-content-center gap-4 flex-wrap">
                                {investmentLinks.map((link) => (
                                  <Link
                                    href={link.path}
                                    key={link.name}
                                    className="text-decoration-none "
                                    onClick={() => {
                                      setShowInvestmentDropdown(false);
                                      setExpanded(false);
                                    }}
                                  >
                                    <div className="investment-card d-flex align-items-center p-3 hover-card">
                                      <div className="icon-circle bg-red d-flex align-items-center justify-content-center me-3">
                                        <Image
                                          src={link.icon}
                                          alt={link.name}
                                          width={34}
                                          height={34}
                                        />
                                      </div>
                                      <h6 className="mb-0 text-gray  lora">{link.name}</h6>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                const navLink = navLinks.find((link) => link.name === name);
                if (!navLink) return null;

                const isBookAppointment = name === 'Book an Appointment';
                const isCollections = name === 'Collections';
                const isActive =
                  !isBookAppointment && !isCollections
                    ? pathname === navLink.path || pathname.startsWith(navLink.path + '/')
                    : isCollections && pathname.startsWith('/collections');

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
                        className={` custom-nav-link navlinks-hover lora ${isActive ? 'active-link' : ''}`}
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

          <div className="d-none d-lg-flex align-items-center gap-2 social-icons">
            <Nav.Link href="https://wa.me/your-number" target="_blank">
              <Image
                src={whatsappIcon}
                alt="WhatsApp"
                className="rounded-5"
                width={32}
                height={32}
              />
            </Nav.Link>

            <Nav.Link href="https://twitter.com/your-profile" target="_blank">
              <Image src={twitterIcon} alt="Twitter" width={38} height={38} />
            </Nav.Link>

            <Nav.Link href="https://instagram.com/your-profile" target="_blank">
              <Image
                src={instagramIcon}
                className="rounded-5"
                alt="Instagram"
                width={31}
                height={31}
              />
            </Nav.Link>
            <Nav.Link href="https://facebook.com/your-profile" target="_blank">
              <Image src={facebookIcon} alt="Facebook" width={35} height={35} />
            </Nav.Link>
          </div>
        </Container>
      </Navbar>

      <style>{`



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
          color: #d41b1f !important;
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
        .dropdown-menu-full-investment {
          display: none;
          position: absolute;
          top: 100%;
          left: -67%;
          transform: translateX(-50%);
          width: 98.97vw;
          height: 300px;
          background-color: #fff9f3;
          z-index: 1000;
          padding: 20px;
          box-sizing: border-box;
          margin-top: 18px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, visibility 0.2s ease;
        }
        .dropdown-menu-full-investment.show {
          display: block;
          opacity: 1;
          visibility: visible;
        }
        .dropdown-content-investment {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .dropdown-left-investment {
          flex: 3;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 20px;
          text-align: left;
        }
        .dropdown-section-investment ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .investment-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1000px;
          margin: 50px auto;
          perspective: 1000px;
        }
        .investment-card {
          position: relative;
          background: white;
          width: 300px;
          margin-top: 50px;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
          z-index: 1;
          border: 1px solid rgba(212, 27, 31, 0.1);
          transform-style: preserve-3d;
        }
        .investment-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(212, 27, 31, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        .investment-card:hover {
          box-shadow: 0 15px 30px rgba(212, 27, 31, 0.15);
          border-color: rgba(212, 27, 31, 0.3);
        }
        .investment-card:hover::before {
          opacity: 1;
        }
        .investment-card:nth-child(1) {
          border-top: 4px solid #d41b1f;
        }
        .card-content {
          transition: transform 0.4s ease;
        }
        .investment-card:hover .card-content {
          transform: translateY(-5px);
        }
        @media (max-width: 900px) {
          .investment-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
        .icon-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
        }
        .dropdown-menu-full {
          display: none;
          position: absolute;
          top: 100%;
          left: 131%;
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
        /* Mobile Menu Styles */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background-color: #fff9f3;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          transition: left 0.3s ease-in-out;
          overflow-y: auto;
          padding: 20px;
        }
        .mobile-menu.show {
          left: 0;
        }
        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          margin-bottom: 20px;
        }
        .mobile-nav {
          flex-direction: column;
          gap: 10px;
        }
        .mobile-nav-item {
          width: 100%;
        }
        .mobile-nav-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          color: #333;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background-color: #fff;
          color: #d41b1f;
        }
        .mobile-submenu {
          padding: 20px;
          background-color: #fff;
          border-left: 2px solid #d41b1f;
          margin: 5px 0;
        }
        .mobile-submenu-item {
          display: flex;
          align-items: center;
          padding: 10px 16px;
          color: #333;
          font-size: 14px;
          text-decoration: none;
        }
        .mobile-submenu-item:hover {
          color: #d41b1f;
          background-color: #fff9f3;
        }
        .mobile-submenu-section {
          margin: 10px 0;
        }
        .mobile-submenu-section h6 {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin: 10px 0;
        }
        .mobile-social-icons {
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 15px;
          padding: 20px 16px;
          border-top: 1px solid #eee;
          margin-top: 20px;
        }

        .dropdown-arrow {
          font-size: 12px;
          margin-left: 10px;
        }
        @media (min-width: 992px) {
          .mobile-menu {
            display: none;
          }
          .dropdown-menu-full {
            min-width: 800px;
          }
          .dropdown-menu-full-investment {
            min-width: 800px;
          }
        }
        @media (max-width: 991px) {
          .dropdown-menu-full {
            display: none;
          }
          .dropdown-menu-full-investment {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
