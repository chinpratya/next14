import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export const rejectPortalAssessment = (
  assessmentId: string,
  payload: Record<string, unknown>
): Promise<void> =>
  apiClient.post(
    `/portal/assessment-approve/${assessmentId}/reject`,
    payload,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseRejectPortalAssessment = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useRejectPortalAssessment = ({
  assessmentId,
  onSuccess,
}: UseRejectPortalAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      rejectPortalAssessment(assessmentId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.detail(
          assessmentId
        ),
      ]);
      await queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.issue(
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
