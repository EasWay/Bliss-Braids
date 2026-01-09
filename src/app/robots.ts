import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/booking/success/', '/api/'],
    },
    sitemap: 'https://blissbraids.com/sitemap.xml',
  }
}