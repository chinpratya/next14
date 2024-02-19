import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  Transaction,
  TransactionList,
} from '@/features/consent-management';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const TransactionPage = () => {
  const router = useRouter();

  const onEdit = (transaction: Transaction) =>
    router.push(
      `${router.asPath}/${transaction.purposeID}`
    );

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.transaction.title" />
        }
      />
      <TransactionList onEdit={onEdit} />
    </>
  );
};

TransactionPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['consent'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:consent:transaction:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default TransactionPage;
