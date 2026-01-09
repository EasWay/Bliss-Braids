'use client';

import Head from 'next/head';

// Critical images that should be preloaded with highest priority
const CRITICAL_IMAGES = [
  '/images/configurator/Knotless braids.jpg',
  '/images/configurator/jumbo braids.jpg',
  '/images/configurator/spiral braids.jpg',
  '/images/configurator/Boho braids.jpg',
  '/images/configurator/base-model.png',
  '/images/portfolio/Knotless-1.jpg',
  '/images/Boho braids.jpg',
];

export default function HeadPreloader() {
  return (
    <Head>
      {/* Preload critical images */}
      {CRITICAL_IMAGES.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          // @ts-ignore - fetchpriority is a valid attribute
          fetchpriority="high"
        />
      ))}
      
      {/* Preload fonts */}
      <link
        rel="preload"
        href="/_next/static/css/app/layout.css"
        as="style"
      />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Head>
  );
}