import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, readdirSync, statSync } from 'fs';
import { Readable } from 'stream';
import path from 'path';
import { getProducts } from '../src/lib/api'; // Adjust if needed

const BASE_URL = 'http://skplsite.anaxistech.com';
const APP_DIR = path.join(process.cwd(), 'src', 'app');

// 1. Get static page routes
function getStaticRoutes(dir: string = APP_DIR, baseRoute = ''): string[] {
  const entries = readdirSync(dir);
  let routes: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (entry === 'api' || entry.startsWith('[')) continue;
      const nextRoute = `${baseRoute}/${entry}`.replace(/\/+/g, '/');
      routes = routes.concat(getStaticRoutes(fullPath, nextRoute));
    } else if (entry === 'page.tsx') {
      const cleanRoute = baseRoute === '' ? '/' : baseRoute;
      routes.push(cleanRoute);
    }
  }

  return routes;
}

// 2. Get product pages: /jewelry/{category}/{slug}
async function getProductRoutes(): Promise<string[]> {
  try {
    const products = await getProducts();
    return products.map(
      (p: { slug: string; category: string }) => `/jewelry/${p.category}/${p.slug}`,
    );
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
}

// 3. Fixed correct collection URLs
function getCollectionRoutes(): string[] {
  const categories = [
    'Bangles',
    'Bracelet',
    'Earring',
    'Managalsutra',
    'Necklace',
    'Pendant',
    'Rings',
  ];
  return categories.map((category) => `/collections/jewelry/${category}`);
}

// 4. Generate sitemap
async function generateSitemap() {
  const staticRoutes = getStaticRoutes();
  const productRoutes = await getProductRoutes();
  const collectionRoutes = getCollectionRoutes(); // ✅ use correct one

  const allRoutes = [...staticRoutes, ...productRoutes, ...collectionRoutes];

  const sitemapEntries = allRoutes.map((url) => ({
    url,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const xml = await streamToPromise(Readable.from(sitemapEntries).pipe(sitemap)).then((data) =>
    data.toString(),
  );

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const writeStream = createWriteStream(outputPath);
  writeStream.write(xml);
  writeStream.end();

  console.log(`✅ Sitemap generated with ${allRoutes.length} URLs at public/sitemap.xml`);
}

generateSitemap().catch((err) => {
  console.error('❌ Failed to generate sitemap:', err);
});
