import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bliss Braids - Professional Braiding Salon',
    short_name: 'Bliss Braids',
    description: 'Professional braiding services in Accra, Ghana. Book your appointment for knotless braids, box braids, and cornrows.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#F50057',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}