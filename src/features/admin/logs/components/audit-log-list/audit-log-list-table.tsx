import { Table } from 'antd';

import { useColumnFiltered } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { LogOrganization } from '../../types';

type AuditLogListTableProps = {
  isLoading: boolean;
  data: LogOrganization[];
  onSearch: (search: string) => void;
};
export const AuditLogListTable = ({
  isLoading,
  data,
  onSearch,
}: AuditLogListTableProps) => {
  const columns = [
    {
      title: <IntlMessage id="admin.log.table.email" />,
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.log.table.eventType" />
      ),
      key: 'request_type',
      dataIndex: 'request_type',
      width: 100,
    },
    {
      title: <IntlMessage id="admin.log.table.module" />,
      key: 'module',
      dataIndex: 'module',
      width: 100,
    },
    {
      title: <IntlMessage id="admin.log.table.browser" />,
      key: 'browser',
      dataIndex: 'browser',
      width: 100,
    },
    {
      title: <IntlMessage id="admin.log.table.device" />,
      key: 'device_type',
      dataIndex: 'device_type',
      width: 100,
    },
    {
      title: <IntlMessage id="admin.log.table.ip" />,
      key: 'ip_address',
      dataIndex: 'ip_address',
      width: 150,
    },
    {
      title: <IntlMessage id="admin.log.table.country" />,
      key: 'country',
      dataIndex: 'country',
      width: 50,
    },
    {
      title: (
        <IntlMessage id="admin.log.table.dateTime" />
      ),
      key: 'created_dt',
      dataIndex: 'created_dt',
      width: 100,

      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
  ];
  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });
  return (
    <>
      <Flex
        justifyContent={'end'}
        alignItems="center"
        className="mb-3"
      >
        <InputSearch
          onSearch={onSearch}
          className="mr-3"
        />
        {ColumnTransfer}{' '}
      </Flex>
      <Table
        columns={filteredColumns}
        tableLayout="fixed"
        scroll={{ x: 1000 }}
        dataSource={data}
        pagination={false}
        loading={isLoading}
      />
    </>
  );
};
