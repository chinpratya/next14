import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type AddRequestVerification = {
  data: Record<string, unknown>;
  requestId: string;
};

export const addRequestVerification = async ({
  data,
  requestId,
}: AddRequestVerification): Promise<void> => {
  await apiClient.post(
    `/request/${requestId}/identify`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );
};

export type UseAddRequestVerification = {
  onSuccess?: () => void;
  requestId: string;
};

export const useAddRequestVerification = ({
  onSuccess,
  requestId,
}: UseAddRequestVerification) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      addRequestVerification({
        data,
        requestId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.request.verification(
          requestId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
