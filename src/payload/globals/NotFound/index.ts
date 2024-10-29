import type { GlobalConfig } from 'payload';

import { revalidateNotFound } from '@/payload/globals/NotFound/hooks/revalidateNotFound';

export const NotFound: GlobalConfig = {
  slug: 'notFound',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateNotFound],
  },
  fields: [
    {
      type: 'text',
      name: 'heading',
      label: 'Heading',
      defaultValue: '404 Not Found',
    },
    {
      type: 'richText',
      name: 'description',
      label: 'Description',
    },
  ],
};
