import { Button } from 'antd';
import { ReactNode } from 'react';

import { TemplateSetting } from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';

const TemplatePage = () => {
  return (
    <>
      <PageHeader
        title="เทมเพลต"
        extra={<Button type="primary">บันทึก</Button>}
      />
      <TemplateSetting />
    </>
  );
};

TemplatePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default TemplatePage;
