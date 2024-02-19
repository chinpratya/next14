import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RiskMatrixEffectResponseSchema } from '../schemas';
import { RiskMatrixEffectResponse } from '../types';

export const getRiskMatrixEffect = async (
  riskMatrixId: string
): Promise<RiskMatrixEffectResponse> => {
  const response = await apiClient.get(
    `/riskassessment/${riskMatrixId}/effect`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return RiskMatrixEffectResponseSchema.parse(response);
};

export const useGetRiskMatrixEffect = (
  riskMatrixId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.riskMatrix.effect(
          riskMatrixId
        ),
      ],
      queryFn: () => getRiskMatrixEffect(riskMatrixId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
