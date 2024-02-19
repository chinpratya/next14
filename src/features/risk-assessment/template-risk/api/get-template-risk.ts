import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { TemplateRiskDetailSchema } from '../schemas';
import { TemplateRiskDetail } from '../types';

export type GetTemplateRisk = {
  assessmentId: string;
};

export const getTemplateRisk = async ({
  assessmentId,
}: GetTemplateRisk): Promise<TemplateRiskDetail> => {
  const { data } = await apiClient.get(
    `/assessment/${assessmentId}`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );
  return TemplateRiskDetailSchema.parse(data);
};

export const useGetTemplateRisk = ({
  assessmentId,
}: GetTemplateRisk) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.templateRisk.detail(
          assessmentId
        ),
      ],
      queryFn: () => getTemplateRisk({ assessmentId }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
