import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const adminQueryKeys = createQueryKeyStore({
  role: {
    all: null,
    detail: (roleId: string) => [roleId],
    permissions: (roleId: string) => [roleId],
    platform: (
      briefRepresentation: boolean,
      group_level: string
    ) => [briefRepresentation, group_level],
    permission: (roleId: string) => [roleId],
  },
  organizationDetail: {
    info: null,
    levels: null,
    level: (levelId: string) => [levelId],
  },
  organizationManagement: {
    all: null,
    detail: (organizationId: string) => [organizationId],
    users: (organizationId: string) => [organizationId],
  },
  password: {
    all: null,
  },
  logs: {
    all: (
      filter: string,
      search: string,
      page: number,
      pageSize: number
    ) => [filter, search, page, pageSize],
  },
  user: {
    all: null,
    permission: null,
    organization: null,
    permissions: (
      moduleName?: string,
      productName?: string,
      onlyAccessModule?: boolean
    ) => [
      moduleName ?? '',
      productName ?? '',
      onlyAccessModule ?? false,
    ],
    accessMoule: null,
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
  jobTitle: {
    all: null,
    detail: (positionId: string) => [positionId],
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
  config: {
    smtp: null,
  },
});
