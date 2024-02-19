import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RiskMatrixChanceResponseSchema } from '../schemas';
import { RiskMatrixChangeResponse } from '../types';

export const getRiskMatrixChance = async (
  riskMatrixId: string
): Promise<RiskMatrixChangeResponse> => {
  const response = await apiClient.get(
    `/riskassessment/${riskMatrixId}/likelihood`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return RiskMatrixChanceResponseSchema.parse(response);
};

export const useGetRiskMatrixChance = (
  riskMatrixId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.riskMatrix.chance(
          riskMatrixId
        ),
      ],
      queryFn: () => getRiskMatrixChance(riskMatrixId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
