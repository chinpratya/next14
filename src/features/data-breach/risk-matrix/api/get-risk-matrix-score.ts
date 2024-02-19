import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RiskMatrixScoreSchema } from '../schemas';
import { RiskMatrixScoreType } from '../types';

export const getRiskMatrixScore = async (
  riskMatrixId: string
): Promise<RiskMatrixScoreType> => {
  const response = await apiClient.get(
    `/riskassessment/${riskMatrixId}/score`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return RiskMatrixScoreSchema.parse(response.data);
};

export const useGetRiskMatrixScore = (
  riskMatrixId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.riskMatrix.score(
          riskMatrixId
        ),
      ],
      queryFn: () => getRiskMatrixScore(riskMatrixId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
