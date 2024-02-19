import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { GroupResponseSchema } from '../schemas';
import { GroupResponse } from '../types';

type ListGroup = Request & {
  ignore_groupId?: string;
  ignore_userId?: string;
};

export const listGroup = async ({
  ...params
}: ListGroup): Promise<GroupResponse> => {
  const response = await apiClient.get(
    `/user/org/group`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  return GroupResponseSchema.parse(response);
};

export type UseListGroup = ListGroup;

export const useListGroup = ({
  ...params
}: UseListGroup) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        adminQueryKeys.group.all,
        {
          ...params,
        },
      ],
      queryFn: () =>
        listGroup({
          ...params,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
