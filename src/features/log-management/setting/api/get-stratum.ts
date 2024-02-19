import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { StratumSchema } from '../schemas';
import { Stratum } from '../types';

export const getStratum = async (): Promise<Stratum> => {
  const response = await apiClient.get(
    `/log/setting/stratum`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return StratumSchema.parse(response.data);
};

type UseGetStratum = {
  enabled?: boolean;
};

export const useGetStratum = ({
  enabled = true,
}: UseGetStratum) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [logQueryKeys.setting.stratum],
      queryFn: () => getStratum(),
      enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
