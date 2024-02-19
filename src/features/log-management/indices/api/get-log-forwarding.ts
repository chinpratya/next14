import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';

import { ForwardingSchema } from '../schemas';
import { Forwarding } from '../types';

type GetLogForwarding = {
  forwardingId: string;
};

export const getLogForwarding = async ({
  forwardingId,
}: GetLogForwarding): Promise<Forwarding> => {
  const { data } = await apiClient.get(
    `/log/forwarding/${forwardingId}`,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return ForwardingSchema.parse(data);
};

type UseGetLogForwarding = GetLogForwarding;

export const useGetLogForwarding = ({
  forwardingId,
}: UseGetLogForwarding) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getLogForwarding({ forwardingId }),
      queryKey: [
        logQueryKeys.forwarding.detail(forwardingId),
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
