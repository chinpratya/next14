import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { ConsentFormSchema } from '@/schema';
import { ConsentFormType } from '@/types';

export type GetWebformVersion = {
  webformId: string;
  versionId: string;
};

export const getWebformVersion = async ({
  webformId,
  versionId,
}: GetWebformVersion): Promise<ConsentFormType> => {
  const response = await apiClient.get(
    `/webfrom/${webformId}/version/${versionId}`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return ConsentFormSchema.parse(response.data.form);
};

export const useGetWebformVersion = ({
  webformId,
  versionId,
}: GetWebformVersion) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.webform.versionDetail(
          webformId,
          versionId
        ),
      ],
      queryFn: () =>
        getWebformVersion({ webformId, versionId }),
      enabled: !!webformId && !!versionId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
