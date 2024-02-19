import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  Request,
  RequestCreateModal,
  RequestList,
} from '@/features/data-breach';
import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';
import { PermissionWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';

const RequestPage = () => {
  const router = useRouter();
  const toggle = useToggle();

  const onEdit = (request: Request) =>
    router.push(`${router.asPath}/${request.requestID}`);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.dataBreach.request.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:request:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
            >
              <IntlMessage
                id={tokens.dataBreach.request.create}
              />
            </Button>
          </PermissionWrapper>
        }
      />
      <RequestList onEdit={onEdit} />
      <RequestCreateModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
      />
    </>
  );
};

RequestPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['databreach'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:databreach:request:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default RequestPage;
