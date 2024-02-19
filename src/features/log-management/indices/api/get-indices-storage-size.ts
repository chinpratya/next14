import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { IndicesStorageSizeSchema } from '../schemas';
import { IndicesStorageSize } from '../types';

export const getIndicesStorageSize =
  async (): Promise<IndicesStorageSize> => {
    const { data } = await apiClient.get(
      `/log/indices/calculate/storage`,
      {
        baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
      }
    );
    return IndicesStorageSizeSchema.parse(data);
  };

export const useGetIndicesStorageSize = () => {
  const {
    data,
    isFetched,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: [logQueryKeys.indices.storageSize],
    queryFn: getIndicesStorageSize,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    refetch,
  };
};
