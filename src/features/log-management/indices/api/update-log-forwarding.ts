import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateLogForwarding = async (
  forwardingId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/log/forwarding/${forwardingId}`,
    data,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

export type UseUpdateLogForwarding = {
  forwardingId: string;
  onSuccess?: () => void;
};

export const useUpdateLogForwarding = ({
  forwardingId,
  onSuccess,
}: UseUpdateLogForwarding) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateLogForwarding(forwardingId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.forwarding.detail(forwardingId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
