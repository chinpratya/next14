import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';
import { removeEmptyChild } from '@/utils';

import { OrganizationManagementResponseSchema } from '../schemas';
import { OrganizationManagementResponse } from '../types';

export type ListOrganizationManagement = Request & {
  expand?: 'not_expand' | 'expand';
};
export const listOrganizationManagement = async ({
  ...params
}: ListOrganizationManagement): Promise<OrganizationManagementResponse> => {
  const response = await apiClient.get(
    `/user/org/department`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  const parseData = {
    ...response,
    data: removeEmptyChild(
      params.expand && params.expand === 'expand'
        ? response.data
        : [response.data],
      'sub_department'
    ),
  };

  return OrganizationManagementResponseSchema.parse(
    parseData
  );
};

export const useListOrganizationManagement = ({
  ...params
}: ListOrganizationManagement = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        listOrganizationManagement({
          ...params,
        }),
      queryKey: [
        adminQueryKeys.organizationManagement.all,
        { ...params },
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
