import { revalidatePath } from 'next/cache';
import type { CollectionAfterChangeHook } from 'payload';

import { Page } from '@/payload-types';
import { getAllPosts, PAGE_SIZE } from '@/utils/posts';

export const revalidatePost: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/blog/${doc.slug}`;

    payload.logger.info(`Revalidating page at path: ${path}`);

    revalidatePath(path);
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/blog/${previousDoc.slug}`;

    payload.logger.info(`Revalidating old page at path: ${oldPath}`);

    revalidatePath(oldPath);
  }

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    const posts = await getAllPosts();
    const blogPagesNumber = Math.ceil(posts.length / PAGE_SIZE);
    revalidatePath('/blog');
    Array.from({ length: blogPagesNumber })
      .filter((_, index) => index)
      .forEach((_, index) => {
        revalidatePath(`/blog/${index + 2}`);
      });
  }

  return doc;
};
