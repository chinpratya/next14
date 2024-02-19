import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { TemplateRiskEffectResponseSchema } from '../schemas';
import { TemplateRiskEffectResponse } from '../types';

export type GetTemplateRiskEffect = {
  assessmentId: string;
};

export const getTemplateRiskEffect = async ({
  assessmentId,
}: GetTemplateRiskEffect): Promise<TemplateRiskEffectResponse> => {
  const response = await apiClient.get(
    `/assessment/${assessmentId}/effect`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );
  return TemplateRiskEffectResponseSchema.parse(response);
};

export const useGetTemplateRiskEffect = ({
  assessmentId,
}: GetTemplateRiskEffect) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.templateRisk.effect(
          assessmentId
        ),
      ],
      queryFn: () =>
        getTemplateRiskEffect({ assessmentId }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
