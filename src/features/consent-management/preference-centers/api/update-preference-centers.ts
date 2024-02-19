import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdatePreferenceCenters = {
  preferenceId: string;
  data: Record<string, unknown>;
};

export const updatePreferenceCenters = async ({
  preferenceId,
  data,
}: UpdatePreferenceCenters): Promise<void> => {
  return apiClient.put(
    `/preference/${preferenceId}`,
    data,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseUpdatePreferenceCenters = {
  preferenceId: string;
  onSuccess?: () => void;
};

export const useUpdatePreferenceCenters = ({
  preferenceId,
  onSuccess,
}: UseUpdatePreferenceCenters) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updatePreferenceCenters({ preferenceId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        consentManagementQueryKeys.preferenceCenters.detail(
          preferenceId
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
