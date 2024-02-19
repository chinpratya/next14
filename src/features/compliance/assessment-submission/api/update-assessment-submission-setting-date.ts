import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateAssessmentSubmissionSettingDatePayload = {
  isSetDt: boolean;
  startDt?: string;
  endDt?: string;
};

export const updateAssessmentSubmissionSettingDate = (
  assessmentSubmissionId: string,
  payload: UpdateAssessmentSubmissionSettingDatePayload
) => {
  return apiClient.post(
    `/assignment-submission/${assessmentSubmissionId}/setting/date`,
    payload,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
};

export type UseUpdateAssessmentSubmissionSettingDate = {
  assessmentSubmissionId: string;
  onSuccess?: () => void;
};

export const useUpdateAssessmentSubmissionSettingDate = ({
  assessmentSubmissionId,
  onSuccess,
}: UseUpdateAssessmentSubmissionSettingDate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (
      payload: UpdateAssessmentSubmissionSettingDatePayload
    ) =>
      updateAssessmentSubmissionSettingDate(
        assessmentSubmissionId,
        payload
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        complianceQueryKeys.assessmentSubmission.setting(
          assessmentSubmissionId
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
