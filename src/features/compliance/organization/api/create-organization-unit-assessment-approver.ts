import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

export const createOrganizationUnitAssessmentApprover = (
  organizationId: string,
  instituteId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/approver`,
    data
  );
};

export type UseCreateOrganizationUnitAssessmentApprover =
  {
    organizationId: string;
    instituteId: string;
    onSuccess?: () => void;
  };

export const useCreateOrganizationUnitAssessmentApprover =
  ({
    organizationId,
    instituteId,
    onSuccess,
  }: UseCreateOrganizationUnitAssessmentApprover) => {
    const { mutate, isLoading, isError } = useMutation({
      mutationFn: (data: Record<string, unknown>) =>
        createOrganizationUnitAssessmentApprover(
          organizationId,
          instituteId,
          data
        ),
      onSuccess: () => {
        queryClient.invalidateQueries();
        onSuccess?.();
      },
    });

    return {
      submit: mutate,
      isLoading,
      isError,
    };
  };
