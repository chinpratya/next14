import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityPurposeResponseSchema } from '../schemas';
import { ActivityPurposeResponse } from '../types';

export type ListActivityPurpose = Request & {
  activityId: string;
};
export const listActivityPurpose = async ({
  activityId,
  ...params
}: ListActivityPurpose): Promise<ActivityPurposeResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/purpose`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );
  return ActivityPurposeResponseSchema.parse(response);
};

type UseListActivityPurpose = ListActivityPurpose;
export const useListActivityPurpose = ({
  activityId,
  ...params
}: UseListActivityPurpose) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.collectPurpose(
          activityId
        ),
        params,
      ],
      queryFn: () =>
        listActivityPurpose({ ...params, activityId }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
