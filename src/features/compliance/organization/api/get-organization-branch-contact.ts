import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationContactSchema } from '../schemas';
import { OrganizationContact } from '../types';

export const getOrganizationBranchContact = async (
  organizationId: string,
  contactId: string,
  branchId: string
): Promise<OrganizationContact> => {
  const { data } = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${branchId}/contact/${contactId}`
  );
  return OrganizationContactSchema.parse(data);
};

export const useGetOrganizationBranchContact = (
  organizationId: string,
  contactId: string,
  branchId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      enabled: !!organizationId && !!contactId,
      queryKey: [
        complianceQueryKeys.organization.branchDetailContact(
          organizationId,
          contactId,
          branchId
        ),
      ],
      queryFn: () =>
        getOrganizationBranchContact(
          organizationId,
          contactId,
          branchId
        ),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
