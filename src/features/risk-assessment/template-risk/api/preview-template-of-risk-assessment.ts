import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { PreviewTemplateOfRiskAssessmentSchema } from '../schemas';
import { PreviewTemplateOfRiskAssessmentType } from '../types';

export const previewTemplateOfRiskAssessment = async (
  assessmentId: string,
  data: Record<string, unknown>
): Promise<PreviewTemplateOfRiskAssessmentType> => {
  const response = await apiClient.post(
    `/assessment/${assessmentId}/template`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

  return PreviewTemplateOfRiskAssessmentSchema.parse(
    response.data
  );
};

export type UsePreviewTemplateOfRiskAssessment = {
  assessmentId: string;
  onSuccess?: (
    data: PreviewTemplateOfRiskAssessmentType
  ) => void;
};

export const usePreviewTemplateOfRiskAssessment = ({
  assessmentId,
  onSuccess,
}: UsePreviewTemplateOfRiskAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      previewTemplateOfRiskAssessment(assessmentId, data),
    onSuccess: (
      data: PreviewTemplateOfRiskAssessmentType
    ) => {
      onSuccess?.(data);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
