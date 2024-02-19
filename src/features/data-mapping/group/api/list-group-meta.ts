import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { GroupMetaSchema } from '../schemas';
import { GroupMeta } from '../types';

export const listGroupMeta =
  async (): Promise<GroupMeta> => {
    const { data } = await apiClient.get(`/meta/group`, {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    });
    return GroupMetaSchema.parse(data);
  };

export const useListGroupMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listGroupMeta(),
      queryKey: [dataMappingQueryKeys.group.meta],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
