import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type DeleteAssessmentSubmissionRespondent = {
  assessmentId: string;
  respondentId: string;
  reason: string;
};

export const deleteAssessmentSubmissionRespondent = ({
  assessmentId,
  respondentId,
  reason,
}: DeleteAssessmentSubmissionRespondent) =>
  apiClient.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/${assessmentId}/respondent/${respondentId}`,
    { data: { reason } }
  );

export type UseDeleteAssessmentSubmissionRespondent = {
  assessmentId: string;
  respondentId: string;
  onSuccess?: () => void;
};

export const useDeleteAssessmentSubmissionRespondent = ({
  assessmentId,
  respondentId,
  onSuccess,
}: UseDeleteAssessmentSubmissionRespondent) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (reason: string) =>
      deleteAssessmentSubmissionRespondent({
        assessmentId,
        respondentId,
        reason,
      }),
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
