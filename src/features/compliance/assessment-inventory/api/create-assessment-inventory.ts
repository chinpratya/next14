import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

export const createAssessmentInventory = async (
  data: Record<string, unknown>
): Promise<void> =>
  await apiClient.post(`/assessment`, data, {
    baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
  });

export type UseCreateAssessmentInventory = {
  onSuccess?: () => void;
};

export const useCreateAssessmentInventory = ({
  onSuccess,
}: UseCreateAssessmentInventory) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createAssessmentInventory,
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
