import { Skeleton, Typography } from 'antd';

import { MaturityModelDetail } from '../../../maturity-model';

import { MaturityModelSummaryDetailTable } from './assessment-submission-report-maturity-model-table';

type AssessmentSubmissionReportMaturityModelProps = {
  data?: MaturityModelDetail[];
  loading?: boolean;
};

export const AssessmentSubmissionReportMaturityModel = ({
  data,
  loading,
}: AssessmentSubmissionReportMaturityModelProps) => {
  return (
    <>
      <Typography.Title
        level={4}
        className="font-weight-bold mt-5"
      >
        รายละเอียด Maturity Model
      </Typography.Title>

      {loading ? (
        <Skeleton active className="mt-4" />
      ) : (
        <MaturityModelSummaryDetailTable
          maturityModels={data}
        />
      )}
    </>
  );
};
