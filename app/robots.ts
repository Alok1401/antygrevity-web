import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/'], // Hide private user dashboard from Google
    },
    sitemap: 'https://antygrevity-web.vercel.app/sitemap.xml',
  };
}
