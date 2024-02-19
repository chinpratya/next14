import {
  DownloadOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Button } from 'antd';
import { ReactElement } from 'react';

import { PageHeader } from '@/components/share-components/page-header';
import { IntlMessage } from '@/components/util-components/intl-message';
import { DarkWebList } from '@/features/threat-intelligence';
import AppLayout from '@layouts/AppLayout';

const DarkWebMonitoringPage = () => {
  return (
    <>
      <PageHeader
        title="Dark Web Monitoring"
        extra={
          <Flex gap={11}>
            <Button icon={<DownloadOutlined />}>
              Download Report
            </Button>
            <Button type="primary">
              <PlusOutlined className="mr-2" />
              <IntlMessage id="logManagement.create" />
            </Button>
          </Flex>
        }
      />

      <DarkWebList />
    </>
  );
};

DarkWebMonitoringPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <AppLayout>{page}</AppLayout>;
};

export default DarkWebMonitoringPage;
