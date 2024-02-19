import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { GroupUserResponseSchema } from '../schemas';
import { GroupUserResponse } from '../types';

export type ListGroupUsers = Request & {
  groupId: string;
};

export const listGroupUsers = async ({
  groupId,
  ...params
}: ListGroupUsers): Promise<GroupUserResponse> => {
  const response = await apiClient.get(
    `/user/org/group/${groupId}/user`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  return GroupUserResponseSchema.parse(response);
};

export type UseListGroupUsers = ListGroupUsers;

export const useListGroupUsers = ({
  groupId,
  ...params
}: UseListGroupUsers) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        adminQueryKeys.group.users(groupId),
        { ...params },
      ],
      queryFn: () =>
        listGroupUsers({
          groupId,
          ...params,
        }),
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
