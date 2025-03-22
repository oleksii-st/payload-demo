import configPromise from '@payload-config';
import { getPayload } from 'payload';

import { IS_PRODUCTION } from '@/utils/constants';
import { getPageSlug } from '@/utils/getPageSlug';
import { getCachedRedirects } from '@/utils/getRedirects';
import { getAllPosts, PAGE_SIZE } from '@/utils/posts';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITEMAP_URL ?? '';
  if (!IS_PRODUCTION) {
    return [];
  }

  const dateFallback = new Date().toISOString();

  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  });
  const redirects = await getCachedRedirects()();

  const pagesMap = pages.docs
    .map((page) => {
      let url = getPageSlug(page.breadcrumbs);

      if (redirects.some((redirect) => redirect.from === url) || page.disableIndex) {
        return null;
      }

      if (url === '/home') {
        url = '';
      }

      url = baseUrl + url + '/';

      return {
        url,
        lastModified: page.updatedAt || dateFallback,
      };
    })
    .filter(Boolean);

  const posts = await getAllPosts();
  const postsMap = posts.map(({ slug, updatedAt }) => {
    return {
      url: baseUrl + `/blog/${String(slug)}`,
      lastModified: updatedAt || dateFallback,
    };
  });

  const staticPagesMap = [{ url: `${baseUrl}/blog`, lastModified: dateFallback }];

  const blogPagesNumber = Math.ceil(posts.length / PAGE_SIZE);

  const blogPagesMap = Array.from({ length: blogPagesNumber }, (_, i) => ({
    url: `${baseUrl}/blog/${i + 1}`,
    lastModified: dateFallback,
  })).filter((_, index) => index);

  return [...pagesMap, ...postsMap, ...staticPagesMap, ...blogPagesMap];
}
