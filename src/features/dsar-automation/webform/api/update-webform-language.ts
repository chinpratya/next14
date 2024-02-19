import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { ConsentFormType } from '@/types';

export type UpdateWebformLanguage = {
  webformId: string;
  languageId: string;
  form: ConsentFormType;
};

export const updateWebformLanguage = ({
  webformId,
  languageId,
  form,
}: UpdateWebformLanguage): Promise<void> =>
  apiClient.put(
    `/webfrom/form/language/${webformId}/${languageId}`,
    {
      form,
    },
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

export type UseUpdateWebformLanguage = {
  webformId: string;
  languageId: string;
  onSuccess?: () => void;
};
export const useUpdateWebformLanguage = ({
  webformId,
  languageId,
  onSuccess,
}: UseUpdateWebformLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (form: ConsentFormType) =>
      updateWebformLanguage({
        webformId,
        languageId,
        form,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.language(
          webformId,
          languageId
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
