import { Card } from 'antd';

import { usePagination, useSearch } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListLogOrganization } from '../../api/list-log-organization';

import { AuditLogListTable } from './audit-log-list-table';

export const AuditLogList = () => {
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isLoading, isError } =
    useListLogOrganization({
      filter: '',
      search: debouncedSearch,
      page,
      pageSize,
    });

  return (
    <FallbackError isError={isError}>
      <Card>
        <AuditLogListTable
          isLoading={isLoading}
          data={data?.data ?? []}
          onSearch={onSearch}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
