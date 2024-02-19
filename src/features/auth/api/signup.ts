import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { Signup } from '../types/signup';

export const signup = async (
  data: Signup
): Promise<Signup> => {
  try {
    await apiClient.post(`/user/signup`, data, {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    });
    return data;
  } catch (error) {
    return new Promise((_, reject) => reject(error));
  }
};

export type UseSignup = {
  onSuccess?: (signup: Signup) => void;
};

export const useSignup = ({
  onSuccess,
}: UseSignup = {}) => {
  const { mutate, isError, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess,
  });

  return {
    submit: mutate,
    isError,
    isLoading,
  };
};
