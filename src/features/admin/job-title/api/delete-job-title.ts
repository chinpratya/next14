import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteJobTitle = (
  positionId: string
): Promise<void> =>
  apiClient.delete(`/user/org/position/${positionId}`, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseDeleteJobTilte = {
  onSuccess?: () => void;
};

export const useDeleteJobTilte = ({
  onSuccess,
}: UseDeleteJobTilte) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteJobTitle,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.jobTitle.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
