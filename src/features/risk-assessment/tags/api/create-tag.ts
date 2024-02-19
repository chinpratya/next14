import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createTag = (
  data: Record<string, unknown>
) => {
  return apiClient.post(`/tag`, data, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });
};

export type UseCreateTag = {
  onSuccess?: () => void;
};

export const useCreateTag = ({
  onSuccess,
}: UseCreateTag) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createTag,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.tags.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
