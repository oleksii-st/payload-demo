import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';

export const revalidateGlobal = (global: string) => {
  return (({ doc, req: { payload } }) => {
    payload.logger.info(`Revalidating footer`);

    revalidateTag(`global_${global}`, {});

    return doc;
  }) as GlobalAfterChangeHook;
};
