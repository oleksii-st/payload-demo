import { CollectionConfig } from 'payload';

import { admins } from '@/payload/access/admins';
import { anyone } from '@/payload/access/anyone';
import adminsAndUser from '@/payload/collections/Users/access/adminsAndUsers';
import { checkRole } from '@/payload/collections/Users/checkRole';
import { ensureFirstUserIsAdmin } from '@/payload/collections/Users/hooks/ensureFirstUserIsAdmin';
import { loginAfterCreate } from '@/payload/collections/Users/hooks/loginAfterCreate';

const Index: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
};

export default Index;
