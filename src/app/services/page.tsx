import { Metadata } from 'next';
import ServicesPageWrapper from '@/components/services/ServicesPageWrapper';

export const metadata: Metadata = {
  title: 'Braiding Services & Pricing | Bliss Braids Accra',
  description: 'Professional braiding services in Accra including knotless braids, box braids, cornrows, and protective hairstyles. View our pricing and book your appointment.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return <ServicesPageWrapper />;
}