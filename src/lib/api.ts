import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHeroes = async () => {
  const res = await API.get('/api/heroes');
  return res.data.heroes || [];
};

export const getTestimonials = async () => {
  const res = await API.get('/api/testimonials');
  return res.data.testimonials || [];
};
// api.ts
export const fetchGoldRates = async () => {
  const res = await fetch(`${BASE_URL}/api/rate`);
  if (!res.ok) {
    throw new Error('Failed to fetch gold rates');
  }
  return res.json();
};

// lib/api.ts
export async function getProductBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) return null;
  const products = await res.json();
  // Find product where title (converted to slug) matches the provided slug
  const product = products.find((p: any) => p.title.toLowerCase().replace(/\s+/g, '-') === slug);
  return product || null;
}

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/api/productscategories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

// api.ts
export const getDefaultBreadcrumbBanner = async () => {
  try {
    const res = await API.get('/api/collectionbanner');
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error('Error fetching default breadcrumb banner:', err);
    return [];
  }
};

export const getMoments = async () => {
  const res = await API.get('/api/moments');
  return res.data.moments || [];
};

type BachatMahotsav = {
  imagePath: string;
  // add other properties if needed
};

export const getBachatMahotsavImages = async (): Promise<string[]> => {
  const res = await API.get('/api/bachatMahotsav');
  return (res.data.bachatMahotsavs || []).map((item: BachatMahotsav) => {
    const imagePath = item.imagePath;
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}/${imagePath}`;
  });
};

export const getTrendingDesigns = async () => {
  const res = await API.get('/api/trendingdesigns');
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

export const getProducts = async () => {
  try {
    const res = await API.get('/api/products');
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await API.get(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return null;
  }
};

export const getEvents = async () => {
  try {
    const res = await API.get('/api/events');
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error('Error fetching events:', err);
    return [];
  }
};

export const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const res = await API.post('/api/contact', formData);
  return res.data;
};

export const sendAppointment = async (formData: {
  name: string;
  email: string;
  mobile: string;
  city: string;
  store: string;
  date: string;
  jewelry: string;
  message: string;
}) => {
  try {
    const res = await API.post('/api/sendappointment', formData);
    return res.data;
  } catch (err) {
    console.error('Error sending appointment request:', err);
    throw err;
  }
};
//navbar api
export const getNavbar = async () => {
  try {
    const res = await API.get('/api/navbar');
    // Filter for links with show: true
    return Array.isArray(res.data) ? res.data.filter((link: any) => link.show === true) : [];
  } catch (err) {
    console.error('Error fetching navbar data:', err);
    return [];
  }
};
//meta  data api
export const getMetadataByPage = async (page: string) => {
  try {
    const res = await API.get(`/api/metadata/${page}`);
    return res.data || null;
  } catch (err) {
    console.error(`Error fetching metadata for page "${page}":`, err);
    return null;
  }
};

export default API;
