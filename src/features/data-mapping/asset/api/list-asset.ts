import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { AssetResponseSchema } from '../schemas';
import { AssetResponse } from '../types';

type ListAsset = Request & {
  groupID?: string;
  organizationType?: string;
};

export const listAsset = async (
  params: ListAsset
): Promise<AssetResponse> => {
  const response = await apiClient.get(`/asset`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });
  return AssetResponseSchema.parse(response);
};

type UseListAsset = ListAsset;

export const useListAsset = (params: UseListAsset) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listAsset(params),
      queryKey: [dataMappingQueryKeys.asset.all, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
