import {
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Table, Typography } from 'antd';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationContact } from '../../types';

type OrganizationBasicInfoUnitGeneralDataContactTableProps =
  {
    dataSource?: OrganizationContact[];
    loading: boolean;
    onEdit?: (contact: OrganizationContact) => void;
    onDelete?: (contact: OrganizationContact) => void;
  };

export const OrganizationBasicInfoUnitGeneralDataContactListTable =
  ({
    dataSource,
    loading,
    onEdit,
    onDelete,
  }: OrganizationBasicInfoUnitGeneralDataContactTableProps) => {
    const columns = [
      {
        title: (
          <IntlMessage id="compliance.organization.detail.contact.name" />
        ),
        key: 'name',
        render: (contact: OrganizationContact) => (
          <Typography.Link
            onClick={() => onEdit?.(contact)}
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
              },
              {
                key: 'delete',
                label: (
                  <IntlMessage id="compliance.organization.delete" />
                ),
                icon: <DeleteOutlined />,
                onClick: () => onDelete?.(contact),
              },
            ]}
          />
        ),
      },
    ];

    return (
      <Table
        rowKey="ObjectUUID"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
    );
  };
