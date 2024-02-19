import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { TemplateRiskScoreSchema } from '../schemas';
import { TemplateRiskScore } from '../types';

export type GetTemplateRiskScore = {
  assessmentId: string;
};

export const getTemplateRiskScore = async ({
  assessmentId,
}: GetTemplateRiskScore): Promise<TemplateRiskScore> => {
  const response = await apiClient.get(
    `/assessment/${assessmentId}/score`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

  return TemplateRiskScoreSchema.parse(response.data);
};

export const useGetTemplateRiskScore = ({
  assessmentId,
}: GetTemplateRiskScore) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.templateRisk.score(
          assessmentId
        ),
      ],
      queryFn: () =>
        getTemplateRiskScore({ assessmentId }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
