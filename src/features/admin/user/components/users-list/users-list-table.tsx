import {
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useColumnFiltered } from '@/hooks';
import { tokens } from '@/lang';
import { removeQuery } from '@/utils';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagStatus } from '@components/show-tag-status';
import { TagTooltipListChild } from '@components/tag-tooltip-list-child';
import { IntlMessage } from '@utilComponents/intl-message';

import { User } from '../../types';

type MenuAction = {
  onView: (user: User) => void;
};

export type UsersTableProps = MenuAction & {
  dataSource: User[];
  isLoading: boolean;
  onSearch: (search: string) => void;
  total?: number;
};
export const UsersTable = ({
  dataSource,
  onView,
  isLoading,
  onSearch,
  total,
}: UsersTableProps) => {
  const router = useRouter();

  const menu = (user: User, action: MenuAction) => {
    return [
      {
        key: 'view',
        label: 'Edit',
        icon: <EditOutlined />,
        onClick: () => action.onView(user),
      },
    ];
  };
  const statusItems = [
    {
      label: 'Active',
      key: 'active',
      color: '#04D182',
    },
    {
      label: 'Inactive',
      key: 'inactive',
      color: '#FF4B4B',
    },
  ];
  const getUserColumns = (
    action: MenuAction
  ): ColumnsType<User> => {
    return [
      {
        title: (
          <IntlMessage id="admin.userManagement.user.table.Id" />
        ),
        dataIndex: 'userId',
        key: 'userId',
        align: 'left',
        width: 230,
        fixed: 'left',
      },
      {
        title: (
          <IntlMessage id="admin.userManagement.user.table.name" />
        ),
        key: 'name',
        width: 200,
        fixed: 'left',
        render: (user: User) => (
          <Link
            href={`${removeQuery(router.asPath)}/${
              user.userId
            }`}
          >
            {user?.first_name} {user?.last_name}
          </Link>
        ),
      },

      {
        title: (
          <IntlMessage id="admin.userManagement.user.table.email" />
        ),
        key: 'email',
        dataIndex: 'email',
        width: 200,
      },
      {
        title: (
          <IntlMessage id="admin.userManagement.user.table.tel" />
        ),
        key: 'phone_number',
        dataIndex: 'phone_number',
        width: 130,
      },
      {
        title: (
          <IntlMessage id="admin.userManagement.user.table.organization" />
        ),
        dataIndex: 'organization_labels',
        key: 'organization_labels',
        width: 150,
        render: (Organization: string[]) => (
          <TagTooltipListChild
            list={Organization ?? []}
          />
        ),
      },
      {
        title: (
          <IntlMessage id="admin.userManagement.user.table.employeeClassification" />
        ),
        key: 'employee_classification',
        dataIndex: 'employee_classification',
        width: 150,
        align: 'center',
      },
      {
        title: (
          <IntlMessage id="admin.userManagement.jobTitle" />
        ),
        key: 'job_label',
        dataIndex: 'job_label',
        width: 150,
        align: 'center',
      },
      {
        title: (
          <IntlMessage id="admin.userManagement.user.table.status" />
        ),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 150,
        render: (status: boolean) => (
          <ShowTagStatus
            status={`${status}`}
            items={statusItems}
          />
        ),
      },
      {
        title: (
          <IntlMessage id="admin.userManagement.user.table.agencies" />
        ),
        key: 'agencies',
        dataIndex: 'agencies_labels',
        width: 200,
        render: (agencies: string[]) => (
          <Typography.Text>
            {agencies.length < 1
              ? '-'
              : agencies.join(' / ')}
          </Typography.Text>
        ),
      },
      {
        key: 'action',
        align: 'right',
        fixed: 'right',
        width: 50,
        render: (user: User) => (
          <DropdownTable items={menu(user, action)} />
        ),
      },
    ];
  };
  const columns = getUserColumns({
    onView,
  });
  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });
  return (
    <>
      <Flex
        justifyContent={'between'}
        alignItems="center"
        className="mb-4"
      >
        <Flex alignItems="center">
          <Typography.Title level={4} className="mb-0">
            <IntlMessage id="admin.userManagement.user.title" />
          </Typography.Title>
          <Typography.Text
            className="ml-2"
            style={{
              fontSize: 14,
              fontWeight: 'normal',
            }}
          >
            {total ?? 0}{' '}
            <IntlMessage id={tokens.common.items} />
          </Typography.Text>
        </Flex>
        <Flex>
          <InputSearch
            className={css`
              margin-right: 10px !important;
            `}
            prefix={<SearchOutlined />}
            onSearch={onSearch}
          />

          {ColumnTransfer}
        </Flex>
      </Flex>
      <Table
        rowKey="userId"
        columns={filteredColumns}
        dataSource={dataSource}
        loading={isLoading}
        tableLayout="fixed"
        scroll={{ x: 1250 }}
        pagination={false}
      />
    </>
  );
};
