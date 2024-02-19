import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';

// import { SlaDetaSchema } from '../schemas';
import { SlaDataDetailResponse } from '../types';

export const getSlaDetail = async (
  slaId: string
): Promise<SlaDataDetailResponse> => {
  const { data } = await apiClient.get(
    `/serviceLevelAgreement/${slaId}`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return data;
};

export const useGetSlaDetail = (slaId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.sla.detail(slaId),
      ],
      queryFn: () => getSlaDetail(slaId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
