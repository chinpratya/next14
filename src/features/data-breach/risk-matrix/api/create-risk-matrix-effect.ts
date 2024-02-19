import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createRiskMatrixEffect = (
  riskMatrixId: string,
  data: Record<string, unknown>
) =>
  apiClient.post(
    `/riskassessment/${riskMatrixId}/effect`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseCreateRiskMatrixEffect = {
  riskMatrixId: string;
  onSuccess?: () => void;
};

export const useCreateRiskMatrixEffect = ({
  riskMatrixId,
  onSuccess,
}: UseCreateRiskMatrixEffect) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createRiskMatrixEffect(riskMatrixId, data),
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
