import type { GlobalConfig } from 'payload';

import link from '@/payload/fields/link';
import { revalidateFooter } from '@/payload/globals/Footer/hooks/revalidateFooter';
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateFooter],
  },
  fields: [
    {
      type: 'array',
      name: 'columns',
      label: 'Columns',
      fields: [
        {
          type: 'array',
          name: 'navItems',
          maxRows: 6,
          fields: [link()],
        },
      ],
    },
    {
      type: 'text',
      name: 'copyright',
      label: 'Copyright',
      defaultValue: '© {{year}}. Payload demo',
      admin: {
        description: 'Use {{year}} for current year',
      },
    },
  ],
};
