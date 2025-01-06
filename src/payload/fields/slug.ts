import { Field } from 'payload';

import formatSlug from '@/utils/formatSlug';

type Slug = (fieldToUse?: string) => Field;

export const slugField: Slug = (fieldToUse = 'title') => {
  return {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    index: true,
    admin: {
      position: 'sidebar',
      components: {
        afterInput: '@/payload/components/PageLink',
      },
    },
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
  } as Field;
};
