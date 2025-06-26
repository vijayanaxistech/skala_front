import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fs from 'fs';
import path from 'path';
import { getProducts, getCategories } from '../src/lib/api';
import { routeDisplayNames } from '../src/lib/routeNames';

const BASE_URL = 'https://skalafront.anaxistech.com';

const getStaticRoutes = (): string[] => {
  return Object.keys(routeDisplayNames);
};

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

interface Category {
  name?: string;
  title?: string;
  slug?: string;
}

interface Product {
  title: string;
  // add other properties if needed
}

const getDynamicRoutes = async (): Promise<string[]> => {
  const routes: string[] = [];

  // Products
  const products: Product[] = await getProducts();
  products.forEach((product: Product) => {
    const slug = toSlug(product.title);
    routes.push(`/products/${slug}`);
  });

  // Events
  // Collections (categories)
  const categories: Category[] = await getCategories();
  categories.forEach((cat: Category) => {
    const slug = toSlug(cat.name || cat.title || cat.slug || '');
    routes.push(`/collections/${slug}`);
  });

  return routes;
};

const generateSitemap = async () => {
  const staticRoutes = getStaticRoutes();
  const dynamicRoutes = await getDynamicRoutes();

  const allRoutes = Array.from(new Set([...staticRoutes, ...dynamicRoutes]));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes
    .map((route) => {
      return `  <url>\n    <loc>${BASE_URL}${route}</loc>\n  </url>`;
    })
    .join('\n')}
</urlset>`;

  const filePath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(filePath, sitemap, 'utf8');
  console.log(`✅ Sitemap generated with ${allRoutes.length} routes.`);
};

generateSitemap().catch((err) => {
  console.error('❌ Error generating sitemap:', err);
});
