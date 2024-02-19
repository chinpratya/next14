import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { FieldSchemaResponse } from '../schemas';
import { Field } from '../types';

type ListField = {
  indices: string;
  module: 'LM' | 'SIEM';
  response_type?: string;
};

export const listField = async (
  params: ListField
): Promise<Field[]> => {
  const { data } = await apiClient.get(
    `/log/search/fields`,
    {
      params,
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return FieldSchemaResponse.parse(data);
};

type UseListField = ListField & {
  enable?: boolean;
};

export const useListField = (params: UseListField) => {
  const { enable, ...rest } = params;

  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listField({ ...rest }),
      queryKey: [
        logQueryKeys.searchFields.all(
          params.indices,
          params.module
        ),
        rest,
      ],
      enabled: enable,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
