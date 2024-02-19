import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  MaturityModelSummaryDetail,
  useGetMaturityModel,
} from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';

const MaturityModelDetailPage = () => {
  const router = useRouter();
  const maturityModelId = router.query
    .maturityModelId as string;

  const { data, isError, isLoading } =
    useGetMaturityModel(maturityModelId);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title="Maturity Model Detail"
        onBack={router.back}
        subtitle={data?.name}
      />
      <MaturityModelSummaryDetail
        maturityModelId={maturityModelId}
        maturityModel={data}
      />
    </FallbackError>
  );
};

MaturityModelDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default MaturityModelDetailPage;
