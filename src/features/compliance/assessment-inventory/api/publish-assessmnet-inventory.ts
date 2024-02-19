import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { AssessmentResponseSchema } from '../schemas';
import { createAssessmentResponse } from '../types';

export const publishAssessmentInventory = async (
  assessmentId: string
): Promise<createAssessmentResponse> => {
  const response = await apiClient.post(
    `/assessment/${assessmentId}/publish`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
  return AssessmentResponseSchema.parse(response);
};

export type UsePublishAssessmentInventory = {
  onSuccess?: () => void;
  assessmentId: string;
};

export const usePublishAssessmentInventory = ({
  onSuccess,
  assessmentId,
}: UsePublishAssessmentInventory) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (
      newAssessmentInventoryId: string | undefined | null
    ) =>
      publishAssessmentInventory(
        newAssessmentInventoryId ?? assessmentId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
