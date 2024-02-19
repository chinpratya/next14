import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { ResendEmailVerifyResponseSchema } from '../schemas';
import {
  ResendEmailVerify,
  ResendEmailVerifyResponse,
} from '../types/resend-email-verify';

export const resendEmailVerify = async (
  data: ResendEmailVerify
): Promise<ResendEmailVerifyResponse> => {
  const response = await apiClient.post(
    `/user/singup/resendVerify`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return ResendEmailVerifyResponseSchema.parse(response);
};

export type UseResendEmailVerify = {
  onSuccess?: () => void;
};

export const useResendEmailVerify = ({
  onSuccess,
}: UseResendEmailVerify = {}) => {
  const { mutate, isError, isLoading } = useMutation({
    mutationFn: resendEmailVerify,
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isError,
    isLoading,
  };
};
