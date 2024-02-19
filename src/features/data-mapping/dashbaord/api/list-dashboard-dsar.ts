import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DashboardLawfulBasisResponseSchema } from '../schemas';
import { DashboardLawfulBasisResponse } from '../types';

type ListDashboardDsar = Request;
export const listDashboardDsar = async ({
  ...params
}: ListDashboardDsar): Promise<DashboardLawfulBasisResponse> => {
  const response = await apiClient.get(
    `/dashboard/dsar`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return DashboardLawfulBasisResponseSchema.parse(
    response
  );
};

type UseListDashboardDsar = ListDashboardDsar;

export const useListDashboardDsar = ({
  ...params
}: UseListDashboardDsar) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dashbaord.dsar,
        params,
      ],
      queryFn: () => listDashboardDsar({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
