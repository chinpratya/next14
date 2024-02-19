import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  IncidentTemplateCreateDialog,
  IncidentTemplateList,
  IncidentTemplateType,
} from '@/features/data-breach';
import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';
import { permissions, products } from '@/permissions';
import { PermissionWrapper } from '@/features/shared';

const IncidentTemplatePage = () => {
  const router = useRouter();

  const toggle = useToggle();

  const onEdit = (
    incidentTemplate: IncidentTemplateType
  ) =>
    router.push(
      `${router.asPath}/${incidentTemplate.templateeventID}`
    );

  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={
              tokens.dataBreach.incidentTemplate.listTitle
            }
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:incidenttemplate:create'
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
                  tokens.dataBreach.incidentTemplate
                    .create
                }
              />
            </Button>
          </PermissionWrapper>
        }
      />
      <IncidentTemplateList onEdit={onEdit} />
      <IncidentTemplateCreateDialog
        open={toggle.openCreate}
        onClose={() => toggle.create()}
      />
    </>
  );
};

IncidentTemplatePage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['databreach'],
      productName: products.pdpakit,
      policies: [
        permissions[
          'pdpakit:databreach:incidenttemplate:read'
        ],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default IncidentTemplatePage;
