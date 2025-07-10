import { getMetadataByPage } from '@/lib/api';
import WhySuvarnakala from './WhySuvarnakala';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export async function generateMetadata() {
  try {
    const metadata = await getMetadataByPage('whyus');
    if (!metadata) {
      // Fallback metadata if API returns null
      return {
        title: 'Why-Us | Suvarnakala Pvt. Ltd',
        description: 'Explore why Suvarnakala is a trusted name in jewellery across India.',
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
    console.error('Error fetching metadata for why-us page:', error);
    // Fallback metadata in case of error
    return {
      title: 'Why-Us | Suvarnakala Pvt. Ltd',
      description: 'Explore why Suvarnakala is a trusted name in jewellery across India.',
    };
  }
}

export default async function Page() {
  return (
    <ClientLayoutWrapper>
      <WhySuvarnakala />
    </ClientLayoutWrapper>
  );
}
