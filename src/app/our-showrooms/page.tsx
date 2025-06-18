import { getMetadataByPage } from '@/lib/api';
import OurShowroom from './OurShowroom';

export async function generateMetadata() {
  try {
    const metadata = await getMetadataByPage('ourshowrooms');
    if (!metadata) {
      // Fallback metadata if API returns null
      return {
        title: 'Our Showrooms | Suvarnakala Pvt. Ltd',
        description:
          'Explore Suvarnakala’s exquisite jewellery showrooms across India. Visit us today!',
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
    console.error('Error fetching metadata for ourshowrooms page:', error);
    // Fallback metadata in case of error
    return {
      title: 'Our Showrooms | Suvarnakala Pvt. Ltd',
      description:
        'Explore Suvarnakala’s exquisite jewellery showrooms across India. Visit us today!',
    };
  }
}

export default async function Page() {
  return <OurShowroom />;
}
