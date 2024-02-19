import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { Request } from '@/types';

import { ForwardingResponseSchema } from '../schemas';
import { ForwardingResponse } from '../types';

type ListLogForwarding = Request & {
  indices: string;
  organization: string;
};

export const listLogForwarding = async (
  params: ListLogForwarding
): Promise<ForwardingResponse> => {
  const response = await apiClient.get(
    `/log/forwarding`,
    {
      params,
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return ForwardingResponseSchema.parse(response);
};

type UseListLogForwarding = ListLogForwarding;

export const useListLogForwarding = (
  params: UseListLogForwarding
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listLogForwarding(params),
      queryKey: [logQueryKeys.forwarding.all, params],
      keepPreviousData: true,
      enabled: !!params.indices && !!params.organization,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
