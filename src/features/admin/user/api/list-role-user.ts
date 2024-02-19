import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { UserRoleResponseSchema } from '../schemas';
import { UserRoleResponse } from '../types';

type listRoleUserProps = Request & {
  userId: string;
};

export const listRoleUser = async ({
  userId,
  ...params
}: listRoleUserProps): Promise<UserRoleResponse> => {
  const response = await apiClient.get(
    `/user/org/user/${userId}/role`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  return UserRoleResponseSchema.parse(response);
};

type UseListRoleUser = listRoleUserProps;

export const useListRoleUser = ({
  userId,
  ...params
}: UseListRoleUser) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listRoleUser({ userId, ...params }),
      queryKey: [
        adminQueryKeys.user.roles(userId),
        params,
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
