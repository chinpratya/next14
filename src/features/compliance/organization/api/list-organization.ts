import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationResponseSchema } from '../schemas';
import { organizationResponse } from '../types';

export const listOrganization = async (
  page?: number,
  pageSize?: number,
  search?: string
): Promise<organizationResponse> => {
  const response = await apiClient.get(
    `/setting/organization`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      params: {
        pageSize,
        page,
        search,
      },
    }
  );
  return OrganizationResponseSchema.parse(response);
};
type useListOrganizationProps = {
  page: number;
  pageSize: number;
  search?: string;
};

export const useListOrganization = ({
  page,
  pageSize,
  search = '',
}: useListOrganizationProps) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.organization.all,
        page,
        pageSize,
        search,
      ],
      queryFn: () =>
        listOrganization(page, pageSize, search),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
