import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteNotify = async (
  notifyId: string
): Promise<void> => {
  return apiClient.delete(`/core/notify/${notifyId}`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseDeleteNotify = {
  onSuccess?: () => void;
};

export const useDeleteNotify = ({
  onSuccess,
}: UseDeleteNotify) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteNotify,
    onSuccess: () => {
      queryClient.invalidateQueries([
        coreQueryKeys.notify.all,
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
