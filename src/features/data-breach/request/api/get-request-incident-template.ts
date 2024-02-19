import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import {
  IncidentTemplateEventFormSchema,
  IncidentTemplateEventFormType,
} from '../../incident-template';

export const getRequestIncidentTemplate = async (
  requestId: string
): Promise<IncidentTemplateEventFormType> => {
  const response = await apiClient.get(
    `/request/${requestId}/template`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return IncidentTemplateEventFormSchema.parse(
    response.data
  );
};

export const useGetRequestIncidentTemplate = (
  requestId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.request.incidentTemplate(
          requestId
        ),
      ],
      queryFn: () =>
        getRequestIncidentTemplate(requestId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
