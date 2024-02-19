import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationContactSchema } from '../schemas';
import { OrganizationContact } from '../types';

export const getOrganizationContact = async (
  organizationId: string,
  contactId: string
): Promise<OrganizationContact> => {
  const { data } = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/contact/${contactId}`
  );
  return OrganizationContactSchema.parse(data);
};

export const useGetOrganizationContact = (
  organizationId: string,
  contactId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      enabled: !!organizationId && !!contactId,
      queryKey: [
        complianceQueryKeys.organization.detailContact(
          organizationId,
          contactId
        ),
      ],
      queryFn: () =>
        getOrganizationContact(organizationId, contactId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
