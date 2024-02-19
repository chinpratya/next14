import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type deleteGroupUserProps = {
  userId: string | null;
  groupId: string;
};

export const deleteGroupUser = async ({
  userId,
  groupId,
}: deleteGroupUserProps): Promise<void> =>
  await apiClient.delete(
    `/user/org/user/${userId}/group/${groupId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseDeleteGroupUser = {
  onSuccess?: () => void;
  userId: string;
  onClose: () => void;
};

export const useDeleteGroupUser = ({
  onSuccess,
  userId,
  onClose,
}: UseDeleteGroupUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteGroupUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.user.groups(userId),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.group.all,
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
