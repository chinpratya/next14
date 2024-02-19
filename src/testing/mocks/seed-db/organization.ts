import { testData } from '../../test-data';
import { db } from '../db';

export const organizationSeedDb = () => {
  testData?.organization.user.auth.sessions.forEach(
    (item) => db.organizationUserAuthSession.create(item)
  );
  testData?.organization.user.auth.userGroups.forEach(
    (item) =>
      db.organizationUserAuthUserGroup.create(item)
  );
  testData?.organization.user.auth.roles.forEach((item) =>
    db.organizationUserAuthRole.create(item)
  );
  testData?.organization.user.org.group.list?.forEach(
    (item) => {
      db.organizationUserOrgGroup.create({
        ...item,
      });
    }
  );
  testData?.organization.user.org.group.listRole?.forEach(
    (item) => db.organizationUserOrgGroupRole.create(item)
  );
  testData?.organization.user.org.group.listMember?.forEach(
    (item) =>
      db.organizationUserOrgGroupMember.create(item)
  );
  testData?.organization.user.org.prefix.list?.forEach(
    (item) => db.organizationUserOrgPrefix.create(item)
  );
  testData?.organization.user.org.position.list?.forEach(
    (item) => db.organizationUserOrgPosition.create(item)
  );
  testData?.organization.user.org.role?.forEach((role) =>
    db.organizationUserOrgRole.create(role)
  );
  db.organizationUserAuthInfo.create(
    testData.organization.user.auth.info
  );
  db.organizationInitPassword.create(
    testData.organization.user.org.initPassword
  );
  db.organizationInitPasswordExternal.create(
    testData.organization.user.org.initPasswordExternal
  );
  const processUserOrgDepartment = (
    department: any,
    departmentHead?: string,
    underDepartment?: string
  ) => {
    department?.sub_department?.forEach((item: any) =>
      processUserOrgDepartment(
        item,
        item.department_head,
        item.under_department
      )
    );
    db.organizationUserOrgDepartment.create({
      ...department,
      department_head: departmentHead,
      under_department: underDepartment,
    });
  };

  testData?.organization?.user?.org?.department.forEach(
    (item) => processUserOrgDepartment(item)
  );

  const processUserOrgLevel = (
    level: any,
    underId?: string
  ) => {
    level?.child?.forEach((item: any) =>
      processUserOrgLevel(item, level.level_id)
    );
    db.organizationUserOrgLevel.create({
      ...level,
      under_id: underId ?? '',
    });
  };

  testData?.organization?.user?.org?.level.forEach(
    (item) => processUserOrgLevel(item)
  );

  testData?.organization.user.org.users.listUser?.forEach(
    (item) => {
      db.organizationUserOrgUsers.create(item);
    }
  );
  testData?.organization.user.org.users.listUserRole?.forEach(
    (item) => db.organizationUserOrgUserRole.create(item)
  );
  testData?.organization.user.org.users.listUserDepartMent?.forEach(
    (item) =>
      db.organizationUserOrgUserDepartMent.create(item)
  );
  testData?.organization.user.org.users.listUserGroup?.forEach(
    (item) => db.organizationUserOrgUserGroup.create(item)
  );
  db.organizationUserOrgInfo.create(
    testData.organization.user.org.info
  );

  testData?.organization.user.org.audit.listAudit?.forEach(
    (item) => db.organizationAuditLog.create(item)
  );
};
