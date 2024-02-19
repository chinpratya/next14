import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const organizationQueryKeys = createQueryKeyStore({
  prefix: {
    all: null,
    detail: (prefixId: string) => ({
      queryKey: [prefixId],
    }),
  },
  jobtitle: {
    all: null,
    detail: (positionId: string) => [positionId],
  },
  role: {
    all: null,
    detail: (roleId: string) => [roleId],
  },
  unit: {
    all: null,
    detail: (departmentId: string) => [departmentId],
  },
  group: {
    all: null,
    detail: (groupId: string) => [groupId],
    users: (groupId: string) => [groupId, 'users'],
    user: (groupId: string, userId: string) => [
      groupId,
      'users',
      userId,
    ],
    roles: (groupId: string) => [groupId, 'roles'],
    role: (groupId: string, roleId: string) => [
      groupId,
      'roles',
      roleId,
    ],
  },
  user: {
    all: null,
    detail: (userId: string) => [userId],
    department: (userId: string) => [userId],
    departmentAll: (expand: string) => [expand],
    roles: (userId: string) => [userId, 'roles'],
    role: (userId: string, roleId: string) => [
      userId,
      'roles',
      roleId,
    ],
    groups: (userId: string) => [userId, 'group'],
    group: (userId: string, roleId: string) => [
      userId,
      'group',
      roleId,
    ],
  },
  info: {
    all: null,
  },
  hcode: {
    detail: (hcode: string) => [hcode],
  },
});
