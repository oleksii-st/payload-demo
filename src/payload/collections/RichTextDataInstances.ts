import type { CollectionConfig } from 'payload';

import { admins } from '@/payload/access/admins';

export const RichTextDataInstances: CollectionConfig = {
  slug: 'richTextDataInstances',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'value'],
  },
  access: {
    read: () => true,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      required: true,
    },
    {
      type: 'text',
      name: 'value',
      label: 'Value',
      required: true,
    },
  ],
};
