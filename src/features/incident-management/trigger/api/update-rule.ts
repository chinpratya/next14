import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type updateRule = {
  ruleId: string;
  data: Record<string, unknown>;
};
export const updateRule = ({
  ruleId,
  data,
}: updateRule): Promise<void> =>
  apiClient.put(`/rule/${ruleId}`, data, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });

export type useUpdateRuleProps = {
  ruleId: string;
  onSuccess?: () => void;
};

export const useUpdateRule = ({
  onSuccess,
  ruleId,
}: useUpdateRuleProps) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRule({ ruleId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.rule.detail(ruleId),
      ]);
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.rule.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
