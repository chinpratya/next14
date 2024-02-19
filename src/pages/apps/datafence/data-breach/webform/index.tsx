import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  WebForm,
  WebformList,
  WebformCreateModal,
} from '@/features/data-breach';
import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';
import { permissions, products } from '@/permissions';
import { PermissionWrapper } from '@/features/shared';

const WebFormPage = () => {
  const router = useRouter();
  const toggle = useToggle();

  const onEdit = (webform: WebForm) =>
    router.push(`${router.asPath}/${webform.webformID}`);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.dataBreach.webform.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:webform:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
            >
              <IntlMessage
                id={tokens.dataBreach.webform.create}
              />
            </Button>
          </PermissionWrapper>
        }
      />
      <WebformList onEdit={onEdit} />
      <WebformCreateModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
      />
    </>
  );
};

WebFormPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['databreach'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:databreach:webform:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default WebFormPage;
