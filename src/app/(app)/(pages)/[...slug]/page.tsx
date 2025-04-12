import configPromise from '@payload-config';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import { cache } from 'react';

import { Blocks } from '@/components/Blocks';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { IS_PRODUCTION } from '@/utils/constants';
import { generateNotFoundMetadata } from '@/utils/generateMetadata';
import { getPageSlug, getPageSlugParts } from '@/utils/getPageSlug';
import { mergeOpenGraph } from '@/utils/mergeOpenGraph';
import { robotsNoIndex } from '@/utils/robotsNoIndex';

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const Page = async ({ params }: PageProps) => {
  const { slug = ['home'] } = await params;
  const page = await queryPageBySlug(slug);

  if (!page) {
    return <PayloadRedirects url={'/' + slug.join('/')} />;
  }

  return (
    <>
      <Blocks blocks={page.layout} />
    </>
  );
};

export default Page;

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  });

  return pages.docs.map(({ breadcrumbs }) => ({
    slug: getPageSlugParts(breadcrumbs),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = ['home'] } = await params;
  const page = await queryPageBySlug(slug);

  if (!page) {
    return await generateNotFoundMetadata();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITEMAP_URL ?? '';

  const url = getCanonicalUrl(baseUrl, page?.breadcrumbs);
  const robots = getRobots(page?.disableIndex);
  const ogImage = getOgImage(baseUrl, page?.meta?.image);

  const title = page?.meta?.title ?? '';
  const description = page?.meta?.description || '';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: mergeOpenGraph({
      title,
      description,
      url: Array.isArray(slug) ? slug.join('/') : '/',
      images: ogImage ? [{ url: ogImage }] : undefined,
    }),
    robots,
  };
}

function getCanonicalUrl(baseUrl: string, breadcrumbs?: { url: string }[]): string {
  let url = getPageSlug(breadcrumbs!);
  url = url === '/home' ? '' : url;
  return `${baseUrl}${url}/`;
}

function getRobots(disableIndex?: boolean): object {
  return disableIndex || !IS_PRODUCTION ? robotsNoIndex : {};
}

function getOgImage(baseUrl: string, image: string | { url?: string }): string {
  const imageUrl = typeof image === 'string' ? image : (image?.url ?? '');
  return `${baseUrl}${imageUrl}`;
}

const queryPageBySlug = cache(async (slug: string[]) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 2,
    limit: 100,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug.at(-1),
      },
    },
  });

  return result.docs?.find((page) => page.breadcrumbs.at(-1)?.url === '/' + slug.join('/')) || null;
});
