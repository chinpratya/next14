import { EditOutlined } from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useListAliasHost } from '@/features/log-management';
import { usePagination, useToggle } from '@/hooks';

import { Monitor } from '../../types';
import { IndicesEditAliasHostModal } from '../indices-edit-alias-host-modal';

export const IndicesAliasHost = () => {
  const router = useRouter();
  const toggle = useToggle();
  const indiceId = router.query.indiceId as string;

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListAliasHost({
    type: 'indices',
    value: indiceId,
    module: 'SIEM',
    response_type: 'lists',
  });

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  const columns: ColumnsType<Monitor> = [
    {
      key: 'name',
      title: <IntlMessage id="logManagement.hostname" />,
      fixed: 'left',
      dataIndex: 'hostname',
      width: 200,
    },
    {
      key: 'alias',
      title: (
        <IntlMessage id="logManagement.indices.host.aliasHost" />
      ),
      dataIndex: 'alias_name',
      width: 200,
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
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (data: Monitor) => (
        <Typography.Link
          onClick={() => toggle.edit(data)}
        >
          <EditOutlined />
        </Typography.Link>
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>

      <IndicesEditAliasHostModal
        open={toggle.openEdit}
        data={toggle.data}
        onCancel={toggle.edit}
      />
    </FallbackError>
  );
};
