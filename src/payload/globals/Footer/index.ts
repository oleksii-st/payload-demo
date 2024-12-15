import type { GlobalConfig } from 'payload';

import { INLINE_RICH_TEXT } from '@/payload/fields/inlineRichText';
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
    INLINE_RICH_TEXT({
      name: 'copyrightMessage',
      label: 'Copyright',
    }),
  ],
};
