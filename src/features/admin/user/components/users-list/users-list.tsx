import { Card } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { usePagination, useSearch } from '@/hooks';
import { removeQuery } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListUser } from '../../api/list-user';
import { User } from '../../types';

import { UsersTable } from './users-list-table';

export const UsersList = () => {
  const router = useRouter();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const listUser = useListUser({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const onView = (user: User) => {
    router.push(
      `${removeQuery(router.asPath)}/${user.userId}`
    );
  };

  return (
    <FallbackError isError={listUser?.isError}>
      <Card>
        <UsersTable
          dataSource={_.get(listUser?.data, 'data') ?? []}
          onView={onView}
          isLoading={listUser.isLoading}
          onSearch={onSearch}
          total={listUser?.data?.totalRecord}
        />
        <Pagination
          current={page}
          total={listUser?.data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
