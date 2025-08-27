import { getMetadataByPage } from '@/lib/api';
import Investment from './Investment';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export async function generateMetadata() {
  try {
    const metadata = await getMetadataByPage('investment');
    if (!metadata) {
      return {
        title: 'Investment | Suvarnakala Pvt. Ltd',
        description: 'Learn about Suvarnakala’s legacy in premium gold, diamond, and jadtar jewellery.',
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
    return {
      title: 'About Us | Suvarnakala Pvt. Ltd',
      description: 'Learn about Suvarnakala’s legacy in premium gold, diamond, and jadtar jewellery.',
    };
  }
}

export default async function Page() {
  return (
    <ClientLayoutWrapper>
      <Investment />
    </ClientLayoutWrapper>
  );
}
