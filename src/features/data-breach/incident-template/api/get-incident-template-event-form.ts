import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { IncidentTemplateEventFormSchema } from '../schemas';
import { IncidentTemplateEventFormType } from '../types';

export const getIncidentTemplateEventForm = async (
  incidentTemplateId: string
): Promise<IncidentTemplateEventFormType> => {
  const response = await apiClient.get(
    `/templateevent/${incidentTemplateId}/form`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return IncidentTemplateEventFormSchema.parse(
    response.data
  );
};

export const useGetIncidentTemplateEventForm = (
  incidentTemplateId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.incidentTemplate.eventForm(
          incidentTemplateId
        ),
      ],
      queryFn: () =>
        getIncidentTemplateEventForm(incidentTemplateId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
