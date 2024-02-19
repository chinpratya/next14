import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';
import { removeEmptyChild } from '@/utils';

import { OrganizationLevelResponseSchema } from '../schemas';
import { OrganizationLevelResponse } from '../types';

export type ListOrganizationLv = Request;

export const listOrganizationLv = async ({
  ...params
}: ListOrganizationLv): Promise<OrganizationLevelResponse> => {
  const response = await apiClient.get(
    `/user/org/level`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );

  const parseData = {
    ...response,
    data: removeEmptyChild([response.data], 'child'),
  };

  return OrganizationLevelResponseSchema.parse(parseData);
};

export type UseListOrganizationLv = ListOrganizationLv;

export const useListOrganizationLv = ({
  ...params
}: UseListOrganizationLv) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listOrganizationLv({ ...params }),
      queryKey: [
        adminQueryKeys.organizationDetail.levels,
        { ...params },
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
