import type { GlobalConfig } from 'payload';

import { revalidateGlobal } from '@/payload/globals/hooks/revalidateGlobal';

export const Search: GlobalConfig = {
  slug: 'searchTemplate',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal('searchTemplate')],
  },
  fields: [],
};
