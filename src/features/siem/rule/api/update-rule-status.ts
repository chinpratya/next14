import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRuleStatus = async (
  ruleId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/siem/rule/status/${ruleId}`,
    data,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

type UseUpdateRuleStatus = {
  onSuccess?: () => void;
};

export const useUpdateRuleStatus = ({
  onSuccess,
}: UseUpdateRuleStatus) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRuleStatus(data?.id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        siemQueryKeys.rule.all,
      ]);

      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
