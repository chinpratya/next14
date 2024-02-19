import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { MeasureSchema } from '../schemas';
import { MeasureType } from '../types';

export const getMeasure = async (
  measureId: string
): Promise<MeasureType> => {
  const response = await apiClient.get(
    `/measured/${measureId}`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

  return MeasureSchema.parse(response.data);
};

export const useGetMeasure = (measureId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.measured.detail(
          measureId
        ),
      ],
      queryFn: () => getMeasure(measureId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
