import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRiskMatrixScoreResolution = (
  riskMatrixId: string,
  resolution: string
) =>
  apiClient.put(
    `/riskassessment/${riskMatrixId}/score/resolution`,
    {
      resolution,
    },
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseUpdateRiskMatrixScoreResolution = {
  riskMatrixId: string;
  onSuccess?: () => void;
};

export const useUpdateRiskMatrixScoreResolution = ({
  riskMatrixId,
  onSuccess,
}: UseUpdateRiskMatrixScoreResolution) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (resolution: string) =>
      updateRiskMatrixScoreResolution(
        riskMatrixId,
        resolution
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
