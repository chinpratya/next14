import { ContainerOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Loading } from '@/components/share-components/loading';
import { FallbackError } from '@/components/util-components/fallback-error';
import {
  AssessmentSubmissionRespondentResult,
  useGetAssessmentSubmissionRespondentForm,
} from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import { TitleHeader } from '@components/title-header';

const AssessmentResult = () => {
  const router = useRouter();
  const assesmentResultID = router.query
    .assessmentResultID as string;
  const assessmentId = router.query
    .assessmentId as string;
  const { data, isLoading, isError } =
    useGetAssessmentSubmissionRespondentForm(
      assessmentId,
      assesmentResultID
    );

  if (isLoading) return <Loading cover="content" />;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={() =>
          router.replace(
            `/apps/datafence/compliance/assessment-submission/${assessmentId}`
          )
        }
        title={
          <TitleHeader
            title="รายละเอียดแบบประเมิน"
            icon={<ContainerOutlined />}
            meta={{
              assessmentId: 'รายการส่งแบบประเมิน',
              assesmentResultID: data?.name,
            }}
            tabKeys={['basicInfo']}
          />
        }
      />
      <AssessmentSubmissionRespondentResult
        assesmentResultID={assesmentResultID}
        assesmentID={assessmentId}
      />
    </FallbackError>
  );
};

AssessmentResult.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AssessmentResult;
