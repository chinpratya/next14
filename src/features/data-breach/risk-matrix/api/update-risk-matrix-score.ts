import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRiskMatrixScore = (
  riskMatrixId: string,
  scores: number[]
) =>
  apiClient.put(
    `/riskassessment/${riskMatrixId}/score`,
    {
      scores,
    },
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseUpdateRiskScore = {
  riskMatrixId: string;
  onSuccess?: () => void;
};

export const useUpdateRiskScore = ({
  riskMatrixId,
  onSuccess,
}: UseUpdateRiskScore) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (scores: number[]) =>
      updateRiskMatrixScore(riskMatrixId, scores),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.riskMatrix.score(
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
