import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createGroupUsers = (
  groupId: string,
  userId: string[]
) =>
  apiClient.post(
    `/user/org/group/${groupId}/user`,
    {
      groupId,
      userId,
    },
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseCreateGroupUsers = {
  groupId: string;
  onSuccess?: () => void;
};

export const useCreateGroupUsers = ({
  groupId,
  onSuccess,
}: UseCreateGroupUsers) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (userIds: string[]) =>
      createGroupUsers(groupId, userIds),
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
