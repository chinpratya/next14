import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityPurposeResponseSchema } from '../schemas';
import { ActivityPurposeResponse } from '../types';

type ListActivityUseAndPublishPurposeLifecycle =
  Request & {
    activityId: string;
  };

export const listActivityUseAndPublishPurposeLifecycle =
  async ({
    activityId,
    ...params
  }: ListActivityUseAndPublishPurposeLifecycle): Promise<ActivityPurposeResponse> => {
    const response = await apiClient.get(
      `/activity/${activityId}/purpose/lifecycle`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
        params,
      }
    );
    return ActivityPurposeResponseSchema.parse(response);
  };

type UseListActivityUseAndPublishPurposeLifecycle =
  ListActivityUseAndPublishPurposeLifecycle;

export const useListActivityUseAndPublishPurposeLifecycle =
  ({
    activityId,
    ...params
  }: UseListActivityUseAndPublishPurposeLifecycle) => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          dataMappingQueryKeys.activity.purpose(
            activityId
          ),
          params,
        ],
        queryFn: () =>
          listActivityUseAndPublishPurposeLifecycle({
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
