import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { AssessmentSubmissionRespondentExtendTime } from '../types';

export const assessmentSubmissionRespondentChangeApprover =
  (
    assessmentId: string,
    data: AssessmentSubmissionRespondentExtendTime[]
  ): Promise<void> => {
    return apiClient.post(
      `/assignment-submission/${assessmentId}/change-approver`,
      data,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );
  };

export type UseAssessmentSubmissionRespondentChangeApprover =
  {
    assessmentId: string;
    onSuccess?: () => void;
  };

export const useAssessmentSubmissionRespondentChangeApprover =
  ({
    assessmentId,
    onSuccess,
  }: UseAssessmentSubmissionRespondentChangeApprover) => {
    const { mutate, isLoading, isError } = useMutation({
      mutationFn: (
        data: AssessmentSubmissionRespondentExtendTime[]
      ) =>
        assessmentSubmissionRespondentChangeApprover(
          assessmentId,
          data
        ),
      onSuccess: () => {
        queryClient.invalidateQueries(
          complianceQueryKeys.assessmentSubmission.respondent(
            assessmentId
          )
        );
        queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.branchRespondent(
            assessmentId
          ),
        ]);
        onSuccess?.();
      },
    });

    return {
      submit: mutate,
      isLoading,
      isError,
    };
  };
