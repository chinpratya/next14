import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitRespondentResponseSchema } from '../schemas';
import { OrganizationUnitRespondentResponse } from '../types';

export const listOrganizationUnitListRespondents = async (
  organizationId: string,
  instituteId: string,
  page: number,
  pageSize: number
): Promise<OrganizationUnitRespondentResponse> => {
  const response = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/respondent/?page=${page}&pageSize=${pageSize}`
  );
  return OrganizationUnitRespondentResponseSchema.parse(
    response
  );
};

export type UseListOrganizationUnitListRespondents = {
  organizationId: string;
  instituteId: string;
  page: number;
  pageSize: number;
};

export const useListOrganizationUnitListRespondents = ({
  organizationId,
  instituteId,
  page,
  pageSize,
}: UseListOrganizationUnitListRespondents) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.organization.respondent(
          organizationId,
          instituteId,
          page,
          pageSize
        ),
      ],
      queryFn: () =>
        listOrganizationUnitListRespondents(
          organizationId,
          instituteId,
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
