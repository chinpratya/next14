import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { AuthenticatedUserSchema } from '../schemas';
import { AuthenticatedUser } from '../types';

export type GetToken = {
  code: string;
  organization: string;
  redirect_uri: string;
};

export const getToken = async (
  data: GetToken
): Promise<AuthenticatedUser> => {
  const response = await apiClient.post(
    `/user/gettoken`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return AuthenticatedUserSchema.parse(response.data);
};

type UseGetToken = {
  onSuccess?: (data: AuthenticatedUser) => void;
  onError?: () => void;
};

export const useGetToken = ({
  onSuccess,
  onError,
}: UseGetToken) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: getToken,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      onError?.();
    },
  });

  return { submit, isLoading };
};
