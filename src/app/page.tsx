'use client';

import { useEffect, useState } from 'react';

import Popup from '../components/Popup';
import Hero from '../components/HeroCarousel';
import Products from '../components/Events';
import CredibilitySection from '../components/AboutUs';
import VideoSection from '../components/VideoSection';
import ShopbyStyle from '../components/ShopbyStyle';
import TopTrendingDesigns from '../components/TopTrendingDesigns';
import GiftCard from '../components/GiftCard';
import Moments from '../components/Moments';
import BachatMahotsav from '../components/BachatMahotsav';
import Testimonials from '../components/Testimonials';

import {
  getBachatMahotsavImages,
  getHeroes,
  getMoments,
  getTrendingDesigns,
  BASE_URL,
} from '../lib/api';

export default function Home() {
  const [heroes, setHeroes] = useState([]);
  const [moments, setMoments] = useState([]);
  const [trendingDesigns, setTrendingDesigns] = useState([]);
  const [bachatMahotsavImages, setBachatMahotsavImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [heroData, momentData, trendingData, bachatData] = await Promise.all([
          getHeroes(),
          getMoments(),
          getTrendingDesigns(),
          getBachatMahotsavImages(),
        ]);

        setHeroes(heroData);
        setMoments(momentData);
        setTrendingDesigns(trendingData);
        setBachatMahotsavImages(bachatData);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      }
    }

    fetchData();
  }, []);

  if (!BASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE_URL in .env.local');
  }

  return (
    <>
      <Popup />
      <Hero />
      <CredibilitySection />
      <VideoSection />
      <ShopbyStyle />
      <Products />
      <TopTrendingDesigns initialDesigns={trendingDesigns} />
      <GiftCard />
      <Moments moments={moments} />
      <BachatMahotsav bachatMahotsavImages={bachatMahotsavImages} />
      <Testimonials />
    </>
  );
}
