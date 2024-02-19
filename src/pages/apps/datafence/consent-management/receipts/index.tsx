import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  ReceiptList,
  Receipt,
} from '@/features/consent-management';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const ReceiptsPage = () => {
  const router = useRouter();

  const onEdit = (receipt: Receipt) =>
    router.push(`${router.asPath}/${receipt.receiptsID}`);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.receipts.title" />
        }
      />
      <ReceiptList onEdit={onEdit} />
    </>
  );
};

ReceiptsPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['consent'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:consent:receipts:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default ReceiptsPage;
