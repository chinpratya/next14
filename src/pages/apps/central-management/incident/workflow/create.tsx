import { Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { PageHeader } from '@/components/share-components/page-header';
import { IntlMessage } from '@/components/util-components/intl-message';
import { WorkflowForm } from '@/features/incident-management';
import { AppLayout } from '@/layouts';

const WorkflowCreatePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  return (
    <>
      <PageHeader
        onBack={router.back}
        title={<IntlMessage id="สร้างแผนการตอบสนอง" />}
      />

      <WorkflowForm form={form} />
    </>
  );
};

WorkflowCreatePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default WorkflowCreatePage;
