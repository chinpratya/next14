import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactElement } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  IndicesCreateModal,
  IndicesList,
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

const IndicesPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.indices.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={lm}
            policies={[
              permissions['cyber:lm:indices:create'],
            ]}
          >
            <Button
              type="primary"
              onClick={() => toggle.create()}
            >
              <PlusOutlined className="mr-2" />
              <IntlMessage id="logManagement.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <IndicesList />
      <IndicesCreateModal
        open={toggle.openCreate}
        onClose={() => toggle.create()}
      />
    </>
  );
};

IndicesPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [permissions['cyber:lm:indices:read']],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default IndicesPage;
