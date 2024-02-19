import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactElement } from 'react';

import { PageHeader } from '@/components/share-components/page-header';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  BackupDataCreateModal,
  BackupDataList,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import AppLayout from '@layouts/AppLayout';

const BackupDataPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.backupData.title" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined className="mr-2" />}
            onClick={toggle.create}
          >
            <IntlMessage id="logManagement.create" />
          </Button>
        }
      />

      <BackupDataList />
      <BackupDataCreateModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
    </>
  );
};

BackupDataPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout>
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default BackupDataPage;
