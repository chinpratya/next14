import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  WebForm,
  WebformList,
  WebformCreateModal,
} from '@/features/dsar-automation';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const WebFormPage = () => {
  const router = useRouter();
  const toggle = useToggle();

  const onEdit = (webform: WebForm) =>
    router.push(`${router.asPath}/${webform.webformID}`);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dsarAutomation.setting.webForm.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'dsar'}
            policies={[
              permissions['pdpakit:dsar:webform:create'],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
            >
              <IntlMessage id="dsarAutomation.setting.webForm.create" />
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
      moduleName: ['dsar'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:dsar:webform:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default WebFormPage;
