"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

import Popup from "../components/Popup";
import Hero from "../components/HeroCarousel";
import Products from "../components/Events";
import CredibilitySection from "../components/AboutUs";
import VideoSection from "../components/VideoSection";
import ShopbyStyle from "../components/ShopbyStyle";
import TopTrendingDesigns from "../components/TopTrendingDesigns";
import Testimonials from "../components/Testimonials";
import {
  getBachatMahotsavImages,
  getHeroes,
  getMoments,
  getTrendingDesigns,
  getMetadataByPage,
  BASE_URL,
} from "../lib/api";
import Loader from "@/components/Loader";

type Metadata = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

export default function Home() {
  const [heroes, setHeroes] = useState([]);
  const [moments, setMoments] = useState([]);
  const [trendingDesigns, setTrendingDesigns] = useState([]);

  const [loading, setLoading] = useState(true);
  const [bachatMahotsavImages, setBachatMahotsavImages] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const [heroData, momentData, trendingData, bachatData, metadataData] = await Promise.all([
          getHeroes(),
          getMoments(),
          getTrendingDesigns(),
          getBachatMahotsavImages(),
          getMetadataByPage("home"),
        ]);

        setHeroes(heroData);
        setMoments(momentData);
        setTrendingDesigns(trendingData);
        setBachatMahotsavImages(bachatData);
        setMetadata(metadataData);
      } catch (error) {
        console.error("Error fetching home page data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (!BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL in .env.local");
  }
  if (loading) return <Loader />;
  return (
    <>
      {metadata && (
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />
          <meta property="og:title" content={metadata.ogTitle} />
          <meta property="og:description" content={metadata.ogDescription} />
          <meta property="og:image" content={`${BASE_URL}${metadata.ogImage}`} />
        </Head>
      )}
      <Popup />
      <Hero />
      <ShopbyStyle />
      <VideoSection />
      <Products />
      <TopTrendingDesigns initialDesigns={trendingDesigns} />
      <Testimonials />
    </>
  );
}
