import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { MeasureFormSchema } from '../schemas';
import { MeasureFormType } from '../types';

export const getMeasureForm = async (
  measureId: string
): Promise<MeasureFormType> => {
  const response = await apiClient.get(
    `/measured/${measureId}/form`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

  return MeasureFormSchema.parse(response.data);
};

export const useGetMeasureForm = (measureId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.measured.form(measureId),
      ],
      queryFn: () => getMeasureForm(measureId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
