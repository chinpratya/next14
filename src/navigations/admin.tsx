import { ADMIN_PATH } from '@/config/modules';
import { NavigationType } from '@/types';
import { PermissionFilled } from '@utilComponents/icon';

const path = `${ADMIN_PATH}`;

export const adminNavigation: NavigationType[] = [
  {
    key: 'admin',
    label: 'ผู้ดูแลระบบ',
    type: 'group',
    children: [
      {
        label: 'admin.userManagement',
        key: `${path}/user-management`,
        icon: <PermissionFilled />,
        children: [
          {
            label: 'admin.userManagement.user',
            key: `${path}/user-management/user`,
          },
          {
            label: 'admin.userManagement.jobTitle',
            key: `${path}/user-management/job-title`,
          },
          {
            label: 'admin.userManagement.agencies',
            key: `${path}/user-management/agencies`,
          },
        ],
      },
      {
        label: 'admin.log',
        key: `${path}/log`,
        icon: <PermissionFilled />,
        children: [
          {
            label: 'admin.log.accessLog',
            key: `${path}/log/access-log`,
          },
          {
            label: 'admin.log.auditLog',
            key: `${path}/log/audit-log`,
          },
        ],
      },
      {
        label: 'admin.businessSetting',
        key: `${path}/business-setting`,
        icon: <PermissionFilled />,
        children: [
          {
            label:
              'admin.businessSetting.roleAndPermission',
            key: `${path}/business-setting/role-and-permission`,
            type: 'group',
          },
          {
            label: 'admin.businessSetting.userGroup',
            key: `${path}/business-setting/user-group`,
          },
          {
            label: 'admin.businessSetting.role',
            key: `${path}/business-setting/role`,
          },
          {
            label:
              'admin.businessSetting.settingOrganization',
            key: `${path}/business-setting/setting-organization`,
            type: 'group',
          },
          {
            label:
              'admin.businessSetting.organizationDetail',
            key: `${path}/business-setting/organization-detail`,
          },
          {
            label:
              'admin.businessSetting.organizationManagement',
            key: `${path}/business-setting/organization-management`,
          },
          {
            label:
              'admin.businessSetting.settingPassword',
            key: `${path}/business-setting/setting-password`,
            type: 'group',
          },
          {
            label: 'admin.businessSetting.setPassword',
            key: `${path}/business-setting/set-password`,
          },
          {
            label: 'admin.config',
            key: `${path}/config`,
            type: 'group',
          },
          {
            label: 'admin.config.smtp',
            key: `${path}/config/smtp`,
          },
        ],
      },
    ],
  },
];
