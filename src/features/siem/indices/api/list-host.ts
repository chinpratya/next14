import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';

import { HostResponseSchema } from '../schemas';
import { HostResponse } from '../types';

export const listHost = async (
  indiceId: string
): Promise<HostResponse> => {
  const { data } = await apiClient.get(
    `/log/monitor/hosts?module=SIEM&indices=${indiceId}&response_type=lists`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return HostResponseSchema.parse(data);
};

type UseListHost = {
  indiceId: string;
};

export const useListHost = ({
  indiceId,
}: UseListHost) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listHost(indiceId),
      queryKey: [logQueryKeys.monitorHosts.all(indiceId)],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
