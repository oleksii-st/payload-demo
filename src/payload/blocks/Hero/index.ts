import type { Block } from 'payload';

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
  ],
};
