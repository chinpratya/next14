import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { GroupRoleResponseSchema } from '../schemas';
import { GroupRoleResponse } from '../types';

export type ListGroupRole = Request & {
  groupId: string;
};

export const listGroupRole = async ({
  groupId,
  ...params
}: ListGroupRole): Promise<GroupRoleResponse> => {
  const response = await apiClient.get(
    `/user/org/group/${groupId}/role`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  return GroupRoleResponseSchema.parse(response);
};

export type UseListGroupRole = ListGroupRole;

export const useListGroupRole = ({
  groupId,
  ...params
}: UseListGroupRole) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        adminQueryKeys.group.roles(groupId),
        {
          ...params,
        },
      ],
      queryFn: () =>
        listGroupRole({
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
