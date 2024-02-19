import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataControllerMataSchema } from '../schemas';
import { DataControllerMeta } from '../types';

export const getMetaDataController =
  async (): Promise<DataControllerMeta> => {
    const response = await apiClient.get(
      `/meta/data-processor`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

    return DataControllerMataSchema.parse(response.data);
  };

export const useGetMetaDataController = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataController.meta,
      ],
      queryFn: getMetaDataController,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
