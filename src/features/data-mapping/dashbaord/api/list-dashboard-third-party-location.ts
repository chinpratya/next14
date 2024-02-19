import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DashboardThirdPartyResponseSchema } from '../schemas';
import { DashboardThirdPartyResponse } from '../types';

type ListDashboardThirdPartyLocation = Request;
export const listDashboardThirdPartyLocation = async ({
  ...params
}: ListDashboardThirdPartyLocation): Promise<DashboardThirdPartyResponse> => {
  const response = await apiClient.get(
    `/dashboard/third-party-location`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return DashboardThirdPartyResponseSchema.parse(
    response
  );
};

type UseListDashboardThirdPartyLocation =
  ListDashboardThirdPartyLocation;

export const useListDashboardThirdPartyLocation = ({
  ...params
}: UseListDashboardThirdPartyLocation) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dashbaord.thirdParty,
        params,
      ],
      queryFn: () =>
        listDashboardThirdPartyLocation({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
