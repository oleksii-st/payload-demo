import type { GlobalConfig } from 'payload';

import { revalidateBlog } from '@/payload/globals/Blog/hooks/revalidateBlog';

export const Blog: GlobalConfig = {
  slug: 'blog',
  typescript: {
    interface: 'Blog',
  },
  graphQL: {
    name: 'Blog',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateBlog],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      defaultValue: 'Blog',
    },
  ],
};
