import { Col, Row } from 'antd';
import { useRouter } from 'next/router';

import { Loading } from '@/components/share-components/loading';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  // SlaBasicInfo,
  WorkflowBasicInfo,
  WorkflowTaskList,
  useGetWorkflow,
} from '@/features/incident-management';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';

export const WorkflowDetailPage = () => {
  const router = useRouter();
  const workflowId = router.query.workflowId as string;

  const { data, isLoading, isError } =
    useGetWorkflow(workflowId);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={false}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id={'รายละเอียดแผนการตอบสนอง'} />
        }
      />
      {/* <Result title="This Page is Coming soon..." /> */}
      <Row gutter={[24, 24]}>
        <Col {...getColLayout(24)}>
          <WorkflowBasicInfo workflow={data?.data} />
        </Col>
        {/* <Col {...getColLayout([24, 24, 24, 12, 6, 6])}>
          <SlaBasicInfo sla={data?.data.sla} />
        </Col> */}
        <Col {...getColLayout(24)}>
          <WorkflowTaskList />
        </Col>
      </Row>
    </FallbackError>
  );
};

WorkflowDetailPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default WorkflowDetailPage;
