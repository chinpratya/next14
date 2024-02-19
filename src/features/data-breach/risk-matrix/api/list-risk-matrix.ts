import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { RiskMatrixResponseSchema } from '../schemas';
import { RiskMatrixResponse } from '../types';

export const listRiskMatrix = async (
  params?: Request
): Promise<RiskMatrixResponse> => {
  const response = await apiClient.get(
    `/riskassessment`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      params,
    }
  );

  return RiskMatrixResponseSchema.parse(response);
};

export const useListRiskMatrix = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.riskMatrix.all,
        params,
      ],
      queryFn: () => listRiskMatrix(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
