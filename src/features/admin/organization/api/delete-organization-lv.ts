import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteOrganizationLv = async (
  levelId: string
) =>
  apiClient.delete(`/user/org/level/${levelId}`, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseDeleteOrganizationLv = {
  onSuccess?: () => void;
};

export const useDeleteOrganizationLv = ({
  onSuccess,
}: UseDeleteOrganizationLv) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteOrganizationLv,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.organizationDetail.levels,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
