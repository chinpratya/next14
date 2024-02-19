import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { UserGroupResponseSchema } from '../schemas';
import { UserGroupResponse } from '../types';

type listGroupUserProps = Request & {
  userId: string;
};

export const listGroupUser = async ({
  userId,
  ...params
}: listGroupUserProps): Promise<UserGroupResponse> => {
  const response = await apiClient.get(
    `/user/org/user/${userId}/group`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  return UserGroupResponseSchema.parse(response);
};

type UseListGroupUser = listGroupUserProps;

export const useListGroupUser = ({
  userId,
  ...params
}: UseListGroupUser) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listGroupUser({ userId, ...params }),
      queryKey: [
        adminQueryKeys.user.groups(userId),
        params,
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
