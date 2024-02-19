import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { ActivityOfAssessmentDetailSchema } from '../schemas';
import { ActivityOfAssessmentDetailType } from '../types';

export const getAssessmentOfActivity = async (
  assessmentId: string
): Promise<ActivityOfAssessmentDetailType> => {
  const response = await apiClient.get(
    `/riskassessmentactivity/${assessmentId}`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

  return ActivityOfAssessmentDetailSchema.parse(
    response.data
  );
};

export const useGetAssessmentOfActivity = (
  assessmentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.activity.assessmentDetail(
          assessmentId
        ),
      ],
      queryFn: () =>
        getAssessmentOfActivity(assessmentId),
      enabled: !!assessmentId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
