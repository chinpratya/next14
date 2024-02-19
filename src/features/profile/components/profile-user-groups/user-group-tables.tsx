import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { IntlMessage } from '@utilComponents/intl-message';

import { UserGroup } from '../../types';

export type UserGroupTablesProps = {
  loading: boolean;
  dataSource: UserGroup[];
};

const getUserGroupColumns =
  (): ColumnsType<UserGroup> => {
    return [
      {
        title: (
          <IntlMessage id="profile.setting.userGroup.name" />
        ),
        dataIndex: 'name',
        key: 'name',
        width: 300,
      },
      {
        title: (
          <IntlMessage id="profile.setting.userGroup.path" />
        ),
        dataIndex: 'path',
        key: 'path',
        width: 400,
      },
      {
        title: (
          <IntlMessage id="profile.setting.userGroup.description" />
        ),
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        width: 400,
      },
    ];
  };

export const UserGroupTables = ({
  loading,
  dataSource,
}: UserGroupTablesProps) => {
  return (
    <Table
      rowKey="id"
      tableLayout="fixed"
      scroll={{ x: 1100 }}
      loading={loading}
      dataSource={dataSource}
      columns={getUserGroupColumns()}
    />
  );
};
