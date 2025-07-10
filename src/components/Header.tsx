'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { FaWhatsapp, FaTwitter, FaFacebook, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { sendAppointment, getNavbar } from '../lib/api';
import { Box, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Goldrate from './GoldRate';
import logo from '../../public/assets/Suvarnakala.png';
import BookImage from '../../public/assets/Book_A.png';
import { styleText } from 'util';

interface NavLink {
  _id: string;
  name: string;
  path: string;
  show: boolean;
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showShowroomDropdown, setShowShowroomDropdown] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    store: '',
    date: '',
    jewelry: '',
    message: '',
    captchaAnswer: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [captchaText, setCaptchaText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Desired order of navigation menu items
  const desiredOrder = [
    'Home',
    'About Us',
    'Collections',
    'Our Showrooms',
    'Events',
    'Why Us',
    'Contact Us',
    'Book an Appointment',
  ];

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 50; i++) {
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`;
          ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }

        ctx.font = '20px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const charWidth = canvas.width / (text.length + 1);
        for (let i = 0; i < text.length; i++) {
          ctx.save();
          const x = charWidth * (i + 1);
          const y = canvas.height / 2;
          ctx.translate(x, y);
          ctx.rotate((Math.random() - 0.5) * 0.3);
          ctx.fillText(text[i], 0, 0);
          ctx.restore();
        }
      } else {
        console.error('Failed to get 2D context for canvas');
      }
    } else {
      console.error('Canvas element not found');
    }
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        generateCaptcha();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  useEffect(() => {
    // Fetch navbar links
    const fetchNavLinks = async () => {
      try {
        const data = await getNavbar();
        // Sort navLinks based on desiredOrder
        const sortedLinks = data.sort((a: NavLink, b: NavLink) => {
          const aIndex = desiredOrder.indexOf(a.name);
          const bIndex = desiredOrder.indexOf(b.name);
          // If not found in desiredOrder, push to the end
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
    fetchNavLinks();
  }, []);

  const handleToggle = () => setExpanded((prev) => !prev);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      mobile: '',
      city: '',
      store: '',
      date: '',
      jewelry: '',
      message: '',
      captchaAnswer: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.store.trim()) newErrors.store = 'Store is required';
    if (!formData.date) newErrors.date = 'Appointment date is required';
    if (!formData.jewelry.trim()) newErrors.jewelry = 'Interested jewelry is required';
    if (!formData.captchaAnswer.trim()) {
      newErrors.captchaAnswer = 'CAPTCHA is required';
    } else if (formData.captchaAnswer.trim().toLowerCase() !== captchaText.toLowerCase()) {
      newErrors.captchaAnswer = 'Incorrect CAPTCHA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await sendAppointment(formData);
      toast.success('Message sent successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setFormData({
        name: '',
        email: '',
        mobile: '',
        city: '',
        store: '',
        date: '',
        jewelry: '',
        message: '',
        captchaAnswer: '',
      });
      setErrors({});
      setShowModal(false);
    } catch (error) {
      console.error('Error sending appointment request:', error);
    }
  };

  // Static dropdown for Our Showrooms
  const showroomDropdown = [
    { href: '/our-showrooms#cgroad', label: 'C.G. Road' },
    { href: '/our-showrooms#satellite', label: 'Satellite' },
    { href: '/our-showrooms#maninagar', label: 'Maninagar' },
  ];

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
              {navLinks.map(({ _id, name, path }) => {
                const isShowroom = name === 'Our Showrooms';
                const isBookAppointment = name === 'Book an Appointment';

                const isActive =
                  !isBookAppointment && !isShowroom
                    ? pathname === path || pathname.startsWith(path + '/')
                    : isShowroom
                      ? pathname === path ||
                        pathname.startsWith(path + '/') ||
                        pathname.includes(path + '#')
                      : false;

                if (isShowroom) {
                  return (
                    <div
                      key={_id}
                      className="custom-nav-link position-relative scroll-smooth"
                      onMouseEnter={() => setShowShowroomDropdown(true)}
                      onMouseLeave={() => setShowShowroomDropdown(false)}
                      onClick={() => setShowShowroomDropdown((prev) => !prev)}
                    >
                      <Link
                        href={path}
                        passHref
                        legacyBehavior={false}
                        className="custom-nav-link scroll-smooth"
                        onClick={() => {
                          setExpanded(false);
                          setShowShowroomDropdown(false);
                        }}
                        style={{ textDecoration: 'none' }}
                      >
                        <Nav.Link
                          as="span"
                          className={isActive ? 'text-danger active-link' : 'text-dark'}
                          style={{ cursor: 'pointer' }}
                        >
                          {name}
                        </Nav.Link>
                      </Link>
                      {showShowroomDropdown && (
                        <div className="card-dropdown">
                          {showroomDropdown.map((item, subIdx) => (
                            <Link
                              key={subIdx}
                              href={item.href}
                              className="card-dropdown-item"
                              onClick={() => {
                                setExpanded(false);
                                setShowShowroomDropdown(false);
                              }}
                              style={{ color: '#d41b1f', textDecoration: 'none' }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={_id}
                    href={path}
                    passHref
                    legacyBehavior={false}
                    className="custom-nav-link"
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
                      className={isActive ? 'text-danger active-link' : 'text-dark'}
                    >
                      {name}
                    </Nav.Link>
                  </Link>
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
   
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        dialogClassName="custom-modal"
        autoFocus={false}
      >
        <Modal.Body
          className="p-0 d-flex align-items-center justify-content-center"
          style={{ width: '1200px', height: '300px', maxWidth: '100vw' }}
        >
          <div className="row no-gutters m-0 w-100" style={{ height: '100%' }}>
            <div className="col-md-6 d-none d-md-block p-0" style={{ height: '100%' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={BookImage}
                  alt="Appointment"
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            <div
              className="col-md-6 p-4 position-relative"
              style={{ height: '100%', overflowY: 'auto', backgroundColor: 'black' }}
            >
              <FaTimes
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: '#fff',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              />
              <h4 className="mb-4 text-center text-white fw-bold">Book an Appointment</h4>
              <div className="pt-5">
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <input
                      className="form-control text-white bg-black w-100 border-white"
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <input
                      className="form-control text-white bg-black w-100 border-white"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <input
                      className="form-control text-white bg-black w-100 border-white"
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <input
                      className="form-control text-white bg-black w-100 border-white"
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <select
                      className="form-control text-white-50 bg-black w-100 border-white"
                      name="store"
                      required
                      value={formData.store}
                      onChange={handleChange}
                    >
                      <option value="">Select Store</option>
                      <option value="Jodhpur Cross Roads, Satellite">
                        Jodhpur Cross Roads, Satellite
                      </option>
                      <option value="C.G. Road">C.G. Road</option>
                      <option value="Maninagar">Maninagar</option>
                    </select>
                    {errors.store && <span className="error-text">{errors.store}</span>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <div className="w-100">
                      <DatePicker
                        selected={formData.date ? new Date(formData.date) : null}
                        onChange={(date) =>
                          setFormData((prev) => ({
                            ...prev,
                            date: date?.toISOString().split('T')[0] || '',
                          }))
                        }
                        dateFormat="dd/MM/yyyy"
                        className="form-control bg-black text-white w-100 border-white"
                        placeholderText="Select Appointment Date"
                        wrapperClassName="w-100"
                      />
                      {errors.date && <span className="error-text">{errors.date}</span>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <input
                      className="form-control text-white bg-black w-100 border-white"
                      type="text"
                      name="jewelry"
                      placeholder="Interested Jewelry"
                      required
                      value={formData.jewelry}
                      onChange={handleChange}
                    />
                    {errors.jewelry && <span className="error-text">{errors.jewelry}</span>}
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control text-white bg-black w-100 border-white"
                    rows={3}
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ width: '100%', height: '120px' }}
                  />
                </div>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 2,
                    mt: 3,
                    mb: 3,
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    width={200}
                    height={40}
                    style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '4px',
                      backgroundColor: '#f0f0f0',
                      height: '40px',
                      maxWidth: '100%',
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={generateCaptcha}
                    className="rounded-1"
                    style={{
                      borderColor: '#fff',
                      color: '#fff',
                      minWidth: '40px',
                      height: '40px',
                      padding: 0,
                      flexShrink: 0,
                    }}
                  >
                    <TbRefresh size={20} />
                  </Button>
                  <TextField
                    id="captchaAnswer"
                    name="captchaAnswer"
                    label="Enter CAPTCHA Code"
                    variant="outlined"
                    size="small"
                    value={formData.captchaAnswer}
                    onChange={handleChange}
                    error={!!errors.captchaAnswer}
                    helperText={errors.captchaAnswer}
                    fullWidth
                    sx={{
                      flex: 1,
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                      input: { color: '#fff' },
                      label: { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#fff' },
                        '&:hover fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                      },
                    }}
                    inputProps={{ autoComplete: 'off' }}
                  />
                </Box>

                <div className="text-center pt-4">
                  <Button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-pill fw-bold"
                    style={{ backgroundColor: '#033A79', border: 'none', color: 'white' }}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>{`
        .error-text {
          color: #ff4d4d;
          font-size: 12px;
          margin-top: 4px;
          display: block;
        }
        .form-control.bg-black {
          border: 1px solid #7e7979;
        }
        .form-control.bg-black::placeholder {
          color: #7e7979;
        }
        .form-control.bg-black:focus {
          background-color: #000;
          color: #fff;
          border-color: #033a79;
          box-shadow: none;
        }
        .react-datepicker-wrapper .form-control.bg-black {
          border: 1px solid #7e7979;
        }
        .react-datepicker-wrapper .form-control.bg-black:focus {
          border-color: #033a79;
          box-shadow: none;
          outline: none;
        }
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
        .card-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #f5e7d6;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 10px 0;
          min-width: 200px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }
        .card-dropdown-item {
          display: block;
          padding: 10px 20px;
          color: #d41b1f;
          text-decoration: none !important;
          font-weight: 400;
          font-size: 14px;
          text-align: center;
        }
        .card-dropdown-item:hover {
          background-color: #e9dac4;
          color: #b01418;
        }
        @media (max-width: 991px) {
          .card-dropdown {
            position: static;
            transform: none;
            width: 100%;
            box-shadow: none;
            border: none;
            background-color: #f5e7d6;
          }
          .card-dropdown-item {
            text-align: left;
            padding: 8px 30px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
