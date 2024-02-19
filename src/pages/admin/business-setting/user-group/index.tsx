import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { GroupList } from '@/features/admin';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const GroupPage = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.userGroup" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined className="mr-1" />}
            onClick={onCreate}
          >
            <IntlMessage id="admin.businessSetting.userGroup.create" />
          </Button>
        }
      />
      <GroupList />
    </>
  );
};

GroupPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default GroupPage;
