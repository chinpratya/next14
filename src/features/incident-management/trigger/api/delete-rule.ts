import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteRule = (ruleId: string) =>
  // console.log(tagId);
  apiClient.delete(`/rule/${ruleId}`, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });

export type useDeleteRuleProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useDeleteRule = ({
  onSuccess,
  onError,
}: useDeleteRuleProps) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteRule,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.rule.all,
      ]);
      onSuccess?.();
    },
    onError: async () => {
      onError?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
