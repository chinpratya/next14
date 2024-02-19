import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type PublishAssessmentSubmissionRespondent = {
  assessmentSubmissionId: string;
  respondentId: string;
};

export const publishAssessmentSubmissionRespondent = ({
  assessmentSubmissionId,
  respondentId,
}: PublishAssessmentSubmissionRespondent): Promise<void> => {
  return apiClient.post(
    `/assignment-submission/${assessmentSubmissionId}/respondent/${respondentId}/publish`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
};

export type UsePublishAssessmentSubmissionRespondent = {
  assessmentId?: string;
  onSuccess?: () => void;
};

export const usePublishAssessmentSubmissionRespondent = ({
  assessmentId = '',
  onSuccess,
}: UsePublishAssessmentSubmissionRespondent) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: publishAssessmentSubmissionRespondent,
    onSuccess: async () => {
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
