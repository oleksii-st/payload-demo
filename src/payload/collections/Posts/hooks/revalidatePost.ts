import { revalidatePath } from 'next/cache';
import type { CollectionAfterChangeHook } from 'payload';

import { Page } from '@/payload-types';

export const revalidatePost: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/blog/${doc.slug}`;

    payload.logger.info(`Revalidating page at path: ${path}`);

    revalidatePath(path);
    revalidatePath('/blog');
    revalidatePath('/blog/[page]');
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/blog/${previousDoc.slug}`;

    payload.logger.info(`Revalidating old page at path: ${oldPath}`);

    revalidatePath(oldPath);
    revalidatePath('/blog');
    revalidatePath('/blog/[page]');
  }

  return doc;
};
