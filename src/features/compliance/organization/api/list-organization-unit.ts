import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitResponseSchema } from '../schemas';
import { OrganizationUnitResponse } from '../types';

export const listOrganizationUnit = async (
  organizationId: string,
  page: number,
  pageSize: number
): Promise<OrganizationUnitResponse> => {
  const response = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch?page=${page}&pageSize=${pageSize}`
  );
  return OrganizationUnitResponseSchema.parse(response);
};

export type UseListOrganizationUnit = {
  organizationId: string;
  page: number;
  pageSize: number;
};

export const useListOrganizationUnit = ({
  organizationId,
  page,
  pageSize,
}: UseListOrganizationUnit) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.organization.unit(
          organizationId
        ),
        page,
        pageSize,
      ],
      queryFn: () =>
        listOrganizationUnit(
          organizationId,
          page,
          pageSize
        ),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
