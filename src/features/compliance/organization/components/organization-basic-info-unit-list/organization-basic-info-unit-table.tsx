import {
  DeleteOutlined,
  FileTextOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Button, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import {
  useColumnFiltered,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationInfo } from '../../types';

type OrganizationBasicInfoUnitTableProps = {
  dataSource?: OrganizationInfo[];
  loading: boolean;
  onCreate?: () => void;
  onDelete?: (unit: OrganizationInfo) => void;
};

export const OrganizationBasicInfoUnitTable = ({
  dataSource,
  loading,
  onCreate,
  onDelete,
}: OrganizationBasicInfoUnitTableProps) => {
  const router = useRouter();

  const editPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions[
        'pdpakit:compliance:organization:update'
      ],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions[
        'pdpakit:compliance:organization:delete'
      ],
    ],
  });

  const columns: ColumnsType<OrganizationInfo> = [
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.name" />
      ),
      key: 'name',
      ellipsis: true,
      fixed: 'left',
      width: 100,
      render: ({
        name,
        ObjectUUID,
      }: OrganizationInfo) => (
        <Typography.Link
          href={`${router.asPath}/institute/${ObjectUUID}`}
          disabled={!editPermission.isAllow}
        >
          {name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.province" />
      ),
      dataIndex: 'province',
      key: 'province',
      ellipsis: true,
      width: 70,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.district" />
      ),
      dataIndex: 'district',
      key: 'district',
      width: 70,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.createdDt" />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 100,
      render: (date: string) => (
        <ShowTagDate
          date={date === '0000-00-00' ? null : date}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.updatedDt" />
      ),
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      width: 100,
      render: (date: string) => (
        <ShowTagDate
          date={date === '0000-00-00' ? null : date}
        />
      ),
    },

    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (unit: OrganizationInfo) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="compliance.organization.edit" />
              ),
              icon: <FileTextOutlined />,
              onClick: () =>
                router.push(
                  `${router.asPath}/institute/${unit.ObjectUUID}`
                ),
              disabled: !editPermission.isAllow,
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="compliance.organization.delete" />
              ),
              icon: <DeleteOutlined />,
              onClick: () => onDelete?.(unit),
              disabled: !deletePermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      id: 'hospital',
      columns,
      disabledKeys: ['hospital'],
    });

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        className="mb-4"
      >
        <Typography.Text
          strong
          className={css`
            font-size: 17px;
            color: #1a3353;
          `}
        >
          <IntlMessage id="compliance.organization.detail.branch.title" />
        </Typography.Text>
        <Flex gap="sm">
          <Button
            type="primary"
            ghost
            icon={<PlusOutlined />}
            onClick={onCreate}
            disabled={!editPermission.isAllow}
          >
            <IntlMessage id="compliance.organization.detail.branch.add" />
          </Button>
          {ColumnTransfer}
        </Flex>
      </Flex>
      <Table
        tableLayout="fixed"
        rowKey="ObjectUUID"
        columns={filteredColumns}
        dataSource={dataSource}
        loading={loading}
        scroll={{ x: 1060 }}
        pagination={false}
      />
    </>
  );
};
