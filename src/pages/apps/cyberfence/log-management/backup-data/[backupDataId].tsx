import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { PageHeader } from '@/components/share-components/page-header';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  BackupDataActivityList,
  BackupDataInformation,
  BackupDataStorageOverview,
  useGetBackupData,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import AppLayout from '@layouts/AppLayout';

const BackupDataDetailPage = () => {
  const { query, back } = useRouter();

  const { data, isError, isLoading } = useGetBackupData({
    backupDataId: query.backupDataId as string,
  });

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="logManagement.backupData.title" />
        }
        subtitle={data?.name}
        onBack={back}
      />

      <Row gutter={[24, 24]} className="mb-4">
        <Col span={12}>
          <BackupDataStorageOverview
            data={data}
            loading={isLoading}
          />
        </Col>

        <Col span={12}>
          <BackupDataInformation
            data={data}
            loading={isLoading}
          />
        </Col>
      </Row>

      <BackupDataActivityList />
    </FallbackError>
  );
};

BackupDataDetailPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout>
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default BackupDataDetailPage;
