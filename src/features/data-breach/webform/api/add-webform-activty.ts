import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { ConsentFormType } from '@/types';

import { updateWebformTemplate } from './update-webform-template';

export type AddWebformActivity = {
  webformId: string;
  activityId: string[];
};

export const addWebformActivity = ({
  webformId,
  activityId,
}: AddWebformActivity): Promise<void> =>
  apiClient.post(
    `/webfrom/${webformId}/activity`,
    {
      activityID: activityId,
    },
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseAddWebformActivity = {
  webformId: string;
  onSuccess?: () => void;
};

export const useAddWebformActivity = ({
  webformId,
  onSuccess,
}: UseAddWebformActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      activityId,
      form,
      formLanguage,
    }: {
      activityId: string[];
      form: ConsentFormType;
      formLanguage?: string;
    }) => {
      await updateWebformTemplate({
        webformId,
        form: form,
        language: formLanguage,
      });
      return addWebformActivity({
        webformId,
        activityId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.webform.activity(webformId),
      ]);
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.webform.template(webformId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
