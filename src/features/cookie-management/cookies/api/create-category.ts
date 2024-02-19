import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createCategory = (
  domainId: string,
  data: Record<string, unknown>
) =>
  apiClient.post(`/category/${domainId}`, data, {
    baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
  });

export type UseCreateCategory = {
  domainId: string;
  onSuccess?: () => void;
};

export const useCreateCategory = ({
  domainId,
  onSuccess,
}: UseCreateCategory) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createCategory(domainId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        cookieManagementQueryKeys.cookiesCategory.detail(
          domainId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
