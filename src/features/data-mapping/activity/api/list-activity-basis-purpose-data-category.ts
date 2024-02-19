import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityBasisPurposeDataCategoryResponseSchema } from '../schemas';
import { ActivityBasisPurposeDataCategoryResponse } from '../types';

export type ListActivityBasisPurposeDataCategory =
  Request & {
    activityId: string;
    basisId: string;
    purposeId: string;
  };

export const listActivityBasisPurposeDataCategory =
  async ({
    activityId,
    basisId,
    purposeId,
    ...params
  }: ListActivityBasisPurposeDataCategory): Promise<ActivityBasisPurposeDataCategoryResponse> => {
    const response = await apiClient.get(
      `/activity/${activityId}/basis/${basisId}/purpose/${purposeId}/data-category`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
        params,
      }
    );

    return ActivityBasisPurposeDataCategoryResponseSchema.parse(
      response
    );
  };

export const useListActivityBasisPurposeDataCategory = ({
  activityId,
  basisId,
  purposeId,
  ...params
}: ListActivityBasisPurposeDataCategory) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.basisPurposeDataCategory(
          activityId,
          basisId,
          purposeId
        ),
        params,
      ],
      queryFn: () =>
        listActivityBasisPurposeDataCategory({
          activityId,
          basisId,
          purposeId,
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
