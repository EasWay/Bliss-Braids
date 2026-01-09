import { Metadata } from 'next';
import ResponsiveHomePage from '@/components/home/ResponsiveHomePage';

export const metadata: Metadata = {
  title: 'Bliss Braids Accra - Private Studio for Knotless & Box Braids',
  description: 'Get your braids done in peace at our private studio in Pobiman. No crowded salons, no long waits. Just great hair, free Wi-Fi, and Netflix while you relax. Book your spot.',
  keywords: [
    'braiding salon Accra',
    'knotless braids Accra',
    'knotless braids Ghana', 
    'box braids Pobiman',
    'braiding salon Pobiman',
    'cornrows Accra',
    'hair braiding Ghana',
    'professional braids Accra',
    'African hair braiding',
    'protective hairstyles Ghana',
    'braiding studio Accra',
    'hair salon Pobiman',
    'braiding salon Accra',
    'best braiding salon Accra'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Bliss Braids Accra - Private Studio for Knotless & Box Braids",
    description: 'Get your braids done in peace at our private studio in Pobiman. No crowded salons, no long waits. Just great hair, free Wi-Fi, and Netflix. Book your spot.',
    url: 'https://blissbraids.com',
    siteName: 'Bliss Braids',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bliss Braids - Professional Braiding Salon in Pobiman, Accra',
      }
    ],
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bliss Braids - Luxury Braiding in Private Accra Studio",
    description: 'No waiting, no drama - just flawless hair in comfort. Netflix & Wi-Fi included.',
    images: ['/og-image.jpg'],
  },
};

export default function Home() {
  return <ResponsiveHomePage />;
}
