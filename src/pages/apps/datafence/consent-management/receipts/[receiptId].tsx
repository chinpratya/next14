import { Card, Skeleton, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  ReceiptCardInfo,
  ReceiptPurpose,
  useGetReceipt,
  useGetReceiptForm,
} from '@/features/consent-management';
import { AppLayout } from '@/layouts';
import { ConsentForm } from '@/shared/consent';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const ReceiptDetailFormTab = ({
  receiptId,
}: {
  receiptId: string;
}) => {
  const { data, isLoading, isError } = useGetReceiptForm({
    receiptId,
  });

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <FallbackError isError={isError}>
      <div>
        <ConsentForm
          isFullHeight={true}
          viewOnly={true}
          formItems={data?.form.formItems ?? []}
          formSettings={data?.form.formSetting}
          formConditions={data?.form.formConditions ?? []}
        />
      </div>
    </FallbackError>
  );
};

const ReceiptDetailPage = () => {
  const router = useRouter();
  const receiptId = router.query.receiptId as string;

  const { data, isLoading, isError } = useGetReceipt({
    receiptId,
  });

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.receipts.detail.title" />
        }
        subtitle={data?.receiptsID}
        onBack={router.back}
      />
      <ReceiptCardInfo receipt={data} />
      <Card>
        <Tabs
          items={[
            {
              label: (
                <IntlMessage id="consentManagement.receipts.detail.receipt" />
              ),
              key: 'receipt-detail',
              children: (
                <ReceiptDetailFormTab
                  receiptId={receiptId}
                />
              ),
            },
            {
              label: (
                <IntlMessage id="consentManagement.receipts.detail.purpose" />
              ),
              key: 'purpose',
              children: (
                <ReceiptPurpose receiptId={receiptId} />
              ),
            },
          ]}
        />
      </Card>
    </FallbackError>
  );
};

ReceiptDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default ReceiptDetailPage;
