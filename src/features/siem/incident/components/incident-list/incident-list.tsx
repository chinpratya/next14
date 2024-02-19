import { useInterval } from '@mantine/hooks';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination } from '@/hooks';

import { useListIncident } from '../../api/list-incident';
import { Incident } from '../../types';

import { IncidentTable } from './incident-table';

type IncidentListProps = {
  search?: string;
};

export const IncidentList = ({
  search,
}: IncidentListProps) => {
  const router = useRouter();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const [filter, setFilters] = useState<
    Record<string, unknown>
  >({});

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useListIncident({
    search,
    page,
    pageSize,
    filter,
  });

  const onChangeFilter = (
    filter: Record<string, unknown>
  ) => {
    setFilters((state) => ({ ...state, ...filter }));
  };

  const onSearchId = (id: string) => {
    setFilters((state) => ({
      ...state,
      id: id.toUpperCase(),
    }));
    onPaginationChange(1, 10);
  };

  const onEdit = (incident: Incident) =>
    router.push(`${router.pathname}/${incident.id}`);

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  const interval = useInterval(() => refetch(), 10000);

  useEffect(() => {
    if (!isLoading && !isRefetching) interval.start();
    else interval.stop();

    return () => interval.stop();
  }, [interval, isLoading, isRefetching]);

  return (
    <FallbackError isError={isError}>
      <Card>
        <IncidentTable
          dataSource={data?.data}
          loading={isLoading}
          onEdit={onEdit}
          onChangeFilter={onChangeFilter}
          onSearchId={onSearchId}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
