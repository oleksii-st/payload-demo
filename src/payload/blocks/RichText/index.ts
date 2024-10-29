import type { Block } from 'payload';

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
  ],
};
