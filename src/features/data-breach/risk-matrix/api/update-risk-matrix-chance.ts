import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRiskMatrixChance = (
  riskMatrixId: string,
  riskMatrixChanceId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(
    `/riskassessment/${riskMatrixId}/likelihood/${riskMatrixChanceId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseUpdateRiskMatrixChance = {
  riskMatrixId: string;
  riskMatrixChanceId: string;
  onSuccess?: () => void;
};

export const useUpdateRiskMatrixChance = ({
  riskMatrixId,
  riskMatrixChanceId,
  onSuccess,
}: UseUpdateRiskMatrixChance) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRiskMatrixChance(
        riskMatrixId,
        riskMatrixChanceId,
        data
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.riskMatrix.chance(
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
