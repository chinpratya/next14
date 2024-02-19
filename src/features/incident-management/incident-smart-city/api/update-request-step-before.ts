import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRequestStepBefore = async (
  requestId: string
): Promise<void> => {
  return apiClient.put(
    `/request/${requestId}/before`,
    {},
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseUpdateRequestStepBefore = {
  onSuccess?: () => void;
  requestId: string;
};

export const useUpdateRequestStepBefore = ({
  onSuccess,
  requestId,
}: UseUpdateRequestStepBefore) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => updateRequestStepBefore(requestId),
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
