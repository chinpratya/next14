import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateIncidentTemplate = (
  incidentTemplateId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(
    `/templateevent/${incidentTemplateId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseUpdateIncidentTemplate = {
  incidentTemplateId: string;
  onSuccess?: () => void;
};

export const useUpdateIncidentTemplate = ({
  incidentTemplateId,
  onSuccess,
}: UseUpdateIncidentTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateIncidentTemplate(incidentTemplateId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.incidentTemplate.detail(
          incidentTemplateId
        ),
      ]);
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.incidentTemplate.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
