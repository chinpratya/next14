import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys/siem';

import { AliasIndiceSchema } from '../schemas';
import { AliasIndice } from '../types';

export const getAliasIndice = async (
  indiceId: string
): Promise<AliasIndice> => {
  const { data } = await apiClient.get(
    `/siem/rule/indices/${indiceId}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return AliasIndiceSchema.parse(data);
};

type UseGetAliasIndice = {
  indiceId: string;
  enabled?: boolean;
};

export const useGetAliasIndice = ({
  indiceId,
  enabled = true,
}: UseGetAliasIndice) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getAliasIndice(indiceId),
      queryKey: [siemQueryKeys.rule.indices(indiceId)],
      enabled,
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
