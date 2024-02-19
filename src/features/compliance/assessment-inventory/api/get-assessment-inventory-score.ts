import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentFormResponseSchema } from '../schemas';
import { InventoryFormResponse } from '../types';

export const getAssessmentInventoryScore = async (
  assessmentId: string
): Promise<InventoryFormResponse> => {
  const response = await apiClient.get(
    `/assessment/${assessmentId}/score`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return AssessmentFormResponseSchema.parse(response);
};

export type UseGetAssessmentInventoryScore = {
  assessmentId: string;
  enabled?: boolean;
};

export const useGetAssessmentInventoryScore = ({
  assessmentId,
  enabled,
}: UseGetAssessmentInventoryScore) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentInventory.score(
          assessmentId
        ),
      ],
      queryFn: () =>
        getAssessmentInventoryScore(assessmentId),
      keepPreviousData: true,
      enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
