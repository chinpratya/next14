import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteDomain = (domainid: string) =>
  apiClient.delete(`/domain/${domainid}`, {
    baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
  });

export type UseDeleteDomain = {
  onSuccess?: () => void;
};

export const useDeleteDomain = ({
  onSuccess,
}: UseDeleteDomain = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteDomain,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        cookieManagementQueryKeys.domain.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
