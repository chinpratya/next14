import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { DuplicateResponseSchema } from '../schemas';
import { duplicateAssessmentResponse } from '../types';

export const duplicateAssessmentInventory = async (
  data: Record<string, unknown>,
  assessmentId: string
): Promise<duplicateAssessmentResponse> => {
  const response = await apiClient.post(
    `/assessment/${assessmentId}/clone`,
    data,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
  return DuplicateResponseSchema.parse(response);
};

export type UseDuplicateAssessmentInventory = {
  onSuccess?: (assessmentId?: string) => void;
  assessmentId: string;
};

export const useDuplicateAssessmentInventory = ({
  onSuccess,
  assessmentId,
}: UseDuplicateAssessmentInventory) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      duplicateAssessmentInventory(data, assessmentId),
    onSuccess: (resp) => {
      queryClient.invalidateQueries();
      onSuccess?.(resp?.ObjectUUID);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
