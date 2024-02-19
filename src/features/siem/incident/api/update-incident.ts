import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type Payload = {
  description: string;
  assign_status: string;
  assignes: { _id: string; email: string }[];
};

export const updateIncident = (
  incidentId: string,
  data: Payload
) =>
  apiClient.put(`/siem/incident/${incidentId}`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });

export type UseUpdateIncident = {
  incidentId: string;
  onSuccess?: () => void;
};

export const useUpdateIncident = ({
  incidentId,
  onSuccess,
}: UseUpdateIncident) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: Payload) =>
      updateIncident(incidentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        siemQueryKeys.incident.detail(incidentId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
