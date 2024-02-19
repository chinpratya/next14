import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteRiskMatrixChance = (
  riskMatrixId: string,
  riskMatrixChanceId: string
) =>
  apiClient.delete(
    `/riskassessment/${riskMatrixId}/likelihood/${riskMatrixChanceId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseDeleteRiskMatrixChane = {
  riskMatrixId: string;
  onSuccess?: () => void;
};

export const useDeleteRiskMatrixChance = ({
  riskMatrixId,
  onSuccess,
}: UseDeleteRiskMatrixChane) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (riskMatrixChanceId: string) =>
      deleteRiskMatrixChance(
        riskMatrixId,
        riskMatrixChanceId
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
