import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { UsersList } from '@/features/admin';
import { removeQuery } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const UsersPage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="admin.userManagement.user" />
        }
        extra={
          <Button
            type="primary"
            onClick={() =>
              router.push(
                `${removeQuery(router.asPath)}/create`
              )
            }
          >
            <IntlMessage id="admin.userManagement.user.create" />
          </Button>
        }
      />
      <UsersList />
    </>
  );
};

UsersPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default UsersPage;
