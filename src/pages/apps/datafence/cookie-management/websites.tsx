import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  AppCookieLayout,
  DomainCreateModal,
  DomainList,
  BannerWizard,
  BannerContextProvider,
} from '@/features/cookie-management';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const WebsitesPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.cookieManagement.websites.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'cookie'}
            policies={[
              permissions[
                'pdpakit:cookie:website:create'
              ],
            ]}
          >
            <Button
              icon={
                <PlusCircleOutlined className="mr-2" />
              }
              type="primary"
              onClick={() => toggle.create()}
            >
              <IntlMessage
                id={
                  tokens.cookieManagement.websites
                    .addWebsite
                }
              />
            </Button>
          </PermissionWrapper>
        }
      />
      <DomainList />
      <DomainCreateModal
        open={toggle.openCreate}
        onClose={() => toggle.create()}
        onWizard={(domainId: string) =>
          toggle.edit({
            domainId,
          })
        }
      />
      <BannerContextProvider>
        <BannerWizard
          open={toggle.openEdit}
          onClose={() => toggle.edit()}
          domainId={toggle?.data?.domainId}
        />
      </BannerContextProvider>
    </>
  );
};

WebsitesPage.getLayout = (page: ReactNode) => (
  <AppCookieLayout
    permission={{
      moduleName: ['cookie'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:cookie:website:read'],
      ],
    }}
  >
    {page}
  </AppCookieLayout>
);

export default WebsitesPage;
