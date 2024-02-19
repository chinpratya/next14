import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateRequestTimeline = {
  data: Record<string, unknown>;
  requestId: string;
};

export const updateRequestTimeline = async ({
  data,
  requestId,
}: UpdateRequestTimeline): Promise<void> => {
  return apiClient.put(
    `/request/timeline/${requestId}`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );
};

export type UseUpdateRequestTimeline = {
  onSuccess?: () => void;
  requestId: string;
};

export const useUpdateRequestTimeline = ({
  onSuccess,
  requestId,
}: UseUpdateRequestTimeline) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRequestTimeline({
        data,
        requestId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        dsarAutomationQueryKeys.request.detail(requestId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
