import type { GlobalConfig } from 'payload';

import { revalidateSettings } from '@/payload/globals/Settings/hooks/revalidateSettings';

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateSettings],
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Layout',
      fields: [
        {
          type: 'number',
          name: 'container',
          label: 'Container',
          required: true,
          defaultValue: 1440,
        },
        {
          type: 'number',
          name: 'horizontalPaddings',
          label: 'Horizontal paddings',
          required: true,
          defaultValue: 16,
        },
        {
          type: 'number',
          name: 'horizontalPaddingsDesktop',
          label: 'Horizontal paddings on desktop ( > 768px)',
          required: true,
          defaultValue: 32,
        },
      ],
    },
  ],
};
