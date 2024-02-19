import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { InventoryResponseSchema } from '../schemas';
import { InventoryResponse } from '../types';

export const listAssessmentInventory = async (
  page: number,
  pageSize: number
): Promise<InventoryResponse> => {
  const response = await apiClient.get(
    `/assessment?page=${page}&pageSize=${pageSize}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return InventoryResponseSchema.parse(response);
};

export type UseListAssessmentInventory = {
  page: number;
  pageSize: number;
};

export const useListAssessmentInventory = ({
  page,
  pageSize,
}: UseListAssessmentInventory) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentInventory.all(
          page,
          pageSize
        ),
      ],
      queryFn: () =>
        listAssessmentInventory(page, pageSize),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
