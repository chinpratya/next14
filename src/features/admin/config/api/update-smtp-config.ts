import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ONEFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateSmtpConfig = (
  data: Record<string, unknown>
) =>
  apiClient.post(`/mailsender/SMTP`, data, {
    baseURL: API_ENDPOINT_ONEFENCE_BASE_URL,
  });

export type UseUpdateSMTPConfig = {
  onSuccess?: () => void;
};

export const useUpdateSMTPConfig = ({
  onSuccess,
}: UseUpdateSMTPConfig) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateSmtpConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        adminQueryKeys.config.smtp,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
