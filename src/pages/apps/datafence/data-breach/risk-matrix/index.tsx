import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  RiskMatrixList,
  RiskMatrixCreateDialog,
} from '@/features/data-breach';
import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';
import { permissions, products } from '@/permissions';
import { PermissionWrapper } from '@/features/shared';

const RiskMatrixPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:riskmatrix:create'
              ],
            ]}
          >
            <Button
              icon={<PlusCircleOutlined />}
              type="primary"
              onClick={() => toggle.create()}
            >
              <IntlMessage
                id={tokens.dataBreach.riskMatrix.create}
              />
            </Button>
          </PermissionWrapper>
        }
      />
      <RiskMatrixList />
      <RiskMatrixCreateDialog
        open={toggle.openCreate}
        onClose={() => toggle.create()}
      />
    </>
  );
};

RiskMatrixPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['databreach'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:databreach:riskmatrix:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default RiskMatrixPage;
