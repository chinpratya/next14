import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';

import { DataUsage } from '@/components/share-components/data-usage';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { convertBytesToSize } from '@/utils';
import { DropdownTable } from '@components/dropdown-table';
import { NoneProfile } from '@components/none-profile';

import { Indice } from '../../types';

export type IndicesTableProps = {
  dataSource?: Indice[];
  loading: boolean;
  onEdit?: (indice: Indice) => void;
  onDelete?: (indice: Indice) => void;
};

export const IndicesTable = ({
  dataSource,
  loading,
  onEdit,
  onDelete,
}: IndicesTableProps) => {
  const router = useRouter();

  const editPermission = usePermission({
    moduleName: 'siem',
    policies: [permissions['cyber:siem:indices:update']],
  });

  const deletePermission = usePermission({
    moduleName: 'siem',
    policies: [permissions['cyber:siem:indices:delete']],
  });

  const onClick = (indice: Indice) => {
    if (!indice.forward_siem) {
      onEdit?.(indice);
    } else {
      router.push(
        `/apps/cyberfence/log-management/indices/${indice.id}`
      );
    }
  };

  const columns: ColumnsType<Indice> = [
    {
      key: 'name',
      title: (
        <IntlMessage id="logManagement.indices.name" />
      ),
      width: 200,
      fixed: 'left',
      render: (indice: Indice) => (
        <>
          <Typography.Link
            onClick={() => onClick(indice)}
          >
            {indice.name}
          </Typography.Link>
          {indice.forward_siem && (
            <Tooltip
              placement="topLeft"
              title="Log Forward"
            >
              <Tag
                color="processing"
                className={css`
                  position: relative;
                  top: -10px;
                  left: 5px;
                  font-size: 8px !important;
                  margin: 0;
                  line-height: unset !important;
                  padding: 0px 4px !important;
                  height: fit-content;
                  line-height: unset;
                  cursor: default;
                `}
              >
                LOG
              </Tag>
            </Tooltip>
          )}
        </>
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
              disabled:
                !editPermission.isAllow ||
                indice.forward_siem,
              onClick: () => onEdit?.(indice),
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="logManagement.delete" />
              ),
              icon: <DeleteOutlined />,
              disabled:
                !deletePermission.isAllow ||
                indice.forward_siem,
              onClick: () => {
                onDelete?.(indice);
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
      scroll={{ x: 950 }}
      loading={loading}
      pagination={false}
    />
  );
};
