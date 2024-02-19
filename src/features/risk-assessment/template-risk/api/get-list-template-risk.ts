import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { TemplateRiskResponseSchema } from '../schemas';
import { TemplateRiskResponse } from '../types';

type ListTemplateRisk = Request;

export const listTemplateRisk = async ({
  ...params
}: ListTemplateRisk): Promise<TemplateRiskResponse> => {
  const response = await apiClient.get(`/assessment`, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    params,
  });
  return TemplateRiskResponseSchema.parse(response);
};

export const useListTemplateRisk = ({
  ...params
}: ListTemplateRisk) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.templateRisk.all,
        {
          ...params,
        },
      ],
      queryFn: () =>
        listTemplateRisk({
          ...params,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
