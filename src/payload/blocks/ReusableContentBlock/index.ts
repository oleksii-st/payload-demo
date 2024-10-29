import type { Block } from 'payload';

export const ReusableContentBlock: Block = {
  slug: 'reusableContentBlock',
  interfaceName: 'ReusableContentBlock',
  fields: [
    {
      type: 'relationship',
      name: 'reusableContent',
      relationTo: 'reusable-content',
      label: 'Reusable content',
    },
  ],
};
