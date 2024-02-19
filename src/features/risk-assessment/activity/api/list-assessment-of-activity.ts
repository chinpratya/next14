import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { ActivityOfAssessmentResponseSchema } from '../schemas';
import { ActivityOfAssessmentResponse } from '../types';

export const listAssessmentOfActivity = async (
  activityId: string
): Promise<ActivityOfAssessmentResponse> => {
  const response = await apiClient.get(
    `/riskassessmentactivity`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
      params: {
        activity: activityId,
      },
    }
  );

  return ActivityOfAssessmentResponseSchema.parse(
    response
  );
};

export const useListAssessmentOfActivity = (
  activityId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.activity.assessment(
          activityId
        ),
      ],
      queryFn: () => listAssessmentOfActivity(activityId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
