import { Card } from 'antd';

import { usePagination, useSearch } from '@/hooks';
import { InputSearch } from '@components/input-search';

import { useListSystemUsageHistory } from '../../api/list-system-usage-history';

import { SystemUsageHistoryTable } from './system-usage-history-table';

export const SystemUsageHistory = () => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { debouncedSearch, onSearch } = useSearch();

  const { data, isLoading } = useListSystemUsageHistory({
    search: debouncedSearch,
    page,
    pageSize,
  });

  return (
    <Card extra={<InputSearch onSearch={onSearch} />}>
      <SystemUsageHistoryTable
        dataSource={data?.data ?? []}
        isLoading={isLoading}
      />
      <Pagination
        current={page}
        total={data?.totalRecord}
        pageSize={pageSize}
        onChange={onPaginationChange}
      />
    </Card>
  );
};
