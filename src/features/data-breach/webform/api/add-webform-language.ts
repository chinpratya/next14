import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddWebformLanguage = {
  webformId: string;
  languageId: string;
};

export const addWebformLanguage = ({
  webformId,
  languageId,
}: AddWebformLanguage): Promise<void> =>
  apiClient.put(
    `/webfrom/language/${webformId}`,
    {
      LanguageID: languageId,
    },
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseAddWebformLanguage = {
  webformId: string;
  onSuccess?: () => void;
};

export const useAddWebformLanguage = ({
  webformId,
  onSuccess,
}: UseAddWebformLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (languageId: string) =>
      addWebformLanguage({
        webformId,
        languageId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.webform.languages(webformId),
      ]);
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.webform.language(
          webformId,
          'all'
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
