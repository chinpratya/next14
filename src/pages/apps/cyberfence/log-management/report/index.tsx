import { css } from '@emotion/css';
import { Form, Tabs } from 'antd';
import { ReactElement, useState } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  ReportDownloadList,
  ReportExtra,
  ReportIndex,
  ReportSchedulerList,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const { lm, core } = logManagementModules;

const ReportPage = () => {
  const [form] = Form.useForm();
  const [tab, setTab] = useState('index');

  const onChangeTab = (value: string) => setTab(value);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.report.title" />
        }
        overlap
        className={css`
          .ant-page-header-heading {
            min-height: 48px;
          }
        `}
        extra={<ReportExtra tab={tab} form={form} />}
      />
      <Tabs
        onChange={onChangeTab}
        items={[
          {
            key: 'index',
            label: (
              <IntlMessage id="logManagement.report.home" />
            ),
            children: <ReportIndex form={form} />,
          },
          {
            key: 'downloadList',
            label: (
              <IntlMessage id="logManagement.report.dowloadList.title" />
            ),
            children: <ReportDownloadList tab={tab} />,
          },
          {
            key: 'scheduler',
            label: (
              <IntlMessage id="logManagement.report.scheduler.title" />
            ),
            children: <ReportSchedulerList />,
          },
        ]}
      />
    </>
  );
};

ReportPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [permissions['cyber:lm:report:read']],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default ReportPage;
