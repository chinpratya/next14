import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type deleteRoleUserProps = {
  userId: string | null;
  roleId: string;
};

export const deleteRoleUser = async ({
  userId,
  roleId,
}: deleteRoleUserProps): Promise<void> =>
  await apiClient.delete(
    `/user/org/user/${userId}/role/${roleId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseDeleteRoleUser = {
  onSuccess?: () => void;
  userId: string;
  onClose: () => void;
};

export const useDeleteRoleUser = ({
  onSuccess,
  userId,
  onClose,
}: UseDeleteRoleUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteRoleUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.user.roles(userId),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.role.all,
        {
          ignore_userId: userId,
        },
      ]);
      onSuccess?.();
      onClose?.();
    },
  });

  return { submit: mutate, isLoading };
};
