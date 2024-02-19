import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type CreateDomain = {
  data: Record<string, unknown>;
};

export const createDomain = async ({
  data,
}: CreateDomain): Promise<string> => {
  const response = await apiClient.post(`/domain`, data, {
    baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
  });

  return response.data.ObjectUUID as string;
};

export type UseCreateDomain = {
  onSuccess?: (domainId: string) => void;
};

export const useCreateDomain = ({
  onSuccess,
}: UseCreateDomain = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createDomain({ data }),
    onSuccess: async (domainId: string) => {
      await queryClient.invalidateQueries([
        cookieManagementQueryKeys.domain.all,
      ]);
      onSuccess?.(domainId);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
