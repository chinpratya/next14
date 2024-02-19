import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const publishAssessmentSubmission = (
  assessmentSubmissionId: string
): Promise<void> => {
  return apiClient.post(
    `/assignment-submission/${assessmentSubmissionId}/publish`,
    null,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
};

export type UsePublishAssessmentSubmission = {
  assessmentId?: string;
  onSuccess?: () => void;
};

export const usePublishAssessmentSubmission = ({
  assessmentId = '',
  onSuccess,
}: UsePublishAssessmentSubmission) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (assessmentSubmissionId: string) =>
      publishAssessmentSubmission(assessmentSubmissionId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.all,
        ]),
        queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.detail(
            assessmentId
          ),
        ]),
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
