import { PlusCircleOutlined } from '@ant-design/icons';
import { useToggle } from '@mantine/hooks';
import { Button } from 'antd';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  OrganizationList,
  OrganizationListAddModal,
} from '@/features/compliance';
import { PermissionWrapper } from '@/features/shared';
import { useSearch } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { InputSearch } from '@components/input-search';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const InventoryPage = () => {
  const { t } = useTranslation();
  const [openAddModal, toggleOpenAddModal] = useToggle();
  const { search, debouncedSearch, onSearch } =
    useSearch();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="compliance.organization.title" />
        }
        extra={
          <>
            <InputSearch
              placeholder={
                t(
                  'compliance.organization.search'
                ) as string
              }
              onSearch={onSearch}
              search={search}
            />
            <PermissionWrapper
              moduleName={'compliance'}
              policies={[
                permissions[
                  'pdpakit:compliance:organization:create'
                ],
              ]}
            >
              <Button
                type="primary"
                onClick={() => toggleOpenAddModal()}
                icon={<PlusCircleOutlined />}
              >
                <IntlMessage id="compliance.organization.add" />
              </Button>
            </PermissionWrapper>
          </>
        }
      />
      <OrganizationList search={debouncedSearch} />
      <OrganizationListAddModal
        open={openAddModal}
        toggleModal={() => toggleOpenAddModal()}
      />
    </>
  );
};

InventoryPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['compliance'],
      productName: products.pdpakit,
      policies: [
        permissions[
          'pdpakit:compliance:organization:read'
        ],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default InventoryPage;
