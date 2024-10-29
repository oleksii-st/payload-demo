import { MetadataRoute } from 'next';

import { BASE_URL, IS_PRODUCTION } from '@/utils/constants';

export default function robots(): MetadataRoute.Robots {
  if (IS_PRODUCTION) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${BASE_URL}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
