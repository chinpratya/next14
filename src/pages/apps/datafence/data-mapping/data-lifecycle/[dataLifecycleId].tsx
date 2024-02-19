import { useRouter } from 'next/router';
import React from 'react';

import {
  useGetDataLifecycle,
  DataLifecycleDescription,
  DataLifecycleFlow,
  DataLifecycleBoards,
} from '@/features/data-mapping';
import { AppLayout } from '@/layouts';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const DataLifecycleDetailPage = () => {
  const router = useRouter();
  const dataLifecycleId = router.query
    .dataLifecycleId as string;

  const { data, isLoading, isError } =
    useGetDataLifecycle({
      dataLifecycleId,
    });

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.dataLifecycle.detail" />
        }
        subtitle={data?.name}
        onBack={router.back}
      />
      <DataLifecycleDescription data={data} />
      <DataLifecycleFlow
        dataLifecycleId={dataLifecycleId}
      />
      <DataLifecycleBoards
        dataLifecycleId={dataLifecycleId}
      />
    </FallbackError>
  );
};

DataLifecycleDetailPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default DataLifecycleDetailPage;
