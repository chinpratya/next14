import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';
import { AxiosError } from 'axios';

const deleteSla = (slaId: string): Promise<void> =>
  apiClient.delete(`/serviceLevelAgreement/${slaId}`, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });

type useDeleteSla = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useDeleteSla = ({
  onSuccess,
  onError,
}: useDeleteSla) => {
  const { showNotification } = useNotifications();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteSla,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.sla.all,
      ]);
      onSuccess?.();
    },
    onError: async (
      error: AxiosError<Record<string, unknown>>
    ) => {
      showNotification({
        type: 'error',
        message: error.response?.data
          .errorMessage as string,
      });
      onError?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
