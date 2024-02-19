import {
  organizationUserAuthInfoHandlers,
  organizationUserAuthRoleHandlers,
  organizationUserAuthSessionHandlers,
  organizationUserAuthUserGroupHandlers,
  organizationUserAuthMetaHandlers,
  organizationUserAuthSendSmsOtpHandlers,
} from './auth';
import {
  organizationUserOrgGroupHandlers,
  organizationUserOrgDepartmentHandlers,
  organizationUserOrgInfoHandlers,
  organizationUserOrgPositionHandlers,
  organizationUserOrgPrefixHandlers,
  organizationUserOrgRoleHandlers,
  organizationUserOrgLevelHandlers,
  OrganizationAdminLogHandlers,
  organizationInitPasswordHandlers,
  organizationUserOrgPermissionHandlers,
} from './org';
import { OrganizationUserHandlers } from './org/users';
import { organizationUserSigninHandlers } from './signin';
import { organizationUserSignupHandlers } from './signup';

export const organizationUserHandlers = [
  ...organizationUserAuthInfoHandlers,
  ...organizationUserAuthRoleHandlers,
  ...organizationUserAuthSessionHandlers,
  ...organizationUserAuthUserGroupHandlers,
  ...organizationUserAuthMetaHandlers,
  ...organizationUserOrgGroupHandlers,
  ...organizationUserOrgDepartmentHandlers,
  ...organizationUserOrgInfoHandlers,
  ...organizationUserOrgPositionHandlers,
  ...organizationUserOrgPrefixHandlers,
  ...organizationUserOrgRoleHandlers,
  ...organizationUserOrgLevelHandlers,
  ...organizationUserSigninHandlers,
  ...organizationUserSignupHandlers,
  ...OrganizationUserHandlers,
  ...organizationUserAuthSendSmsOtpHandlers,
  ...OrganizationAdminLogHandlers,
  ...organizationInitPasswordHandlers,
  ...organizationUserOrgPermissionHandlers,
];
