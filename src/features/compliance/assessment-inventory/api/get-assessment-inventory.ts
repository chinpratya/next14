import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { InventoryDetailResponseSchema } from '../schemas';
import { InventoryDetailResponse } from '../types';

export const getAssessmentInventory = async (
  assessmentId: string
): Promise<InventoryDetailResponse> => {
  const response = await apiClient.get(
    `/assessment/${assessmentId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return InventoryDetailResponseSchema.parse(response);
};

export type UseGetAssessmentInventory = {
  assessmentId: string;
};

export const useGetAssessmentInventory = ({
  assessmentId,
}: UseGetAssessmentInventory) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentInventory.detail(
          assessmentId
        ),
      ],
      queryFn: () => getAssessmentInventory(assessmentId),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
