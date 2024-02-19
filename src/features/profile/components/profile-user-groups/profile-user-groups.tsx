import { Card } from 'antd';

import { FallbackError } from '@utilComponents/fallback-error';

import { useGetUserGroup } from '../../api/getUserGroup';

import { UserGroupTables } from './user-group-tables';

export const ProfileUserGroups = () => {
  const { data, isLoading, isError } = useGetUserGroup();

  return (
    <FallbackError isError={isError}>
      <Card>
        <UserGroupTables
          loading={isLoading}
          dataSource={data?.data ?? []}
        />
      </Card>
    </FallbackError>
  );
};
