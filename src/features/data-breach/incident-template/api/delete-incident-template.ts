import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteIncidentTemplate = (
  incidentTemplateId: string
) =>
  apiClient.delete(
    `/templateevent/${incidentTemplateId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseDeleteIncidentTemplate = {
  onSuccess?: () => void;
};

export const useDeleteIncidentTemplate = ({
  onSuccess,
}: UseDeleteIncidentTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (incidentTemplateId: string) =>
      deleteIncidentTemplate(incidentTemplateId),
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
