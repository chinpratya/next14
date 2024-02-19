import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateDomain = async (
  domainId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/domain/${domainId}`, data, {
    baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
  });

export type UseUpdateDomain = {
  domainId: string;
  onSuccess?: () => void;
};

export const useUpdateDomain = ({
  domainId,
  onSuccess,
}: UseUpdateDomain) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateDomain(domainId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        cookieManagementQueryKeys.domain.all,
      ]);
      await queryClient.invalidateQueries([
        cookieManagementQueryKeys.banner.detail(domainId),
      ]);
      await queryClient.invalidateQueries([
        cookieManagementQueryKeys.domain.detail(domainId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
