import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { RequestResponseSchema } from '../schemas';
import { RequestResponse } from '../types';

export const listRequest = async (
  params: Request
): Promise<RequestResponse> => {
  const response = await apiClient.get(`/request`, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    params,
  });

  return RequestResponseSchema.parse(response);
};

export const useListRequest = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.request.all,
        params,
      ],
      queryFn: () => listRequest(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
