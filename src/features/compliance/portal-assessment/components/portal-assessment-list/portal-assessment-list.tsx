import { Card } from 'antd';

import { FallbackError } from '@utilComponents/fallback-error';

import { ListPortalAssessmentResponse } from '../../types/assessment';

import {
  PortalAssessmentTable,
  PortalAssessmentTableProps,
} from './portal-assessment-table';

export type PortalAssessmentListProps = Pick<
  PortalAssessmentTableProps,
  'onEdit'
> & {
  data?: ListPortalAssessmentResponse;
  isLoading?: boolean;
  isError?: boolean;
};

export const PortalAssessmentList = ({
  data,
  isLoading,
  isError = false,
  onEdit,
}: PortalAssessmentListProps) => {
  return (
    <FallbackError isError={isError}>
      <Card>
        <PortalAssessmentTable
          loading={isLoading}
          dataSource={data?.data ?? []}
          onEdit={onEdit}
        />
      </Card>
    </FallbackError>
  );
};
