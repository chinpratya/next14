import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createIncidentTemplate = (
  data: Record<string, unknown>
) =>
  apiClient.post(`/templateevent`, data, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseCreateIncidentTemplate = {
  onSuccess?: () => void;
};

export const useCreateIncidentTemplate = ({
  onSuccess,
}: UseCreateIncidentTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createIncidentTemplate(data),
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
