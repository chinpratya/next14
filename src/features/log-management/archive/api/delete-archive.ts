import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

export const deleteArchive = async (
  fileId: string
): Promise<void> => {
  return apiClient.delete(`/log/archive/${fileId}`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseDeleteArchive = {
  onSuccess?: () => void;
};

export const useDeleteArchive = ({
  onSuccess,
}: UseDeleteArchive) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteArchive,
    onSuccess: () => {
      queryClient.invalidateQueries([
        logQueryKeys.archive.all,
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
