import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRiskMatrix = (
  riskMatrixId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/riskassessment/${riskMatrixId}`, data, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseUpdateRiskMatrix = {
  riskMatrixId: string;
  onSuccess?: () => void;
};

export const useUpdateRiskMatrix = ({
  riskMatrixId,
  onSuccess,
}: UseUpdateRiskMatrix) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRiskMatrix(riskMatrixId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.riskMatrix.all,
      ]);
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.riskMatrix.detail(
          riskMatrixId
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
