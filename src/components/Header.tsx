"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Navbar, Nav, Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Goldrate from "./GoldRate";
import { ToastContainer } from "react-toastify";
import { getNavbar, getProducts } from "../lib/api";
import logo from "../../public/assets/Suvarnakala.png";
import instagramIcon from "../../public/assets/icons/Instagram.svg";
import whatsappIcon from "../../public/assets/icons/whatsapp.svg";
import pinterestIcon from "../../public/assets/icons/pinterest.svg";
import facebookIcon from "../../public/assets/icons/facebook.svg";
import { slugify } from "../lib/slugify";

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
  collection: string;
  jewelleryType: string;
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showCollectionsDropdown, setShowCollectionsDropdown] = useState(false);
  const [showMobileCollections, setShowMobileCollections] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const desiredOrder = ["Home", "About Us", "Jewellery", "Why Us", "Our Showrooms", "Investment"];

  const jewelleryTypeOrder = ["Gold", "Diamond"];
  const collectionOrder = ["Kanyadaan","Shagun", "Sitara"  ];

  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const data = await getNavbar();
        const filteredLinks = data.filter((link: NavLink) => link.name !== "Investment");
        const sortedLinks = filteredLinks.sort((a: NavLink, b: NavLink) => {
          const aIndex = desiredOrder.indexOf(a.name);
          const bIndex = desiredOrder.indexOf(b.name);
          return (aIndex === -1 ? desiredOrder.length : aIndex) - (bIndex === -1 ? desiredOrder.length : bIndex);
        });
        setNavLinks(sortedLinks);
      } catch (error) {
        console.error("Error fetching navbar data:", error);
        setNavLinks([]);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
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

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setShowCollectionsDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowCollectionsDropdown(false);
    }, 200);
  };

  const handleMobileCollectionsToggle = () => {
    setShowMobileCollections((prev) => !prev);
  };

  const categories = Array.from(new Set(products.map((p) => p.category?.name))).filter(Boolean).sort();
  const sortedJewelleryTypes = Array.from(new Set(products.map((p) => p.jewelleryType))).filter(Boolean).sort((a, b) => {
    const aIndex = jewelleryTypeOrder.indexOf(a);
    const bIndex = jewelleryTypeOrder.indexOf(b);
    return (aIndex === -1 ? jewelleryTypeOrder.length : aIndex) - (bIndex === -1 ? jewelleryTypeOrder.length : bIndex);
  });
  const sortedCollections = Array.from(new Set(products.map((p) => p.collection))).filter(Boolean).sort((a, b) => {
    const aIndex = collectionOrder.indexOf(a);
    const bIndex = collectionOrder.indexOf(b);
    return (aIndex === -1 ? collectionOrder.length : aIndex) - (bIndex === -1 ? collectionOrder.length : bIndex);
  });
  const purities = Array.from(new Set(products.map((p) => p.purity))).filter(Boolean).sort();

  const getNavLinkPath = (name: string): string => {
    if (name === "Investment") return "/investment";
    const link = navLinks.find((l) => l.name === name);
    return link ? link.path : "#";
  };

  return (
    <>
      <Goldrate />
      <ToastContainer />

      <Navbar expand="lg" className="custom-navbar bg-color shadow-sm sticky-top">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <div className="header-logo">
            <Link href="/" passHref legacyBehavior={false}>
              <Navbar.Brand onClick={() => setExpanded(false)} style={{ cursor: "pointer" }}>
                <Image src={logo} alt="Suvarnakala Logo" width={150} height={60} />
              </Navbar.Brand>
            </Link>
          </div>
          <div className="d-lg-none" onClick={handleToggle}>
            <div className={`burger-toggle ${expanded ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${expanded ? "show" : ""}`}>
            <div className="mobile-menu-header">
              <Link href="/" onClick={() => setExpanded(false)}>
                <Image src={logo} alt="Suvarnakala Logo" width={120} height={48} />
              </Link>
              <div className="d-lg-none" onClick={handleToggle}>
                <div className={`burger-toggle ${expanded ? "active" : ""}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <Nav className="mobile-nav flex-column">
              {desiredOrder.map((name, index) => {
                if (name === "Jewellery") {
                  const isCollectionsActive = pathname.startsWith("/jewellery");
                  return (
                    <div key={`collections-${index}`} className="mobile-nav-item">
                      <Link
                        href="/jewellery"
                        className={`mobile-nav-link lora ${isCollectionsActive ? "active" : ""}`}
                        onClick={(e) => {
                          if (pathname === "/jewellery" && showMobileCollections) {
                            e.preventDefault();
                            handleMobileCollectionsToggle();
                          } else if (pathname !== "/jewellery") {
                            setExpanded(false);
                          }
                        }}
                      >
                        Jewellery
                        <span
                          className="dropdown-arrow ms-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMobileCollectionsToggle();
                          }}
                        >
                          <i className={`bi ${showMobileCollections ? "bi-caret-up" : "bi-caret-down"}`}></i>
                        </span>
                      </Link>
                      {showMobileCollections && (
                        <div className="mobile-submenu">
                          <div className="mobile-submenu-section">
                            <h6 className="lora">Shop By Category</h6>
                            {categories.map((category) => (
                              <Link
                                href={`/Jewellery/products/${slugify(category)}`}
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
                            {sortedJewelleryTypes.map((type) => (
                              <Link
                                href={`/Jewellery/jewelleryType/${slugify(type)}`}
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
                            <h6 className="lora">Shop By Collection</h6>
                            {sortedCollections.map((collection) => (
                              <Link
                                href={`/Jewellery/collection/${slugify(collection)}`}
                                key={collection}
                                className="mobile-submenu-item"
                                onClick={() => {
                                  setShowMobileCollections(false);
                                  setExpanded(false);
                                }}
                              >
                                <span className="lora">{collection}</span>
                              </Link>
                            ))}
                          </div>
                          <div className="mobile-submenu-section">
                            <h6 className="lora">Shop By Purity</h6>
                            {purities.map((purity) => (
                              <Link
                                href={`/Jewellery/purity/${slugify(purity)}`}
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

                const navLinkPath = getNavLinkPath(name);
                const isBookAppointment = name === "Book an Appointment";
                const isActive = isBookAppointment
                  ? false
                  : name === "Jewellery"
                  ? pathname.startsWith("/jewellery")
                  : pathname === navLinkPath || pathname.startsWith(navLinkPath + "/");

                return (
                  <div key={name} className="mobile-nav-item">
                    <Link
                      href={navLinkPath}
                      className={`mobile-nav-link lora ${isActive ? "active" : ""}`}
                      onClick={(e) => {
                        if (isBookAppointment) {
                          e.preventDefault();
                          handleShowModal();
                        } else {
                          setExpanded(false);
                        }
                      }}
                    >
                      {name}
                    </Link>
                  </div>
                );
              })}
              {/* Mobile Social Icons */}
              <div className="mobile-social-icons">
                <Nav.Link href="https://wa.me/917874011144" target="_blank">
                  <Image src={whatsappIcon} alt="WhatsApp" className="rounded-5" width={32} height={32} />
                </Nav.Link>

                <Nav.Link href="https://www.instagram.com/suvarnakalajewellers" target="_blank">
                  <Image src={instagramIcon} className="rounded-5" alt="Instagram" width={31} height={31} />
                </Nav.Link>
                <Nav.Link href=" https://www.facebook.com/Suvarnakala" target="_blank">
                  <Image src={facebookIcon} alt="Facebook" width={35} height={35} />
                </Nav.Link>
                <Nav.Link href="https://pin.it/3Uf6q82Hq" target="_blank">
                  <Image src={pinterestIcon} alt="Pinterest" width={32} height={32} />
                </Nav.Link>
              </div>
            </Nav>
          </div>

          {/* Desktop Navbar */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center d-none d-lg-flex">
            <Nav className="gap-3 text-center flex-row align-items-center">
              {desiredOrder.map((name, index) => {
                const navLinkPath = getNavLinkPath(name);
                const isBookAppointment = name === "Book an Appointment";
                const isCollections = name === "Jewellery";
                const isActive = isBookAppointment
                  ? false
                  : isCollections
                  ? pathname.startsWith("/jewellery")
                  : pathname === navLinkPath || pathname.startsWith(navLinkPath + "/");

                return (
                  <div key={name} className={`nav-item ${isCollections ? "nav-item-collections" : ""}`} onMouseEnter={isCollections ? handleMouseEnter : undefined} onMouseLeave={isCollections ? handleMouseLeave : undefined}>
                    <Link href={navLinkPath} passHref legacyBehavior={false} className="custom-nav-link navlinks-hover" onClick={(e) => {
                        if (isBookAppointment) {
                          e.preventDefault();
                          handleShowModal();
                        }
                        setExpanded(false);
                      }} style={{ textDecoration: "none" }}>
                      <Nav.Link as="span" className={`custom-nav-link navlinks-hover lora ${isActive ? "active-link" : ""}`}>
                        {name}
                      </Nav.Link>
                    </Link>
                    {isCollections && (
                      <div className={`dropdown-menu-full ${showCollectionsDropdown ? "show" : ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className="dropdown-content">
                          <div className="dropdown-section">
                            <h6 className="lora">Shop By Category</h6>
                            <ul className="mt-1">
                              {categories.map((category) => (
                                <li key={category}>
                                  <Link
                                    href={`/jewellery/products/${slugify(category)}`}
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
                              {sortedJewelleryTypes.map((type) => (
                                <li key={type}>
                                  <Link
                                    href={`/jewellery/jewelleryType/${slugify(type)}`}
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
                            <h6 className="lora">Shop By Collection</h6>
                            <ul className="mt-1">
                              {sortedCollections.map((collection) => (
                                <li key={collection}>
                                  <Link
                                    href={`/jewellery/collection/${slugify(collection)}`}
                                    className="lora link-hover-red text-gray text-decoration-none"
                                    onClick={() => {
                                      setShowCollectionsDropdown(false);
                                      setExpanded(false);
                                    }}
                                  >
                                    {collection}
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
                                    href={`/jewellery/purity/${slugify(purity)}`}
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
                      </div>
                    )}
                  </div>
                );
              })}
            </Nav>
          </Navbar.Collapse>

          <div className="d-none d-lg-flex align-items-center gap-2 social-icons">
            <Nav.Link href="https://wa.me/917874011144" target="_blank">
              <Image src={whatsappIcon} alt="WhatsApp" className="rounded-5" width={32} height={32} />
            </Nav.Link>

            <Nav.Link href="https://www.instagram.com/suvarnakalajewellers" target="_blank">
              <Image src={instagramIcon} className="rounded-5" alt="Instagram" width={31} height={31} />
            </Nav.Link>
            <Nav.Link href=" https://www.facebook.com/Suvarnakala" target="_blank">
              <Image src={facebookIcon} alt="Facebook" width={35} height={35} />
            </Nav.Link>
            <Nav.Link href="https://pin.it/3Uf6q82Hq" target="_blank">
              <Image src={pinterestIcon} alt="Pinterest" width={32} height={32} />
            </Nav.Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;