import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { Request } from '@/types';
import { queryString } from '@/utils';

import {
  OptionResponseSchema,
  indiceResponseSchema,
} from '../schemas';
import { IndiceResponse, OptionResponse } from '../types';

type ListIndice = Request & {
  responseType?: string;
  module: string;
  alias_name?: boolean;
};

export const listIndice = async ({
  module = 'LM',
  pageSize,
  responseType,
  ...rest
}: ListIndice): Promise<
  IndiceResponse | OptionResponse
> => {
  const params = queryString.sample({
    ...rest,
    module,
    page_size: pageSize,
    response_type: responseType,
  });

  const response = await apiClient.get(`/log/indices`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });

  if (responseType === 'lists')
    return OptionResponseSchema.parse(response);

  return indiceResponseSchema.parse(response);
};

type UseListIndice = ListIndice;

export const useListIndice = (params: UseListIndice) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listIndice(params),
      queryKey: [logQueryKeys.indices.all, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isFetching,
  };
};
