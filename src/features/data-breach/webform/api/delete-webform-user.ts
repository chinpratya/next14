import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteWebformUser = {
  webformId: string;
  userId: string;
};
export const deleteWebformUser = ({
  webformId,
  userId,
}: DeleteWebformUser): Promise<void> =>
  apiClient.delete(
    `/webfrom/${webformId}/users/${userId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseDeleteWebformUser = {
  onSuccess?: () => void;
  webformId: string;
};

export const useDeleteWebformUser = ({
  onSuccess,
  webformId,
}: UseDeleteWebformUser) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (userId: string) =>
      deleteWebformUser({ webformId, userId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.webform.user(webformId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
