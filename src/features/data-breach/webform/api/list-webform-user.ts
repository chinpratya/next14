import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { WebFormUserResponseSchema } from '../schemas';
import { WebFormUserResponse } from '../types';

type ListWebformUser = Request & {
  webformId: string;
};
export const listWebformUser = async ({
  webformId,
  ...params
}: ListWebformUser): Promise<WebFormUserResponse> => {
  const response = await apiClient.get(
    `/webfrom/${webformId}/users`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      params,
    }
  );

  return WebFormUserResponseSchema.parse(response);
};

type UseListWebformUser = Request & {
  webformId: string;
};

export const useListWebformUser = ({
  webformId,
  ...params
}: UseListWebformUser) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.webform.user(webformId),
        params,
      ],
      queryFn: () =>
        listWebformUser({
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
