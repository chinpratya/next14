import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { OrganizationUserResponseSchema } from '../schemas';
import { OrganizationUserResponse } from '../types';

export type ListOrganizationUser = Request & {
  departmentId: string;
};
export const listOrganizationUser = async ({
  departmentId,
  ...params
}: ListOrganizationUser): Promise<OrganizationUserResponse> => {
  const response = await apiClient.get(
    `/user/org/department/${departmentId}/user`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  return OrganizationUserResponseSchema.parse(response);
};

export type UseListOrganizationUser =
  ListOrganizationUser;

export const useListOrganizationUser = ({
  departmentId,
  ...params
}: UseListOrganizationUser) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        adminQueryKeys.organizationManagement.users(
          departmentId
        ),
        { ...params },
      ],
      queryFn: () =>
        listOrganizationUser({
          ...params,
          departmentId,
        }),
      enabled: !!departmentId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
