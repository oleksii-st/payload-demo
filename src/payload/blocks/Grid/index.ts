import type { Block } from 'payload';

import { SECTION_LAYOUT } from '@/payload/fields/sectionLayout';

export const Grid: Block = {
  imageURL: '/api/media/file/Grid.png',
  slug: 'grid',
  labels: {
    singular: 'Grid',
    plural: 'Grids',
  },
  interfaceName: 'Grid',
  fields: [
    {
      type: 'text',
      name: 'heading',
      label: 'Heading',
    },
    {
      type: 'array',
      name: 'images',
      label: 'Images',
      minRows: 1,
      fields: [
        {
          type: 'upload',
          relationTo: 'media',
          name: 'icon',
          label: 'Icon',
          required: true,
        },
      ],
    },
    SECTION_LAYOUT,
  ],
};
