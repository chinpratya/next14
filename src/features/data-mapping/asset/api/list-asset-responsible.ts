import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { AssetResponsibleResponseSchema } from '../schemas';
import { AssetResponsibleResponse } from '../types';

type ListAssetResonsible = Request & {
  assetId: string;
};

export const listAssetResonsible = async ({
  assetId,
}: ListAssetResonsible): Promise<AssetResponsibleResponse> => {
  const response = await apiClient.get(
    `/asset/${assetId}/responsible`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return AssetResponsibleResponseSchema.parse(response);
};

type UseListAssetResonsible = ListAssetResonsible;

export const useListAssetResonsible = (
  params: UseListAssetResonsible
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listAssetResonsible(params),
      queryKey: [
        dataMappingQueryKeys.assetResponsible.all(
          params.assetId
        ),
        params,
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
