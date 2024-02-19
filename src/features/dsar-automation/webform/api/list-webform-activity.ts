import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { WebFormActivityResponseSchema } from '../schemas';
import { WebFormActivityResponse } from '../types';

type ListWebformActivity = Request & {
  webformId: string;
};
export const listWebformActivity = async ({
  webformId,
  ...params
}: ListWebformActivity): Promise<WebFormActivityResponse> => {
  const response = await apiClient.get(
    `/webfrom/${webformId}/activity`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
      params,
    }
  );

  return WebFormActivityResponseSchema.parse(response);
};

type UseListWebformActivity = Request & {
  webformId: string;
};

export const useListWebformActivity = ({
  webformId,
  ...params
}: UseListWebformActivity) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.webform.activity(
          webformId
        ),
        params,
      ],
      queryFn: () =>
        listWebformActivity({
          webformId,
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
