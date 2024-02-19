import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateAssessmentSubmissionSettingSchedulePayload = {
  isSchedule: boolean;
  scheduleDt: string;
};

export const updateAssessmentSubmissionSettingSchedule = (
  assessmentSubmissionId: string,
  payload: UpdateAssessmentSubmissionSettingSchedulePayload
) => {
  return apiClient.post(
    `/assignment-submission/${assessmentSubmissionId}/setting/schedule`,
    payload,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
};

export type UseUpdateAssessmentSubmissionSettingSchedule =
  {
    assessmentSubmissionId: string;
    onSuccess?: () => void;
  };

export const useUpdateAssessmentSubmissionSettingSchedule =
  ({
    assessmentSubmissionId,
    onSuccess,
  }: UseUpdateAssessmentSubmissionSettingSchedule) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (
        payload: UpdateAssessmentSubmissionSettingSchedulePayload
      ) =>
        updateAssessmentSubmissionSettingSchedule(
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
