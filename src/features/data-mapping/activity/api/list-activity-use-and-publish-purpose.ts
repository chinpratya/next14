import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityPurposeResponseSchema } from '../schemas';
import { ActivityPurposeResponse } from '../types';

type ListActivityUseAndPublishPurpose = Request & {
  activityId: string;
};

export const listActivityUseAndPublishPurpose = async ({
  activityId,
  ...params
}: ListActivityUseAndPublishPurpose): Promise<ActivityPurposeResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/purpose`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );
  return ActivityPurposeResponseSchema.parse(response);
};

type UseListActivityUseAndPublishPurpose =
  ListActivityUseAndPublishPurpose;

export const useListActivityUseAndPublishPurpose = ({
  activityId,
  ...params
}: UseListActivityUseAndPublishPurpose) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.purpose(activityId),
        params,
      ],
      queryFn: () =>
        listActivityUseAndPublishPurpose({
          ...params,
          activityId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
