import { useToggle } from '@mantine/hooks';
import { Button, Card } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { usePagination, useSearch } from '@/hooks';
// import { useNotifications } from '@/stores/notifications';
import { InputSearch } from '@components/input-search';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListGroupUser } from '../../api/list-user-group';

import { UserDetailGroupAdd } from './user-detail-group-add';
import { UserDetailGroupTable } from './user-detail-group-table';

export const UserDetailGroup = () => {
  // const { showNotification } = useNotifications();
  const router = useRouter();
  const userId = router.query.userId as string;
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const listGroupUser = useListGroupUser({
    userId,
    search: debouncedSearch,
    page,
    pageSize,
  });

  const [openAddModal, toggleOpenAddModal] = useToggle();

  // const onSuccess = (message: string) => {
  //   showNotification({
  //     type: 'success',
  //     message: message,
  //   });
  // };

  return (
    <FallbackError isError={listGroupUser?.isError}>
      <Card
        extra={
          <>
            <InputSearch
              onSearch={onSearch}
              className="mr-2"
            />
            <Button onClick={() => toggleOpenAddModal()}>
              <IntlMessage id="admin.userManagement.user.detail.group.add" />
            </Button>
          </>
        }
      >
        <UserDetailGroupTable
          dataSource={
            _.get(listGroupUser?.data, 'data') ?? []
          }
          userId={userId}
          isLoading={listGroupUser?.isLoading}
          // onSuccess={onSuccess}
        />
        <Pagination
          current={page}
          total={listGroupUser.data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <UserDetailGroupAdd
          open={openAddModal}
          onToggle={toggleOpenAddModal}
        />
      </Card>
    </FallbackError>
  );
};
