import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DashboardLawfulBasisResponseSchema } from '../schemas';
import { DashboardLawfulBasisResponse } from '../types';

type ListDashboardlawfulBasis = Request;
export const listDashboardlawfulBasis = async ({
  ...params
}: ListDashboardlawfulBasis): Promise<DashboardLawfulBasisResponse> => {
  const response = await apiClient.get(
    `/dashboard/lawful-basis`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return DashboardLawfulBasisResponseSchema.parse(
    response
  );
};
type UseListDashboardlawfulBasis =
  ListDashboardlawfulBasis;
export const useListDashboardlawfulBasis = ({
  ...params
}: UseListDashboardlawfulBasis) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dashbaord.lawfulBasis,
        params,
      ],
      queryFn: () =>
        listDashboardlawfulBasis({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
