import type { CollectionConfig } from 'payload';

import { admins } from '@/payload/access/admins';
import { adminsOrPublished } from '@/payload/access/adminsOrPublished';
import { populatePublishedAt } from '@/payload/collections/Posts/hooks/populatePublishedAt';
import { revalidatePost } from '@/payload/collections/Posts/hooks/revalidatePost';
import { slugField } from '@/payload/fields/slug';
import { generatePreviewPath } from '@/utils/generatePreviewPath';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => generatePreviewPath({ path: `/blog/${doc.slug}` }),
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidatePost],
    beforeChange: [populatePublishedAt],
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'image',
      label: 'Image',
      required: true,
    },
    {
      type: 'richText',
      name: 'content',
      label: 'Content',
      required: true,
    },
    slugField(),
  ],
};
