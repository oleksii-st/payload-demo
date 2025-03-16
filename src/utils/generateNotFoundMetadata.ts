import { Metadata } from 'next';

import { NotFound as NotFoundType } from '@/payload-types';
import { IS_PRODUCTION } from '@/utils/constants';
import { getCachedGlobal } from '@/utils/getGlobals';
import { mergeOpenGraph } from '@/utils/mergeOpenGraph';
import { robotsNoIndex } from '@/utils/robotsNoIndex';

export async function generateNotFoundMetadata(): Promise<Metadata> {
  const notFound: NotFoundType = (await getCachedGlobal('notFound', 2)()) as NotFoundType;

  const title = notFound?.meta?.title ?? '';
  const description = notFound?.meta?.description || '';
  const robots = getRobots();
  const ogImage = getOgImage(notFound?.meta?.image as string);

  return {
    title,
    description,
    alternates: { canonical: '/404' },
    openGraph: mergeOpenGraph({
      title,
      description,
      url: '/404',
      images: ogImage ? [{ url: ogImage }] : undefined,
    }),
    robots,
  };
}

export function getRobots(): object {
  return IS_PRODUCTION ? {} : robotsNoIndex;
}

function getOgImage(image: string | { url?: string } | undefined): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITEMAP_URL ?? '';
  const imageUrl = typeof image === 'string' ? image : (image?.url ?? '');
  return `${baseUrl}${imageUrl}`;
}
