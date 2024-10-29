import type { CollectionConfig } from 'payload';

import { admins } from '@/payload/access/admins';
import { Grid } from '@/payload/blocks/Grid';
import { Hero } from '@/payload/blocks/Hero';
import { RichText } from '@/payload/blocks/RichText';

export const ReusableContent: CollectionConfig = {
  slug: 'reusable-content',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    update: admins,
    create: admins,
    delete: admins,
    readVersions: admins,
  },
  labels: {
    singular: 'Reusable Content',
    plural: 'Reusable Contents',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [Hero, Grid, RichText],
    },
  ],
};
