import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationContactResponseSchema } from '../schemas';
import { OrganizationContactResponse } from '../types';

export const listOrganizationBranchContact = async (
  organizationId: string,
  branchId: string,
  page: number,
  pageSize: number
): Promise<OrganizationContactResponse> => {
  const response = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${branchId}/contact?page=${page}&pageSize=${pageSize}`
  );
  return OrganizationContactResponseSchema.parse(
    response
  );
};

export type UseListOrganizationBranchContact = {
  organizationId: string;
  branchId: string;
  page: number;
  pageSize: number;
};

export const useListOrganizationBranchContact = ({
  organizationId,
  branchId,
  page,
  pageSize,
}: UseListOrganizationBranchContact) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.organization.branchContact(
          organizationId,
          branchId
        ),
        page,
        pageSize,
      ],
      queryFn: () =>
        listOrganizationBranchContact(
          organizationId,
          branchId,
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
