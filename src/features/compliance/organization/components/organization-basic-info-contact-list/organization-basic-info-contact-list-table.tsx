import {
  DeleteOutlined,
  FileTextOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Button, Table, Typography } from 'antd';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import {
  useColumnFiltered,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationContact } from '../../types';

type OrganizationBasicInfoContactTableProps = {
  dataSource?: OrganizationContact[];
  loading: boolean;
  onCreate?: () => void;
  onEdit?: (contact: OrganizationContact) => void;
  onDelete?: (contact: OrganizationContact) => void;
};

export const OrganizationBasicInfoContactListTable = ({
  dataSource,
  loading,
  onCreate,
  onEdit,
  onDelete,
}: OrganizationBasicInfoContactTableProps) => {
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

  const columns = [
    {
      title: (
        <IntlMessage id="compliance.organization.detail.contact.name" />
      ),
      key: 'name',
      render: (contact: OrganizationContact) => (
        <Typography.Link
          onClick={() => onEdit?.(contact)}
          disabled={!editPermission.isAllow}
        >
          {contact.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.contact.position" />
      ),
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.contact.tel" />
      ),
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      key: 'action',
      width: 50,
      render: (contact: OrganizationContact) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="compliance.organization.edit" />
              ),
              icon: <FileTextOutlined />,
              onClick: () => onEdit?.(contact),
              disabled: !editPermission.isAllow,
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="compliance.organization.delete" />
              ),
              icon: <DeleteOutlined />,
              onClick: () => onDelete?.(contact),
              disabled: !deletePermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
      id: 'contact',
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
          <IntlMessage id="compliance.organization.detail.contact.title" />
        </Typography.Text>
        <Flex gap="sm">
          <Button
            type="primary"
            ghost
            icon={<PlusOutlined />}
            onClick={onCreate}
            disabled={!editPermission.isAllow}
          >
            <IntlMessage id="compliance.organization.detail.contact.add" />
          </Button>
          {ColumnTransfer}
        </Flex>
      </Flex>
      <Table
        rowKey="ObjectUUID"
        columns={filteredColumns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
    </>
  );
};
