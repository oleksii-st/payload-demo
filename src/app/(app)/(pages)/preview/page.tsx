import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { draftMode } from 'next/headers';
import { cache } from 'react';

import { PayloadRedirects } from '@/components/PayloadRedirects';
import { Preview } from '@/components/Preview';
import { Page as PageType } from '@/payload-types';

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const Page = async ({ params }: PageProps) => {
  const { slug = ['home'] } = await params;
  const page = await queryPageBySlug(slug);

  if (!page) {
    return <PayloadRedirects url={'/' + slug.join('/')} />;
  }

  return <Preview initial={page as PageType} />;
};

export default Page;

const queryPageBySlug = cache(async (slug: string[]) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayloadHMR({ config: configPromise });

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
