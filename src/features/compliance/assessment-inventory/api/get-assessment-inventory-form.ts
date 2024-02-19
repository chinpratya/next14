import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentFormResponseSchema } from '../schemas';
import { InventoryFormResponse } from '../types';

export const getAssessmentInventoryForm = async (
  assessmentId: string
): Promise<InventoryFormResponse> => {
  const response = await apiClient.get(
    `/assessment/${assessmentId}/form`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return AssessmentFormResponseSchema.parse(response);
};

export type UseGetAssessmentInventoryForm = {
  assessmentId: string;
  enabled?: boolean;
};

export const useGetAssessmentInventoryForm = ({
  assessmentId,
  enabled,
}: UseGetAssessmentInventoryForm) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentInventory.form(
          assessmentId
        ),
      ],
      queryFn: () =>
        getAssessmentInventoryForm(assessmentId),
      keepPreviousData: true,
      enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
