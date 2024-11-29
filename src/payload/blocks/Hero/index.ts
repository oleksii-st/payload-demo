import type { Block } from 'payload';

import { INLINE_RICH_TEXT } from '@/payload/fields/inlineRichText';
import { SECTION_LAYOUT } from '@/payload/fields/sectionLayout';
import { SIMPLE_RICH_TEXT } from '@/payload/fields/simpleRichText';

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
    INLINE_RICH_TEXT({
      name: 'heading',
      label: 'Heading',
      required: true,
    }),
    SIMPLE_RICH_TEXT(),
    SECTION_LAYOUT({
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
