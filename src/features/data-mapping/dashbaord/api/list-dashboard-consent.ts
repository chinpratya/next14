import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DashboardLawfulBasisResponseSchema } from '../schemas';
import { DashboardLawfulBasisResponse } from '../types';

type ListDashboardConsent = Request;
export const listDashboardConsent = async ({
  ...params
}: ListDashboardConsent): Promise<DashboardLawfulBasisResponse> => {
  const response = await apiClient.get(
    `/dashboard/consent`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return DashboardLawfulBasisResponseSchema.parse(
    response
  );
};

type UseListDashboardConsent = ListDashboardConsent;

export const useListDashboardConsent = ({
  ...params
}: UseListDashboardConsent) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dashbaord.consent,
        params,
      ],
      queryFn: () => listDashboardConsent({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
