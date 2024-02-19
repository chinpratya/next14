import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type Payload = {
  respondents: {
    orgID: string;
    respondentID: string;
  }[];
};

export const assessmentSubmissionRespondentAddRespondent =
  (
    assessmentId: string,
    data: Payload
  ): Promise<void> => {
    return apiClient.post(
      `/assignment-submission/${assessmentId}/respondent`,
      data,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );
  };

export type UseAssessmentSubmissionRespondentAddRespondent =
  {
    assessmentId: string;
    onSuccess?: () => void;
  };

export const useAssessmentSubmissionRespondentAddRespondent =
  ({
    assessmentId,
    onSuccess,
  }: UseAssessmentSubmissionRespondentAddRespondent) => {
    const { mutate, isLoading, isError } = useMutation({
      mutationFn: (data: Payload) =>
        assessmentSubmissionRespondentAddRespondent(
          assessmentId,
          data
        ),
      onSuccess: async () => {
        queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.respondent(
            assessmentId
          ),
        ]);
        queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.orgRespondent(
            assessmentId
          ),
        ]);
        await queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.branchRespondent(
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
