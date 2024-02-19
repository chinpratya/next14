import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRule = async (
  ruleId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/siem/rule/${ruleId}`,
    data,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

type UseUpdateRule = {
  ruleId: string;
  onSuccess?: () => void;
};

export const useUpdateRule = ({
  ruleId,
  onSuccess,
}: UseUpdateRule) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRule(ruleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        siemQueryKeys.rule.detail(ruleId),
      ]);

      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
