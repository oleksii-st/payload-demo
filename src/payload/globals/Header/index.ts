import type { GlobalConfig } from 'payload';

import { revalidateHeader } from '@/payload/globals/Header/hooks/revalidateHeader';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateHeader],
  },
  fields: [
    {
      label: 'Logo',
      name: 'logo',
      type: 'text',
      required: true,
      defaultValue: 'PAYLOAD_DEMO',
    },
  ],
};
