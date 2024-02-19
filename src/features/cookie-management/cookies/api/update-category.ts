import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateCategory = (
  domainId: string,
  categoryId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(
    `/category/${domainId}/${categoryId}`,
    data,
    {
      baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    }
  );

export type UseUpdateCategory = {
  domainId: string;
  categoryId: string;
  onSuccess?: () => void;
};

export const useUpdateCategory = ({
  domainId,
  categoryId,
  onSuccess,
}: UseUpdateCategory) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateCategory(domainId, categoryId, data),
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
