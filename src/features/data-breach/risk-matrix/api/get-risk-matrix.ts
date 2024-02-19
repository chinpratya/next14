import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RiskMatrixSchema } from '../schemas';
import { RiskMatrix } from '../types';

export const getRiskMatrix = async (
  riskMatrixId: string
): Promise<RiskMatrix> => {
  const response = await apiClient.get(
    `/riskassessment/${riskMatrixId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return RiskMatrixSchema.parse(response.data);
};

export const useGetRiskMatrix = (
  riskMatrixId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.riskMatrix.detail(
          riskMatrixId
        ),
      ],
      queryFn: () => getRiskMatrix(riskMatrixId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
