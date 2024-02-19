import { z } from 'zod';

import {
  UserSchema,
  UserResponseSchema,
  CreateUserResponseSchema,
  CreateUserPayloadSchema,
  UserByIdResponseSchema,
  UserRoleSchema,
  UserRoleResponseSchema,
  AddRoleUserSchema,
  UserGroupSchema,
  UserGroupResponseSchema,
  AddGroupUserSchema,
  UserDepartmentSchema,
  UserDepartmentResponseSchema,
  UserDepartmentAllResponseSchema,
  UserDepartmentAllSchema,
  UserOrganizationResponseSchema,
  UserOrganizationSchema,
  SwitchOrganizationResponseSchema,
} from '../schemas';

export type User = z.infer<typeof UserSchema>;

export type ListUserResponse = z.infer<
  typeof UserResponseSchema
>;

export type CreateUserResponse = z.infer<
  typeof CreateUserResponseSchema
>;

export type CreateUserPayload = z.infer<
  typeof CreateUserPayloadSchema
>;

export type UserByIdResponse = z.infer<
  typeof UserByIdResponseSchema
>;

export type UserRole = z.infer<typeof UserRoleSchema>;

export type UserRoleResponse = z.infer<
  typeof UserRoleResponseSchema
>;

export type AddUserResponse = z.infer<
  typeof CreateUserResponseSchema
>;

export type AddRoleUserPayload = z.infer<
  typeof AddRoleUserSchema
>;

export type AddGroupUserPayload = z.infer<
  typeof AddGroupUserSchema
>;
export type UserGroup = z.infer<typeof UserGroupSchema>;

export type UserGroupResponse = z.infer<
  typeof UserGroupResponseSchema
>;
export type UserDepartment = z.infer<
  typeof UserDepartmentSchema
>;

export type UserDepartmentAll = z.infer<
  typeof UserDepartmentAllSchema
>;

export type UserDepartmentResponse = z.infer<
  typeof UserDepartmentResponseSchema
>;

export type UserDepartmentAllResponse = z.infer<
  typeof UserDepartmentAllResponseSchema
>;

export type UserOrganization = z.infer<
  typeof UserOrganizationSchema
>;

export type UserOrganizationResponse = z.infer<
  typeof UserOrganizationResponseSchema
>;

export type SwitchOrganizationResponse = z.infer<
  typeof SwitchOrganizationResponseSchema
>;
