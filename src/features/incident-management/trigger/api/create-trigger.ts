import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createTrigger = (
  data: Record<string, unknown>
) => {
  return apiClient.post(`/action`, data, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });
};

export type useCreateTriggerProps = {
  onSuccess?: (data: any) => void;
};

export const useCreateTrigger = ({
  onSuccess,
}: useCreateTriggerProps) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createTrigger,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.trigger.all,
      ]);
      onSuccess?.(data);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
