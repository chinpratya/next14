import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { WhitelistSchema } from '../schemas';
import { Whitelist } from '../types';

type GetWhitelist = {
  whitelistId: string;
};

export const getWhitelist = async ({
  whitelistId,
}: GetWhitelist): Promise<Whitelist> => {
  const { data } = await apiClient.get(
    `/log/whitelist/${whitelistId}`,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return WhitelistSchema.parse(data);
};

type UseGetWhitelist = GetWhitelist;

export const useGetWhitelist = ({
  whitelistId,
}: UseGetWhitelist) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getWhitelist({ whitelistId }),
      queryKey: [
        logQueryKeys.whitelist.detail(whitelistId),
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
