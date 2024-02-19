import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DashboardLawfulBasisResponseSchema } from '../schemas';
import { DashboardLawfulBasisResponse } from '../types';

type ListDashboardRights = Request;
export const listDashboardRights = async ({
  ...params
}: ListDashboardRights): Promise<DashboardLawfulBasisResponse> => {
  const response = await apiClient.get(
    `/dashboard/rights`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return DashboardLawfulBasisResponseSchema.parse(
    response
  );
};

type UseListDashboardRights = ListDashboardRights;

export const useListDashboardRights = ({
  ...params
}: UseListDashboardRights) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dashbaord.rights,
        params,
      ],
      queryFn: () => listDashboardRights({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
