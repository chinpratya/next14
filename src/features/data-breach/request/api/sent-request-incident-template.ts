import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { IncidentTemplateEventFormType } from '../../incident-template';
import { updateRequestIncidentTemplate } from '../api/update-request-incident-template';

export const sentRequestIncidentTemplate = async (
  requestId: string,
  data: IncidentTemplateEventFormType,
  senderInfo: Record<string, unknown>
) => {
  await updateRequestIncidentTemplate(requestId, data);
  return apiClient.put(
    `/request/${requestId}/template/submit`,
    senderInfo,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );
};

export type UseSentRequestIncidentTemplate = {
  requestId: string;
  onSuccess?: () => void;
};

export const useSentRequestIncidentTemplate = ({
  requestId,
  onSuccess,
}: UseSentRequestIncidentTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      data,
      senderInfo,
    }: {
      data: IncidentTemplateEventFormType;
      senderInfo: Record<string, unknown>;
    }) =>
      sentRequestIncidentTemplate(
        requestId,
        data,
        senderInfo
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.request.detail(requestId),
      ]);
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
