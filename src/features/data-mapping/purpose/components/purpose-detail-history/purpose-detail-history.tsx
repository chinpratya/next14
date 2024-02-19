import { Table } from 'antd';

import {
  useColumnFiltered,
  usePagination,
  useSearch,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListPurposeHistory } from '../../api/list-purpose-history';

type PurposeDetailHistoryProps = {
  purposeId: string;
};

export const PurposeDetailHistory = ({
  purposeId,
}: PurposeDetailHistoryProps) => {
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isError, isLoading } =
    useListPurposeHistory({
      purposeId,
      search: debouncedSearch,
      page,
      pageSize,
    });
  const columns = [
    {
      title: (
        <IntlMessage id="dataMapping.purpose.detail.history.purpose" />
      ),
      key: 'purposeName',
      dataIndex: 'name',
      width: 250,
    },

    {
      title: (
        <IntlMessage id="dataMapping.purpose.detail.history.createdDt" />
      ),
      key: 'created_dt',
      dataIndex: 'created_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.detail.history.createdBy" />
      ),
      key: 'created_by',
      dataIndex: 'created_by',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.detail.history.updatedDt" />
      ),
      key: 'updated_dt',
      dataIndex: 'updated_dt',
      width: 150,
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
    <FallbackError isError={isError}>
      <Flex justifyContent="end" alignItems={'center'}>
        <InputSearch
          className="mr-2"
          onSearch={onSearch}
        />
        {ColumnTransfer}
      </Flex>
      <Table
        rowKey="historyID"
        loading={isLoading}
        columns={filteredColumns}
        dataSource={data?.data ?? []}
        tableLayout="fixed"
        scroll={{ x: 700 }}
        pagination={false}
      />
      <Pagination
        current={page}
        total={data?.totalRecord}
        pageSize={pageSize}
        onChange={onPaginationChange}
      />
    </FallbackError>
  );
};
