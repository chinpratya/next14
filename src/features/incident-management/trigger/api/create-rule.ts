import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createTagIncident = (
  data: Record<string, unknown>
) => {
  return apiClient.post(`/rule`, data, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });
};

export type useCreateRuleProps = {
  onSuccess?: (data: any) => void;
};

export const useCreateRule = ({
  onSuccess,
}: useCreateRuleProps) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createTagIncident,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.rule.all,
      ]);
      onSuccess?.(data);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
