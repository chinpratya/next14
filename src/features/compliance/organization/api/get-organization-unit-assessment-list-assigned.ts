import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitAssignmentSchema } from '../schemas';
import { OrganizationUnitAssignment } from '../types';

export const getOrganizationUnitAssessmentListAssigned =
  async (
    organizationId: string,
    instituteId: string,
    assignmentId: string
  ): Promise<OrganizationUnitAssignment> => {
    const { data } = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/assignment/${assignmentId}`
    );
    return OrganizationUnitAssignmentSchema.parse(data);
  };

export const useGetOrganizationUnitAssessmentListAssigned =
  (
    organizationId: string,
    instituteId: string,
    assignmentId: string
  ) => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        enabled:
          !!organizationId &&
          !!instituteId &&
          !!assignmentId,
        queryKey: [
          complianceQueryKeys.organization.detailAssignment(
            organizationId,
            instituteId,
            assignmentId
          ),
        ],
        queryFn: () =>
          getOrganizationUnitAssessmentListAssigned(
            organizationId,
            instituteId,
            assignmentId
          ),
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
