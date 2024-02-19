import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

import { calculateAssessmentScore } from '../../portal-assessment/utils/calulateAssessmentScore';
import { WebformBuilderItem } from '../../share';

import { updatePortalAssessment } from './update-portal-assessment';

export type SubmitPortalAssessment = {
  assessmentId: string;
  form: Array<Record<string, unknown>>;
};

export const submitPortalAssessment = ({
  assessmentId,
  form,
}: SubmitPortalAssessment): Promise<void> => {
  return apiClient.post(
    `/portal/assessment/${assessmentId}/submit`,
    {
      form,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
};

type UseSubmitPortalAssessment = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useSubmitPortalAssessment = ({
  assessmentId,
  onSuccess,
}: UseSubmitPortalAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async (form: WebformBuilderItem[]) => {
      await updatePortalAssessment({
        assessmentId,
        form: calculateAssessmentScore(form),
      });
      return submitPortalAssessment({
        assessmentId,
        form,
      });
    },
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
