import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createRiskMatrixChance = (
  riskMatrixId: string,
  data: Record<string, unknown>
) =>
  apiClient.post(
    `/riskassessment/${riskMatrixId}/likelihood`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseCreateRiskMatrixChance = {
  riskMatrixId: string;
  onSuccess?: () => void;
};

export const useCreateRiskMatrixChance = ({
  riskMatrixId,
  onSuccess,
}: UseCreateRiskMatrixChance) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createRiskMatrixChance(riskMatrixId, data),
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
