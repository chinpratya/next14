import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddWebformUser = {
  webformId: string;
  userId: string[];
};

export const addWebformUser = ({
  webformId,
  userId,
}: AddWebformUser): Promise<void> =>
  apiClient.post(
    `/webfrom/${webformId}/users`,
    {
      userID: userId,
    },
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseAddWebformUser = {
  webformId: string;
  onSuccess?: () => void;
};

export const useAddWebformUser = ({
  webformId,
  onSuccess,
}: UseAddWebformUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (userId: string[]) =>
      addWebformUser({
        webformId,
        userId,
      }),
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
  };
};
