import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityUsagePeopleResponseSchema } from '../schemas';
import { ActivityUsagePeopleResponse } from '../types';

type ListActivityUseAndPublishUsageRelatedPerson =
  Request & {
    activityId: string;
  };
export const listActivityUseAndPublishUsageRelatedPerson =
  async ({
    activityId,
    ...params
  }: ListActivityUseAndPublishUsageRelatedPerson): Promise<ActivityUsagePeopleResponse> => {
    const response = await apiClient.get(
      `/activity/${activityId}/usage/people`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
        params,
      }
    );
    return ActivityUsagePeopleResponseSchema.parse(
      response
    );
  };

type UseListActivityUseAndPublishUsageRelatedPerson =
  ListActivityUseAndPublishUsageRelatedPerson;

export const useListActivityUseAndPublishUsageRelatedPerson =
  ({
    activityId,
    ...params
  }: UseListActivityUseAndPublishUsageRelatedPerson) => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          dataMappingQueryKeys.activity.usageRelatedPerson(
            activityId
          ),
          params,
        ],
        queryFn: () =>
          listActivityUseAndPublishUsageRelatedPerson({
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
