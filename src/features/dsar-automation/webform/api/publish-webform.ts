import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const publishWebform = async (webformId: string) =>
  await apiClient.post(
    `/webfrom/publish/${webformId}`,
    {},
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

export type UsePublishWebform = {
  webformId: string;
  onSuccess?: () => void;
};

export const usePublishWebform = ({
  webformId,
  onSuccess,
}: UsePublishWebform) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => publishWebform(webformId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.detail(webformId),
      ]);
      queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
