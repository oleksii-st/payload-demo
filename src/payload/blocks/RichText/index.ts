import type { Block } from 'payload';

import { SECTION_LAYOUT } from '@/payload/fields/sectionLayout';

export const RichText: Block = {
  imageURL: '/api/media/file/RichText.png',
  slug: 'richText',
  labels: {
    singular: 'RichText',
    plural: 'RichTexts',
  },
  interfaceName: 'Richtext',
  fields: [
    {
      type: 'richText',
      name: 'content',
      label: 'Content',
      required: true,
    },
    SECTION_LAYOUT,
  ],
};
