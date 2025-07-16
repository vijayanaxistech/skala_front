'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import breadcrumbImage from '../../../public/assets/About breadcumb.png';
import Bullet from '../../../public/assets/bullet.jpg';
import { Row, Col, Accordion } from 'react-bootstrap';

import Loader from '@/components/Loader';

const digitalGoldBenefits = [
  {
    en: 'Digital gold provides clients with the convenience of purchasing and trading gold from any location, at any time, without the need to visit physical jewelry stores.',
    hi: 'डिजिटल सोना ग्राहकों को भौतिक आभूषण दुकानों पर जाने की आवश्यकता के बिना, किसी भी समय, किसी भी स्थान से सोना खरीदने और व्यापार करने की सुविधा प्रदान करता है।',
  },
  {
    en: "Digital gold is securely stored in a jeweler's vault, mitigating the risk of theft or loss commonly associated with physical gold.",
    hi: 'डिजिटल सोने को जौहरी की तिजोरी में सुरक्षित रूप से संग्रहीत किया जाता है, जिससे आमतौर पर भौतिक सोने से जुड़ी चोरी या हानि का जोखिम कम हो जाता है।',
  },
  {
    en: 'Digital gold is highly liquid, allowing for quick and seamless conversion to cash.',
    hi: 'डिजिटल सोना अत्यधिक तरल है, जो नकदी में त्वरित और निर्बाध रूपांतरण की अनुमति देता है।',
  },
  {
    en: 'Digital gold is available for purchase in smaller denominations starting from Rs.1000/-.',
    hi: 'डिजिटल सोना रु.1000/- से शुरू होकर छोटे मूल्यवर्ग में खरीदने के लिए उपलब्ध है।',
  },
];

const faqData = {
  buy: [
    {
      question: {
        en: 'What is Digital Gold?',
        hi: 'डिजिटल गोल्ड क्या है?',
      },
      answer: {
        en: "Digital gold refers to the process of purchasing physical gold through digital means and is securely stored in a jeweler's vault on behalf of the customer. Customers can easily sell their digital gold in a digital format, without the need to physically visit a jeweler's showroom.",
        hi: 'डिजिटल सोना डिजिटल माध्यम से भौतिक सोना खरीदने की प्रक्रिया को संदर्भित करता है और इसे ग्राहक की ओर से जौहरी की तिजोरी में सुरक्षित रूप से संग्रहीत किया जाता है। ग्राहक किसी जौहरी के शोरूम में जाने की आवश्यकता के बिना, आसानी से अपना डिजिटल सोना डिजिटल प्रारूप में बेच सकते हैं।',
      },
    },
    {
      question: {
        en: 'What is the purity of Digital Gold?',
        hi: 'डिजिटल गोल्ड की शुद्धता क्या है?',
      },
      answer: {
        en: 'The purity of Digital Gold is 99.99.',
        hi: 'डिजिटल गोल्ड की शुद्धता 99.99 है।',
      },
    },
    {
      question: {
        en: 'What are the minimum and maximum values of digital gold that I can purchase?',
        hi: 'डिजिटल सोने का न्यूनतम और अधिकतम मूल्य क्या है जिसे मैं खरीद सकता हूँ?',
      },
      answer: {
        en: 'The minimum value for purchasing Digital Gold is Rs. 1000/-, while the maximum value is Rs. 1,99,999/-.',
        hi: 'डिजिटल सोना खरीदने के लिए न्यूनतम मूल्य रु. 1000/-, जबकि अधिकतम मूल्य रु. 1,99,999/- है।',
      },
    },
    {
      question: {
        en: 'What payment modes are available for purchasing digital gold?',
        hi: 'डिजिटल सोना खरीदने के लिए कौन से भुगतान तरीके उपलब्ध हैं?',
      },
      answer: {
        en: 'Currently, users can only purchase digital gold through UPI mode.',
        hi: 'वर्तमान में, उपयोगकर्ता केवल UPI मोड के माध्यम से डिजिटल सोना खरीद सकते हैं।',
      },
    },
    {
      question: {
        en: 'Is GST levied at the time of purchasing digital gold?',
        hi: 'क्या डिजिटल सोना खरीदते समय GST लगाया जाता है?',
      },
      answer: {
        en: 'Yes, a 3% GST is levied at the time of purchasing digital gold.',
        hi: 'हां, डिजिटल सोना खरीदते समय 3% GST लगाया जाता है।',
      },
    },
    {
      question: {
        en: 'What is the minimum transaction amount that requires a PAN card?',
        hi: 'न्यूनतम लेनदेन राशि क्या है जिसके लिए पैन कार्ड की आवश्यकता होती है?',
      },
      answer: {
        en: 'A PAN card is mandatory for all transactions above Rs.1,000/-.',
        hi: 'रु.1,000/- से अधिक के सभी लेनदेन के लिए पैन कार्ड अनिवार्य है।',
      },
    },
  ],
  sell: [
    {
      question: {
        en: 'Is there any Lock-in Period for the sale of Digital Gold?',
        hi: 'क्या डिजिटल गोल्ड की बिक्री के लिए कोई लॉक-इन अवधि है?',
      },
      answer: {
        en: 'Customers are only able to sell their digital gold after a minimum of 2 days following the time of purchase.',
        hi: 'ग्राहक खरीदारी के समय के न्यूनतम 2 दिनों के बाद ही अपना डिजिटल सोना बेच सकते हैं।',
      },
    },
    {
      question: {
        en: 'What is the expected duration for the funds to be credited to my bank account?',
        hi: 'मेरे बैंक खाते में धनराशि जमा होने की अपेक्षित अवधि क्या है?',
      },
      answer: {
        en: "The funds will be transferred to the customer's account within a period of 7 working days following the sell transaction.",
        hi: 'बिक्री लेनदेन के बाद 7 कार्य दिवसों की अवधि के भीतर धनराशि ग्राहक के खाते में स्थानांतरित कर दी जाएगी।',
      },
    },
    {
      question: {
        en: 'Is GST imposed on the sale of digital gold by the customer?',
        hi: 'क्या ग्राहक द्वारा डिजिटल सोने की बिक्री पर GST लगाया जाता है?',
      },
      answer: {
        en: 'No. GST is not levied on the sale of digital gold by the customer.',
        hi: 'नहीं, ग्राहक द्वारा डिजिटल सोने की बिक्री पर GST नहीं लगाया जाता है।',
      },
    },
  ],
  lease: [],
  redeem: [
    {
      question: {
        en: 'How can customers Redeem Digital Gold?',
        hi: 'ग्राहक डिजिटल गोल्ड कैसे रिडेम कर सकते हैं?',
      },
      answer: {
        en: "Customers can redeem their digital gold by visiting the jeweler's showroom.",
        hi: 'ग्राहक ज्वैलर्स के शोरूम पर जाकर अपना डिजिटल सोना रिडेम कर सकते हैं।',
      },
    },
    {
      question: {
        en: 'Is there a time limit for redeeming digital gold?',
        hi: 'क्या डिजिटल सोना रिडेम करने की कोई समय सीमा है?',
      },
      answer: {
        en: 'Customers are able to redeem their digital gold after a period of 48 hours from the time of purchase.',
        hi: 'ग्राहक खरीदारी के 48 घंटे की अवधि के बाद अपने डिजिटल सोने को रिडेम करने में सक्षम हैं।',
      },
    },
    {
      question: {
        en: 'What is the minimum quantity requirement for redeeming digital gold?',
        hi: 'डिजिटल सोना रिडेम करने के लिए न्यूनतम मात्रा की आवश्यकता क्या है?',
      },
      answer: {
        en: 'The minimum quantity required for redeeming digital gold is 1 grams.',
        hi: 'डिजिटल सोना रिडेम करने के लिए आवश्यक न्यूनतम मात्रा 1 ग्राम है।',
      },
    },
    {
      question: {
        en: 'Is there an option for the physical delivery of digital gold?',
        hi: 'क्या डिजिटल सोने की भौतिक डिलीवरी का कोई विकल्प है?',
      },
      answer: {
        en: 'Currently, physical delivery of digital gold is not an available option.',
        hi: 'वर्तमान में, डिजिटल सोने की भौतिक डिलीवरी उपलब्ध विकल्प नहीं है।',
      },
    },
    {
      question: {
        en: 'Are there any additional fees associated with redeeming digital gold?',
        hi: 'क्या डिजिटल सोना रिडेम्पशन से जुड़ी कोई अतिरिक्त फीस है?',
      },
      answer: {
        en: 'At the time of redemption, if the redemption is in the form of fine gold or gold ornaments, making charges, purity certificate charges/BIS Hallmarking charges, and GST will be applicable.',
        hi: 'रिडेम्पशन के समय, यदि रिडेम्पशन शुद्ध सोने या सोने के आभूषणों के रूप में है, तो मेकिंग चार्ज, शुद्धता प्रमाणपत्र शुल्क/बीआईएस हॉलमार्किंग शुल्क और GST लागू होगा।',
      },
    },
  ],
};

const totalYears = new Date().getFullYear() - 1970;

const DigiGold = () => {
  const [animatedYears, setAnimatedYears] = useState(0);
  const [loading, setLoading] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [activeCategory, setActiveCategory] = useState('buy');

  // Simulate loading (e.g., data/image loading)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // Show loader for 1.2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Animated counter (trigger after loading)
  useEffect(() => {
    if (!loading && counterRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const end = totalYears;
            const duration = 2500;
            const stepTime = Math.max(10, Math.floor(duration / end));

            const timer = setInterval(() => {
              start += 1;
              setAnimatedYears(start);
              if (start >= end) clearInterval(timer);
            }, stepTime);
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(counterRef.current);

      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }
  }, [loading]);

  // Show loader while loading
  if (loading) return <Loader />;

  return (
    <>
      {/* Breadcrumb Section */}
      <div
        style={{ position: 'relative', width: '100%', height: '434px' }}
        className="about-banner"
      >
        <Image
          src={breadcrumbImage}
          alt="Suvarnakala Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* About Section */}
      <div className="bg-color">
        <div className="p-5 py-3 ">
          <div className="custom-heading-wrapper d-flex align-items-center mb-4">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <span className="fraunces">
                Digital <span className="text-red fraunces">Gold benefits </span>
              </span>
              <div className="decorative-line">
                <div className="diamond"></div>
                <div className="line"></div>
                <div className="diamond"></div>
              </div>
            </h2>
          </div>
        </div>
        <div className="why px-0 px-md-5" style={{ backgroundColor: '#fff9f3' }}>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            }}
          >
            <div className="custom-heading-wrapper text-center justify-content-center d-flex align-items-center mb-4"></div>

            {digitalGoldBenefits.map((digitalGoldBenefits, index) => (
              <Row className="mb-4" key={index}>
                <Col xs={12}>
                  <div className="d-flex align-items-start">
                    <div className="me-3 text-red" style={{ fontSize: '1.10rem' }}>
                      <Image
                        src={Bullet}
                        alt="Section Icon"
                        width={20}
                        height={20}
                        className="rounded-circle" // Bootstrap for rounded-full
                      />{' '}
                    </div>
                    <div>
                      <p className=" mb-2 lora">{digitalGoldBenefits.en}</p>
                      <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                        {digitalGoldBenefits.hi}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}

      <div className=" bg-color py-3">
        <div className="p-5 py-3">
          <div className="custom-heading-wrapper d-flex align-items-center mb-4">
            <h2 className="m-0 custom-heading text-wrap me-3">
              <span className="fraunces">
                Frequently <span className="text-red fraunces"> Asked Questions </span>
              </span>
              <div className="decorative-line">
                <div className="diamond"></div>
                <div className="line"></div>
                <div className="diamond"></div>
              </div>
            </h2>
          </div>
        </div>
        {/* Category Buttons */}
        <div className="d-flex custom-tab justify-content-between mb-4 gap-2">
          {['buy', 'sell', 'lease', 'redeem'].map((category) => (
            <div
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`custom-tab lora ${activeCategory === category ? 'active-tab' : ''}`}
            >
              {category}
            </div>
          ))}
        </div>

        {/* FAQ Accordions */}
        <Accordion defaultActiveKey="0" flush className="p-0 py-3 px-md-5">
          {faqData[activeCategory].map((item, index) => (
            <Accordion.Item eventKey={index.toString()} key={index} className="faq-accordion-item">
              <Accordion.Header>
                <div className="faq-question">
                  <div className="fw-bold mb-2 lora">{item.question.en}</div>
                  <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {item.question.hi}
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <p className="mb-3 lora">{item.answer.en}</p>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                  {item.answer.hi}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      {/* Animation Keyframes */}
      <style>{`

        .faq-accordion-item {
          border: none;
          margin-bottom: 10px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          background: #fff;
        }
        .accordion-header {
          background: #fff;
          padding: 20px;
        }
        .accordion-button {
          background: #fff !important;
          color: #333 !important;
          font-weight: 600 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .accordion-button:not(.collapsed) {
          color: #d32f2f !important;
        }
        .accordion-body {
          padding: 20px;
          background: #fff;
          border-top: 1px solid #f0f0f0;
        }
        .faq-question {
          line-height: 1.5;
        }
        @keyframes rotateCircle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 767px) {
          .about-banner {
            height: 320px !important;
          }
          .faq-tab-button {
            padding: 10px 18px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default DigiGold;
