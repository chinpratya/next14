import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type updateSla = {
  slaId: string;
  data: Record<string, unknown>;
};
export const updateSla = ({
  slaId,
  data,
}: updateSla): Promise<void> =>
  apiClient.put(`/serviceLevelAgreement/${slaId}`, data, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });

export type useUpdateSla = {
  slaId: string;
  onSuccess?: () => void;
};

export const useUpdateSla = ({
  onSuccess,
  slaId,
}: useUpdateSla) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateSla({ slaId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.sla.detail(slaId),
      ]);
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.sla.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
