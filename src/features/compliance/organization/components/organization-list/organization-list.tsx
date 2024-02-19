import { Flex } from '@mantine/core';
import { Card } from 'antd';

import { usePagination } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListOrganization } from '../../api/list-organization';

import { OrganizationListTable } from './organization-list-table';

type OrganizationListProps = {
  search: string;
};
export const OrganizationList = ({
  search,
}: OrganizationListProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isLoading, isError } =
    useListOrganization({
      page,
      pageSize,
      search,
    });

  return (
    <FallbackError isError={isError}>
      <Card>
        <OrganizationListTable
          data={data?.data ?? []}
          loading={isLoading}
        />
        <Flex justify="end">
          <Pagination
            total={data?.totalRecord}
            current={page}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </Flex>
      </Card>
    </FallbackError>
  );
};
