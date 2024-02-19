import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

const deleteAgencies = (groupId: string): Promise<void> =>
  apiClient.delete(`/user/org/group/${groupId}`, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

type UseDeleteAgencies = {
  onSuccess?: () => void;
};

export const useDeleteAgencies = ({
  onSuccess,
}: UseDeleteAgencies) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteAgencies,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
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
