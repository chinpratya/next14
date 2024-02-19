import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { RopaDetailResponseSchema } from '../schemas';
import { RopaDetailResponse } from '../types';

type GetRopa = Request & {
  ropaId: string;
};

export const getRopa = async ({
  ropaId,
  ...params
}: GetRopa): Promise<RopaDetailResponse> => {
  const response = await apiClient.get(
    `/ropa/${ropaId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return RopaDetailResponseSchema.parse(response);
};

type UseGetRopa = GetRopa;

export const useGetRopa = ({
  ropaId,
  ...params
}: UseGetRopa) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getRopa({ ropaId, ...params }),
      queryKey: [
        dataMappingQueryKeys.ropa.detail(ropaId),
        params,
      ],
      keepPreviousData: true,
      enabled: !!ropaId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
