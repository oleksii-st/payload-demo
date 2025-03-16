import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';

export const revalidateBlog: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating blog`);

  revalidateTag('global_blog');

  return doc;
};
