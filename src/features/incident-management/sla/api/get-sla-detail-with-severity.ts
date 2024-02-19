import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';

// import { SlaDetaSchema } from '../schemas';
import { SlaDataDetailWithSevirityResponse } from '../types';

export const getSlaDetailWithSeverity = async (
  slaId: string,
  severityId: string
): Promise<SlaDataDetailWithSevirityResponse> => {
  const { data } = await apiClient.get(
    `/serviceLevelAgreement/${slaId}/${severityId}`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return data;
};

export const useGetSlaDetailWithSeverity = (
  slaId: string,
  severityId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.sla.details(
          slaId,
          severityId
        ),
      ],
      queryFn: () =>
        getSlaDetailWithSeverity(slaId, severityId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
