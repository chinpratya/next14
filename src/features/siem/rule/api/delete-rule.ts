import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteRule = (
  ruleId: string
): Promise<void> => {
  return apiClient.delete(`/siem/rule/${ruleId}`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseDeleteRule = {
  search?: string;
  page: number;
  pageSize: number;
  onSuccess?: () => void;
};

export const useDeleteRule = ({
  search = '',
  page,
  pageSize,
  onSuccess,
}: UseDeleteRule) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteRule,
    onSuccess: () => {
      queryClient.invalidateQueries([
        siemQueryKeys.rule.all,
        search,
        page,
        pageSize,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
