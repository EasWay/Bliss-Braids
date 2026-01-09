import { Metadata } from 'next';
import { BookingProvider } from '@/context/BookingProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import BookingPageClient from '@/components/booking/BookingPageClient';

export const metadata: Metadata = {
  title: 'Book Appointment',
  description: 'Book your braiding appointment with our easy step-by-step booking wizard. Choose your style, size, length and get instant pricing for knotless braids, box braids, and cornrows.',
  keywords: [
    'book braiding appointment Accra',
    'braiding booking Ghana',
    'schedule braids appointment',
    'knotless braids booking',
    'box braids appointment Accra'
  ],
  alternates: {
    canonical: '/booking',
  },
  openGraph: {
    title: 'Book Your Braiding Appointment - Bliss Braids',
    description: 'Easy online booking for professional braiding services in Accra. Get instant pricing and schedule your appointment.',
    url: 'https://blissbraids.com/booking',
    images: [
      {
        url: '/og-booking.jpg',
        width: 1200,
        height: 630,
        alt: 'Book Your Braiding Appointment at Bliss Braids',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Your Braiding Appointment - Bliss Braids',
    description: 'Easy online booking for professional braiding services in Accra',
    images: ['/og-booking.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingPage() {
  return (
    <ErrorBoundary>
      <PerformanceMonitor />
      <ToastProvider>
        <BookingProvider>
          <BookingPageClient />
        </BookingProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
