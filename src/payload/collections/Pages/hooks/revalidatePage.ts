import { revalidatePath } from 'next/cache';
import type { CollectionAfterChangeHook } from 'payload';

import { Page } from '@/payload-types';
import { getPageSlug } from '@/utils/getPageSlug';

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : getPageSlug(doc.breadcrumbs as { url?: string }[]);

    payload.logger.info(`Revalidating page at path: ${path}`);

    revalidatePath(path);
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath =
      previousDoc.slug === 'home'
        ? '/'
        : getPageSlug(previousDoc.breadcrumbs as { url?: string }[]);

    payload.logger.info(`Revalidating old page at path: ${oldPath}`);

    revalidatePath(oldPath);
  }

  return doc;
};
