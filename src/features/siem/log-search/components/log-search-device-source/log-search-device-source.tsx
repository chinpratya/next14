import {
  LogSearchFilter,
  LogSearchList,
} from '@/features/log-management';

export const LogSearchDeviceSource = () => {
  return (
    <>
      <LogSearchFilter />
      <LogSearchList />
    </>
  );
};
