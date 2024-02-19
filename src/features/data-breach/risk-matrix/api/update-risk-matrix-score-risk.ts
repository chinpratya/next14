import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRiskMatrixScoreRisk = (
  riskMatrixId: string,
  scoreId: number,
  data: Record<string, unknown>
) =>
  apiClient.put(
    `/riskassessment/${riskMatrixId}/score/${scoreId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseUpdateRiskScoreRisk = {
  riskMatrixId: string;
  onSuccess?: () => void;
};

type payloadRisk = {
  scoreId: number;
  data: Record<string, unknown>;
};
export const useUpdateRiskScoreRisk = ({
  riskMatrixId,
  onSuccess,
}: UseUpdateRiskScoreRisk) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ data, scoreId }: payloadRisk) =>
      updateRiskMatrixScoreRisk(
        riskMatrixId,
        scoreId,
        data
      ),
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
