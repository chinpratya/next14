import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateIncidentTemplateEventForm = (
  incidentTemplateId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(
    `/templateevent/${incidentTemplateId}/form`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseUpdateIncidentTemplateEventForm = {
  incidentTemplateId: string;
  onSuccess?: () => void;
};

export const useUpdateIncidentTemplateEventForm = ({
  incidentTemplateId,
  onSuccess,
}: UseUpdateIncidentTemplateEventForm) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateIncidentTemplateEventForm(
        incidentTemplateId,
        data
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.incidentTemplate.eventForm(
          incidentTemplateId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
