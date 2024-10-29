import type { FieldAccess } from 'payload';

import { checkRole } from '@/payload/collections/Users/checkRole';

export const admins: FieldAccess = ({ req: { user } }) => {
  if (!user) return false;
  return checkRole(['admin'], user);
};
