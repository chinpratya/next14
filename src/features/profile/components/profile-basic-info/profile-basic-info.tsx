import { LogonDevices } from '../logon-devices';
import { ProfileInfoManage } from '../profile-info-manage';
import { TimeAndRegionSetting } from '../time-and-region-setting';

export const ProfileBasicInfo = () => {
  return (
    <>
      <ProfileInfoManage />
      <TimeAndRegionSetting />
      <LogonDevices />
    </>
  );
};
