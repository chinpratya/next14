import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateOrganizationInfo = (
  data: Record<string, unknown>
): Promise<void> =>
  apiClient.put(`/user/org/info`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseUpdateOrganizationInfo = {
  onSuccess?: () => void;
};

export const useUpdateOrganizationInfo = ({
  onSuccess,
}: UseUpdateOrganizationInfo = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: updateOrganizationInfo,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.organizationDetail.info,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
