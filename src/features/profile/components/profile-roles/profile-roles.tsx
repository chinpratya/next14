import { Card } from 'antd';

import { FallbackError } from '@utilComponents/fallback-error';

import { useGetRole } from '../../api/getRole';

import { RolesTable } from './roles-table';

export const ProfileRoles = () => {
  const { data, isLoading, isError } = useGetRole();

  return (
    <FallbackError isError={isError}>
      <Card>
        <RolesTable
          loading={isLoading}
          dataSource={data?.data ?? []}
        />
      </Card>
    </FallbackError>
  );
};
