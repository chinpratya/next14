import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

import { DataUsage } from '@/components/share-components/data-usage';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { convertBytesToSize } from '@/utils';
import { DropdownTable } from '@components/dropdown-table';
import { NoneProfile } from '@components/none-profile';

import { Indice } from '../../types';

const { lm } = logManagementModules;

export type IndicesTableProps = {
  dataSource?: Indice[];
  loading: boolean;
  onEdit?: (indice: Indice, isEditor?: boolean) => void;
  onDelete?: (indice: Indice) => void;
  onForwarding?: (indice: Indice) => void;
};

export const IndicesTable = ({
  dataSource,
  loading,
  onEdit,
  onDelete,
  onForwarding,
}: IndicesTableProps) => {
  const editPermission = usePermission({
    moduleName: lm,
    policies: [permissions['cyber:lm:indices:update']],
  });

  const deletePermission = usePermission({
    moduleName: lm,
    policies: [permissions['cyber:lm:indices:delete']],
  });

  const columns: ColumnsType<Indice> = [
    {
      key: 'name',
      title: (
        <IntlMessage id="logManagement.indices.name" />
      ),
      width: 200,
      fixed: 'left',
      render: (indice: Indice) => (
        <Flex align="center" gap={7}>
          <Typography.Link
            onClick={() => onEdit?.(indice)}
          >
            {indice.name}
          </Typography.Link>
        </Flex>
      ),
    },
    {
      key: 'storage',
      title: (
        <IntlMessage id="logManagement.indices.storage" />
      ),
      align: 'center',
      width: 170,
      render: (indice: Indice) => {
        const [value, unit] = convertBytesToSize(
          indice.current_size
        ).split(' ');

        const [total, totalUnit] = convertBytesToSize(
          indice.storage
        ).split(' ');

        return (
          <DataUsage
            used={+value ?? 0}
            total={+total}
            totalUnit={totalUnit}
            color="#5048E5"
            unit={unit}
            fixPercent={
              (indice.current_size / indice.storage) * 100
            }
          />
        );
      },
    },
    {
      key: 'retention',
      title: (
        <IntlMessage id="logManagement.indices.retention" />
      ),
      dataIndex: 'retention',
      align: 'center',
      width: 130,
      render: (retention: number) => (
        <IntlMessage
          id="logManagement.indices.retentionDayValue"
          options={{ retention }}
        />
      ),
    },
    {
      key: 'forwarding',
      title: (
        <IntlMessage id="logManagement.indices.forwarding.action" />
      ),
      align: 'center',
      width: 130,
      render: (indice: Indice) => (
        <>
          {indice.forward_siem ? (
            <CheckCircleOutlined
              style={{ fontSize: 24, color: '#87D068' }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: 24, color: '#FF4D4F' }}
            />
          )}
        </>
      ),
    },
    {
      key: 'createdAt',
      title: (
        <IntlMessage id="logManagement.indices.createdDate" />
      ),
      dataIndex: 'created_date',
      align: 'center',
      width: 160,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      key: 'createdBy',
      title: (
        <IntlMessage id="logManagement.indices.createdBy" />
      ),
      dataIndex: 'created_by',
      align: 'center',
      width: 120,
      render: (profile: string) => (
        <NoneProfile title={profile} />
      ),
    },
    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (indice: Indice) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="logManagement.edit" />
              ),
              icon: <EditOutlined />,
              disabled: !editPermission.isAllow,
              onClick: () => onEdit?.(indice, true),
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="logManagement.delete" />
              ),
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => {
                onDelete?.(indice);
              },
            },
            {
              key: 'divider',
              type: 'divider',
            },
            {
              key: 'forward',
              label: (
                <Typography.Text
                  style={{
                    maxWidth: 120,
                    display: 'inline-block',
                  }}
                >
                  {indice.forward_siem ? (
                    <IntlMessage id="logManagement.indices.forwarding.delete" />
                  ) : (
                    <IntlMessage id="logManagement.indices.forwarding.action" />
                  )}
                </Typography.Text>
              ),
              icon: <SendOutlined />,
              onClick: () => {
                onForwarding?.(indice);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Table
      tableLayout="fixed"
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      scroll={{ x: 950 }}
      pagination={false}
    />
  );
};
