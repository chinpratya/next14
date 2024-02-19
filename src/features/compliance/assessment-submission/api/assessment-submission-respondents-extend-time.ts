import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { AssessmentSubmissionRespondentExtendTime } from '../types';

export const assessmentSubmissionRespondentExtendTime = (
  assessmentId: string,
  respondentId: string,
  data: AssessmentSubmissionRespondentExtendTime
): Promise<void> => {
  return apiClient.post(
    `/assignment-submission/${assessmentId}/respondent/${respondentId}/extend-time`,
    data,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
};

export type UseAssessmentSubmissionRespondentExtendTime =
  {
    assessmentId: string;
    respondentId: string;
    onSuccess?: () => void;
  };

export const useAssessmentSubmissionRespondentExtendTime =
  ({
    assessmentId,
    respondentId,
    onSuccess,
  }: UseAssessmentSubmissionRespondentExtendTime) => {
    const { mutate, isLoading, isError } = useMutation({
      mutationFn: (
        data: AssessmentSubmissionRespondentExtendTime
      ) =>
        assessmentSubmissionRespondentExtendTime(
          assessmentId,
          respondentId,
          data
        ),
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.branchRespondent(
            assessmentId
          ),
        ]);
        queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.orgRespondent(
            assessmentId
          ),
        ]);
        onSuccess?.();
      },
    });

    return {
      submit: mutate,
      isLoading,
      isError,
    };
  };
