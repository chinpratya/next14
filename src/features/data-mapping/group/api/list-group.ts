import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { GroupResponseSchema } from '../schemas';
import { GroupResponse } from '../types';

type ListGroup = Request & {
  menuID?: string;
};

export const listGroup = async ({
  ...params
}: ListGroup): Promise<GroupResponse> => {
  const response = await apiClient.get(`/group`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });
  return GroupResponseSchema.parse(response);
};

type UseListGroup = ListGroup;

export const useListGroup = ({
  ...params
}: UseListGroup) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listGroup({ ...params }),
      queryKey: [dataMappingQueryKeys.group.all, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
