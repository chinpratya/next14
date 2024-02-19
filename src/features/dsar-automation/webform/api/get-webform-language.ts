import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { WebformLanguageDetailSchema } from '../schemas';
import { WebformLanguageDetail } from '../types';

export const getWebformLanguage = async (
  webformId: string,
  languageId: string
): Promise<WebformLanguageDetail> => {
  const response = await apiClient.get(
    `/webfrom/form/language/${webformId}/${languageId}`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return WebformLanguageDetailSchema.parse(response.data);
};

export type UseGetWebformLanguage = {
  webformId: string;
  languageId: string;
};

export const useGetWebformLanguage = ({
  webformId,
  languageId,
}: UseGetWebformLanguage) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.webform.language(
          webformId,
          languageId
        ),
      ],
      queryFn: () =>
        getWebformLanguage(webformId, languageId),
      enabled: !!webformId && !!languageId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
