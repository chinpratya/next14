import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactElement } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  WhitelistCreateModal,
  WhitelistList,
} from '@/features/log-management';
import {
  InitalSystemWrapper,
  PermissionWrapper,
} from '@/features/shared';
import { useToggle } from '@/hooks';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const { lm, core } = logManagementModules;

const WhitelistPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.whitelist.whitelistDefineLogType" />
        }
        extra={
          <PermissionWrapper
            moduleName="lm"
            policies={[
              permissions['cyber:lm:whitelist:create'],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusOutlined className="mr-2" />}
              onClick={toggle.create}
            >
              <IntlMessage id="logManagement.create" />
            </Button>
          </PermissionWrapper>
        }
      />

      <WhitelistList />
      <WhitelistCreateModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
    </>
  );
};

WhitelistPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [
          permissions['cyber:lm:whitelist:read'],
        ],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default WhitelistPage;
