import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { IncidentTemplateResponseSchema } from '../schemas';
import { IncidentTemplateResponse } from '../types';

export const listIncidentTemplate = async (
  params?: Request
): Promise<IncidentTemplateResponse> => {
  const response = await apiClient.get(`/templateevent`, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    params,
  });

  return IncidentTemplateResponseSchema.parse(response);
};

export const useListIncidentTemplate = (
  params?: Request
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.incidentTemplate.all,
        params,
      ],
      queryFn: () => listIncidentTemplate(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
