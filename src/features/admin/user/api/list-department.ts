import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { UserDepartmentAllResponseSchema } from '../schemas';
import { UserDepartmentAllResponse } from '../types';

type listDepartmentUserProps = Request & {
  expand: string;
  ignore_userId?: string;
};

export const listDepartmentUser = async ({
  expand,
  ...params
}: listDepartmentUserProps): Promise<UserDepartmentAllResponse> => {
  const response = await apiClient.get(
    `/user/org/department`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params: {
        expand,
        ...params,
      },
    }
  );

  return UserDepartmentAllResponseSchema.parse(response);
};

type UseListDepartmentUser = listDepartmentUserProps;

export const useListDepartmentUser = ({
  expand,
  ...params
}: UseListDepartmentUser) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        listDepartmentUser({ expand, ...params }),
      queryKey: [
        adminQueryKeys.user.departmentAll(expand),
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
