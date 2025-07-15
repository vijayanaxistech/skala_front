'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import breadcrumbImage from '../../../public/assets/About breadcumb.png';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Row, Col, } from 'react-bootstrap';
import Bullet from '../../../public/assets/bullet.jpg';
import Loader from '@/components/Loader';


const bookMyGoldBenefits = [
    {
        en: "Gold rate booking offers customers price protection. By reserving gold at a specific rate, customers secure themselves against possible future price hikes.",
        hi: "गोल्ड रेट बुकिंग ग्राहकों को मूल्य सुरक्षा प्रदान करती है। एक विशिष्ट दर पर सोना आरक्षित करके, ग्राहक भविष्य में संभावित मूल्य वृद्धि के खिलाफ खुद को सुरक्षित करते हैं।"
    },
    {
        en: "Gold rate booking empowers customers to plan their finances more effectively as they are aware of the prevailing gold rates.",
        hi: "सोने की दर की बुकिंग ग्राहकों को अपने वित्त की योजना अधिक प्रभावी ढंग से बनाने में सक्षम बनाती है क्योंकि उन्हें सोने की मौजूदा दरों के बारे में पता होता है।"
    },
    {
        en: "Customers can initiate gold rate booking for smaller denominations, starting from Rs.1000/-.",
        hi: "ग्राहक रु.1000/- से शुरू होकर छोटे मूल्य वर्ग के लिए सोने की दर की बुकिंग शुरू कर सकते हैं।"
    },
    {
        en: "Customers can conveniently redeem their gold rate booking by visiting the jeweler's showroom.",
        hi: "ग्राहक ज्वैलर्स के शोरूम पर जाकर अपनी गोल्ड रेट बुकिंग को आसानी से रिडीम कर सकते हैं।"
    }
];

const bookMyGoldSteps = [
    "Step 1: Select Desire Metal ID",
    "Step 2: Enter the Amount or Gram of Gold Rate Booking",
    "Step 3: Click on Proceed to Book",
    "Step 4: Complete Personal Details",
    "Step 5: Select Pay Online and Complete the Payment Process"
];


export const goldRateTerms = [
    {
        section: {
            en: "Introduction",
            hi: "परिचयः"
        },
        points: [
            {
                en: "The Customers are advised to read and understand these Terms carefully before using the Services and the same shall be binding on the Customer without any objection.",
                hi: "ग्राहकों को सलाह दी जाती है कि वे सेवाओं का उपयोग करने से पहले इन शर्तों को ध्यान से पढ़ें और समझें और ये बिना किसी आपत्ति के ग्राहक पर बाध्यकारी होंगी।"
            },
            {
                en: "Gold rate booking refers to a process where customers can book or reserve gold at a specific price for a future purchase...",
                hi: "गोल्ड रेट बुकिंग एक ऐसी प्रक्रिया को संदर्भित करती है जहां ग्राहक भविष्य की खरीद के लिए एक विशिष्ट मूल्य पर सोना बुक या आरक्षित कर सकते हैं..."
            }
        ]
    },
    {
        section: {
            en: "Gold Rate Booking Redemption",
            hi: "स्वर्ण दर बुकिंग रिडेम्पशनः"
        },
        points: [
            {
                en: "The redemption of gold rate booking is only possible through a physical visit to the jeweler's showroom.",
                hi: "सोने की दर बुकिंग का रिडेम्पशन केवल जौहरी के शोरूम में जाकर ही संभव है।"
            },
            {
                en: "Customers can only redeem their gold rate booking by purchasing new jewelry. Cash or bank redemption is not allowed.",
                hi: "ग्राहक अपनी सोने की दर बुकिंग को केवल नए आभूषण खरीदकर ही रिडीम कर सकते हैं। नकद या बैंक रिडेम्पशन की अनुमति नहीं है।"
            },
            {
                en: "Redemption is only possible after 24 hours of gold booking.",
                hi: "सोने की दर की बुकिंग सोने की बुकिंग के 24 घंटे बाद ही की जा सकती है।"
            }
        ]
    },
    {
        section: {
            en: "Other Important Points",
            hi: "अन्य महत्वपूर्ण पॉइन्टसः"
        },
        points: [
            {
                en: "Customers can make gold rate bookings for any number of transactions.",
                hi: "ग्राहक किसी भी संख्या में लेनदेन के लिए सोने की दर की बुकिंग कर सकते हैं।"
            },
            {
                en: "Minimum booking amount is ₹1000/- and maximum is ₹500000/- per transaction.",
                hi: "न्यूनतम राशि ₹1000/- और अधिकतम राशि ₹500000/- प्रति लेनदेन है।"
            },
            {
                en: "Gold rate booking is non-transferable and cannot be adjusted against any other metal or purity.",
                hi: "सोने की दर बुकिंग गैर-हस्तांतरणीय है और इसे किसी अन्य धातु या शुद्धता के आधार पर समायोजित नहीं किया जा सकता है।"
            },
            {
                en: "Booking remains valid for one year from the date of booking.",
                hi: "बुकिंग की तारीख से एक वर्ष तक वैध रहती है।"
            }
        ]
    },
    {
        section: {
            en: "Liability and Risk",
            hi: "दायित्व और जोखिमः"
        },
        points: [
            {
                en: "Company's liability is limited to the weight of gold under the booking.",
                hi: "कंपनी की देनदारी बुकिंग योजना के तहत सोने की दर बुकिंग भार की सीमा तक सीमित है।"
            },
            {
                en: "Any uncovered condition shall be at company’s discretion. Decision is final.",
                hi: "कोई भी शर्त कंपनी के विवेक पर होगी और निर्णय अंतिम माना जाएगा।"
            }
        ]
    },
    {
        section: {
            en: "Force Majeure",
            hi: "अप्रत्याशित घटनाः"
        },
        points: [
            {
                en: "Non-performance due to events beyond control (weather, war, terrorism, etc.) shall not be considered breach of obligations.",
                hi: "अनियंत्रित घटनाओं के कारण प्रदर्शन विफलता को दायित्वों का उल्लंघन नहीं माना जाएगा।"
            }
        ]
    },
    {
        section: {
            en: "Governing Law and Jurisdiction",
            hi: "कानून और अधिकार क्षेत्र गवर्निंगः"
        },
        points: [
            {
                en: "Disputes are subject to Ahmedabad court only.",
                hi: "विवाद केवल अहमदाबाद की अदालत के क्षेत्राधिकार में होंगे।"
            },
            {
                en: "Company can modify booking terms as per legal updates. Customers must comply.",
                hi: "कंपनी कानूनी परिवर्तनों के अनुसार शर्तें बदल सकती है। ग्राहकों को पालन करना आवश्यक है।"
            }
        ]
    }
];






const totalYears = new Date().getFullYear() - 1970;

const BookMyGOld = () => {
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


            <div className="bg-color">


                <div className="p-5 py-4 ">
                    <div className="custom-heading-wrapper d-flex align-items-center mb-4">
                        <h2 className="m-0 custom-heading text-wrap me-3">
                            <span className="fraunces">
                                Book My <span className="text-red fraunces"> Gold Benefits </span>
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
                        <div className="custom-heading-wrapper text-center justify-content-center d-flex align-items-center mb-4">

                        </div>

                        {bookMyGoldBenefits.map((bookMyGoldBenefits, index) => (
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
                                            />   {' '}
                                        </div>
                                        <div>
                                            <p className=" text-gray mb-2 lora" >{bookMyGoldBenefits.en}</p>
                                            <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                                                {bookMyGoldBenefits.hi}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        ))}
                    </div>


                </div>

            </div>

            <div className="bg-color py-3">


                <div className="p-5 py-3 ">
                    <div className="custom-heading-wrapper d-flex align-items-center mb-4">
                        <h2 className="m-0 custom-heading text-wrap me-3">
                            <span className="fraunces">
                                How  Book My <span className="text-red fraunces"> Gold Works ? </span>
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
                        <div className="custom-heading-wrapper text-center justify-content-center d-flex align-items-center mb-4">

                        </div>

                        {bookMyGoldSteps.map((bookMyGoldSteps, index) => (
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
                                            />   {' '}
                                        </div>
                                        <div>
                                            <p className=" text-gray mb-2 lora">{bookMyGoldSteps}</p>

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        ))}
                    </div>


                </div>

            </div>

            <div className="bg-color py-2">


                <div className="p-5 py-3 ">
                    <div className="custom-heading-wrapper d-flex align-items-center mb-4">
                        <h2 className="m-0 custom-heading text-wrap me-3">
                            <span className="fraunces">
                                Book My <span className="text-red fraunces"> Gold Terms & Conditions  </span>
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
                        <div className="custom-heading-wrapper text-center justify-content-center d-flex align-items-center mb-4">

                        </div>

                        {goldRateTerms.map((section, index) => (
                            <div key={index} className="mb-5">
                                <div className="d-flex align-items-start mb-3">
                                    <div className="me-3">
                                        <Image
                                            src={Bullet}
                                            alt="Section Icon"
                                            width={20}
                                            height={20}
                                            className="rounded-circle" // Bootstrap for rounded-full
                                        />
                                    </div>

                                    <div >
                                        <div className="fw-bold mb-2 lora">{section.section.en}</div>
                                        <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                                            {section.section.hi}
                                        </div>
                                    </div>
                                </div>
                                {section.points.map((point, idx) => (
                                    <Row className="mb-4" key={idx}>
                                        <Col xs={12}>
                                            <div className="d-flex align-items-start">
                                                <div className="me-3 text-blue" style={{ fontSize: '1.2rem' }}>
                                                    <Image
                                                        src={Bullet}
                                                        alt="Section Icon"
                                                        width={20}
                                                        height={20}
                                                        className="rounded-circle" // Bootstrap for rounded-full
                                                    />                  </div>
                                                <div>
                                                    <p className="mb-1 text-dark lora"><strong></strong> {point.en}</p>
                                                    <p className="mb-0 text-muted lora"><strong></strong> {point.hi}</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        ))}
                    </div>


                </div>

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

export default BookMyGOld;
