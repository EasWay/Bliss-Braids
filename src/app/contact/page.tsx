import { Metadata } from 'next';
import ContactPageWrapper from '@/components/contact/ContactPageWrapper';

export const metadata: Metadata = {
  title: 'Contact Bliss Braids | Braiding Salon in Pobiman, Accra | Location & Hours',
  description: 'Contact Bliss Braids braiding salon in Pobiman, Accra. Get directions, hours, and WhatsApp booking. Professional braiding services in a private studio.',
  keywords: [
    'braiding salon Pobiman',
    'contact Bliss Braids Accra',
    'braiding salon Pobiman Accra', 
    'hair salon Pobiman location',
    'braiding appointment Accra',
    'WhatsApp booking braids Ghana',
    'braiding salon hours Accra',
    'directions braiding salon Pobiman',
    'contact braiding stylist Accra',
    'braiding salon near me Accra'
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Bliss Braids | Braiding Salon in Pobiman, Accra',
    description: 'Visit our professional braiding salon in Pobiman, Accra. Easy booking via WhatsApp, convenient location.',
    url: 'https://blissbraids.com/contact',
    siteName: 'Bliss Braids',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Bliss Braids - Braiding Salon in Pobiman, Accra',
      }
    ],
    locale: 'en_GH',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageWrapper />;
}