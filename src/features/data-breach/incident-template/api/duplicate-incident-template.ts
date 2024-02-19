import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const duplicateIncidentTemplate = (
  incidentTemplateId: string
) =>
  apiClient.put(
    `/templateevent/${incidentTemplateId}/duplicate`,
    {},
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseDuplicateIncidentTemplate = {
  onSuccess?: () => void;
};

export const useDuplicateIncidentTemplate = ({
  onSuccess,
}: UseDuplicateIncidentTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (incidentTemplateId: string) =>
      duplicateIncidentTemplate(incidentTemplateId),
    onSuccess: async () => {
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
