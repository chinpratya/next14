import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { ConsentFormType } from '@/types';

import { updateWebformTemplate } from './update-webform-template';

export type DeleteWebformActivity = {
  webformId: string;
  activityId: string;
};

export const deleteWebformActivity = ({
  webformId,
  activityId,
}: DeleteWebformActivity): Promise<void> =>
  apiClient.delete(
    `/webfrom/${webformId}/activity/${activityId}`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

export type UseDeleteWebformActivity = {
  onSuccess?: () => void;
  webformId: string;
};

export const useDeleteWebformActivity = ({
  onSuccess,
  webformId,
}: UseDeleteWebformActivity) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async ({
      activityId,
      form,
      formLanguage,
    }: {
      activityId: string;
      form: ConsentFormType;
      formLanguage?: string;
    }) => {
      await updateWebformTemplate({
        webformId,
        form,
        language: formLanguage,
      });
      return deleteWebformActivity({
        webformId,
        activityId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.template(
          webformId
        ),
      ]);
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.activity(
          webformId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
