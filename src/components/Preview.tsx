'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';

import { Blocks } from '@/components/Blocks';
import { Page } from '@/payload-types';
import { BASE_URL } from '@/utils/constants';

export const Preview = ({ initial }: { initial: Page }) => {
  const { data: page } = useLivePreview<Page>({
    initialData: initial,
    serverURL: BASE_URL,
    depth: 2,
  });

  return (
    <>
      <Blocks blocks={page.layout} />
    </>
  );
};
