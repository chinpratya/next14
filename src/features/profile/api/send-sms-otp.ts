import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

export const sendSmsOtp = async (
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.post(
    '/user/auth/send/smsotp',
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
};

export type UseSendSmsOtp = {
  onSuccess?: () => void;
};

export const useSendSmsOtp = ({
  onSuccess,
}: UseSendSmsOtp) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      sendSmsOtp(data),
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
