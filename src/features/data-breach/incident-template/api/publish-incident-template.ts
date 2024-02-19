import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const publishIncidentTemplate = (
  incidentTemplateId: string,
  status: string
) =>
  apiClient.post(
    `/templateevent/${incidentTemplateId}/publish`,
    {
      status,
    },
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UsePublishIncidentTemplate = {
  incidentTemplateId: string;
  onSuccess?: () => void;
};

export const usePublishIncidentTemplate = ({
  incidentTemplateId,
  onSuccess,
}: UsePublishIncidentTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (status: string) =>
      publishIncidentTemplate(incidentTemplateId, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.incidentTemplate.detail(
          incidentTemplateId
        ),
      ]);
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.incidentTemplate.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
