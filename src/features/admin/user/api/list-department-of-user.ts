import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { UserDepartmentResponseSchema } from '../schemas';
import { UserDepartmentResponse } from '../types';

type listDepartmentOfUserProps = Request & {
  userId: string;
};

export const listDepartmentOfUser = async ({
  userId,
  ...params
}: listDepartmentOfUserProps): Promise<UserDepartmentResponse> => {
  const response = await apiClient.get(
    `/user/org/user/${userId}/department`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  return UserDepartmentResponseSchema.parse(response);
};
type UseListDepartmentOfUser = listDepartmentOfUserProps;
export const useListDepartmentOfUser = ({
  userId,
  ...params
}: UseListDepartmentOfUser) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        listDepartmentOfUser({ userId, ...params }),
      queryKey: [
        adminQueryKeys.user.department(userId),
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
