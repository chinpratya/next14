import { Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { PageHeader } from '@/components/share-components/page-header';
import { IntlMessage } from '@/components/util-components/intl-message';
import { TriggerForm } from '@/features/incident-management/trigger/components';
import { AppLayout } from '@/layouts';

const TriggerCreatePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const id = router.query;
  return (
    <>
      <PageHeader
        onBack={() =>
          router.push(
            '/apps/central-management/incident/trigger'
          )
        }
        title={<IntlMessage id="Configure Form Rules " />}
      />
      <TriggerForm />
    </>
  );
};

TriggerCreatePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default TriggerCreatePage;
