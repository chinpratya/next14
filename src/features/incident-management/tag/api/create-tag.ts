import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createTagIncident = (
  data: Record<string, unknown>
) => {
  return apiClient.post(`/tag`, data, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });
};

export type useCreateTagIncident = {
  onSuccess?: () => void;
};

export const useCreateTagIncident = ({
  onSuccess,
}: useCreateTagIncident) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createTagIncident,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.tags.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
