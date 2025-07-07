'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import contactUs from '../../../public/assets/contact-banner.png';
import Image from 'next/image';
import call from '../../../public/assets/icons/call 1.svg';
import mail from '../../../public/assets/icons/email 1.svg';
import watch from '../../../public/assets/icons/watch 1.svg';
import hrline from '../../../public/assets/Line 467.png';
import shopnowbg from '../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
import shopWomen from '../../../public/assets/shopWomwn.png';
import locationIcon from '../../../public/assets/google-maps.png';
import { TbRefresh } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';

import { Container, Row, Col, Button } from 'react-bootstrap';
import API from '../../lib/api';
import styles from '../page.module.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Loader from '@/components/Loader';

const locations = [
  {
    title: 'Jodhpur Cross Roads, Satellite',
    address: 'Venus Amadeus, Jodhpur Cross Road, B.R.T.S Bus Stand, Satellite, Ahmedabad',
    phone: '+91 7874011144',
    mapLink: 'https://maps.app.goo.gl/sMtWFAF2yPUSwYXZ6',
  },
  {
    title: 'C G Road',
    address: '101 National Plaza, Opp. Lal Bunglow, C. G. Road, Ahmedabad, Gujarat - 380 006',
    phone: '+91 9924902223',
    mapLink: 'https://maps.app.goo.gl/xN92n1Y9FetfUznd8',
  },
  {
    title: 'Maninagar',
    address: 'Opp. Pintoo Garments, Maninagar Cross Rd, Maninagar, Ahmedabad, Gujarat - 380 008',
    phone: '+91 8511755799',
    mapLink: 'https://maps.app.goo.gl/h7oETcXHRToqzaDT8',
  },
];

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    captchaAnswer: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  // Generate 6-character alphanumeric CAPTCHA on component mount
  useEffect(() => {
  if (!loading) {
    generateCaptcha();
  }
}, [loading]);


  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(code);
    drawCaptcha(code);
  };

  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random lines for noise
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
      ctx.stroke();
    }

    // Draw text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#033A79';
    for (let i = 0; i < code.length; i++) {
      ctx.save();
      ctx.translate(20 + i * 30, 40);
      ctx.rotate((Math.random() - 0.5) * 0.4); // Slight rotation
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone))
      newErrors.phone = 'Phone number is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.captchaAnswer.trim()) newErrors.captchaAnswer = 'CAPTCHA is required';
    else if (formData.captchaAnswer !== captchaCode)
      newErrors.captchaAnswer = 'Incorrect CAPTCHA code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitStatus(null);

      const res = await API.post('/api/contact', formData);

      if (res.status === 200 || res.status === 201) {
        toast.success('Message sent successfully!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData({ name: '', email: '', phone: '', message: '', captchaAnswer: '' });
        setErrors({});
        generateCaptcha();
      } else {
        setSubmitStatus(res.data.error || 'Something went wrong');
      }
    } catch (error) {
      setSubmitStatus('Failed to send message');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact Us page" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </Head>

      {/* Toast Container */}
      <ToastContainer />

      {/* Hero Section */}
      <main style={{ backgroundColor: '#f5f0e6' }}>
        <div
          className="position-relative text-white d-flex align-items-center contact-banner"
          style={{
            backgroundImage: `url(${contactUs.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'clamp(80vh, 50vw, 60vh)',
            width: '100%',
          }}
        >
          <div
            className="position-absolute"
            style={{
              top: '50%',
              left: 'clamp(2%, 5vw, 5%)',
              transform: 'translateY(-50%)',
              padding: '0 1rem',
            }}
          >
            {/* <h1
              className="fw-bold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              }}
            >
              Contact Us
            </h1> */}
          </div>
        </div>

        {/* Contact Info & Form Section */}
        <div className="p-3 p-md-5">
          <div className="mb-4">
            <h2
              className="fw-bold text-center text-md-start"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
            >
              Get in Touch with Us
            </h2>
          </div>

          <div className="row gx-3 gx-md-5 gy-4">
            {/* Contact Form */}
            <div className="col-12 col-lg-6 d-flex">
              <div
                className="card shadow-sm w-100 d-flex flex-column"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                }}
              >
                <h4 className="mb-4 fw-semibold" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>
                  Send a Message
                </h4>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    gap: { sm: 2, md: 3 },
                  }}
                >
                  <TextField
                    id="name"
                    className="input"
                    label="Name"
                    variant="outlined"
                    size="medium"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    InputProps={{ style: { minHeight: 'clamp(40px, 5vw, 50px)' } }}
                  />
                  <TextField
                    id="email"
                    className="input"
                    label="Email"
                    variant="outlined"
                    size="medium"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    InputProps={{ style: { minHeight: 'clamp(40px, 5vw, 50px)' } }}
                  />
                  <TextField
                    id="phone"
                    className="input"
                    label="Phone"
                    variant="outlined"
                    size="medium"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    fullWidth
                    InputProps={{ style: { minHeight: 'clamp(40px, 5vw, 50px)' } }}
                  />
                  <TextField
                    id="message"
                    className="input"
                    label="Message"
                    variant="outlined"
                    size="medium"
                    multiline
                    rows={8}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    fullWidth
                    InputProps={{ style: { minHeight: 'clamp(100px, 20vw, 140px)' } }}
                  />

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
                      height={60}
                      style={{
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        backgroundColor: '#f0f0f0',
                        maxWidth: '100%', // allow canvas to shrink on smaller screens
                      }}
                    />

                    <Button
                      variant="outlined"
                      onClick={generateCaptcha}
                      className="rounded-1 p-2"
                      style={{
                        borderColor: '#fff',
                        color: '#033A79',
                        minWidth: '50px',
                        padding: '10px',
                        flexShrink: 0, // don't shrink the button
                      }}
                    >
                      <TbRefresh />
                    </Button>

                    <TextField
                      id="captchaAnswer"
                      label="Enter CAPTCHA Code"
                      variant="outlined"
                      size="medium"
                      value={formData.captchaAnswer}
                      onChange={handleChange}
                      error={!!errors.captchaAnswer}
                      helperText={errors.captchaAnswer}
                      fullWidth
                      sx={{
                        flex: 1,
                        minWidth: '250px', // ensures field stays readable on small screens
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      className="px-4 py-2 rounded-pill fw-bold"
                      style={{ backgroundColor: '#033A79', border: 'none', color: 'white' }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </div>
            </div>

            {/* Contact Details */}
            <div className="col-12 col-lg-6 d-flex">
              <div className="d-flex flex-column w-100 justify-content-between">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className={`card shadow-sm flex-grow-1 ${
                      index !== locations.length - 1 ? 'mb-3' : ''
                    }`}
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #dee2e6',
                      padding: 'clamp(1rem, 2vw, 2rem) clamp(1rem, 2vw, 3rem)',
                      textAlign: 'left',
                    }}
                  >
                    <h5
                      className="text-danger fw-bold mb-3 text-center"
                      style={{
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        fontWeight: 500,
                        lineHeight: '80%',
                      }}
                    >
                      {location.title}
                    </h5>

                    <Image
                      src={hrline}
                      alt="Horizontal Line"
                      className="mb-3"
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '500px',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />

                    <p
                      className="mb-2 fw-bold"
                      style={{
                        fontWeight: 700,
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                        // lineHeight: '1',
                        color: '#033A79',
                        whiteSpace: 'pre-line',
                        display: 'flex',
                        alignItems: 'start',
                      }}
                    >
                      <Image
                        src={locationIcon}
                        alt="Location"
                        width={16}
                        height={16}
                        className="me-2 mt-1"
                      />
                      <a
                        href={location.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#033A79', textDecoration: 'none' }}
                      >
                        {location.address}
                      </a>
                    </p>

                    <div
                      className="d-flex flex-column flex-md-row gap-2 gap-md-4 mb-3"
                      style={{
                        fontWeight: 700,
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                        color: '#033A79',
                      }}
                    >
                      <p className="mb-0 d-flex align-items-center">
                        <Image src={call} alt="Phone" width={16} height={16} className="me-2" />
                        {location.phone}
                      </p>
                      <p className="mb-0 d-flex align-items-center">
                        <Image src={mail} alt="Email" width={16} height={16} className="me-2" />
                        info@amadeus.in
                      </p>
                    </div>
                    <p
                      className="mb-0 d-flex align-items-center fw-bold"
                      style={{
                        fontWeight: 700,
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                        color: '#033A79',
                      }}
                    >
                      <Image src={watch} alt="Watch" width={16} height={16} className="me-2" />
                      10:00 AM - 6:30 PM (Monday to Saturday)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image src={shopnowbg} alt="Shop Now Banner" layout="fill" objectFit="cover" priority />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '0 20px',
          }}
        >
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="d-none d-md-flex justify-content-start">
                <Image
                  src={shopWomen}
                  alt="Shop Girl"
                  width={300}
                  height={300}
                  objectFit="contain"
                />
              </Col>
              <Col xs={12} md={6} className="text-center text-md-start text-white">
                <h1 className="fs-4 fs-md-3 fw-semibold lh-tight mb-4">
                  Elevate Every Moment with Timeless Jewellery
                </h1>
                <Link href="/collections">
                  <Button
                    variant="outline-light rounded-0"
                    className={styles.shopNowBtn}
                    style={{ textDecoration: 'none' }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <style>{`
          @media (max-width: 767px) {
          .contact-banner {
            height: 280px !important;
            min-height:auto !important;
          }
          .input{
          padding:10px}
        }
      `}</style>
    </div>
  );
};

export default Contact;
