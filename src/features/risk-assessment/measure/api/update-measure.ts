import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateMeasure = (
  measureId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/measured/${measureId}`, data, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

export type UseUpdateMeasure = {
  measureId: string;
  onSuccess?: () => void;
};

export const useUpdateMeasure = ({
  measureId,
  onSuccess,
}: UseUpdateMeasure) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateMeasure(measureId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.all,
      ]);
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.detail(
          measureId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
