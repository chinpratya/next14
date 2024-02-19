import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataElementMetaSchema } from '../schemas';
import { DataElementMeta } from '../types';

export const listDataElementMeta =
  async (): Promise<DataElementMeta> => {
    const { data } = await apiClient.get(
      `/meta/data-element`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );
    return DataElementMetaSchema.parse(data);
  };

export const useListDataElementMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listDataElementMeta(),
      queryKey: [dataMappingQueryKeys.dataElement.meta],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
