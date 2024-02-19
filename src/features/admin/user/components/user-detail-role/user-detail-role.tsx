import { useToggle } from '@mantine/hooks';
import { Button, Card } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { usePagination, useSearch } from '@/hooks';
import { InputSearch } from '@components/input-search';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListRoleUser } from '../../api/list-role-user';

import { UserDetailRoleAdd } from './user-detail-role-add';
import { UserDetailRoleTable } from './user-detail-role-table';

export const UserDetailRole = () => {
  const router = useRouter();
  const [openAddModal, toggleOpenAddModal] = useToggle();
  const userId = router.query.userId as string;
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const listRoleUser = useListRoleUser({
    userId,
    search: debouncedSearch,
    page,
    pageSize,
  });

  return (
    <FallbackError isError={listRoleUser.isError}>
      <Card
        extra={
          <>
            <InputSearch
              onSearch={onSearch}
              className="mr-2"
            />
            <Button onClick={() => toggleOpenAddModal()}>
              <IntlMessage id="admin.userManagement.user.detail.role.add" />
            </Button>
          </>
        }
      >
        <UserDetailRoleTable
          dataSource={
            _.get(listRoleUser?.data, 'data') ?? []
          }
          isLoading={listRoleUser?.isLoading}
          userId={userId}
        />
        <Pagination
          current={page}
          total={listRoleUser.data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <UserDetailRoleAdd
          open={openAddModal}
          onToggle={toggleOpenAddModal}
        />
      </Card>
    </FallbackError>
  );
};
