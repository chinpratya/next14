import { Card } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  TransactionCardInfo,
  TransactionPurpose,
  useGetTransaction,
} from '@/features/consent-management';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const TransactionDetailPage = () => {
  const router = useRouter();

  const transactionId = router.query
    .transactionId as string;

  const { data, isLoading, isError } = useGetTransaction({
    transactionId,
  });

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="consentManagement.transaction.detail.title" />
        }
        subtitle={data?.transactionsID}
      />
      <Card
        title={
          <IntlMessage id="consentManagement.transaction.detail.basicInfo" />
        }
        loading={isLoading}
      >
        <TransactionCardInfo data={data} />
      </Card>
      <TransactionPurpose transactionId={transactionId} />
    </FallbackError>
  );
};

TransactionDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default TransactionDetailPage;
