import { User } from 'payload';

export const checkRole = (allRoles: User['roles'] = [], user?: User | null): boolean => {
  if (user) {
    if (
      allRoles.some((role: string) => {
        return user?.roles?.some((individualRole: string) => {
          return individualRole === role;
        });
      })
    )
      return true;
  }

  return false;
};
