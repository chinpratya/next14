import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ONEFENCE_LOCAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { shareQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createSelectOptionTypeData = (
  type: string,
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/option/${type}`, data, {
    baseURL: API_ENDPOINT_ONEFENCE_LOCAL_BASE_URL,
  });
};

export type UseCreateSelectOptionTypeData = {
  type: string;
  onSuccess?: () => void;
};

export const useCreateSelectOptionTypeData = ({
  type,
  onSuccess,
}: UseCreateSelectOptionTypeData) => {
  const { isLoading, isError, mutate } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createSelectOptionTypeData(type, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        shareQueryKeys.optionTypeData.all(type),
      ]);
      onSuccess?.();
    },
  });

  return {
    isLoading,
    isError,
    submit: mutate,
  };
};
