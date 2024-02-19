import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateRequestVerification = {
  data: Record<string, unknown>;
  requestId: string;
  identifyId?: string;
};

export const updateRequestVerification = async ({
  data,
  requestId,
  identifyId,
}: UpdateRequestVerification): Promise<void> => {
  return apiClient.put(
    `/request/${requestId}/identify/${identifyId}`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );
};

export type UseUpdateRequestVerification = {
  onSuccess?: () => void;
  requestId: string;
  identifyId?: string;
};

export const useUpdateRequestVerification = ({
  onSuccess,
  requestId,
  identifyId,
}: UseUpdateRequestVerification) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRequestVerification({
        data,
        requestId,
        identifyId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.request.verificationDetail(
          requestId,
          identifyId
        ),
      ]);
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
