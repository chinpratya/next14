import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

export const deleteLogForwarding = async (
  forwadingId: string
): Promise<void> => {
  return apiClient.delete(
    `/log/forwarding/${forwadingId}`,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

export type UseDeleteLogForwarding = {
  onSuccess?: () => void;
};

export const useDeleteLogForwarding = ({
  onSuccess,
}: UseDeleteLogForwarding) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteLogForwarding,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.forwarding.all,
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
