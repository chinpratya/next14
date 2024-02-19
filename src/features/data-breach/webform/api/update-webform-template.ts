import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { ConsentFormType } from '@/types';

export type UpdateWebformTemplate = {
  webformId: string;
  form: ConsentFormType;
  language?: string;
};

export const updateWebformTemplate = ({
  webformId,
  form,
  language,
}: UpdateWebformTemplate) =>
  apiClient.put(
    `/webfrom/template/${webformId}`,
    {
      form,
      Language: language,
    },
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseUpdateWebformTemplate = {
  webformId: string;
  language: string;
};

export const useUpdateWebformTemplate = ({
  webformId,
}: UseUpdateWebformTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (form: ConsentFormType) =>
      updateWebformTemplate({
        webformId,
        form,
        language: 'th-TH',
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.webform.template(webformId),
      ]);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
