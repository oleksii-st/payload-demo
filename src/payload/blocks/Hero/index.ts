import type { Block } from 'payload';

import { SECTION_LAYOUT } from '@/payload/fields/sectionLayout';

export const Hero: Block = {
  imageURL: '/api/media/file/Hero.png',
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  interfaceName: 'Hero',
  fields: [
    {
      type: 'upload',
      name: 'image',
      label: 'Image',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'text',
      name: 'heading',
      label: 'Heading',
      required: true,
    },
    {
      type: 'text',
      name: 'subheading',
      label: 'Subheading',
    },
    SECTION_LAYOUT({
      paddingTop: 0,
      breakpoints: [
        {
          minWidth: 767,
          paddingTop: 0,
          paddingBottom: 48,
        },
      ],
    }),
  ],
};
