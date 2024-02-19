import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteWhitelist = async (
  whitelistId: string
): Promise<void> => {
  return apiClient.delete(
    `/log/whitelist/${whitelistId}`,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

export type UseDeleteWhitelist = {
  onSuccess?: () => void;
};

export const useDeleteWhitelist = ({
  onSuccess,
}: UseDeleteWhitelist) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteWhitelist,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.whitelist.all,
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
