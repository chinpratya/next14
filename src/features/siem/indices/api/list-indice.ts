import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryString } from '@/utils';

import {
  OptionResponseSchema,
  indiceResponseSchema,
} from '../schemas';
import { IndiceResponse, OptionResponse } from '../types';

export const listIndice = async (
  page: number,
  pageSize: number,
  responseType?: 'lists'
): Promise<IndiceResponse | OptionResponse> => {
  const params = queryString.sample({
    page,
    page_size: pageSize,
    response_type: responseType,
    module: 'SIEM',
  });

  const response = await apiClient.get(`/log/indices`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });

  if (responseType === 'lists')
    return OptionResponseSchema.parse(response);

  return indiceResponseSchema.parse(response);
};

export type UseListIndice = {
  page: number;
  pageSize: number;
  responseType?: 'lists';
};

export const useListIndice = ({
  page,
  pageSize,
  responseType,
}: UseListIndice) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        listIndice(page, pageSize, responseType),
      queryKey: [
        logQueryKeys.indices.all,
        page,
        pageSize,
        responseType,
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
