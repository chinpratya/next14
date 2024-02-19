import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  AgenciesCreateModal,
  AgenciesList,
} from '@/features/admin';
import { useToggle } from '@/hooks';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const AgenciesPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="admin.userManagement.agencies.title" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined className="mr-1" />}
            onClick={toggle.create}
          >
            <IntlMessage id="admin.userManagement.jobTitle.create" />
          </Button>
        }
      />

      <AgenciesList />

      <AgenciesCreateModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
    </>
  );
};

AgenciesPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AgenciesPage;
