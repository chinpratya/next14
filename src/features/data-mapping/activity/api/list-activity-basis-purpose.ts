import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityBasisPurposeResponseSchema } from '../schemas';
import { ActivityBasisPurposeResponse } from '../types';

export type ListActivityBasisPurpose = Request & {
  activityId: string;
  basisId: string;
};

export const listActivityBasisPurpose = async ({
  activityId,
  basisId,
  ...params
}: ListActivityBasisPurpose): Promise<ActivityBasisPurposeResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/basis/${basisId}/purpose`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return ActivityBasisPurposeResponseSchema.parse(
    response
  );
};

export const useListActivityBasisPurpose = ({
  activityId,
  basisId,
  ...params
}: ListActivityBasisPurpose) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.basisPurpose(
          activityId,
          basisId
        ),
        params,
      ],
      queryFn: () =>
        listActivityBasisPurpose({
          activityId,
          basisId,
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
