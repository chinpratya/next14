import { Table } from 'antd';

import { useColumnFiltered } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { LogOrganization } from '../../types';

type AccessLogListTableProps = {
  isLoading: boolean;
  data: LogOrganization[];
  onSearch: (search: string) => void;
};

export const AccessLogListTable = ({
  isLoading,
  data,
  onSearch,
}: AccessLogListTableProps) => {
  const columns = [
    {
      title: <IntlMessage id="admin.log.table.email" />,
      key: 'email',
      dataIndex: 'email',
      width: 250,
    },
    {
      title: (
        <IntlMessage id="admin.log.table.eventType" />
      ),
      key: 'eventType',
      dataIndex: 'eventType',
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

      key: 'device',
      dataIndex: 'device',
      width: 100,
    },
    {
      title: <IntlMessage id="admin.log.table.ip" />,

      key: 'ip',
      dataIndex: 'ip',
      width: 100,
    },
    {
      title: <IntlMessage id="admin.log.table.country" />,
      key: 'country',
      dataIndex: 'country',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="admin.log.table.dateTime" />
      ),
      key: 'datetime',
      dataIndex: 'datetime',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
      width: 100,
    },
  ];
  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });
  return (
    <>
      <Flex justifyContent={'end'} alignItems="center">
        <InputSearch
          onSearch={onSearch}
          className="mr-3"
        />
        {ColumnTransfer}
      </Flex>
      <Table
        scroll={{ x: 950 }}
        tableLayout="fixed"
        columns={filteredColumns}
        dataSource={data}
        pagination={false}
        loading={isLoading}
      />
    </>
  );
};
