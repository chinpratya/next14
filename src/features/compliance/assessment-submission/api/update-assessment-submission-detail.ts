import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateAssessmentSubmissionDetailPayload = {
  name: string;
  assessmentID?: string;
  status?: string;
};

export const updateAssessmentSubmissionDetail = (
  assessmentSubmissionId: string,
  payload: UpdateAssessmentSubmissionDetailPayload
) => {
  return apiClient.put(
    `/assignment-submission/${assessmentSubmissionId}`,
    payload,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
};

export type UseUpdateAssessmentSubmissionDetail = {
  assessmentSubmissionId: string;
  isPublish?: boolean;
  onSuccess?: () => void;
};

export const useUpdateAssessmentSubmissionDetail = ({
  assessmentSubmissionId,
  isPublish,
  onSuccess,
}: UseUpdateAssessmentSubmissionDetail) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (
      payload: UpdateAssessmentSubmissionDetailPayload
    ) =>
      updateAssessmentSubmissionDetail(
        assessmentSubmissionId,
        payload
      ),
    onSuccess: async () => {
      if (!isPublish) {
        await queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.detail(
            assessmentSubmissionId
          ),
        ]);
      }
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
