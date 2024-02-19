import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { IncidentTemplateEventFormType } from '../../incident-template';

export const updateRequestIncidentTemplate = (
  requestId: string,
  data: IncidentTemplateEventFormType
) =>
  apiClient.put(`/request/${requestId}/template`, data, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseUpdateRequestIncidentTemplate = {
  requestId: string;
  onSuccess?: () => void;
};

export const useUpdateRequestIncidentTemplate = ({
  requestId,
  onSuccess,
}: UseUpdateRequestIncidentTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: IncidentTemplateEventFormType) =>
      updateRequestIncidentTemplate(requestId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.request.incidentTemplate(
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
