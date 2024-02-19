import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export const approvePortalAssessment = (
  assessmentId: string
): Promise<void> =>
  apiClient.post(
    `/portal/assessment-approve/${assessmentId}/approve`,
    {},
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseApprovePortalAssessment = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useApprovePortalAssessment = ({
  assessmentId,
  onSuccess,
}: UseApprovePortalAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      approvePortalAssessment(assessmentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.detail(
          assessmentId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
