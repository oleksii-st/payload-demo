import type { CollectionConfig } from 'payload';

import { admins } from '@/payload/access/admins';
import { adminsOrPublished } from '@/payload/access/adminsOrPublished';
import { Grid } from '@/payload/blocks/Grid';
import { Hero } from '@/payload/blocks/Hero';
import { ReusableContentBlock } from '@/payload/blocks/ReusableContentBlock';
import { RichText } from '@/payload/blocks/RichText';
import { populatePublishedAt } from '@/payload/collections/Pages/hooks/populatePublishedAt';
import { revalidatePage } from '@/payload/collections/Pages/hooks/revalidatePage';
import { slugField } from '@/payload/fields/slug';
import { generatePreviewPath } from '@/utils/generatePreviewPath';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) =>
      generatePreviewPath({ path: `/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [Hero, Grid, RichText, ReusableContentBlock],
            },
          ],
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'disableIndex',
      label: 'Disable index',
      defaultValue: false,
    },
    slugField(),
  ],
};
