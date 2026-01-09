import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import ImagePreloader from "@/components/ImagePreloader";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { OptimizedScripts } from "@/components/ui/OptimizedScripts";
import { PerformanceMonitor } from "@/components/ui/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bliss Braids - Professional Braiding Salon in Accra | Knotless, Box Braids",
    template: "%s | Bliss Braids"
  },
  description: "Expert braiding services in Pobiman, Accra. Specializing in knotless braids, box braids, and cornrows. Book your appointment today!",
  keywords: [
    "braiding salon Accra",
    "knotless braids Ghana", 
    "box braids Pobiman",
    "cornrows Accra",
    "hair braiding Ghana",
    "professional braids",
    "African hair braiding",
    "protective hairstyles Ghana"
  ],
  authors: [{ name: "Bliss Braids" }],
  creator: "Bliss Braids",
  publisher: "Bliss Braids",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://blissbraids.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://blissbraids.com',
    siteName: 'Bliss Braids',
    title: "Bliss Braids - Accra's Premier Braiding Studio",
    description: 'Professional braiding services in a private studio. Specializing in knotless braids, box braids, and cornrows in Pobiman, Accra.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bliss Braids - Professional Braiding Salon in Accra',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bliss Braids - Accra's Premier Braiding Studio",
    description: 'Professional braiding services in a private studio',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://blissbraids.com/#business",
  "name": "Bliss Braids",
  "alternateName": "Bliss Braids Salon",
  "description": "Professional braiding salon specializing in knotless braids, box braids, and cornrows in Accra, Ghana",
  "url": "https://blissbraids.com",
  "telephone": "+233XXXXXXXXX",
  "priceRange": "₵₵",
  "image": [
    "https://blissbraids.com/og-image.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pobiman",
    "addressRegion": "Greater Accra",
    "addressCountry": "GH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 5.6037,
    "longitude": -0.1870
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 5.6037,
      "longitude": -0.1870
    },
    "geoRadius": "25000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Braiding Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Knotless Braids",
          "description": "Gentle, natural-looking protective braids"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Box Braids",
          "description": "Classic protective braiding style"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Cornrows",
          "description": "Traditional close-to-scalp braiding"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "sameAs": [
    "https://www.instagram.com/blissbraids",
    "https://www.facebook.com/blissbraids"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Preload critical resources */}
        <link rel="preload" href="/images/hero-video.mp4" as="video" type="video/mp4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ErrorBoundary>
          <PerformanceMonitor />
          <ImagePreloader />
          <ResponsiveLayout>
            {children}
          </ResponsiveLayout>
          <OptimizedScripts />
        </ErrorBoundary>
      </body>
    </html>
  );
}
