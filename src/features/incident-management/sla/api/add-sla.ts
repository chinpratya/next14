import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createSla = (
  data: Record<string, unknown>
) => {
  return apiClient.post(`/serviceLevelAgreement`, data, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });
};

export type useCreateSlaProps = {
  onSuccess?: (data: any) => void;
};

export const useCreateSla = ({
  onSuccess,
}: useCreateSlaProps) => {
  const { mutate, isLoading, data } = useMutation({
    mutationFn: createSla,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.sla.all,
      ]);
      onSuccess?.(data);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
