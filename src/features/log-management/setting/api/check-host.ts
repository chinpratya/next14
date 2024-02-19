import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

type CheckHost = {
  host: string;
};

export const checkHost = async (
  params: CheckHost
): Promise<Record<string, unknown>> => {
  return await apiClient.get(`/log/setting/check`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseUpdatePurpose = {
  onSuccess?: () => void;
};

export const useCheckHost = ({
  onSuccess,
}: UseUpdatePurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: checkHost,
    onSuccess: async () => {
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
