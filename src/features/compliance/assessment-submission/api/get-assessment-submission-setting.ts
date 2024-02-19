import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentSubmissionSettingSchema } from '../schemas';
import { AssessmentSubmissionSetting } from '../types';

export const getAssessmentSubmissionSetting = async (
  assessmentId: string
): Promise<AssessmentSubmissionSetting> => {
  const { data } = await apiClient.get(
    `/assignment-submission/${assessmentId}/setting`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return AssessmentSubmissionSettingSchema.parse(data);
};

export const useGetAssessmentSubmissionSetting = (
  assessmentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.setting(
          assessmentId
        ),
      ],
      queryFn: () =>
        getAssessmentSubmissionSetting(assessmentId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
