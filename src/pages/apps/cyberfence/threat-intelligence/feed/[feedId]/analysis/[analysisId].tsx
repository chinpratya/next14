import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { AnalysisInfo } from '@/features/threat-intelligence';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const AnalysisDetailPage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        onBack={router.back}
        title="Analysis"
        subtitle="SSH Bruteforce IPs feed"
      />
      <AnalysisInfo />
    </>
  );
};

AnalysisDetailPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <AppLayout>{page}</AppLayout>;
};

export default AnalysisDetailPage;
