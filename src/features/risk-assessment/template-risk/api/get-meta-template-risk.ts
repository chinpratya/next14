import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { TemplateRiskMetaSchema } from '../schemas';
import { TemplateRiskMeta } from '../types';

export const getMetaTemplateRisk =
  async (): Promise<TemplateRiskMeta> => {
    const { data } = await apiClient.get(
      `/assessment/meta`,
      {
        baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
      }
    );
    return TemplateRiskMetaSchema.parse(data);
  };

export const useGetMetaTemplateRisk = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.templateRisk.meta,
      ],
      queryFn: () => getMetaTemplateRisk(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
