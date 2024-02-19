import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationContactResponseSchema } from '../schemas';
import { OrganizationContactResponse } from '../types';

export const listOrganizationContact = async (
  organizationId: string,
  page: number,
  pageSize: number
): Promise<OrganizationContactResponse> => {
  const response = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/contact?page=${page}&pageSize=${pageSize}`
  );
  return OrganizationContactResponseSchema.parse(
    response
  );
};

export type UseListOrganizationContact = {
  organizationId: string;
  page: number;
  pageSize: number;
};

export const useListOrganizationContact = ({
  organizationId,
  page,
  pageSize,
}: UseListOrganizationContact) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.organization.contact(
          organizationId
        ),
        page,
        pageSize,
      ],
      queryFn: () =>
        listOrganizationContact(
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
