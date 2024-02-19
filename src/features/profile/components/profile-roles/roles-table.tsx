import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { NoneProfile } from '@components/none-profile';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { Role } from '../../types';

export type RolesTableProps = {
  loading?: boolean;
  dataSource: Role[];
};

const getRolesColumns = (): ColumnsType<Role> => {
  return [
    {
      title: (
        <IntlMessage id="profile.setting.role.name" />
      ),
      dataIndex: 'name',
      width: 400,
    },
    {
      title: (
        <IntlMessage id="profile.setting.role.description" />
      ),
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 350,
    },
    {
      title: (
        <IntlMessage id="profile.setting.role.createdBy" />
      ),
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
      width: 150,
      render: (createdBy) => (
        <NoneProfile title={createdBy} />
      ),
    },
    {
      title: (
        <IntlMessage id="profile.setting.role.createdAt" />
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 250,
      render: (createdAt) => (
        <ShowTagDate date={createdAt} />
      ),
    },
  ];
};

export const RolesTable = ({
  loading,
  dataSource,
}: RolesTableProps) => {
  return (
    <Table
      tableLayout="fixed"
      scroll={{
        x: 1150,
      }}
      loading={loading}
      columns={getRolesColumns()}
      dataSource={dataSource}
      rowKey="roleId"
    />
  );
};
