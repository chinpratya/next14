import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type AssessmentSubmissionResponse = {
  ObjectUUID: string;
  code: number;
  message: string;
};

export const createAssessmentSubmission = (
  data: Record<string, unknown>
): Promise<AssessmentSubmissionResponse> => {
  return apiClient.post(`/assignment-submission`, data, {
    baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
  });
};

export type UseCreateAssessmentSubmission = {
  isPublish?: boolean;
  onSuccess?: (ObjectUUID: string) => void;
};

export const useCreateAssessmentSubmission = ({
  isPublish,
  onSuccess,
}: UseCreateAssessmentSubmission) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createAssessmentSubmission,
    onSuccess: async (data) => {
      if (!isPublish) {
        await queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.all,
        ]);
      }
      onSuccess?.(data.ObjectUUID);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
