import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  TemplateRiskList,
  TemplateRiskCreateModal,
} from '@/features/risk-assessment';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const TemplateRiskPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.riskAssessment.riskTemplate.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'assessment'}
            policies={[
              permissions[
                'pdpakit:assessment:templaterisk:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
            >
              <IntlMessage
                id={
                  tokens.riskAssessment.riskTemplate
                    .create
                }
              />
            </Button>
          </PermissionWrapper>
        }
      />
      <TemplateRiskList />
      <TemplateRiskCreateModal
        open={toggle.openCreate}
        onClose={() => toggle.create()}
      />
    </>
  );
};

TemplateRiskPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['assessment'],
      productName: products.pdpakit,
      policies: [
        permissions[
          'pdpakit:assessment:templaterisk:read'
        ],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default TemplateRiskPage;
