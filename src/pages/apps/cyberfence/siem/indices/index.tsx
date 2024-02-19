import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactElement } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  InitalSystemWrapper,
  PermissionWrapper,
} from '@/features/shared';
import {
  IndicesCreateModal,
  IndicesList,
} from '@/features/siem';
import { useToggle } from '@/hooks';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const IndicesPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={<IntlMessage id="siem.indices.indices" />}
        extra={
          <PermissionWrapper
            moduleName="siem"
            policies={[
              permissions['cyber:siem:indices:create'],
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
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [
          permissions['cyber:siem:indices:read'],
        ],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default IndicesPage;
