import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { IncidentTemplateSchema } from '../schemas';
import { IncidentTemplateType } from '../types';

export const getIncidentTemplate = async (
  incidentTemplateId: string
): Promise<IncidentTemplateType> => {
  const response = await apiClient.get(
    `/templateevent/${incidentTemplateId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return IncidentTemplateSchema.parse(response.data);
};

export const useGetIncidentTemplate = (
  incidentTemplateId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.incidentTemplate.detail(
          incidentTemplateId
        ),
      ],
      queryFn: () =>
        getIncidentTemplate(incidentTemplateId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
