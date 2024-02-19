import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateRequestAssign = {
  requestId: string;
  data: Record<string, unknown>;
};

export const updateRequestAssign = async ({
  requestId,
  data,
}: UpdateRequestAssign): Promise<void> => {
  return apiClient.put(
    `/request/assign/${requestId}`,
    data,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseUpdateRequestAssign = {
  requestId: string;
  onSuccess?: () => void;
};

export const useUpdateRequestAssign = ({
  requestId,
  onSuccess,
}: UseUpdateRequestAssign) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRequestAssign({ requestId, data }),
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
