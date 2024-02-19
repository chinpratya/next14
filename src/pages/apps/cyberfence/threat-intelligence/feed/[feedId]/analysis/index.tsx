import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { InputSearch } from '@/components/share-components/input-search';
import { PageHeader } from '@/components/share-components/page-header';
import {
  AnalysisCategory,
  AnalysisList,
} from '@/features/threat-intelligence';
import AppLayout from '@layouts/AppLayout';

const AnalysisPage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title="Analysis"
        extra={
          <InputSearch placeholder="ค้นหาชื่อข่าว,ประเภทข่าว,แหล่งขาว" />
        }
        onBack={router.back}
        overlap
      />
      <Tabs
        items={[
          {
            key: 'home',
            label: 'หน้าหลัก',
            children: <AnalysisList />,
          },
          {
            key: 'category',
            label: 'หมวดหมู่',
            children: <AnalysisCategory />,
          },
        ]}
      />
    </>
  );
};

AnalysisPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <AppLayout>{page}</AppLayout>;
};

export default AnalysisPage;
