import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteRiskMatrixEffect = (
  riskMatrixId: string,
  riskMatrixEffectId: string
) =>
  apiClient.delete(
    `/riskassessment/${riskMatrixId}/effect/${riskMatrixEffectId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseDeleteRiskMatrixEffect = {
  riskMatrixId: string;
  onSuccess?: () => void;
};

export const useDeleteRiskEffectChance = ({
  riskMatrixId,
  onSuccess,
}: UseDeleteRiskMatrixEffect) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (riskMatrixEffectId: string) =>
      deleteRiskMatrixEffect(
        riskMatrixId,
        riskMatrixEffectId
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.riskMatrix.effect(
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
