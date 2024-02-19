import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { MeasuresResponseSchema } from '../schemas';
import { MeasuresResponse } from '../types';

export const listMeasure = async (
  params?: Record<string, unknown>
): Promise<MeasuresResponse> => {
  const response = await apiClient.get('/measured', {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    params,
  });

  return MeasuresResponseSchema.parse(response);
};

export type ListMeasureParams = Record<string, unknown>;

export const useListMeasure = (
  params: ListMeasureParams
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.measured.all,
        params,
      ],
      queryFn: () => listMeasure(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
