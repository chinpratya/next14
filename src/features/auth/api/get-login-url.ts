import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

export type GetLoginUrl = {
  username: string;
  organization: string;
  redirect_uri: string;
};

export const getLoginUrl = async (
  data: GetLoginUrl
): Promise<string> => {
  const response = await apiClient.post(
    `/user/loginurl`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return z.string().parse(response.data);
};

export type UseGetLoginUrl = {
  onSuccess?: (data: string) => void;
};

export const useGetLoginUrl = ({
  onSuccess,
}: UseGetLoginUrl = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: getLoginUrl,
    onSuccess,
  });

  return {
    submit: mutate,
    isLoading,
  };
};
