import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DashboardMapThirdPartyResponseSchema } from '../schemas';
import { DashboardMapThirdPartyResponse } from '../types';

export const getDashboardMapThirdPartyLocation =
  async (): Promise<DashboardMapThirdPartyResponse> => {
    const response = await apiClient.get(
      `/dashboard/map/third-party-location`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

    return DashboardMapThirdPartyResponseSchema.parse(
      response
    );
  };

export const useGetDashboardMapThirdPartyLocation =
  () => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        queryKey: [
          dataMappingQueryKeys.dashbaord.thirdPartyMap,
        ],
        queryFn: () =>
          getDashboardMapThirdPartyLocation(),
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
