import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  InitalSystemWrapper,
  PermissionWrapper,
} from '@/features/shared';
import { NotificationSettingList } from '@/features/siem';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const NotificationSettingPage = () => {
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.notificationSetting.title" />
        }
        extra={
          <PermissionWrapper
            moduleName="siem"
            policies={[
              permissions[
                'cyber:siem:notification-setting:create'
              ],
            ]}
          >
            <Button
              type="primary"
              onClick={() =>
                router.push(`${router.pathname}/create`)
              }
            >
              <PlusOutlined className="mr-2" />
              <IntlMessage id="logManagement.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <NotificationSettingList />
    </>
  );
};

NotificationSettingPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [
          permissions[
            'cyber:siem:notification-setting:read'
          ],
        ],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default NotificationSettingPage;
