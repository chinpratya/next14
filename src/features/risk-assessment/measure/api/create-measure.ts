import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createMeasure = (
  data: Record<string, unknown>
) =>
  apiClient.post('/measured', data, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

export type UseCreateMeasure = {
  onSuccess?: () => void;
};

export const useCreateMeasure = ({
  onSuccess,
}: UseCreateMeasure) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createMeasure(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
