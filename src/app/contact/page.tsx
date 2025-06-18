import { getMetadataByPage } from '@/lib/api';
import Contact from './Contact';

export async function generateMetadata() {
  try {
    const metadata = await getMetadataByPage('contact');
    if (!metadata) {
      // Fallback metadata if API returns null
      return {
        title: 'Contact Us | Suvarnakala Pvt. Ltd',
        description: 'Reach out to Suvarnakala for enquiries, support, or store information. We’re here to help!',
      };
    }
    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      openGraph: {
        title: metadata.ogTitle,
        description: metadata.ogDescription,
        images: metadata.ogImage ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${metadata.ogImage}` : undefined,
      },
    };
  } catch (error) {
    console.error('Error fetching metadata for contact page:', error);
    // Fallback metadata in case of error
    return {
      title: 'Contact Us | Suvarnakala Pvt. Ltd',
      description: 'Reach out to Suvarnakala for enquiries, support, or store information. We’re here to help!',
    };
  }
}

export default async function Page() {
  return <Contact />;
}