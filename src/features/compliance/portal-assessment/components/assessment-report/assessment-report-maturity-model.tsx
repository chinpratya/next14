import { Typography } from 'antd';
import _ from 'lodash';

import { FallbackError } from '@/components/util-components/fallback-error';

import { MaturityModelSummaryDetailTable } from '../../../assessment-submission/components/assessment-submission-report/assessment-submission-report-maturity-model-table';
import { MaturityModelReport } from '../../types/report';

type AssessmentReportMaturityModelProps = {
  maturityModel?: MaturityModelReport;
  isError: boolean;
};

export const AssessmentReportMaturityModel = ({
  maturityModel,
  isError,
}: AssessmentReportMaturityModelProps) => {
  const dataModel = _.map(
    maturityModel?.detail,
    (value) => {
      return {
        ObjectUUID: value?.ObjectUUID,
        columnName: value.columnName,
        columnDetail: value?.columnDetail,
        icon: value?.icon,
        description: value?.description,
      };
    }
  );

  return (
    <>
      <FallbackError isError={isError}>
        <Typography.Title
          level={4}
          className="font-weight-bold mt-5"
        >
          รายละเอียด MATURITY MODEL
        </Typography.Title>
        <MaturityModelSummaryDetailTable
          maturityModels={dataModel}
        />
      </FallbackError>
    </>
  );
};
