import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteUser = async (
  userId: string | null
): Promise<void> =>
  await apiClient.delete(`/user/org/user/${userId}`, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseDeleteUser = {
  onSuccess?: () => void;
};

export const useDeleteUser = ({
  onSuccess,
}: UseDeleteUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.user.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit: mutate, isLoading };
};
