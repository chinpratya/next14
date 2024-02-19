import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { TemplateRiskLikelihoodSchema } from '../schemas';
import { TemplateRiskLikelihood } from '../types';

export type GetTemplateRiskLikelihood = {
  assessmentId: string;
};

export const getTemplateRiskLikelihood = async ({
  assessmentId,
}: GetTemplateRiskLikelihood): Promise<
  TemplateRiskLikelihood[]
> => {
  const { data } = await apiClient.get(
    `/assessment/${assessmentId}/likelihood`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );
  return z
    .array(TemplateRiskLikelihoodSchema)
    .parse(data);
};

export const useGetTemplateRiskLikelihood = ({
  assessmentId,
}: GetTemplateRiskLikelihood) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.templateRisk.chance(
          assessmentId
        ),
      ],
      queryFn: () =>
        getTemplateRiskLikelihood({ assessmentId }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
