import { getMetadataByPage } from '@/lib/api';
import About from './About';

export async function generateMetadata() {
  try {
    const metadata = await getMetadataByPage('about');
    if (!metadata) {
      // Fallback metadata if API returns null
      return {
        title: 'About Us | Suvarnakala Pvt. Ltd',
        description:
          'Learn about Suvarnakala’s legacy in premium gold, diamond, and jadtar jewellery.',
      };
    }
    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      openGraph: {
        title: metadata.ogTitle,
        description: metadata.ogDescription,
        images: metadata.ogImage
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${metadata.ogImage}`
          : undefined,
      },
    };
  } catch (error) {
    console.error('Error fetching metadata for about page:', error);
    // Fallback metadata in case of error
    return {
      title: 'About Us | Suvarnakala Pvt. Ltd',
      description:
        'Learn about Suvarnakala’s legacy in premium gold, diamond, and jadtar jewellery.',
    };
  }
}

export default async function Page() {
  return <About />;
}
