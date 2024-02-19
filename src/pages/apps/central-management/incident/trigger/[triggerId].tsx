import { Form, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { PageHeader } from '@/components/share-components/page-header';
import { IntlMessage } from '@/components/util-components/intl-message';
import { TriggerForm } from '@/features/incident-management/trigger/components';
import { AppLayout } from '@/layouts';
import { useGetRuleDetail } from '@/features/incident-management/trigger/api/get-rule-detail';

const TriggerDetailPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { triggerId } = router.query;
  const { data, isLoading } = useGetRuleDetail(
    triggerId as string
  );

  return (
    <>
      <PageHeader
        onBack={() =>
          router.push(
            '/apps/central-management/incident/trigger'
          )
        }
        title={<IntlMessage id="Edit Rule" />}
      />
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <TriggerForm detailData={data} />
        </>
      )}
    </>
  );
};

TriggerDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default TriggerDetailPage;
