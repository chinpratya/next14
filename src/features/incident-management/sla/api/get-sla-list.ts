import { useQuery } from '@tanstack/react-query';

import { incidentManagementQueryKeys } from '@/lib/queryKeys/incident-management';
import { Request } from '@/types';
import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { SlaListResponseSchema } from '../schemas';
import { Sla, SlaListResponse } from '../types';

export type GetSlaList = Request & {
  [key: string]: unknown;
};

export const getSlaList = async ({
  ...params
}: GetSlaList): Promise<SlaListResponse> => {
  const response = await apiClient.get(
    '/serviceLevelAgreement',
    {
      params,
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );
  return SlaListResponseSchema.parse(response?.data);
};

export const useGetSlaList = ({
  ...params
}: GetSlaList) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.sla.all,
        params,
      ],
      queryFn: () => getSlaList({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
