import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteGroupUser = (
  groupId: string,
  userId: string
): Promise<void> =>
  apiClient.delete(
    `/user/org/group/${groupId}/user/${userId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseDeleteGroupUser = {
  groupId: string;
  onSuccess?: () => void;
};

export const useDeleteGroupUser = ({
  groupId,
  onSuccess,
}: UseDeleteGroupUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (userId: string) =>
      deleteGroupUser(groupId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.group.users(groupId),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.user.all,
        {
          ignore_groupId: groupId,
        },
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
