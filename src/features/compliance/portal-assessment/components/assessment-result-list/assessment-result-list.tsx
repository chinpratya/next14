import { Card } from 'antd';

import { FallbackError } from '@utilComponents/fallback-error';

import {
  ResultAssessment,
  ResultResponseAssessment,
} from '../../types/assessment';

import {
  AssessmentResultTable,
  AssessmentResultTableProps,
} from './assessment-result-table';

export type AssessmentResultListProps = Pick<
  AssessmentResultTableProps,
  'onEdit'
> & {
  data?: ResultResponseAssessment;
  isLoading?: boolean;
  isError?: boolean;
  onEdit?: (assessment: ResultAssessment) => void;
};

export const AssessmentResultList = ({
  data,
  isLoading,
  isError = false,
  onEdit,
}: AssessmentResultListProps) => {
  return (
    <FallbackError isError={isError}>
      <Card>
        <AssessmentResultTable
          loading={isLoading}
          dataSource={data?.data ?? []}
          onEdit={onEdit}
        />
      </Card>
    </FallbackError>
  );
};
