import { FallbackError } from '@utilComponents/fallback-error';

import { useGetAssessmentRespondents } from '../../api/get-assessment-respondents';

import { ListRespondents } from './list-respondents';

export type OrganizationRespondentReportProps = {
  assessmentId: string;
};
export const OrganizationRespondentReport = ({
  assessmentId,
}: OrganizationRespondentReportProps) => {
  const { data, isLoading, isError } =
    useGetAssessmentRespondents(assessmentId);

  return (
    <FallbackError isError={isError}>
      <ListRespondents
        isLoading={isLoading}
        respondents={data?.data ?? []}
        assessmentId={assessmentId}
      />
    </FallbackError>
  );
};
