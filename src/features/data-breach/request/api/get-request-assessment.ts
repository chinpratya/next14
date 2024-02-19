import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RequestRiskMatrixSchema } from '../schemas';
import { RequestRiskMatrixType } from '../types';

export const getRequestAssessment = async (
  requestId: string
): Promise<RequestRiskMatrixType> => {
  const response = await apiClient.get(
    `/request/${requestId}/assessment`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return RequestRiskMatrixSchema.parse(response.data);
};

export const useGetRequestAssessment = (
  requestId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.request.assessment(requestId),
      ],
      queryFn: () => getRequestAssessment(requestId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
