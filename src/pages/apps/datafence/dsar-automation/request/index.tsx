import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  Request,
  RequestAdminCreateModal,
  RequestCreateModal,
  RequestList,
} from '@/features/dsar-automation';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const RequestPage = () => {
  const router = useRouter();
  const toggle = useToggle();

  const onEdit = (request: Request) =>
    router.push(`${router.asPath}/${request.requestID}`);

  const items: MenuProps['items'] = [
    {
      label: 'คำขอใหม่',
      key: 'new-request',
      onClick: () => toggle.create(),
    },
    {
      label: 'คำขอโดยแอดมิน',
      key: 'request-admin',
      onClick: () => toggle.edit(),
    },
  ];

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dsarAutomation.request.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'dsar'}
            policies={[
              permissions['pdpakit:dsar:request:create'],
            ]}
          >
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              trigger={['click']}
            >
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
              >
                <IntlMessage id="dsarAutomation.request.create" />
              </Button>
            </Dropdown>
          </PermissionWrapper>
        }
      />
      <RequestList onEdit={onEdit} />
      <RequestCreateModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
      />
      <RequestAdminCreateModal
        open={toggle.openEdit}
        onCancel={() => toggle.edit()}
      />
    </>
  );
};

RequestPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['dsar'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:dsar:request:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default RequestPage;
