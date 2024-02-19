import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { VerificationEmailSchema } from '../schemas/verify';
import { VerificationEmail } from '../types/verify';

export const login = async (
  email: string
): Promise<VerificationEmail> => {
  const { data } = await apiClient.post(
    `${API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL}/portal/login`,
    {
      email,
    }
  );

  return VerificationEmailSchema.parse(data);
};

export type UseLogin = {
  onSuccess?: (
    verificationEmail: VerificationEmail
  ) => void;
  onError?: (
    verificationEmail: VerificationEmail
  ) => void;
};

export const useLogin = ({
  onSuccess,
  onError,
}: UseLogin = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (verificationEmail: VerificationEmail) => {
      onSuccess?.(verificationEmail);
    },
    onError: (verificationEmail: VerificationEmail) => {
      onError?.(verificationEmail);
    },
  });
  return {
    submit: mutate,
    isLoading,
  };
};
