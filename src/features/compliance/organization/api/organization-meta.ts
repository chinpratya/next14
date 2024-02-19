import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationMetaResponseSchema } from '../schemas';
import { organizationMetaResponse } from '../types';

export const listOrganizationMeta =
  async (): Promise<organizationMetaResponse> => {
    const response = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/meta/organization`
    );
    return OrganizationMetaResponseSchema.parse(response);
  };

export const useListOrganizationMeta = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [complianceQueryKeys.metaOrg.all],
      queryFn: () => listOrganizationMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
