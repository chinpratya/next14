import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { OptionResponseSchema } from '../schemas';
import { Option } from '../types';

export const listHost = async (
  indiceId: string
): Promise<Option[]> => {
  const { data } = await apiClient.get(
    `/log/indices/host/${indiceId}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return OptionResponseSchema.parse(data);
};

type UseListHost = {
  indiceId: string;
  enabled?: boolean;
};

export const useListHost = ({
  indiceId,
  enabled = true,
}: UseListHost) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listHost(indiceId),
      queryKey: [logQueryKeys.indicesHost.all(indiceId)],
      enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
