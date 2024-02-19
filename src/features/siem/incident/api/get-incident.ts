import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys';
import { queryString } from '@/utils';

import { IncidentInfoResponseSchema } from '../schemas';
import { IncidentInfoResponse } from '../types';

type Params = {
  incidentId: string;
  page?: number;
  pageSize?: number;
  indices?: string;
};

export const getIncident = async ({
  incidentId,
  page,
  pageSize,
  indices,
}: Params): Promise<IncidentInfoResponse> => {
  const params = queryString.sample({
    page,
    page_size: pageSize,
    indices,
  });
  const response = await apiClient.get(
    `/siem/incident/${incidentId}`,
    {
      params,
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );

  return IncidentInfoResponseSchema.parse(response);
};

export const useGetIncident = ({
  incidentId,
  page,
  pageSize,
  indices,
}: Params) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        siemQueryKeys.incident.detail(incidentId),
        page,
        pageSize,
        indices,
      ],
      queryFn: () =>
        getIncident({
          incidentId,
          page,
          pageSize,
          indices,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
