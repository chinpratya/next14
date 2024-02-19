import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const scanCookie = (domainKey: string) =>
  apiClient.post(
    `/scan/${domainKey}`,
    {},
    {
      baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    }
  );

export type UseScanCookie = {
  onSuccess?: () => void;
};

export const useScanCookie = ({
  onSuccess,
}: UseScanCookie) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (domainKey: string) =>
      scanCookie(domainKey),
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
