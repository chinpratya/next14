import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRiskMatrixEffect = (
  riskMatrixId: string,
  riskMatrixEffectId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(
    `/riskassessment/${riskMatrixId}/effect/${riskMatrixEffectId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseUpdateRiskMatrixEffect = {
  riskMatrixId: string;
  riskMatrixEffectId: string;
  onSuccess?: () => void;
};

export const useUpdateRiskMatrixEffect = ({
  riskMatrixId,
  riskMatrixEffectId,
  onSuccess,
}: UseUpdateRiskMatrixEffect) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRiskMatrixEffect(
        riskMatrixId,
        riskMatrixEffectId,
        data
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
