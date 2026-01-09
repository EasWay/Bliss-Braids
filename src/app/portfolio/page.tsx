import { Metadata } from 'next';
import PortfolioPageWrapper from '@/components/portfolio/PortfolioPageWrapper';

export const metadata: Metadata = {
  title: 'Braiding Portfolio | Knotless Braids & Box Braids Gallery | Bliss Braids Accra',
  description: 'View our stunning braiding portfolio featuring knotless braids, box braids, cornrows, and protective hairstyles. Professional work by expert stylists in Accra, Ghana.',
  keywords: [
    'braiding portfolio Accra',
    'knotless braids gallery Ghana',
    'box braids photos Accra', 
    'cornrows gallery Spintex',
    'braiding styles Ghana',
    'protective hairstyles portfolio',
    'African braiding gallery',
    'braiding inspiration Accra',
    'hair braiding examples Ghana',
    'professional braids portfolio'
  ],
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Braiding Portfolio | Professional Work by Bliss Braids Accra',
    description: 'Explore our gallery of stunning knotless braids, box braids, and protective hairstyles created by expert stylists.',
    url: 'https://blissbraids.com/portfolio',
    siteName: 'Bliss Braids',
    images: [
      {
        url: '/og-portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'Bliss Braids Portfolio - Professional Braiding Work in Accra',
      }
    ],
    locale: 'en_GH',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return <PortfolioPageWrapper />;
}