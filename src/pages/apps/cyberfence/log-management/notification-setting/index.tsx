import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import { NotificationSettingList } from '@/features/log-management';
import {
  InitalSystemWrapper,
  PermissionWrapper,
} from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { PageHeader } from '@components/page-header';

const { lm, core } = logManagementModules;

export const NotificationSetting = () => {
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.notificationSetting.title" />
        }
        extra={
          <PermissionWrapper
            moduleName="lm"
            policies={[
              permissions[
                'cyber:lm:notification-setting:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusOutlined className="mr-2" />}
              onClick={() =>
                router.push(`${router.pathname}/create`)
              }
            >
              <IntlMessage id="logManagement.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <NotificationSettingList />
    </>
  );
};

NotificationSetting.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: [lm, core],
      productName: products.cyber,
      policies: [
        permissions['cyber:lm:notification-setting:read'],
      ],
    }}
  >
    <InitalSystemWrapper>{page}</InitalSystemWrapper>
  </AppLayout>
);

export default NotificationSetting;
