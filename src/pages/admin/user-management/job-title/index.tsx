import { PlusCircleOutlined } from '@ant-design/icons';
import { useToggle } from '@mantine/hooks';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  JobTitleList,
  JobTitleCreateModal,
} from '@/features/admin';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const JobTitlePage = () => {
  const [openCreate, toggleCreate] = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="admin.userManagement.jobTitle" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined className="mr-1" />}
            onClick={() => toggleCreate()}
          >
            <IntlMessage id="admin.userManagement.jobTitle.create" />
          </Button>
        }
      />
      <JobTitleList />
      <JobTitleCreateModal
        open={openCreate}
        toggleModal={toggleCreate}
      />
    </>
  );
};

JobTitlePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default JobTitlePage;
