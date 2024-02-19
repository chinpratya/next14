import { ReactNode } from 'react';

import { DepartmentList } from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const department = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="compliance.department.title" />
        }
      />
      <DepartmentList />
    </>
  );
};
department.getLayout = (page: ReactNode) => (
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

export default department;
