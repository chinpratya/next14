import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteGroup = async (groupId: string) =>
  apiClient.delete(`/user/org/group/${groupId}`, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseDeleteGroup = {
  onSuccess?: () => void;
};

export const useDeleteGroup = ({
  onSuccess,
}: UseDeleteGroup) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries([
        adminQueryKeys.group.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
