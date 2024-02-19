import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { AssetInfoSchema } from '../schemas';
import { AssetInfo } from '../types';

export const getAsset = async (
  assetId: string
): Promise<AssetInfo> => {
  const response = await apiClient.get(
    `/asset/${assetId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return AssetInfoSchema.parse(response.data);
};

export const useGetAsset = (assetId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getAsset(assetId),
      queryKey: [
        dataMappingQueryKeys.asset.detail(assetId),
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
