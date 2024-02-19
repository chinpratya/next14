import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { TemplateOfRiskAssessmentSchema } from '../schemas';
import { TemplateOfRiskAssessmentType } from '../types';

export const getTemplateOfRiskAssessment = async (
  assessmentId: string
): Promise<TemplateOfRiskAssessmentType> => {
  const response = await apiClient.get(
    `/assessment/${assessmentId}/template`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

  return TemplateOfRiskAssessmentSchema.parse(
    response.data
  );
};

export const useGetTemplateOfRiskAssessment = (
  assessmentId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.templateRisk.assessmentDetail(
          assessmentId
        ),
      ],
      queryFn: () =>
        getTemplateOfRiskAssessment(assessmentId),
      keepPreviousData: true,
      enabled: !!assessmentId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
