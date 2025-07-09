// import React from 'react';
// import Image from 'next/image';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import hrline from '../../../public/assets/Line 467.png';
// import phool from '../../../public/assets/111 1.png';
// import breadcrumbImage from '../../../public/assets/events-hero.png';
// import shopnowbg from '../../../public/assets/dark-brown-colour-flower-pattern-background-abstract-banner-multipurpose-design 1.png';
// import shopWomen from '../../../public/assets/shopWomwn.png';
// import styles from '../page.module.css';
// import { Button, Container, Row, Col } from 'react-bootstrap';
// import { getEvents, getMetadataByPage } from '../../lib/api';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// const EventsClientWrapper = dynamic(() => import('@/components/LoadingWrapper'));

// interface Event {
//   _id: string;
//   title: string;
//   address: string;
//   startDate: string;
//   endDate: string;
// }

// export async function generateMetadata() {
//   try {
//     const metadata = await getMetadataByPage('events');
//     if (!metadata) {
//       // Fallback metadata if API returns null
//       return {
//         title: 'Events | Suvarnakala Pvt. Ltd',
//         description: 'Discover upcoming and past events hosted by Suvarnakala Pvt. Ltd.',
//       };
//     }
//     return {
//       title: metadata.title,
//       description: metadata.description,
//       keywords: metadata.keywords,
//       openGraph: {
//         title: metadata.ogTitle,
//         description: metadata.ogDescription,
//         images: metadata.ogImage ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${metadata.ogImage}` : undefined,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching metadata for events page:', error);
//     // Fallback metadata in case of error
//     return {
//       title: 'Events | Suvarnakala Pvt. Ltd',
//       description: 'Discover upcoming and past events hosted by Suvarnakala Pvt. Ltd.',
//     };
//   }
// }

// const formatDateRange = (start: string, end: string) => {
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   const startDay = startDate.getDate();
//   const endDay = endDate.getDate();
//   const month = endDate.toLocaleString('en-US', { month: 'long' }).toUpperCase();
//   const year = endDate.getFullYear();

//   return `${startDay}th TO ${endDay}th ${month} ${year}`;
// };

// // Add custom CSS for animations and styling
// const customStyles = `
//   @keyframes fadeInUp {
//     0% {
//       opacity: 0;
//       transform: translateY(20px);
//     }
//     100% {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   .coming-soon-container {
//     border-radius: 15px;
//     padding: 3rem;
//     text-align: center;
//     position: relative;
//     overflow: hidden;
//   }

//   .coming-soon-title {
//     font-size: 2.5rem;
//     font-weight: 700;
//     color: #b22222;
//     text-transform: uppercase;
//     margin-bottom: 1rem;
//   }
//   .coming-soon-text {
//     font-size: 1.2rem;
//     color: #555;
//     margin-bottom: 2rem;
//   }
// `;

// const EventsPage = async () => {
//   const events: Event[] = await getEvents();

//   const today = new Date('2025-06-04');
//   const upcomingEvents = events
//     .filter((e) => new Date(e.startDate) >= today)
//     .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

//    return (
//     <><EventsClientWrapper>
//       {/* Inject custom styles */}
//       <style>{customStyles}</style>

//       <div style={{ position: 'relative', width: '100%', height: '434px' }} className="banner">
//         <Image
//           src={breadcrumbImage}
//           alt="Suvarnakala Banner"
//           layout="fill"
//           objectFit="cover"
//           priority
//         />
//       </div>

//       <div className="pt-0" style={{ backgroundColor: '#f5e7d6' }}>
//         <Image src={phool} alt="phool" width={60} height={88} />
//         <div className="p-5 pt-0 pb-1">
//           {/* Upcoming Events */}
//           <div className="mb-5 text-start">
//             <div className="custom-heading-wrapper d-flex align-items-center mb-4">
//               <h2 className="m-0 custom-heading text-wrap me-3">
//                 <span className="text-red">Upcoming Events </span>

//                 <div className="decorative-line">
//                   <div className="diamond"></div>
//                   <div className="line"></div>
//                   <div className="diamond"></div>
//                 </div>
//               </h2>
//             </div>

//             {upcomingEvents.length === 0 ? (
//               <div className="coming-soon-container">
//                 <div className="decorative-line"></div>
//                 <h2 className="coming-soon-title">Events Coming Soon!</h2>
//               </div>
//             ) : (
//               <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 justify-content-start">
//                 {upcomingEvents.map((event) => (
//                   <div key={event._id} className="col">
//                     <div
//                       className="card h-100 border-light shadow-sm text-center p-3"
//                       style={{ backgroundColor: '#fff', borderRadius: '10px' }}
//                     >
//                       <div className="mb-3">
//                         <p className="mb-0 fs-6 fw-medium text-dark">
//                           {formatDateRange(event.startDate, event.endDate)}
//                         </p>
//                         <div className="mt-2">
//                           <Image
//                             src={hrline}
//                             alt="Horizontal Line"
//                             layout="responsive"
//                             width={100}
//                             height={3}
//                           />
//                         </div>
//                       </div>
//                       <h5 className="card-title fw-bold text-uppercase text-dark fs-6 mb-2">
//                         {event.title}
//                       </h5>
//                       <p className="card-text text-secondary fs-6">{event.address}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Shop Now Section */}
//       <div style={{ position: 'relative', width: '100%', height: '300px' }}>
//         <Image src={shopnowbg} alt="Shop Now Banner" layout="fill" objectFit="cover" priority />
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: 'white',
//           }}
//         >
//           <Container>
//             <Row className="align-items-center">
//               <Col md={6} className="d-none d-md-flex justify-content-start">
//                 <Image src={shopWomen} alt="Shop Girl" width={300} height={300} />
//               </Col>
//               <Col xs={12} md={6} className="text-center text-md-start text-white">
//                 <h1 className="fs-4 fs-md-3 fw-semibold lh-tight mb-4">
//                   Elevate Every Moment with Timeless Jewellery
//                 </h1>
//                 <Link href="/collections">
//                   <Button
//                     variant="outline-light rounded-0"
//                     className={styles.shopNowBtn}
//                     style={{ textDecoration: 'none' }}
//                   >
//                     Shop Now
//                   </Button>
//                 </Link>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//       <style>{`
        
//           @media (max-width: 767px) {
//           .banner {
//             height: 215px !important;
//           }
          
//         }
//       `}</style></EventsClientWrapper>
//     </>
//   );
// };

// export default EventsPage;