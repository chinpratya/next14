import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteCategory = (
  domainId: string,
  categoryId: string
) =>
  apiClient.delete(
    `/category/${domainId}/${categoryId}`,
    {
      baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    }
  );

export type UseDeleteCategory = {
  domainId: string;
  onSuccess?: () => void;
};

export const useDeleteCategory = ({
  domainId,
  onSuccess,
}: UseDeleteCategory) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (categoryId: string) =>
      deleteCategory(domainId, categoryId),
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
