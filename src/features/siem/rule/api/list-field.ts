import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { FieldSchemaResponse } from '../schemas';
import { Field } from '../types';

export const listField = async (
  indiceId: string
): Promise<Field[]> => {
  const { data } = await apiClient.get(
    `/log/search/fields?indices=${indiceId}&module=SIEM&response_type=lists`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return FieldSchemaResponse.parse(data);
};

type UseListField = {
  indiceId: string;
  enable?: boolean;
};

export const useListField = ({
  indiceId,
  enable,
}: UseListField) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listField(indiceId),
      queryKey: [
        logQueryKeys.searchFields.all(indiceId, 'SIEM'),
      ],
      enabled: enable,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
