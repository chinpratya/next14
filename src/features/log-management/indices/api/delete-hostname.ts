import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

export const deleteHostname = async (
  hostnameId: string
): Promise<void> => {
  return apiClient.delete(`/log/hostname/${hostnameId}`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseDeleteHostname = {
  onSuccess?: () => void;
};

export const useDeleteHostname = ({
  onSuccess,
}: UseDeleteHostname) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteHostname,
    onSuccess: () => {
      queryClient.invalidateQueries([
        logQueryKeys.hostname.host,
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
