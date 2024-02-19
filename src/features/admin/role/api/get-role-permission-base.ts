import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { RolePermissionAppSchema } from '../schemas';
import { RolePermissionApp } from '../types';

export type GetRolePermissionBase = {
  briefRepresentation?: boolean;
  group_level?: '1' | '2' | '3' | '4';
};

export const getRolePermissionBase = async (
  {
    briefRepresentation = true,
    group_level = '4',
  }: GetRolePermissionBase = {
    briefRepresentation: true,
    group_level: '4',
  }
): Promise<RolePermissionApp[]> => {
  const response = await apiClient.get(
    `/user/org/permission`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params: {
        briefRepresentation,
        group_level,
      },
    }
  );

  return z
    .array(RolePermissionAppSchema)
    .parse(response.data);
};

export type UseGetRolePermissionBase =
  GetRolePermissionBase;

export const useGetRolePermissionBase = ({
  briefRepresentation = true,
  group_level = '4',
}: UseGetRolePermissionBase = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        adminQueryKeys.role.platform(
          briefRepresentation,
          group_level
        ),
      ],
      queryFn: () =>
        getRolePermissionBase({
          briefRepresentation,
          group_level,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
