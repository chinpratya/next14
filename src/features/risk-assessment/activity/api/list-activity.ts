import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { ActivityResponseSchema } from '../schemas';
import { ActivityResponse } from '../types';

export const listActivity = async (
  params: Record<string, unknown> = {}
): Promise<ActivityResponse> => {
  const response = await apiClient.get(`/activity`, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    params,
  });
  return ActivityResponseSchema.parse(response);
};

export type ListActivityParams = Record<string, unknown>;

export const useListActivity = (
  params: ListActivityParams
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.activity.all,
        params,
      ],
      queryFn: () => listActivity(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
