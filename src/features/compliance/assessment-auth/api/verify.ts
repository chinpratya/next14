import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { VerificationOtpSchema } from '../schemas/verify';
import { VerificationOtp } from '../types/verify';

export type VerifyPayload = {
  code: string;
  otp: number;
};

export const verify = async (
  payload: VerifyPayload
): Promise<VerificationOtp> => {
  const { data } = await apiClient.post(
    `/portal/login/verify`,
    payload,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

  return VerificationOtpSchema.parse(data);
};

export type UseVerify = {
  onSuccess?: (
    verificationEmail: VerificationOtp
  ) => void;
  onError?: (verificationEmail: VerificationOtp) => void;
};

export const useVerify = ({
  onSuccess,
  onError,
}: UseVerify = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: verify,
    onSuccess: (verificationEmail: VerificationOtp) => {
      onSuccess?.(verificationEmail);
    },
    onError: (verificationEmail: VerificationOtp) => {
      onError?.(verificationEmail);
    },
  });
  return {
    submit: mutate,
    isLoading,
  };
};
