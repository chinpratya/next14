import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  DataCategory,
  DataCategoriesList,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const DataCategoriesPage = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  const onEdit = (categories: DataCategory) =>
    router.push(
      `${router.asPath}/${categories.categoryID}`
    );

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.dataCategories.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:categories:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={
                <PlusCircleOutlined className="mr-1" />
              }
              onClick={onCreate}
            >
              {
                <IntlMessage id="dataMapping.dataCategories.create" />
              }
            </Button>
          </PermissionWrapper>
        }
      />
      <DataCategoriesList onEdit={onEdit} />
    </>
  );
};

DataCategoriesPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:categories:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default DataCategoriesPage;
