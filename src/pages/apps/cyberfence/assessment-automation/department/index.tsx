import { ReactNode } from 'react';

import { DepartmentList } from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';

const department = () => {
  return (
    <>
      <PageHeader title="สาขาทั้งหมด" />
      <DepartmentList />
    </>
  );
};
department.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default department;
