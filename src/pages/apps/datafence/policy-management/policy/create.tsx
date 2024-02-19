import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { PolicySelectPolicy } from '@/features/policy-management';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const PolicyCreatePage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="policyManagement.policy.create.title" />
        }
      />
      <PolicySelectPolicy />
    </>
  );
};

PolicyCreatePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default PolicyCreatePage;
